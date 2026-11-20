import { Router } from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
} from "../controllers/request.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createRequestSchema } from "../validators/request.validator";

const requestRouter = Router();

requestRouter.get("/", getAllRequests);

requestRouter.get("/:id", getRequestById);

requestRouter.post(
  "/",
  validateBody(createRequestSchema),
  createRequest,
);

export default requestRouter;
