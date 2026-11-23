import type { ServiceRequest, RequestStatus } from "../types/request.types";
import type { RequestRepository } from "./request.repository";

export class InMemoryRequestRepository implements RequestRepository {
  private requests: ServiceRequest[] = [];

  async findAll(status?: RequestStatus): Promise<ServiceRequest[]> {
    const matchingRequests = status
      ? this.requests.filter((request) => request.status === status)
      : this.requests;

    return [...matchingRequests].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
  }

  async findById(id: string): Promise<ServiceRequest | null> {
    return this.requests.find((request) => request.id === id) ?? null;
  }

  async create(request: ServiceRequest): Promise<ServiceRequest> {
    this.requests.push(request);
    return request;
  }

  async update(request: ServiceRequest): Promise<ServiceRequest | null> {
    const index = this.requests.findIndex(
      (existingRequest) => existingRequest.id === request.id,
    );

    if (index === -1) {
      return null;
    }

    this.requests[index] = request;
    return request;
  }
}
