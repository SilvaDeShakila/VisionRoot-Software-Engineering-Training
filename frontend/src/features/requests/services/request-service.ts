import type {
  CreateRequestInput,
  RequestStatus,
  ServiceRequest,
} from "../types/request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestListResponse {
  data: ServiceRequest[];
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error?.message ||
        errorBody?.message ||
        `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

export const requestService = {
  getAll(status?: RequestStatus): Promise<RequestListResponse> {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return apiRequest<RequestListResponse>(`/requests${query}`);
  },

  getById(id: string): Promise<ServiceRequest> {
    return apiRequest<ServiceRequest>(
      `/requests/${encodeURIComponent(id)}`,
    );
  },

  create(data: CreateRequestInput): Promise<ServiceRequest> {
    return apiRequest<ServiceRequest>("/requests", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateStatus(
    id: string,
    status: RequestStatus,
  ): Promise<ServiceRequest> {
    return apiRequest<ServiceRequest>(
      `/requests/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
    );
  },
};
