import test from "node:test";
import assert from "node:assert/strict";

import { RequestService } from "../src/services/request.service";
import {
  InMemoryRequestRepository,
} from "../src/repositories/in-memory-request.repository";
import type { ServiceRequest } from "../src/types/request.types";
import type { CreateRequestInput } from "../src/validators/request.validator";

const sampleRequest: ServiceRequest = {
  id: "123e4567-e89b-42d3-a456-426614174000",
  title: "Network connection issue",
  description: "Unable to connect to the office network.",
  category: "IT",
  priority: "HIGH",
  status: "OPEN",
  createdAt: "2026-01-01T10:00:00.000Z",
  updatedAt: "2026-01-01T10:00:00.000Z",
};

function createService(initialRequests: ServiceRequest[] = []) {
  const repository = new InMemoryRequestRepository();

  return {
    service: new RequestService(repository),
    repository,
    seed: async () => {
      for (const request of initialRequests) {
        await repository.create(request);
      }
    },
  };
}

test("getAllRequests returns requests ordered by newest creation date", async () => {
  const secondRequest: ServiceRequest = {
    ...sampleRequest,
    id: "223e4567-e89b-42d3-a456-426614174000",
    title: "Printer issue",
    createdAt: "2026-01-02T10:00:00.000Z",
    updatedAt: "2026-01-02T10:00:00.000Z",
  };

  const { service, seed } = createService([sampleRequest, secondRequest]);
  await seed();

  const result = await service.getAllRequests();

  assert.equal(result.length, 2);
  assert.equal(result[0]?.id, secondRequest.id);
  assert.equal(result[1]?.id, sampleRequest.id);
});

test("getAllRequests filters requests by status", async () => {
  const inProgressRequest: ServiceRequest = {
    ...sampleRequest,
    id: "223e4567-e89b-42d3-a456-426614174000",
    status: "IN_PROGRESS",
  };

  const { service, seed } = createService([
    sampleRequest,
    inProgressRequest,
  ]);
  await seed();

  const result = await service.getAllRequests("IN_PROGRESS");

  assert.equal(result.length, 1);
  assert.equal(result[0]?.status, "IN_PROGRESS");
});

test("getRequestById returns the matching request", async () => {
  const { service, seed } = createService([sampleRequest]);
  await seed();

  const result = await service.getRequestById(sampleRequest.id);

  assert.deepEqual(result, sampleRequest);
});

test("getRequestById returns null for an unknown ID", async () => {
  const { service } = createService();

  const result = await service.getRequestById(
    "323e4567-e89b-42d3-a456-426614174000",
  );

  assert.equal(result, null);
});

test("createRequest creates a request with OPEN status and generated ID", async () => {
  const { service } = createService();

  const input: CreateRequestInput = {
    title: "  New laptop request  ",
    description: "Laptop required for development work.",
    category: "IT",
    priority: "MEDIUM",
  };

  const result = await service.createRequest(input);

  assert.match(
    result.id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  );
  assert.equal(result.title, input.title);
  assert.equal(result.status, "OPEN");
  assert.equal(result.category, "IT");
  assert.equal(result.priority, "MEDIUM");
  assert.ok(!Number.isNaN(Date.parse(result.createdAt)));
  assert.equal(result.createdAt, result.updatedAt);
});

test("updateRequest updates an existing request timestamp", async () => {
  const { service, seed } = createService([sampleRequest]);
  await seed();

  const result = await service.updateRequest({
    ...sampleRequest,
    title: "Updated network issue",
  });

  assert.ok(result);
  assert.equal(result.title, "Updated network issue");
  assert.ok(
    Date.parse(result.updatedAt) >= Date.parse(sampleRequest.updatedAt),
  );
});

test("updateRequestStatus changes the status of an existing request", async () => {
  const { service, seed } = createService([sampleRequest]);
  await seed();

  const result = await service.updateRequestStatus(
    sampleRequest.id,
    "IN_PROGRESS",
  );

  assert.ok(result);
  assert.equal(result.status, "IN_PROGRESS");
  assert.equal(result.id, sampleRequest.id);
  assert.ok(
    Date.parse(result.updatedAt) >= Date.parse(sampleRequest.updatedAt),
  );
});

test("updateRequestStatus returns null for an unknown request", async () => {
  const { service } = createService();

  const result = await service.updateRequestStatus(
    "423e4567-e89b-42d3-a456-426614174000",
    "RESOLVED",
  );

  assert.equal(result, null);
});

// Additional persistence test
test("createRequest persists the created request in the repository", async () => {
  const { service } = createService();

  const input: CreateRequestInput = {
    title: "New equipment request",
    description: "A monitor is required.",
    category: "IT",
    priority: "LOW",
  };

  const created = await service.createRequest(input);
  const stored = await service.getRequestById(created.id);

  assert.deepEqual(stored, created);
});

// Additional missing-record update test
test("updateRequest returns null for an unknown request", async () => {
  const { service } = createService();

  const result = await service.updateRequest({
    ...sampleRequest,
    id: "523e4567-e89b-42d3-a456-426614174000",
  });

  assert.equal(result, null);
});
