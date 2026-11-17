# Day 05 – Backend Architecture Notes

**Project:** VisionRoot Service Request Management System
**Backend Stack:** Node.js, Express.js, TypeScript
**Branch:** feat/day-05-backend-api

## 1. Architecture Overview

The backend follows a layered architecture to separate HTTP request handling, business logic and data access responsibilities.

The main request processing flow is:

Client → Express Routes → Middleware → Controller → Service → Repository → Data Storage

This structure improves maintainability and allows the data storage implementation to be replaced without significantly changing the service and controller layers.

## 2. Project Structure

The backend source code is organized into the following directories:

| Directory | Responsibility |
|---|---|
| `config/` | Environment configuration and validation |
| `controllers/` | Handles HTTP requests and responses |
| `middlewares/` | Request validation and centralized error handling |
| `repositories/` | Defines data access interfaces and implementations |
| `routes/` | Registers API endpoints |
| `services/` | Contains application and business logic |
| `types/` | Defines shared TypeScript types and interfaces |
| `validators/` | Defines request validation schemas using Zod |

Important entry-point files:

- `src/app.ts` – Configures the Express application and middleware.
- `src/server.ts` – Starts the HTTP server and handles graceful shutdown.
- `src/config/env.ts` – Loads and validates environment variables.

## 3. Request Processing Flow

A typical API request follows these stages:

1. The client sends an HTTP request to the Express application.
2. Express matches the request with a registered route.
3. Applicable middleware validates the request data.
4. The controller handles the HTTP request and calls the service layer.
5. The service performs the application logic.
6. The repository handles the data access operation.
7. The controller sends the appropriate HTTP response.

The repository currently uses temporary in-memory storage.

## 4. Repository Pattern

A repository interface is used to separate data access from business logic.

The `RequestRepository` interface defines the following operations:

- `findAll()` – Retrieves service requests, optionally filtered by status.
- `findById()` – Retrieves a request using its ID.
- `create()` – Stores a new request.
- `update()` – Updates an existing request record.

The current implementation is `InMemoryRequestRepository`.

This implementation is temporary. PostgreSQL integration is planned for a later development stage.

## 5. Service Layer

The `RequestService` contains the main service request operations.

Its current responsibilities include:

- Retrieving all service requests.
- Retrieving a service request by ID.
- Creating service requests.
- Preparing updated request records with server-generated timestamps.

New requests receive a generated UUID, an initial `OPEN` status, and server-generated creation and update timestamps.

## 6. Validation and Error Handling

Zod is used to validate incoming request data.

Current validation covers:

- Required request title and description.
- Title and description length limits.
- Allowed request categories.
- Allowed priority values.
- Request status query parameters.
- UUID format for request IDs.

The validation middleware returns HTTP 400 responses when request body validation fails.

The application also includes centralized error handling for malformed JSON and unexpected errors.

Unknown API routes return HTTP 404 with a consistent JSON error response.

## 7. Implemented API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks basic API availability |
| POST | `/api/requests` | Creates a service request |
| GET | `/api/requests` | Retrieves all service requests |
| GET | `/api/requests?status=OPEN` | Filters requests by status |
| GET | `/api/requests/:id` | Retrieves a request by ID |

The request status update endpoint has not yet been implemented.

## 8. Environment and Application Configuration

Environment variables are loaded using `dotenv` and validated using Zod.

The `.env.example` file documents the required configuration variables:

- `PORT` – Backend server port.
- `NODE_ENV` – Application environment.
- `FRONTEND_URL` – Allowed frontend origin for CORS.

The Express application also includes:

- JSON request body parsing with a 1 MB size limit.
- CORS configuration.
- A centralized error-handling middleware.
- A JSON response for unknown routes.

## 9. Current Data Storage

The current backend uses an in-memory repository.

Advantages of this temporary implementation:

- Allows API development before database integration.
- Supports initial endpoint verification.
- Keeps the repository interface independent of the storage technology.

Limitations:

- Data is lost when the server restarts.
- Data is not shared across separate server instances.
- It is not suitable for persistent production storage.

PostgreSQL integration is planned for Day 06.

## 10. Design Decisions

- TypeScript strict mode is enabled to improve type safety.
- Controllers and services have separate responsibilities.
- Repository abstraction separates business logic from storage.
- Zod provides runtime validation for incoming data.
- UUIDs are used as service request identifiers.
- Timestamps are generated by the backend.
- A centralized error middleware provides consistent error responses.

## 11. Pending Improvements

The following items remain for future development:

- PostgreSQL database integration.
- Implementation of the request status update endpoint.
- Confirmation and implementation of approved status transition rules.
- Confirmation of authentication and authorization requirements.
- Automated backend tests.
- Database connectivity checks in the health endpoint.
- Confirmation of proposed validation limits with the supervisor.

## 12. Summary

The Day 05 backend establishes an Express.js and TypeScript foundation using a layered architecture.

Request creation, listing, status filtering and retrieval are implemented. Request validation, centralized error handling and a basic health endpoint are also available.

The repository abstraction provides a foundation for replacing temporary in-memory storage with PostgreSQL in the next development stage.
