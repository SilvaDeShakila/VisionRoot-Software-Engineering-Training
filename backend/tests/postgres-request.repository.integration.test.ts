import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";

import { env } from "../src/config/env";
import { PostgresRequestRepository } from "../src/repositories/postgres-request.repository";
import type { ServiceRequest } from "../src/types/request.types";

if (env.DB_NAME !== "visionroot_test_db") {
  throw new Error(
    "Integration tests are restricted to the visionroot_test_db database.",
  );
}

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  max: 2,
  connectionTimeoutMillis: 5000,
});

const repository = new PostgresRequestRepository(pool);

test("PostgreSQL repository persists, retrieves, filters, and updates service requests", async () => {
  const createdIds: string[] = [];

  try {
    await pool.query("SELECT 1");

    const requestId = randomUUID();
    createdIds.push(requestId);

    const request: ServiceRequest = {
      id: requestId,
      title: "Integration test request",
      description: "Created by the PostgreSQL repository integration test.",
      category: "IT",
      priority: "HIGH",
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await repository.create(request);

    assert.equal(created.id, requestId);
    assert.equal(created.title, request.title);
    assert.equal(created.status, "OPEN");
    assert.ok(!Number.isNaN(Date.parse(created.createdAt)));
    assert.ok(!Number.isNaN(Date.parse(created.updatedAt)));

    const retrieved = await repository.findById(requestId);

    assert.deepEqual(retrieved, created);

    const openRequests = await repository.findAll("OPEN");

    assert.ok(
      openRequests.some((item) => item.id === requestId),
      "The created request should appear in OPEN requests.",
    );

    const updated = await repository.update({
      ...created,
      title: "Updated integration test request",
      status: "IN_PROGRESS",
    });

    assert.ok(updated);
    assert.equal(updated.id, requestId);
    assert.equal(updated.title, "Updated integration test request");
    assert.equal(updated.status, "IN_PROGRESS");
    assert.ok(
      Date.parse(updated.updatedAt) >= Date.parse(created.updatedAt),
    );

    const inProgressRequests = await repository.findAll("IN_PROGRESS");

    assert.ok(
      inProgressRequests.some((item) => item.id === requestId),
      "The updated request should appear in IN_PROGRESS requests.",
    );

    const missingId = randomUUID();

    assert.equal(await repository.findById(missingId), null);

    assert.equal(
      await repository.update({
        ...request,
        id: missingId,
      }),
      null,
    );
  } finally {
    try {
      if (createdIds.length > 0) {
        await pool.query(
          "DELETE FROM service_requests WHERE id = ANY($1::uuid[])",
          [createdIds],
        );
      }
    } finally {
      await pool.end();
    }
  }
});
