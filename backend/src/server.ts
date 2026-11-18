import app from "./app";
import { env } from "./config/env";
import { pool } from "./config/database";

let isShuttingDown = false;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("PostgreSQL database connected successfully.");

    const server = app.listen(env.PORT, () => {
      console.log(
        `VisionRoot API server running at http://localhost:${env.PORT}`,
      );
    });

    const shutdown = (signal: string) => {
      if (isShuttingDown) {
        return;
      }

      isShuttingDown = true;
      console.log(`${signal} received. Shutting down server...`);

      server.close(async () => {
        console.log("HTTP server closed.");

        try {
          await pool.end();
          console.log("PostgreSQL connection pool closed.");
          process.exit(0);
        } catch (error) {
          console.error("Error closing PostgreSQL connection pool:", error);
          process.exit(1);
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
    await pool.end();
    process.exit(1);
  }
};

void startServer();
