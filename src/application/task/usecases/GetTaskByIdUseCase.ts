import { Task } from "../../../domain/task/entities/Task";
import { TaskRepository } from "../../../domain/task/repositories/TaskRepository";
import { TaskResponseDto } from "../dtos/TaskDtos";

/**
 * Use case for retrieving a task by its ID
 */
export class GetTaskByIdUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: number): Promise<TaskResponseDto> {
    // Validate ID is a positive integer
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("ID must be a positive integer");
    }

    const task: Task | null = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return new TaskResponseDto(
      task.id,
      task.title,
      task.description,
      task.completed,
      task.createdAt,
      task.updatedAt
    );
  }
}
