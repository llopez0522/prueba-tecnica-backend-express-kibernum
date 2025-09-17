import { Task, TaskRepository } from "../../domain";
import { Task as PrismaTask, PrismaClient } from "@prisma/client";
import { DatabaseConnection } from "../database/DatabaseConnection";

/**
 * Prisma implementation of TaskRepository
 */
export class PrismaTaskRepository implements TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseConnection.getInstance();
  }

  async save(task: Task): Promise<Task> {
    const taskData = task.toPersistence();

    const createdTask = await this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description ?? null,
        completed: taskData.completed,
        createdAt: taskData.createdAt,
        updatedAt: taskData.updatedAt,
      },
    });

    return this.toDomain(createdTask);
  }
  async update(task: Task): Promise<Task> {
    const taskData = task.toPersistence();

    const updatedTask = await this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: taskData.title,
        description: taskData.description ?? null,
        completed: taskData.completed,
        updatedAt: taskData.updatedAt,
      },
    });

    return this.toDomain(updatedTask);
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }

    return this.toDomain(task);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return tasks.map((task) => this.toDomain(task));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.task.count({
      where: { id },
    });

    return count > 0;
  }

  async findByTitle(title: string): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { title },
    });

    return task ? this.toDomain(task) : null;
  }

  /**
   * Converts Prisma task to domain Task entity
   */
  private toDomain(prismaTask: PrismaTask): Task {
    return Task.fromPersistence({
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description || undefined,
      completed: prismaTask.completed,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }
}
