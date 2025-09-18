import { Task, TaskRepository, DuplicateEntityError } from "../../../domain";
import { CreateTaskDto, TaskResponseDto } from "../dtos/TaskDtos";

/**
 * Use case for creating a new task
 */
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    // Validate input
    const errors = createTaskDto.validate();
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(", ")}`);
    }

    // Check if task with same title already exists
    const existingTask = await this.taskRepository.findByTitle(
      createTaskDto.title
    );
    if (existingTask) {
      throw new DuplicateEntityError("La tarea", "título", createTaskDto.title);
    }

    // Create domain entity
    const task = Task.create(createTaskDto.title, createTaskDto.description);

    // Save through repository
    const savedTask = await this.taskRepository.save(task);

    // Return DTO
    return new TaskResponseDto(
      savedTask.id,
      savedTask.title,
      savedTask.description,
      savedTask.completed,
      savedTask.createdAt,
      savedTask.updatedAt
    );
  }
}
