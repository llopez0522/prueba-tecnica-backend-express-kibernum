import { TaskRepository } from "../../../domain";
import { TaskResponseDto } from "../dtos/TaskDtos";

/**
 * Use case for getting all tasks
 */
export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.findAll();

    return tasks.map(
      (task) =>
        new TaskResponseDto(
          task.id,
          task.title,
          task.description,
          task.completed,
          task.createdAt,
          task.updatedAt
        )
    );
  }
}
