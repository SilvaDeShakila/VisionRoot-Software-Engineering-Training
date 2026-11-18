# PostgreSQL Integration – Technical Notes

**Project:** VisionRoot Service Request Management System
**Day:** 06
**Date:** 18 November 2026
**Branch:** feat/day-06-postgresql-integration

## 1. Overview

Day 06 introduces PostgreSQL persistence into the VisionRoot Service Request Management System backend.

The previous backend implementation used a temporary in-memory repository. This implementation replaces that repository with a PostgreSQL-backed repository so that service request records remain available after the backend server restarts.

The existing Express.js and TypeScript API structure is retained.

## 2. Technology and Dependencies

- PostgreSQL 18 – Relational database.
- Node.js – Backend runtime.
- Express.js – HTTP API framework.
- TypeScript – Backend implementation language.
- `pg` – PostgreSQL client for Node.js.
- `@types/pg` – TypeScript definitions for PostgreSQL.
- `dotenv` – Environment variable loading.
- `zod` – Environment configuration validation.

## 3. Database Configuration

**Database name:** `visionroot_db`

**Local connection settings:**

| Variable | Purpose | Local example |
|---|---|---|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | visionroot_db |
| DB_USER | Database username | postgres |
| DB_PASSWORD | Local database password | Configured locally |

The actual database password is stored in `backend/.env` and is excluded from Git through the root `.gitignore` file.

The `backend/.env.example` file provides the configuration template without exposing actual credentials.

## 4. Database Schema

The database contains the `service_requests` table.

### 4.1 Table Structure

| Column | PostgreSQL type | Constraints / Default |
|---|---|---|
| id | UUID | Primary key |
| title | VARCHAR(150) | NOT NULL |
| description | TEXT | NOT NULL |
| category | VARCHAR(30) | NOT NULL, CHECK constraint |
| priority | VARCHAR(10) | NOT NULL, CHECK constraint |
| status | VARCHAR(20) | NOT NULL, default OPEN, CHECK constraint |
| created_at | TIMESTAMPTZ | NOT NULL, default CURRENT_TIMESTAMP |
| updated_at | TIMESTAMPTZ | NOT NULL, default CURRENT_TIMESTAMP |

### 4.2 Allowed Values

**Category**
- IT
- Facilities
- Other

**Priority**
- LOW
- MEDIUM
- HIGH

**Status**
- OPEN
- IN_PROGRESS
- RESOLVED
- CLOSED

The database CHECK constraints prevent values outside these allowed sets.

### 4.3 Indexes

Two indexes are created:

- `idx_service_requests_status` – Supports queries that filter requests by status.
- `idx_service_requests_created_at` – Supports queries that sort requests by creation time.

The schema is defined in `backend/database/schema.sql`.

## 5. Database Connection Architecture

The PostgreSQL connection is managed through a connection pool.

Implementation file:

`backend/src/config/database.ts`

The pool configuration uses the validated environment variables and includes:

- Maximum pool size of 10 connections.
- Idle connection timeout of 30 seconds.
- Connection timeout of 5 seconds.
- Error handling for unexpected idle-client errors.

A shared pool instance is used by the PostgreSQL repository.

## 6. Repository Implementation

Implementation file:

`backend/src/repositories/postgres-request.repository.ts`

The `PostgresRequestRepository` implements the existing `RequestRepository` interface.

Implemented operations:

| Method | Database operation |
|---|---|
| findAll() | Retrieves all requests ordered by creation date |
| findAll(status) | Retrieves requests matching a status |
| findById(id) | Retrieves a request using its UUID |
| create(request) | Inserts a new service request |
| update(request) | Updates an existing request |

### 6.1 Parameterized Queries

SQL queries use PostgreSQL parameter placeholders such as `$1`, `$2` and `$3`.

This keeps user-provided values separate from SQL query text and helps protect against SQL injection.

### 6.2 Data Mapping

Database columns use snake_case naming.

The repository maps database fields to the existing TypeScript model:

- `created_at` → `createdAt`
- `updated_at` → `updatedAt`

Database timestamps are converted to ISO 8601 strings before being returned through the API.

## 7. Server Startup and Shutdown

Implementation file:

`backend/src/server.ts`

During startup:

1. Environment configuration is loaded and validated.
2. A PostgreSQL connection is tested using `SELECT 1`.
3. The HTTP server starts only after a successful database connection.

During shutdown:

1. The HTTP server is closed.
2. The PostgreSQL connection pool is closed.
3. The process exits after cleanup.

## 8. API Integration

The request controller now uses `PostgresRequestRepository`.

The following existing API operations were verified:

| HTTP method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/requests` | Create a service request |
| GET | `/api/requests` | Retrieve all service requests |
| GET | `/api/requests?status=OPEN` | Filter requests by status |
| GET | `/api/requests/:id` | Retrieve a request by ID |
| GET | `/api/health` | Check basic API availability |

The existing request update repository method is implemented, but a dedicated status update API endpoint is not yet available.

## 9. Verification Results

The following checks were completed successfully:

- PostgreSQL connection established.
- Database schema and indexes created.
- Service request successfully inserted through the API.
- Request successfully retrieved through the API.
- Status filtering returned the expected record.
- Request retrieval by UUID returned the expected record.
- Direct SQL query confirmed that the record exists in PostgreSQL.
- The same record remained available after restarting the backend server.
- `npm run typecheck` completed successfully.
- `npm run build` completed successfully.
- Generated JavaScript files were verified in `backend/dist/`.
- Git ignore rules were checked to confirm that `.env` is excluded.

### 9.1 Test Record

| Field | Verified value |
|---|---|
| Title | PostgreSQL Integration Test |
| Category | IT |
| Priority | HIGH |
| Status | OPEN |
| Persistence | Verified after server restart |

## 10. Current Limitations

- Automated backend tests have not yet been established.
- A dedicated request status update API endpoint remains pending.
- Status transition rules require supervisor confirmation.
- Authentication and authorization requirements remain pending confirmation.
- A database migration framework has not been introduced.
- The health endpoint does not independently report database health.

## 11. Relevant Implementation Files

- `backend/database/schema.sql`
- `backend/src/config/env.ts`
- `backend/src/config/database.ts`
- `backend/src/repositories/postgres-request.repository.ts`
- `backend/src/controllers/request.controller.ts`
- `backend/src/server.ts`
- `backend/.env.example`

## 12. Conclusion

PostgreSQL integration has successfully replaced the temporary in-memory storage implementation for service request operations.

The backend can create, retrieve and filter service requests using PostgreSQL. Data persistence was verified after restarting the backend server.

TypeScript validation and production compilation also completed successfully.

The remaining work includes automated testing, the approved status update workflow and any additional requirements confirmed by the supervisor.
