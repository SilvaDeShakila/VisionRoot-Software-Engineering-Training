import type { ServiceRequest, RequestStatus } from "../types/request.types";

export interface RequestRepository {
  findAll(status?: RequestStatus): Promise<ServiceRequest[]>;
  findById(id: string): Promise<ServiceRequest | null>;
  create(request: ServiceRequest): Promise<ServiceRequest>;
  update(request: ServiceRequest): Promise<ServiceRequest | null>;
}
