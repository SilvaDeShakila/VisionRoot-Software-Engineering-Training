# Day 08 – PostgreSQL Manual Integration Verification

**Project:** VisionRoot Service Request Management System
**Date:** 20 November 2026
**Branch:** main
**Verification Type:** Manual database-backed API integration testing

## 1. Objective

Verify that the backend API can create, retrieve, filter and update service requests using the configured PostgreSQL database, and confirm that the changes are persisted in the database.

This report records manual verification. These checks are separate from the 34 automated backend tests documented in `Automated-Test-Results.md`.

## 2. Environment

- Database: PostgreSQL 18.7
- Database name: `visionroot_db`
- Database table: `public.service_requests`
- Backend API: local Express application
- API port: `5000`
- Database connection: verified using PostgreSQL command-line tools

No database credentials are included in this report.

## 3. Initial Database Verification

The PostgreSQL service was running and the application database was accessible.

The `public.service_requests` table was inspected. Its columns, constraints and indexes were verified.

The table contained five existing service request records before the temporary verification record was created:

| Status | Initial record count |
|---|---:|
| OPEN | 4 |
| IN_PROGRESS | 1 |
| **Total** | **5** |

## 4. API Verification

The following API operations were manually tested.

| Test | Operation | Observed result |
|---|---|---|
| Backend health | `GET /api/health` | Successful health response |
| Retrieve all requests | `GET /api/requests` | Five existing records returned |
| Filter by status | `GET /api/requests?status=OPEN` | Four OPEN records returned |
| Retrieve individual request | `GET /api/requests/{id}` | Existing request retrieved successfully |
| Create request | `POST /api/requests` | Temporary request created successfully |
| Update request status | `PATCH /api/requests/{id}/status` | Status updated successfully |
| Retrieve updated request | `GET /api/requests/{id}` | Updated status returned |

## 5. Database Persistence Verification

A temporary request was created through the API.

**Temporary request ID:**

`08a3e1ed-c05c-42b7-a254-1c4413d220ab`

**Request data:**

- Title: Day 08 Database Verification Test
- Description: Verifying API request creation and PostgreSQL persistence.
- Category: IT
- Priority: MEDIUM

The API initially returned the created request with status `OPEN`.

A direct PostgreSQL query confirmed that the same record and its data were stored in `public.service_requests`.

The status was then changed through the API from `OPEN` to `IN_PROGRESS`.

A subsequent direct database query confirmed:

- The stored status was `IN_PROGRESS`.
- The `updated_at` timestamp had advanced.
- The original `created_at` timestamp remained unchanged.

The request was also retrieved through the API after the update, and the updated status was returned.

## 6. Test Data Cleanup

After verification, the temporary record was deleted using its exact ID and test title.

The database returned `DELETE 1`.

A final database query confirmed:

| Verification | Result |
|---|---:|
| Total records after cleanup | 5 |
| OPEN records | 4 |
| IN_PROGRESS records | 1 |
| Temporary test record remaining | 0 |

The original five database records remained. The temporary verification record was removed.

## 7. Verification Outcome

**Result:** All listed manual API and PostgreSQL persistence checks passed.

The verification demonstrates that the running backend API can communicate with PostgreSQL for the tested create, retrieve, filter and status update operations.

## 8. Scope and Limitations

These checks were performed manually against the local development database.

They do not constitute:

- Automated PostgreSQL integration tests using an isolated test database.
- Automated browser end-to-end tests.
- Automated frontend-to-backend workflow tests.
- Verification of every possible database failure scenario.
- Confirmation of business-level status transition rules.

The existing automated test results remain separately documented in `Automated-Test-Results.md`.

The API health endpoint confirms that the API is running; it should not be interpreted as an independent database health check.

## 9. Conclusion

The manual verification confirmed successful database-backed request creation, retrieval, status filtering and status updating through the backend API.

Direct PostgreSQL queries confirmed persistence of the created and updated data. The temporary test record was removed, and the database returned to its original five-record state.
