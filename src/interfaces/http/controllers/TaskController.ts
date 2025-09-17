import { Request, Response } from "express";
import {
  CreateTaskUseCase,
  GetAllTasksUseCase,
  GetTaskByIdUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  CreateTaskDto,
  UpdateTaskDto,
} from "../../../application";

/**
 * Task controller handling HTTP requests for task operations
 */
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  /**
   * GET /tasks - Get all tasks
   */
  async getAllTasks(_: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.getAllTasksUseCase.execute();
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
      });
    } catch (error) {
      throw error; // Will be handled by error middleware
    }
  }

  /**
   * POST /tasks - Create a new task
   */
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const createTaskDto = new CreateTaskDto(title, description);

      const task = await this.createTaskUseCase.execute(createTaskDto);

      res.status(201).json({
        success: true,
        data: task,
        message: "Task created successfully",
      });
    } catch (error) {
      throw error; // Will be handled by error middleware
    }
  }

  /**
   * GET /tasks/:id - Get a specific task by ID
   */
  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        res.status(400).json({
          success: false,
          error: "Invalid ID format. ID must be a number.",
        });
        return;
      }

      const task = await this.getTaskByIdUseCase.execute(numericId);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      throw error; // Will be handled by error middleware
    }
  }

  /**
   * PUT /tasks/:id - Update an existing task
   */
  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        res.status(400).json({
          success: false,
          error: "Invalid ID format. ID must be a number.",
        });
        return;
      }

      const updateTaskDto = new UpdateTaskDto(title, description, completed);

      const task = await this.updateTaskUseCase.execute(
        numericId,
        updateTaskDto
      );

      res.status(200).json({
        success: true,
        data: task,
        message: "Task updated successfully",
      });
    } catch (error) {
      throw error; // Will be handled by error middleware
    }
  }

  /**
   * DELETE /tasks/:id - Delete a task
   */
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        res.status(400).json({
          success: false,
          error: "Invalid ID format. ID must be a number.",
        });
        return;
      }

      await this.deleteTaskUseCase.execute(numericId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      throw error; // Will be handled by error middleware
    }
  }
}
