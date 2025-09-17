import { Router, Request, Response } from "express";

/**
 * Creates health check routes
 */
export function createHealthRoutes(): Router {
  const router = Router();

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Health Check del sistema
   *     description: |
   *       Endpoint para verificar el estado de salud de la API.
   *       Útil para monitoring, load balancers y verificación de disponibilidad.
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Sistema funcionando correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthResponse'
   *             example:
   *               status: "OK"
   *               timestamp: "2024-01-15T10:30:00.000Z"
   *               uptime: 3600.45
   *               environment: "development"
   */
  router.get("/", (_: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  return router;
}
