export type RequestCategory = "IT" | "Facilities" | "Other";

export type RequestPriority = "LOW" | "MEDIUM" | "HIGH";

export type RequestStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequestInput {
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
}
