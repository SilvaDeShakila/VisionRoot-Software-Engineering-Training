import type { RequestHandler } from "express";
import { RequestService } from "../services/request.service";
import { pool } from "../config/database";
import { PostgresRequestRepository } from "../repositories/postgres-request.repository";
import {
  requestIdSchema,
  requestStatusSchema,
} from "../validators/request.validator";

const repository = new PostgresRequestRepository(pool);
const requestService = new RequestService(repository);

export const getAllRequests: RequestHandler = async (req, res) => {
  const status = req.query.status;

  if (status !== undefined) {
    const parsedStatus = requestStatusSchema.safeParse(status);

    if (!parsedStatus.success) {
      res.status(400).json({
        error: {
          code: "INVALID_STATUS",
          message: "Invalid request status.",
        },
      });
      return;
    }

    const requests = await requestService.getAllRequests(parsedStatus.data);

    res.status(200).json({
      data: requests,
    });
    return;
  }

  const requests = await requestService.getAllRequests();

  res.status(200).json({
    data: requests,
  });
};

export const getRequestById: RequestHandler = async (req, res) => {
  const requestId = requestIdSchema.safeParse(req.params.id);

  if (!requestId.success) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request ID format.",
      },
    });
    return;
  }

  const request = await requestService.getRequestById(requestId.data);

  if (!request) {
    res.status(404).json({
      error: {
        code: "REQUEST_NOT_FOUND",
        message: "Service request not found.",
      },
    });
    return;
  }

  res.status(200).json(request);
};

export const createRequest: RequestHandler = async (req, res) => {
  const request = await requestService.createRequest(req.body);

  res.status(201).json(request);
};
