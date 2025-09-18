import swaggerJsdoc from "swagger-jsdoc";
import { Config } from "../shared/Config";

/**
 * Swagger configuration and schema definitions
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tasks API - Backend con Arquitectura Hexagonal",
    version: "1.0.0",
    description: `
      API RESTful para gestión de tareas implementada con arquitectura hexagonal.
      
      ## Características
      - **Arquitectura Hexagonal**: Separación clara entre capas
      - **Domain-Driven Design**: Entidades y lógica de negocio encapsulada
      - **TypeScript**: Tipado estricto y seguridad de tipos
      - **PrismaJS**: ORM moderno para base de datos
      - **Express**: Framework web minimalista y flexible
      
      ## Capas de la Arquitectura
      - **Domain**: Entidades y reglas de negocio
      - **Application**: Casos de uso y DTOs
      - **Infrastructure**: Implementaciones técnicas (Prisma, Database)
      - **Interfaces**: Controladores HTTP y rutas
    `,
    contact: {
      name: "Luis Lopez",
      email: "luis@example.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: `http://localhost:${Config.PORT}`,
      description: "Servidor de desarrollo",
    },
    {
      url: `${Config.SWAGGER_PRODUCTION_URL}/api-docs`,
      description: "Servidor de producción",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        required: ["id", "title", "completed", "createdAt", "updatedAt"],
        properties: {
          id: {
            type: "integer",
            description: "Identificador único de la tarea (autoincremental)",
            example: 1,
          },
          title: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Título de la tarea (obligatorio)",
            example: "Completar documentación de la API",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción detallada de la tarea (opcional)",
            example:
              "Agregar Swagger UI para documentar todos los endpoints de la API",
          },
          completed: {
            type: "boolean",
            description: "Estado de completación de la tarea",
            example: false,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Fecha y hora de creación",
            example: "2024-01-15T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Fecha y hora de última actualización",
            example: "2024-01-15T14:22:00.000Z",
          },
        },
      },
      CreateTaskRequest: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Título de la tarea (obligatorio)",
            example: "Nueva tarea",
          },
          description: {
            type: "string",
            description: "Descripción de la tarea (opcional)",
            example: "Descripción detallada de la nueva tarea",
          },
        },
      },
      UpdateTaskRequest: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Título actualizado de la tarea",
            example: "Tarea actualizada",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción actualizada (opcional)",
            example: "Nueva descripción de la tarea",
          },
          completed: {
            type: "boolean",
            description: "Estado de completación actualizado",
            example: true,
          },
        },
      },
      SuccessResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            oneOf: [
              { $ref: "#/components/schemas/Task" },
              {
                type: "array",
                items: { $ref: "#/components/schemas/Task" },
              },
            ],
          },
          message: {
            type: "string",
            example: "Operation completed successfully",
          },
          count: {
            type: "number",
            description: "Número de elementos (solo en listas)",
            example: 5,
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Validation Error",
          },
          message: {
            type: "string",
            example: "Title is required and cannot be empty",
          },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
          path: {
            type: "string",
            example: "/api/tasks",
          },
        },
      },
      HealthResponse: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "OK",
          },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T10:30:00.000Z",
          },
          uptime: {
            type: "number",
            description: "Tiempo de actividad en segundos",
            example: 3600.45,
          },
          environment: {
            type: "string",
            example: "development",
          },
        },
      },
    },
    responses: {
      ValidationError: {
        description: "Error de validación en los datos de entrada",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              error: "Validation Error",
              message: "Title is required and cannot be empty",
              timestamp: "2024-01-15T10:30:00.000Z",
              path: "/api/tasks",
            },
          },
        },
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              error: "Not Found",
              message: "Task with id 123 not found",
              timestamp: "2024-01-15T10:30:00.000Z",
              path: "/api/tasks/123",
            },
          },
        },
      },
      ConflictError: {
        description: "Conflicto - El recurso ya existe",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              error: "Conflict",
              message: "Task with title 'Mi tarea' already exists",
              timestamp: "2024-01-15T10:30:00.000Z",
              path: "/api/tasks",
            },
          },
        },
      },
      InternalServerError: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              error: "Internal Server Error",
              message: "Something went wrong",
              timestamp: "2024-01-15T10:30:00.000Z",
              path: "/api/tasks",
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Tasks",
      description: "Operaciones CRUD para gestión de tareas",
    },
    {
      name: "Health",
      description: "Endpoints de estado y salud del sistema",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: [
    "./src/interfaces/http/routes/*.ts",
    "./src/interfaces/http/controllers/*.ts",
    "./src/docs/*.yml",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
