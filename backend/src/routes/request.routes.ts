import { Router } from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
} from "../controllers/request.controller";
import {
  validateBody,
  validateParam,
} from "../middlewares/validate.middleware";
import {
  createRequestSchema,
  requestIdSchema,
  updateStatusSchema,
} from "../validators/request.validator";

const requestRouter = Router();

requestRouter.get("/", getAllRequests);

requestRouter.get(
  "/:id",
  validateParam("id", requestIdSchema, "Invalid request ID format."),
  getRequestById,
);

requestRouter.post(
  "/",
  validateBody(createRequestSchema),
  createRequest,
);

requestRouter.patch(
  "/:id/status",
  validateParam("id", requestIdSchema, "Invalid request ID format."),
  validateBody(updateStatusSchema),
  updateRequestStatus,
);

export default requestRouter;