# API Contract

## 1. Overview

This document describes the REST API contract for the Service Request Management System, including implemented endpoints and endpoints pending implementation.

The backend is implemented using Express.js and TypeScript. The API exposes HTTP endpoints that exchange JSON data. PostgreSQL is used for persistent service request storage.

### 1.1 Base Path

All application API endpoints will use the following base path:

`/api`

### 1.2 General Conventions

- Request and response bodies use JSON.
- The `Content-Type` header must be `application/json` when sending JSON request bodies.
- Service request identifiers use UUID values.
- The backend is responsible for validating client input.
- Business rules and status transition validation belong in the service layer.
- Database operations belong in the repository layer.
- Responses must use appropriate HTTP status codes.
- Error responses must follow a consistent structure.

Authentication and authorization requirements remain pending confirmation.

## 2. Service Request Data Structure

The API will use the following fields to represent a service request.

| Field | Type | Description |
|---|---|---|
| id | UUID | Unique service request identifier |
| title | string | Request title |
| description | string | Request description |
| category | string | IT, Facilities or Other |
| priority | string | LOW, MEDIUM or HIGH |
| status | string | OPEN, IN_PROGRESS, RESOLVED or CLOSED |
| createdAt | string | Creation timestamp in ISO 8601 format |
| updatedAt | string | Latest update timestamp in ISO 8601 format |

The server/database will generate the identifier, initial status and timestamps when a request is created.

Clients must not directly control these server-managed fields.

## 3. API Endpoints

### 3.1 Create Service Request

**Endpoint:** `POST /api/requests`

**Purpose:** Create a new service request.

**Request Body:**

```json
{
  "title": "Laptop is not working",
  "description": "The laptop does not start when I press the power button.",
  "category": "IT",
  "priority": "HIGH"
}
```

**Successful Response:**

Status: `201 Created`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Laptop is not working",
  "description": "The laptop does not start when I press the power button.",
  "category": "IT",
  "priority": "HIGH",
  "status": "OPEN",
  "createdAt": "2026-11-16T10:30:00Z",
  "updatedAt": "2026-11-16T10:30:00Z"
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 201 Created | Service request created successfully |
| 400 Bad Request | Request body contains missing or invalid fields |
| 500 Internal Server Error | Unexpected server error |

### 3.2 List Service Requests

**Endpoint:** `GET /api/requests`

**Purpose:** Retrieve service requests and optionally filter them by status.

**Optional Query Parameter:**

`status`

Example:

`GET /api/requests?status=OPEN`

**Successful Response:**

Status: `200 OK`

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Laptop is not working",
      "description": "The laptop does not start when I press the power button.",
      "category": "IT",
      "priority": "HIGH",
      "status": "OPEN",
      "createdAt": "2026-11-16T10:30:00Z",
      "updatedAt": "2026-11-16T10:30:00Z"
    }
  ]
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | Requests retrieved successfully |
| 400 Bad Request | Invalid status filter |
| 500 Internal Server Error | Unexpected server error |

If no matching requests exist, the API should return `200 OK` with an empty data array.

### 3.3 Get Service Request Details

**Endpoint:** `GET /api/requests/{id}`

**Purpose:** Retrieve the details of a specific service request using its UUID.

**Example:**

`GET /api/requests/550e8400-e29b-41d4-a716-446655440000`

**Successful Response:**

Status: `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Laptop is not working",
  "description": "The laptop does not start when I press the power button.",
  "category": "IT",
  "priority": "HIGH",
  "status": "OPEN",
  "createdAt": "2026-11-16T10:30:00Z",
  "updatedAt": "2026-11-16T10:30:00Z"
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | Request details retrieved successfully |
| 400 Bad Request | Invalid UUID format |
| 404 Not Found | Service request does not exist |
| 500 Internal Server Error | Unexpected server error |

### 3.4 Update Service Request Status (Pending Implementation)

**Endpoint:** `PATCH /api/requests/{id}/status`

**Purpose:** Update the status of an existing service request.

**Request Body:**

```json
{
  "status": "IN_PROGRESS"
}
```

The example demonstrates the request format only. Whether this particular transition is allowed must be confirmed against the workflow agreed with the supervisor.

**Successful Response:**

Status: `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Laptop is not working",
  "description": "The laptop does not start when I press the power button.",
  "category": "IT",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "createdAt": "2026-11-16T10:30:00Z",
  "updatedAt": "2026-11-16T11:00:00Z"
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | Status updated successfully |
| 400 Bad Request | Invalid status value or request body |
| 404 Not Found | Service request does not exist |
| 409 Conflict | Requested status transition is not allowed |
| 500 Internal Server Error | Unexpected server error |

The backend service layer must validate status transitions according to the workflow confirmed by the supervisor.

The exact transition rules are not defined in this document because they remain pending confirmation.

### 3.5 Health Check

**Endpoint:** `GET /api/health`

**Purpose:** Check whether the backend API process is running.

**Currently Implemented Health Check:**

- Confirms that the backend API process responds to the health endpoint.
- Returns the current server timestamp.
- Does not currently check PostgreSQL or other external dependencies.

