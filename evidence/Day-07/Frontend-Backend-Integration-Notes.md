# Frontend–Backend Integration – Technical Notes

**Project:** VisionRoot Service Request Management System\
**Development Day:** Day 07\
**Date:** 19 November 2026

## 1. Overview

Day 07 focused on integrating the Next.js frontend with the Express backend API and retrieving and creating service requests using PostgreSQL persistence.

The frontend communicates with the backend through HTTP requests using the configured API base URL.

## 2. Technology and Configuration

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| API Communication | HTTP / JSON |
| Frontend API Configuration | NEXT_PUBLIC_API_URL |

Frontend local environment configuration:

`NEXT_PUBLIC_API_URL=http://localhost:5000/api`

The local `.env.local` file is excluded from Git.

## 3. Integration Architecture

The request data flow is:

1. The user interacts with the frontend.
2. The frontend request service sends an HTTP request.
3. The Express backend receives the request.
4. The backend service and repository handle the operation.
5. PostgreSQL stores or retrieves the request data.
6. The backend returns a JSON response.
7. The frontend updates the dashboard.

### 3.1 Request Creation Flow

The create request workflow uses:

`POST /api/requests`

Request body:

```json
{
  "title": "Valid Test",
  "description": "Testing whitespace validation",
  "category": "IT",
  "priority": "MEDIUM"
}
```

The backend creates a request with the initial status OPEN and returns the created request.

The frontend adds the returned request to the dashboard list after successful creation.

### 3.2 Retrieve All Requests

Endpoint:

`GET /api/requests`

The API returns a response using the following structure:

```json
{
  "data": [
    {
      "id": "request-id",
      "title": "Example Request",
      "description": "Example description",
      "category": "IT",
      "priority": "MEDIUM",
      "status": "OPEN",
      "createdAt": "2026-11-19T08:48:14.328Z",
      "updatedAt": "2026-11-19T08:48:14.328Z"
    }
  ]
}
```

The frontend uses the returned collection to display request records and calculate dashboard summary information.

### 3.3 Retrieve a Request by ID

Endpoint:

`GET /api/requests/{id}`

The endpoint returns an individual service request when the supplied ID exists.

This endpoint was verified through PowerShell.

### 3.4 Filter Requests by Status

Endpoint:

`GET /api/requests?status=OPEN`

The API supports filtering requests using the status query parameter.

The frontend also provides a local status filter for the loaded request collection.

## 4. Frontend Request Service

Implementation file:

`frontend/src/features/requests/services/request-service.ts`

The request service provides methods for:

- `getAll()` – Retrieve all service requests.
- `getById(id)` – Retrieve an individual request.
- `create(data)` – Create a service request.
- `updateStatus(id, status)` – Client-side API method for the planned status update endpoint.

**Note:** The backend status update route has not been implemented. The `updateStatus` client method does not indicate that status updates are currently operational.

## 5. Dashboard Integration

Implementation file:

`frontend/src/features/requests/components/dashboard.tsx`

The dashboard uses React state and `useEffect` to:

- Load requests from the backend.
- Display loading feedback.
- Store the retrieved request collection.
- Display API errors.
- Retry loading after a failure.
- Update the request collection after successful creation.

The summary cards use the loaded request collection.

## 6. Form Validation and Submission

Implementation file:

`frontend/src/features/requests/components/create-request-form.tsx`

The form supports:

- Controlled form inputs.
- Required-field validation.
- Asynchronous request submission.
- Submission loading state.
- Success feedback.
- Error feedback.
- Form reset after successful submission.

Browser required-field validation was verified by attempting to submit the form with missing values.

A successful request submission was also verified.

## 7. Error Handling and Recovery

The dashboard handles API loading failures and displays an error state.

Verified error-state messages:

- Unable to load service requests
- Failed to fetch
- Try Again

### Recovery Test

1. The backend Node.js process listening on port 5000 was identified.
2. The backend process was temporarily stopped.
3. The frontend displayed the API connection error.
4. The backend was restarted using `npm run dev`.
5. The Try Again button was selected.
6. The dashboard successfully retrieved and displayed all four requests.

## 8. Integration Verification Results

| Verification | Result |
|---|---|
| Backend health endpoint | Passed |
| Frontend API connection | Passed |
| Retrieve all requests | Passed |
| Create request | Passed |
| PostgreSQL persistence | Passed |
| Status query filtering | Passed |
| Frontend status filtering | Passed |
| Individual request retrieval | Passed |
| Required-field validation | Passed |
| Successful submission feedback | Passed |
| Backend connection error handling | Passed |
| Retry after backend recovery | Passed |

## 9. Verified Database Records

Four service requests were returned by `GET /api/requests`.

| Request Title | Category | Priority | Status |
|---|---|---|---|
| Screenshot Evidence Test | IT | MEDIUM | OPEN |
| Valid Test | IT | MEDIUM | OPEN |
| Internet Connection Test | IT | MEDIUM | OPEN |
| PostgreSQL Integration Test | IT | HIGH | OPEN |

The Valid Test record was also retrieved individually using its ID.

## 10. Request Details Page Implementation

A frontend Request Details page was implemented using the existing individual request retrieval endpoint.

**Route**

`/requests/[id]`

**Verified behavior**

- Selecting a request title from the dashboard opens its details page.
- A valid request ID retrieves and displays the corresponding service request.
- An invalid request ID displays the not-found error state.
- A Try Again control is available in the error state.
- Back to Requests navigation returns to the dashboard.
- The page displays the request title, ID, status, category, priority, description, creation timestamp, and last updated timestamp.

**Responsive verification**

- Mobile layout: Passed.
- Tablet layout: Passed.
- Desktop layout: Passed.
- Unnecessary horizontal scrolling: Not observed.

**Evidence**

- `09-request-details-page.png`
- `10-request-details-not-found.png`

## 11. Current Limitations

- Backend status update functionality has not been implemented.
- Status transition rules require confirmation from the supervisor.
- Status update behavior has not been tested because the transition requirements are not yet confirmed.

## 12. Relevant Implementation Files

**Frontend**

- `frontend/src/features/requests/components/dashboard.tsx`
- `frontend/src/features/requests/components/create-request-form.tsx`
- `frontend/src/features/requests/components/request-list.tsx`
- `frontend/src/features/requests/components/summary-cards.tsx`
- `frontend/src/features/requests/services/request-service.ts`
- `frontend/src/features/requests/types/request.ts`

**Backend**

- `backend/src/app.ts`
- `backend/src/server.ts`
- `backend/src/controllers/request.controller.ts`
- `backend/src/routes/request.routes.ts`
- `backend/src/services/request.service.ts`
- `backend/src/repositories/postgres-request.repository.ts`

## 13. Conclusion

The Day 07 frontend and backend integration connected the request dashboard and creation form to the PostgreSQL-backed API.

Request creation, request listing, status filtering, individual request retrieval, validation feedback, error handling, retry behavior, and the Request Details page were implemented and verified for the tested workflows.

The Request Details page was tested with valid and invalid request IDs. Navigation and responsive layouts were also checked across mobile, tablet, and desktop screen sizes.

Backend status update functionality remains pending confirmation of status transition rules from the supervisor.
