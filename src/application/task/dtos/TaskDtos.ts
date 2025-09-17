/**
 * DTO for creating a new task
 */
export class CreateTaskDto {
  title!: string;
  description: string | undefined;

  constructor(title: string, description: string | undefined) {
    this.title = title;
    this.description = description;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (this.title && this.title.length > 255) {
      errors.push("Title cannot exceed 255 characters");
    }

    return errors;
  }
}

/**
 * DTO for updating an existing task
 */
export class UpdateTaskDto {
  title!: string;
  description: string | undefined;
  completed: boolean | undefined;

  constructor(
    title: string,
    description: string | undefined,
    completed: boolean | undefined
  ) {
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (this.title && this.title.length > 255) {
      errors.push("Title cannot exceed 255 characters");
    }

    return errors;
  }
}

/**
 * DTO for task response
 */
export class TaskResponseDto {
  id!: number;
  title!: string;
  description: string | undefined;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    id: number,
    title: string,
    description: string | undefined,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
