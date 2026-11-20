import { Router } from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
} from "../controllers/request.controller";
import { validateBody } from "../middlewares/validate.middleware";
import {
  createRequestSchema,
  updateStatusSchema,
} from "../validators/request.validator";

const requestRouter = Router();

requestRouter.get("/", getAllRequests);

requestRouter.get("/:id", getRequestById);

requestRouter.post(
  "/",
  validateBody(createRequestSchema),
  createRequest,
);

requestRouter.patch(
  "/:id/status",
  validateBody(updateStatusSchema),
  updateRequestStatus,
);

export default requestRouter;
