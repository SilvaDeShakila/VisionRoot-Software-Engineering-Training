# Day 08 – Daily Work Log

**Project:** VisionRoot Service Request Management System
**Date:** 20 November 2026
**Branch:** main

## 1. Objectives

- Introduce automated backend unit, validation and HTTP API integration tests.
- Verify request service operations using an isolated in-memory repository.
- Verify request validation schemas and supported input values.
- Verify selected HTTP API responses, route handling and invalid request handling.
- Run backend type checking and production build verification.
- Record testing limitations and outstanding quality activities.

## 2. Work Completed

### 2.1 Backend Service Unit Tests

Created automated tests for the request service using an in-memory repository.

The tests cover:

- Retrieving all service requests.
- Filtering requests by status.
- Retrieving a request by its ID.
- Handling unknown request IDs.
- Creating a request with an automatically generated ID and OPEN status.
- Updating an existing request.
- Updating the status of an existing request.
- Handling status updates for unknown requests.
- Verifying that created requests are persisted in the repository.
- Verifying that updates to unknown requests return null.

**Result:** 10/10 tests passed.

### 2.2 Backend Validation Tests

Created automated tests for the request validation schemas.

The tests cover:

- Valid and invalid UUID values.
- All supported request statuses.
- Rejection of unsupported status values.
- Valid request creation data.
- Trimming whitespace from titles and descriptions.
- Empty and oversized titles.
- Accepting a title at the maximum length of 150 characters.
- Empty and oversized descriptions.
- Accepting a description at the maximum length of 5000 characters.
- Unsupported category and priority values.
- Valid and invalid status update payloads.

**Result:** 15/15 tests passed.

### 2.3 HTTP API Integration Tests

Added HTTP-level tests in `backend/tests/request.api.test.ts`.

The tests start the Express application on a temporary local port and exercise selected HTTP routes without starting the production server.

The tests cover:

- Successful API root response.
- Successful health endpoint response.
- Unknown API route handling with HTTP 404.
- Invalid request UUID handling with HTTP 400.
- Unsupported status query handling with HTTP 400.
- Invalid request creation body handling with HTTP 400.
- Invalid UUID in a PATCH status-update route with HTTP 400.
- Unsupported status update body handling with HTTP 400.
- Malformed JSON request body handling with HTTP 400.

**Result:** 9/9 tests passed.

These automated tests verify HTTP routing and error responses. Successful database-backed create, read, filtering and status-update operations were verified separately through manual PostgreSQL API testing, documented in the manual integration verification report.

### 2.4 Test Script Configuration

Updated `backend/package.json` with a test script that runs the service, validation and API test files.

The project uses the existing `tsx` installation and Node.js built-in test runner. No additional test framework dependency was installed.


### 2.5 Test Execution Evidence

Executed the backend test suite and saved the terminal output to:

- `evidence/Day-08/test-output.txt`

### 2.6 Manual PostgreSQL Database-Backed API Verification

Performed manual integration verification using the running backend API and the configured PostgreSQL database.

The following operations were verified:

- Retrieved all existing service requests through the API.
- Filtered service requests by status.
- Retrieved an individual request by its ID.
- Created a temporary service request through the POST endpoint.
- Confirmed that the created request was persisted in PostgreSQL.
- Updated the request status through the PATCH endpoint.
- Confirmed the updated status and timestamp values directly in PostgreSQL.
- Retrieved the updated request through the API.
- Deleted the temporary test record and verified that the original database record count was restored.

**Result:** All listed manual verification operations completed successfully. The temporary test record was removed after verification.

**Evidence:** `evidence/Day-08/PostgreSQL-Manual-Integration-Verification.md`

## 3. Main Files Created or Updated

### Backend

- `backend/package.json` – Added the automated test script.
- `backend/tests/request.service.test.ts` – Request service unit tests.
- `backend/tests/request.validator.test.ts` – Request validation tests.
- `backend/tests/request.api.test.ts` – HTTP API integration tests.

### Evidence

- `evidence/Day-08/test-output.txt` – Recorded automated test execution output.
- `evidence/Day-08/Automated-Test-Results.md` – Test cases and results.
- `evidence/Day-08/bug-log.md` – Defect review and outstanding regression-testing notes.
- `evidence/Day-08/PostgreSQL-Manual-Integration-Verification.md` – Manual database-backed API verification evidence.

