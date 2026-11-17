import express from "express";
import cors from "cors";
import { env } from "./config/env";
import healthRouter from "./routes/health.routes";
import requestRouter from "./routes/request.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    message: "VisionRoot Service Request API",
    status: "running",
  });
});

app.use("/api/health", healthRouter);
app.use("/api/requests", requestRouter);

// Handle unknown routes with a consistent JSON response.
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested API endpoint was not found.",
    },
  });
});

// Global error handler must be registered last.
app.use(errorHandler);

export default app;
