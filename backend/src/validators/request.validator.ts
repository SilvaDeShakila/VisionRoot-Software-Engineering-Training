import { z } from "zod";

export const requestIdSchema = z.string().uuid();

export const requestStatusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
]);

export const createRequestSchema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(5000),
  category: z.enum(["IT", "Facilities", "Other"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const updateStatusSchema = z.object({
  status: requestStatusSchema,
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