## 4. Testing and Verification

| Verification | Result |
|---|---|
| Request service unit tests | Passed – 10/10 |
| Request validation tests | Passed – 15/15 |
| HTTP API integration tests | Passed – 9/9 |
| Manual PostgreSQL-backed API verification | Passed – create, retrieve, filter, status update, persistence and cleanup |
| Total automated tests | Passed – 34/34 |
| Backend TypeScript typecheck | Passed |
| Backend production build | Passed |
| Frontend ESLint | Passed |
| Frontend production build | Passed |
| Frontend TypeScript validation during build | Passed |

### Automated Test Summary

- Total tests: 34
- Passed: 34
- Failed: 0
- Cancelled: 0
- Skipped: 0

### Verification Commands

Backend:

- `npm test`
- `npm run typecheck`
- `npm run build`

Frontend:

- `npm run lint`
- `npm run build`

The backend commands were executed during the Day 08 verification session. The frontend checks had also completed successfully in the recorded Day 08 verification work.

## 5. Testing Limitations

The following testing activities have not yet been completed:

- Automated PostgreSQL integration tests using an isolated test database.
- Browser end-to-end tests.
- Automated verification of complete frontend-to-backend workflows.
- A regression test linked to a confirmed and fixed software defect.

The service unit tests use an in-memory repository. They do not connect to or modify the actual PostgreSQL database.

The automated HTTP API tests verify selected routes and invalid-input/error responses. Successful database-backed API workflows were verified manually; automated PostgreSQL integration tests using an isolated test database remain outstanding.

The existing request status validation tests verify supported status values. They do not establish business-level status transition rules.

## 6. Next Steps

- Review the test coverage against the remaining project requirements.
- Implement automated PostgreSQL integration tests using an isolated test database.
- Perform browser end-to-end verification where required.
- Identify and reproduce a genuine defect if one is observed.
- Add a regression test if a defect is fixed.
- Obtain supervisor confirmation of permitted status transitions.
- Implement confirmed business rules only after approval.

## 7. Overall Status

**Status:** Backend service unit tests, request validation tests and selected HTTP API integration tests have been implemented and successfully executed. All 34 automated tests passed.

Backend type checking and production build verification passed. Frontend linting and production build verification also passed.

Manual PostgreSQL database-backed API verification was completed successfully and documented. Automated PostgreSQL integration tests using an isolated test database, browser end-to-end testing and a regression test linked to a confirmed fixed defect remain outstanding. Business-level status transition rules remain subject to supervisor confirmation.





## 8. Final Re-verification – 23 November 2026

A final verification session was performed on 23 November 2026.

The following checks were executed successfully:

**Backend**
- `npm test` – 34/34 tests passed.
- `npm run typecheck` – Passed.
- `npm run build` – Passed.

**Frontend**
- `npm run lint` – Passed.
- `npx tsc --noEmit` – Passed.
- `npm run build` – Passed.

The final backend test output was saved to `evidence/Day-08/test-output.txt`.

The original Day 08 implementation and work date remain 20 November 2026. This section records subsequent verification only.

## 9. Additional API Not-Found Coverage - 23 November 2026

Additional API integration coverage was implemented and verified using a separate PostgreSQL database named `visionroot_test_db`.

Work completed:

- Created the isolated PostgreSQL test database.
- Applied the project database schema to the test database.
- Added a GET API test for a valid but non-existent request UUID.
- Added a PATCH API test for a valid but non-existent request UUID.
- Verified both endpoints return HTTP 404 with the expected `REQUEST_NOT_FOUND` error response.
- Executed the complete backend test suite using the isolated test database.
- Updated `evidence/Day-08/test-output.txt` with the latest test output.

Latest verification:

- API tests: 11 passed.
- Service tests: 10 passed.
- Validation tests: 15 passed.
- Total: 36 passed, 0 failed.
- Exit code: 0.

The `DB_NAME` environment variable was restored after the test run. The additional tests improve database-backed API not-found coverage, while a complete automated database integration test suite remains outside the verified scope.