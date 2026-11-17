import { randomUUID } from "node:crypto";
import type { ServiceRequest, RequestStatus } from "../types/request.types";
import type { CreateRequestInput } from "../validators/request.validator";
import type { RequestRepository } from "../repositories/request.repository";

export class RequestService {
  constructor(private readonly repository: RequestRepository) {}

  async getAllRequests(status?: RequestStatus): Promise<ServiceRequest[]> {
    return this.repository.findAll(status);
  }

  async getRequestById(id: string): Promise<ServiceRequest | null> {
    return this.repository.findById(id);
  }

  async createRequest(input: CreateRequestInput): Promise<ServiceRequest> {
    const now = new Date().toISOString();

    const request: ServiceRequest = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      category: input.category,
      priority: input.priority,
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
    };

    return this.repository.create(request);
  }

  async updateRequest(request: ServiceRequest): Promise<ServiceRequest | null> {
    const updatedRequest: ServiceRequest = {
      ...request,
      updatedAt: new Date().toISOString(),
    };

    return this.repository.update(updatedRequest);
  }
}
