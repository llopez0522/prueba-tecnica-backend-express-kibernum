import { TaskRepository, EntityNotFoundError } from "../../../domain";

/**
 * Use case for deleting a task
 */
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: number): Promise<void> {
    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid task ID");
    }

    // Check if task exists
    const exists = await this.taskRepository.exists(id);
    if (!exists) {
      throw new EntityNotFoundError("Task", id.toString());
    }

    // Delete task
    await this.taskRepository.delete(id);
  }
}
