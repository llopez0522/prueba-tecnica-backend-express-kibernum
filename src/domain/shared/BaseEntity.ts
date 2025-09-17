/**
 * Base Entity class that provides common entity functionality
 */
export abstract class BaseEntity {
  protected constructor(public readonly id: number) {
    if (id < 0) {
      throw new Error("Entity ID cannot be negative");
    }
  }

  equals(other: BaseEntity): boolean {
    return this.id === other.id;
  }

  /**
   * Checks if this entity is persisted (has a valid ID from database)
   */
  isPersisted(): boolean {
    return this.id > 0;
  }
}
