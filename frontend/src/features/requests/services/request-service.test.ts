import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type {
  CreateRequestInput,
  ServiceRequest,
} from "../types/request";

const API_URL = "http://localhost:4000/api";

const mockRequest: ServiceRequest = {
  id: "request-123",
  title: "Internet connection issue",
  description: "Internet is not working.",
  category: "IT",
  priority: "HIGH",
  status: "OPEN",
  createdAt: "2026-11-26T08:00:00.000Z",
  updatedAt: "2026-11-26T08:00:00.000Z",
};

function createMockResponse(
  body: unknown,
  ok = true,
  status = 200,
): Response {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

async function loadRequestService(apiUrl = API_URL) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_API_URL", apiUrl);

  const serviceModule = await import("./request-service");

  return serviceModule.requestService;
}

describe("requestService", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("fetches all service requests", async () => {
    const requestService = await loadRequestService();

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({ data: [mockRequest] }),
    );

    const result = await requestService.getAll();

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/requests`,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    expect(result.data).toEqual([mockRequest]);
  });

  it("fetches requests using a status filter", async () => {
    const requestService = await loadRequestService();

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({ data: [mockRequest] }),
    );

    await requestService.getAll("IN_PROGRESS");

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/requests?status=IN_PROGRESS`,
      expect.any(Object),
    );
  });

  it("fetches a request by ID with URL encoding", async () => {
    const requestService = await loadRequestService();

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse(mockRequest),
    );

    const result = await requestService.getById("request/123");

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/requests/request%2F123`,
      expect.any(Object),
    );

    expect(result).toEqual(mockRequest);
  });

  it("creates a service request using POST", async () => {
    const requestService = await loadRequestService();

    const input: CreateRequestInput = {
      title: "Internet connection issue",
      description: "Internet is not working.",
      category: "IT",
      priority: "HIGH",
    };

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse(mockRequest),
    );

    const result = await requestService.create(input);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/requests`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(input),
      }),
    );

    expect(result).toEqual(mockRequest);
  });

  it("updates request status using PATCH", async () => {
    const requestService = await loadRequestService();

    const updatedRequest: ServiceRequest = {
      ...mockRequest,
      status: "IN_PROGRESS",
    };

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse(updatedRequest),
    );

    const result = await requestService.updateStatus(
      "request-123",
      "IN_PROGRESS",
    );

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/requests/request-123/status`,
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ status: "IN_PROGRESS" }),
      }),
    );

    expect(result.status).toBe("IN_PROGRESS");
  });

  it("throws an error when the API URL is not configured", async () => {
    const requestService = await loadRequestService("");

    await expect(requestService.getAll()).rejects.toThrow(
      "API URL is not configured.",
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws the server error message when a request fails", async () => {
    const requestService = await loadRequestService();

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse(
        {
          error: {
            message: "Request was not found.",
          },
        },
        false,
        404,
      ),
    );

    await expect(
      requestService.getById("missing-id"),
    ).rejects.toThrow("Request was not found.");
  });

  it("uses the HTTP status when the error response has no message", async () => {
    const requestService = await loadRequestService();

    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({}, false, 500),
    );

    await expect(requestService.getAll()).rejects.toThrow(
      "Request failed with status 500",
    );
  });
});
