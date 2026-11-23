import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateBody = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed.",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

export const validateParam = (
  paramName: string,
  schema: ZodType,
  message = `Invalid ${paramName} format.`,
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params[paramName]);

    if (!result.success) {
      res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message,
          details: result.error.issues.map((issue) => ({
            field: paramName,
            message: issue.message,
          })),
        },
      });
      return;
    }

    next();
  };
};