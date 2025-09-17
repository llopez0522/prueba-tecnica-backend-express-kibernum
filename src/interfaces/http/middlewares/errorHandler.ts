import { Request, Response, NextFunction } from "express";
import {
  DomainError,
  EntityNotFoundError,
  ValidationError,
  DuplicateEntityError,
} from "../../../domain";

/**
 * Error handling middleware
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  console.error("Error:", error);

  // Domain specific errors
  if (error instanceof EntityNotFoundError) {
    res.status(404).json({
      error: "Not Found",
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
    return;
  }

  if (error instanceof ValidationError) {
    res.status(400).json({
      error: "Validation Error",
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
    return;
  }

  if (error instanceof DuplicateEntityError) {
    res.status(409).json({
      error: "Conflict",
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
    return;
  }

  if (error instanceof DomainError) {
    res.status(400).json({
      error: "Domain Error",
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
    return;
  }

  // Validation errors from DTOs
  if (error.message.startsWith("Validation failed:")) {
    res.status(400).json({
      error: "Validation Error",
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
    return;
  }

  // Generic server error
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
    timestamp: new Date().toISOString(),
    path: req.path,
  });
};
