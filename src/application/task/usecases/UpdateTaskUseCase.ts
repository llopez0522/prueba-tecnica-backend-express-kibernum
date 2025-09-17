import {
  TaskRepository,
  EntityNotFoundError,
  DuplicateEntityError,
} from "../../../domain";
import { UpdateTaskDto, TaskResponseDto } from "../dtos/TaskDtos";

/**
 * Use case for updating an existing task
 * Handles both complete updates and status toggles
 */
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    id: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid task ID");
    }

    // Find existing task
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new EntityNotFoundError("Task", id.toString());
    }

    // Determine if this is a status toggle or complete update
    const isStatusToggleOnly = this.isStatusToggleOnly(updateTaskDto);

    if (isStatusToggleOnly) {
      // Handle status toggle only
      await this.handleStatusToggle(existingTask, updateTaskDto);
    } else {
      // Handle complete update with validations
      await this.handleCompleteUpdate(existingTask, updateTaskDto, id);
    }

    // Save through repository
    const updatedTask = await this.taskRepository.update(existingTask);

    // Return DTO
    return new TaskResponseDto(
      updatedTask.id,
      updatedTask.title,
      updatedTask.description,
      updatedTask.completed,
      updatedTask.createdAt,
      updatedTask.updatedAt
    );
  }

  /**
   * Checks if the update is only for toggling status
   */
  private isStatusToggleOnly(updateTaskDto: UpdateTaskDto): boolean {
    const hasCompletedField = updateTaskDto.completed !== undefined;
    const hasOtherFields =
      updateTaskDto.title !== undefined ||
      updateTaskDto.description !== undefined;

    return hasCompletedField && !hasOtherFields;
  }

  /**
   * Handles status toggle only (no validations needed)
   */
  private async handleStatusToggle(
    existingTask: any,
    updateTaskDto: UpdateTaskDto
  ): Promise<void> {
    // Only update the completed status
    existingTask.update(
      existingTask.title, // Keep existing title
      existingTask.description, // Keep existing description
      updateTaskDto.completed! // Update only completed status
    );
  }

  /**
   * Handles complete update with full validations
   */
  private async handleCompleteUpdate(
    existingTask: any,
    updateTaskDto: UpdateTaskDto,
    id: number
  ): Promise<void> {
    // Validate input for complete updates
    const errors = updateTaskDto.validate();
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(", ")}`);
    }

    // Check if trying to update title to an existing one (but not the same task)
    if (updateTaskDto.title && updateTaskDto.title !== existingTask.title) {
      const taskWithSameTitle = await this.taskRepository.findByTitle(
        updateTaskDto.title
      );
      if (taskWithSameTitle && taskWithSameTitle.id !== id) {
        throw new DuplicateEntityError("Task", "title", updateTaskDto.title);
      }
    }

    // Update task with all fields
    existingTask.update(
      updateTaskDto.title || existingTask.title,
      updateTaskDto.description !== undefined
        ? updateTaskDto.description
        : existingTask.description,
      updateTaskDto.completed !== undefined
        ? updateTaskDto.completed
        : existingTask.completed
    );
  }
}