**Successful Response:**

Status: `200 OK`

```json
{
  "status": "healthy",
  "message": "VisionRoot API is running.",
  "timestamp": "2026-11-17T13:38:17.489Z"
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | The API process responds successfully |
| 500 Internal Server Error | Unexpected server error |

The backend verifies the PostgreSQL connection during startup before accepting requests. However, the health endpoint does not currently report database readiness or dependency health. An enhanced health check remains a possible future improvement.

## 4. Standard Error Response

All API errors should follow a consistent JSON structure.

**Proposed Error Format:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "details": [
      {
        "field": "title",
        "message": "Title is required."
      }
    ]
  }
}
```

The `details` field is optional and can provide additional information about validation failures.

### 4.1 Proposed Error Codes

| Error Code | Meaning |
|---|---|
| VALIDATION_ERROR | One or more input fields are invalid |
| INVALID_STATUS | Supplied status value is not supported |
| INVALID_STATUS_TRANSITION | Requested status transition is not allowed |
| REQUEST_NOT_FOUND | Requested service request does not exist |
| INTERNAL_SERVER_ERROR | Unexpected server-side error |
| SERVICE_UNAVAILABLE | A required service or dependency is unavailable |
| ROUTE_NOT_FOUND | The requested API endpoint does not exist |

The backend must not expose database credentials, internal stack traces or other sensitive implementation details in error responses.

## 5. Validation Responsibilities

### 5.1 Request Validation

The backend must validate:

- Required title and description fields.
- Title and description length limits after confirmation.
- Supported category values.
- Supported priority values.
- Supported status values.
- UUID format for request identifiers.
- Allowed status transitions.

### 5.2 Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Routes | Define API paths and HTTP methods |
| Controllers | Handle HTTP requests, validate/map input and return responses |
| Services | Apply business rules and validate status transitions |
| Repositories | Perform database queries and persistence operations |
| Database | Enforce schema constraints and maintain persistent records |

## 6. Assumptions and Pending Confirmations

The following items remain pending confirmation and may affect future implementation:

1. Whether authentication is included in the MVP.
2. Whether role-based authorization is required.
3. The exact allowed status transition workflow.
4. Whether additional request fields are required.
5. Confirmation of title and description length limits.
6. Whether pagination or sorting is required for the request list.
7. The final health-check criteria.

Implemented behavior is identified in Section 8. Proposed and pending functionality remains subject to supervisor review.

## 7. Summary

This document describes the REST API contract for the Service Request Management System, including implemented endpoints and endpoints pending implementation.

It covers implemented request creation, request listing and filtering, request details, the proposed status-update endpoint and the currently implemented basic health check.

The contract provides example JSON payloads, expected HTTP status codes, validation responsibilities and a consistent error response structure.

Unconfirmed requirements are documented separately for supervisor review and future implementation planning.

## 8. Implementation Status and Pending Clarifications

### 8.1 Implemented Backend Functionality

The following backend functionality has been implemented and manually tested:

- Create service requests.
- Retrieve all service requests.
- Filter service requests by supported status values.
- Retrieve a service request using its UUID.
- Validate request input and status query parameters.
- Return consistent JSON responses for application errors.
- Handle unknown API routes with a standard 404 response.
- Handle unexpected application errors through global error middleware.
- Provide a basic application health endpoint.

**Current persistence implementation:**

The backend now uses a PostgreSQL-backed repository for service request persistence.

The PostgreSQL integration has been manually verified through:

- Successful database connection during backend startup.
- Service request creation and retrieval through the API.
- Filtering service requests by status.
- Direct database verification.
- Successful retrieval of existing records after restarting the backend server.

Database connection settings are managed through environment variables. Actual database credentials remain in the local `backend/.env` file and are excluded from Git.

### 8.2 Pending Supervisor Clarifications

| Item | Current Status | Required Action |
|---|---|---|
| Authentication | Pending | Confirm whether authentication is required |
| Authorization | Pending | Confirm whether role-based permissions are required |
| Status transitions | Pending | Obtain the approved status transition workflow |
| Additional request fields | Pending | Confirm whether additional fields are required |
| Title and description limits | Pending | Confirm final validation limits |
| Pagination and sorting | Pending | Confirm request-list requirements |
| Health-check criteria | Pending | Confirm required dependency checks |

### 8.3 Status Transition Implementation Note

The supported request statuses are:

- OPEN
- IN_PROGRESS
- RESOLVED
- CLOSED

The permitted transitions between these statuses have not yet been confirmed by the supervisor.

Status transition business logic must not be finalized using assumed workflow rules. Implementation of transition validation will remain pending until the approved workflow is received.

The API contract and implementation must be updated after supervisor confirmation.

### 8.4 Implementation and Documentation Alignment

The documented request timestamp fields use the camelCase names returned by the current backend: `createdAt` and `updatedAt`.

The health-check response documents the currently implemented `status`, `message` and `timestamp` fields. It does not claim to verify database availability.

The status-update endpoint remains a proposed endpoint and has not yet been implemented. Its transition rules require supervisor confirmation.

The API contract must be updated whenever implementation behavior or approved requirements change.
