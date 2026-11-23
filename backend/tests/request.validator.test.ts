import test from "node:test";
import assert from "node:assert/strict";

import {
  requestIdSchema,
  requestStatusSchema,
  createRequestSchema,
  updateStatusSchema,
} from "../src/validators/request.validator";

const validRequest = {
  title: "Network issue",
  description: "Unable to connect to the network.",
  category: "IT",
  priority: "HIGH",
};

test("requestIdSchema accepts a valid UUID", () => {
  assert.equal(
    requestIdSchema.safeParse(
      "123e4567-e89b-42d3-a456-426614174000",
    ).success,
    true,
  );
});

test("requestIdSchema rejects an invalid UUID", () => {
  assert.equal(requestIdSchema.safeParse("invalid-id").success, false);
});

test("requestStatusSchema accepts all supported statuses", () => {
  for (const status of ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]) {
    assert.equal(requestStatusSchema.safeParse(status).success, true);
  }
});

test("requestStatusSchema rejects unsupported statuses", () => {
  assert.equal(requestStatusSchema.safeParse("PENDING").success, false);
});

test("createRequestSchema accepts valid request data", () => {
  assert.equal(createRequestSchema.safeParse(validRequest).success, true);
});

test("createRequestSchema trims title and description whitespace", () => {
  const result = createRequestSchema.safeParse({
    ...validRequest,
    title: "  Network issue  ",
    description: "  Network is unavailable.  ",
  });

  assert.equal(result.success, true);

  if (result.success) {
    assert.equal(result.data.title, "Network issue");
    assert.equal(result.data.description, "Network is unavailable.");
  }
});

test("createRequestSchema rejects an empty title", () => {
  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      title: "   ",
    }).success,
    false,
  );
});

test("createRequestSchema rejects a title longer than 150 characters", () => {
  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      title: "A".repeat(151),
    }).success,
    false,
  );
});

test("createRequestSchema rejects an empty description", () => {
  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      description: "   ",
    }).success,
    false,
  );
});

test("createRequestSchema rejects a description longer than 5000 characters", () => {
  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      description: "A".repeat(5001),
    }).success,
    false,
  );
});

test("createRequestSchema rejects unsupported category and priority values", () => {
  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      category: "Finance",
    }).success,
    false,
  );

  assert.equal(
    createRequestSchema.safeParse({
      ...validRequest,
      priority: "URGENT",
    }).success,
    false,
  );
});

test("updateStatusSchema accepts a valid status object", () => {
  assert.equal(
    updateStatusSchema.safeParse({ status: "RESOLVED" }).success,
    true,
  );
});

test("updateStatusSchema rejects an unsupported status object", () => {
  assert.equal(
    updateStatusSchema.safeParse({ status: "PENDING" }).success,
    false,
  );
});

// Boundary test: maximum title length
test("createRequestSchema accepts a title of exactly 150 characters", () => {
  const result = createRequestSchema.safeParse({
    ...validRequest,
    title: "A".repeat(150),
  });

  assert.equal(result.success, true);
});

// Boundary test: maximum description length
test("createRequestSchema accepts a description of exactly 5000 characters", () => {
  const result = createRequestSchema.safeParse({
    ...validRequest,
    description: "A".repeat(5000),
  });

  assert.equal(result.success, true);
});
