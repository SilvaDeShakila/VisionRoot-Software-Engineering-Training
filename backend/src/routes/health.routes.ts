import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "VisionRoot API is running.",
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
