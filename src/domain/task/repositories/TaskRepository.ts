import { Task } from "../entities/Task";

/**
 * Task Repository interface defining the contract for task persistence
 * This interface belongs to the domain layer and defines what operations
 * are needed without specifying how they are implemented
 */
export interface TaskRepository {
  /**
   * Saves a new task
   */
  save(task: Task): Promise<Task>;

  /**
   * Updates an existing task
   */
  update(task: Task): Promise<Task>;

  /**
   * Finds a task by its ID
   */
  findById(id: number): Promise<Task | null>;

  /**
   * Finds all tasks
   */
  findAll(): Promise<Task[]>;

  /**
   * Deletes a task by its ID
   */
  delete(id: number): Promise<void>;

  /**
   * Checks if a task exists by its ID
   */
  exists(id: number): Promise<boolean>;

  /**
   * Finds a task by its title
   */
  findByTitle(title: string): Promise<Task | null>;
}
