/**
 * Custom error for domain-specific business rule violations
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

/**
 * Error thrown when a requested entity is not found
 */
export class EntityNotFoundError extends DomainError {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`);
    this.name = "EntityNotFoundError";
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends DomainError {
  constructor(field: string, message: string) {
    super(`Validation error on field '${field}': ${message}`);
    this.name = "ValidationError";
  }
}

/**
 * Error thrown when attempting to create a duplicate entity
 */
export class DuplicateEntityError extends DomainError {
  constructor(entityName: string, field: string, value: string) {
    super(`${entityName} with ${field} '${value}' already exists`);
    this.name = "DuplicateEntityError";
  }
}
