import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/swagger";
import { Config } from "./shared/Config";
import { DatabaseConnection } from "./infrastructure";
import { TaskController, createTaskRoutes, errorHandler } from "./interfaces";
import { createHealthRoutes } from "./interfaces/http/routes/healthRoutes";
import {
  CreateTaskUseCase,
  GetAllTasksUseCase,
  GetTaskByIdUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
} from "./application";
import { PrismaTaskRepository } from "./infrastructure";

/**
 * Application class responsible for setting up the Express server
 * and wiring all dependencies together following hexagonal architecture
 */
export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * Configure Express middlewares
   */
  private setupMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS middleware
    this.app.use(
      cors({
        origin: Config.isDevelopment ? true : [],
        credentials: true,
      })
    );

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Setup application routes with dependency injection
   */
  private setupRoutes(): void {
    // Dependency injection setup
    const taskRepository = new PrismaTaskRepository();

    const createTaskUseCase = new CreateTaskUseCase(taskRepository);
    const getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);
    const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

    const taskController = new TaskController(
      createTaskUseCase,
      getAllTasksUseCase,
      getTaskByIdUseCase,
      updateTaskUseCase,
      deleteTaskUseCase
    );

    // API Documentation with Swagger UI
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #3b82f6; }
      `,
        customSiteTitle: "Tasks API Documentation",
        swaggerOptions: {
          persistAuthorization: true,
          displayRequestDuration: true,
          docExpansion: "list",
          filter: true,
          showRequestHeaders: true,
          tryItOutEnabled: true,
        },
      })
    );

    // Serve raw swagger JSON
    this.app.get("/api-docs.json", (_, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    // Health check routes
    this.app.use("/health", createHealthRoutes());

    // API routes
    this.app.use("/api/tasks", createTaskRoutes(taskController));

    // Root endpoint with API information
    this.app.get("/", (_, res) => {
      res.json({
        message: "🚀 Tasks API - Backend con Arquitectura Hexagonal",
        version: "1.0.0",
        documentation: "/api-docs",
        health: "/health",
        endpoints: {
          tasks: "/api/tasks",
          swagger: "/api-docs",
          swaggerJson: "/api-docs.json",
        },
        architecture: {
          pattern: "Hexagonal Architecture",
          layers: ["Domain", "Application", "Infrastructure", "Interfaces"],
          technologies: [
            "Node.js",
            "Express",
            "TypeScript",
            "Prisma",
            "SQLite",
          ],
        },
      });
    });

    // 404 handler
    this.app.use("*", (req, res) => {
      res.status(404).json({
        error: "Not Found",
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
        availableEndpoints: [
          "GET /",
          "GET /health",
          "GET /api/tasks",
          "POST /api/tasks",
          "PUT /api/tasks/:id",
          "DELETE /api/tasks/:id",
          "GET /api-docs",
        ],
      });
    });
  }

  /**
   * Setup error handling middleware
   */
  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  async start(): Promise<void> {
    try {
      // Test database connection
      const db = DatabaseConnection.getInstance();
      await db.$connect();
      console.log("✅ Database connected successfully");

      // Start server
      const port = Config.PORT;
      this.app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`📍 Environment: ${Config.NODE_ENV}`);
        console.log(`🔗 Health check: http://localhost:${port}/health`);
        console.log(`📋 Tasks API: http://localhost:${port}/api/tasks`);
        console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
        console.log(`📄 Swagger JSON: http://localhost:${port}/api-docs.json`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    try {
      await DatabaseConnection.disconnect();
      console.log("✅ Database disconnected");
      console.log("👋 Server shut down gracefully");
    } catch (error) {
      console.error("❌ Error during shutdown:", error);
    }
  }

  /**
   * Get Express app instance (useful for testing)
   */
  getApp(): Application {
    return this.app;
  }
}
