# API Contract

## 1. Overview

This document defines the proposed REST API contract for the Service Request Management System.

The backend will be developed using Express.js and TypeScript. The API will communicate with the frontend through HTTP requests and JSON responses.

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
| created_at | string | Creation timestamp in ISO 8601 format |
| updated_at | string | Latest update timestamp in ISO 8601 format |

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
  "created_at": "2026-11-16T10:30:00Z",
  "updated_at": "2026-11-16T10:30:00Z"
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
      "created_at": "2026-11-16T10:30:00Z",
      "updated_at": "2026-11-16T10:30:00Z"
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
  "created_at": "2026-11-16T10:30:00Z",
  "updated_at": "2026-11-16T10:30:00Z"
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | Request details retrieved successfully |
| 400 Bad Request | Invalid UUID format |
| 404 Not Found | Service request does not exist |
| 500 Internal Server Error | Unexpected server error |

### 3.4 Update Service Request Status

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
  "created_at": "2026-11-16T10:30:00Z",
  "updated_at": "2026-11-16T11:00:00Z"
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

**Purpose:** Check whether the backend application and its required dependencies are operating correctly.

**Proposed Health Criteria:**

- The backend application is running.
- The required database connection is available.

**Successful Response:**

Status: `200 OK`

```json
{
  "status": "healthy",
  "message": "Service is operating normally."
}
```

**Expected Status Codes:**

| Status Code | Meaning |
|---|---|
| 200 OK | Documented health criteria are satisfied |
| 503 Service Unavailable | A required dependency is unavailable |
| 500 Internal Server Error | Unexpected health-check error |

The exact health-check implementation will be confirmed during backend development.

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

The following items must be reviewed before implementation:

1. Whether authentication is included in the MVP.
2. Whether role-based authorization is required.
3. The exact allowed status transition workflow.
4. Whether additional request fields are required.
5. Confirmation of title and description length limits.
6. Whether pagination or sorting is required for the request list.
7. The final health-check criteria.

The response structures, error format and additional HTTP status-code choices in this document are proposed API design decisions and may be adjusted after supervisor review.

## 7. Summary

This document defines the proposed REST API contract for the Service Request Management System.

It covers request creation, request listing and filtering, request details, status updates and backend health checking.

The contract provides example JSON payloads, expected HTTP status codes, validation responsibilities and a consistent error response structure.

Unconfirmed requirements are documented separately so they can be reviewed before implementation.