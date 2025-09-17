import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

/**
 * Creates task routes with dependency injection
 */
export function createTaskRoutes(taskController: TaskController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Obtener todas las tareas
   *     description: Devuelve una lista con todas las tareas ordenadas por fecha de creación (más recientes primero)
   *     tags: [Tasks]
   *     responses:
   *       200:
   *         description: Lista de tareas obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/SuccessResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Task'
   *                     count:
   *                       type: number
   *                       description: Número total de tareas
   *             example:
   *               success: true
   *               data:
   *                 - id: 1
   *                   title: "Completar documentación"
   *                   description: "Agregar Swagger UI a la API"
   *                   completed: false
   *                   createdAt: "2024-01-15T10:30:00.000Z"
   *                   updatedAt: "2024-01-15T10:30:00.000Z"
   *               count: 1
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.get("/", (req, res, next) => {
    taskController.getAllTasks(req, res).catch(next);
  });

  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Crear una nueva tarea
   *     description: Crea una nueva tarea con título obligatorio y descripción opcional
   *     tags: [Tasks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTaskRequest'
   *           example:
   *             title: "Nueva tarea"
   *             description: "Descripción de la nueva tarea"
   *     responses:
   *       201:
   *         description: Tarea creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/SuccessResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Task'
   *             example:
   *               success: true
   *               data:
   *                 id: 1
   *                 title: "Nueva tarea"
   *                 description: "Descripción de la nueva tarea"
   *                 completed: false
   *                 createdAt: "2024-01-15T10:30:00.000Z"
   *                 updatedAt: "2024-01-15T10:30:00.000Z"
   *               message: "Task created successfully"
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       409:
   *         $ref: '#/components/responses/ConflictError'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.post("/", (req, res, next) => {
    taskController.createTask(req, res).catch(next);
  });

  /**
   * @swagger
   * /api/tasks/{id}:
   *   get:
   *     summary: Obtener una tarea específica
   *     description: Obtiene una tarea específica por su ID único
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID único de la tarea
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Tarea obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/SuccessResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Task'
   *             example:
   *               success: true
   *               data:
   *                 id: 1
   *                 title: "Completar documentación"
   *                 description: "Agregar Swagger UI a la API"
   *                 completed: false
   *                 createdAt: "2024-01-15T10:30:00.000Z"
   *                 updatedAt: "2024-01-15T10:30:00.000Z"
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.get("/:id", (req, res, next) => {
    taskController.getTaskById(req, res).catch(next);
  });

  /**
   * @swagger
   * /api/tasks/{id}:
   *   put:
   *     summary: Actualizar una tarea existente
   *     description: Actualiza una tarea existente. Todos los campos son opcionales excepto el título
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID único de la tarea a actualizar
   *         schema:
   *           type: integer
   *           example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTaskRequest'
   *           example:
   *             title: "Tarea actualizada"
   *             description: "Nueva descripción"
   *             completed: true
   *     responses:
   *       200:
   *         description: Tarea actualizada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/SuccessResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Task'
   *             example:
   *               success: true
   *               data:
   *                 id: 1
   *                 title: "Tarea actualizada"
   *                 description: "Nueva descripción"
   *                 completed: true
   *                 createdAt: "2024-01-15T10:30:00.000Z"
   *                 updatedAt: "2024-01-15T14:22:00.000Z"
   *               message: "Task updated successfully"
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       409:
   *         $ref: '#/components/responses/ConflictError'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.put("/:id", (req, res, next) => {
    taskController.updateTask(req, res).catch(next);
  });

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Eliminar una tarea
   *     description: Elimina permanentemente una tarea del sistema
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID único de la tarea a eliminar
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Tarea eliminada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Task deleted successfully"
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.delete("/:id", (req, res, next) => {
    taskController.deleteTask(req, res).catch(next);
  });

  return router;
}
