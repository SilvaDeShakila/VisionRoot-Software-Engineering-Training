import app from "./app";
import { env } from "./config/env";

const server = app.listen(env.PORT, () => {
  console.log(
    `VisionRoot API server running at http://localhost:${env.PORT}`,
  );
});

const shutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down server...`);

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
