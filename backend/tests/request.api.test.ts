import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";

import app from "../src/app";

let server: Server;
let baseUrl = "";

before(async () => {
  server = app.listen(0, "127.0.0.1");

  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  const address = server.address();

  assert.ok(address && typeof address !== "string");

  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});

test("GET / returns the API root response", async () => {
  const response = await fetch(baseUrl);

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.message, "VisionRoot Service Request API");
  assert.equal(body.status, "running");
});

test("GET /api/health returns a healthy response", async () => {
  const response = await fetch(`${baseUrl}/api/health`);

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.status, "healthy");
  assert.equal(body.message, "VisionRoot API is running.");
  assert.equal(typeof body.timestamp, "string");
});

test("Unknown API routes return HTTP 404", async () => {
  const response = await fetch(`${baseUrl}/api/unknown`);

  assert.equal(response.status, 404);

  const body = await response.json();

  assert.equal(body.error.code, "ROUTE_NOT_FOUND");
});

test("GET request with an invalid UUID returns HTTP 400", async () => {
  const response = await fetch(`${baseUrl}/api/requests/not-a-valid-uuid`);

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Invalid request ID format.");
});

test("GET requests with an unsupported status filter returns HTTP 400", async () => {
  const response = await fetch(
    `${baseUrl}/api/requests?status=NOT_A_STATUS`,
  );

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "INVALID_STATUS");
});

test("POST request with an invalid body returns HTTP 400", async () => {
  const response = await fetch(`${baseUrl}/api/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(Array.isArray(body.error.details));
});

test("PATCH request with an invalid UUID returns HTTP 400", async () => {
  const response = await fetch(
    `${baseUrl}/api/requests/not-a-valid-uuid/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "IN_PROGRESS" }),
    },
  );

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Invalid request ID format.");
});
test("PATCH request with an unsupported status returns HTTP 400", async () => {
  const response = await fetch(
    `${baseUrl}/api/requests/00000000-0000-4000-8000-000000000001/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "NOT_A_STATUS" }),
    },
  );

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "VALIDATION_ERROR");
});

test("Malformed JSON request bodies return HTTP 400", async () => {
  const response = await fetch(`${baseUrl}/api/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"title":',
  });

  assert.equal(response.status, 400);

  const body = await response.json();

  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Invalid JSON request body.");
});

const missingRequestId = "00000000-0000-4000-8000-000000000002";

test("GET request with a valid but non-existent UUID returns HTTP 404", async () => {
  const response = await fetch(
    `${baseUrl}/api/requests/${missingRequestId}`,
  );

  assert.equal(response.status, 404);

  const body = await response.json();

  assert.equal(body.error.code, "REQUEST_NOT_FOUND");
  assert.equal(body.error.message, "Service request not found.");
});

test("PATCH request with a valid but non-existent UUID returns HTTP 404", async () => {
  const response = await fetch(
    `${baseUrl}/api/requests/${missingRequestId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "IN_PROGRESS" }),
    },
  );

  assert.equal(response.status, 404);

  const body = await response.json();

  assert.equal(body.error.code, "REQUEST_NOT_FOUND");
  assert.equal(body.error.message, "Service request not found.");
});
