import "dotenv/config";
import "reflect-metadata";
import { App } from "./App";

/**
 * Main entry point of the application
 */
async function main(): Promise<void> {
  const app = new App();

  // Graceful shutdown handling
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    await app.shutdown();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down gracefully");
    await app.shutdown();
    process.exit(0);
  });

  // Start the application
  await app.start();
}

// Run the application
main().catch((error) => {
  console.error("Failed to start application:", error);
  process.exit(1);
});
