# Day 07 – Daily Work Log

**Project:** VisionRoot Service Request Management System\
**Date:** 19 November 2026\
**Branch:** feat/day-07-full-stack-integration

## 1. Objectives

- Integrate the Next.js frontend with the Express backend API.
- Retrieve service requests from PostgreSQL through the backend.
- Connect the request creation form to the API.
- Display request data and summary information dynamically.
- Implement and verify loading, validation, and error feedback.
- Verify individual request retrieval through the API.

## 2. Work Completed

### 2.1 Frontend and Backend Integration

- Connected the frontend request service to the backend API.
- Configured the frontend API base URL through `NEXT_PUBLIC_API_URL`.
- Retrieved service requests using the GET requests endpoint.
- Replaced dashboard usage of static demonstration data with API data.
- Updated dashboard summary cards using the retrieved request collection.

### 2.2 Request Creation

- Connected the create request form to the backend POST endpoint.
- Implemented asynchronous form submission.
- Displayed a success message after successful creation.
- Updated the dashboard request list after successful submission.
- Reset the form after successful creation.

### 2.3 Validation and User Feedback

- Verified required-field validation.
- Verified browser validation when the description field was empty.
- Verified successful submission feedback.
- Verified loading and error states.
- Added and tested the Try Again functionality after backend recovery.

### 2.4 Request Retrieval and Filtering

- Verified retrieval of all requests through the API.
- Verified filtering by request status.
- Verified individual request retrieval using its ID.
- Confirmed that the dashboard displayed all four saved requests after backend recovery.

## 3. Main Files Created or Updated

### Frontend

- `frontend/.env.local` – Local frontend API configuration.
- `frontend/src/features/requests/components/dashboard.tsx`
- `frontend/src/features/requests/components/create-request-form.tsx`
- `frontend/src/features/requests/components/request-list.tsx`
- `frontend/src/features/requests/services/request-service.ts`
- `frontend/src/features/requests/types/request.ts`
- `frontend/src/features/requests/data/demo-requests.ts`

## 4. Testing and Verification

| Test | Result |
|---|---|
| Frontend API connection | Passed |
| Retrieve all requests | Passed |
| Dashboard summary display | Passed |
| Create a service request | Passed |
| PostgreSQL persistence verification | Passed |
| Status filtering | Passed |
| Required-field validation | Passed |
| Successful submission feedback | Passed |
| Backend connection error handling | Passed |
| Retry after backend recovery | Passed |
| Individual request API retrieval | Passed |
| Frontend lint | Passed |
| Frontend production build | Passed |
| Backend typecheck | Passed |
| Backend production build | Passed |

### Database Verification

Four service requests were retrieved through the GET `/api/requests` endpoint.

The newly created test request was also retrieved individually using GET `/api/requests/{id}`.

### Error Handling Verification

The backend process was temporarily stopped during testing.

The frontend displayed:

- Unable to load service requests
- Failed to fetch
- Try Again

After restarting the backend and selecting Try Again, the dashboard successfully loaded all four requests.

## 5. Evidence

Screenshots are stored in:

`evidence/Day-07/screenshots/`

Captured evidence screenshots:

1. `01-dashboard-api-requests.png` – Dashboard displaying requests retrieved from the API.
2. `02-successful-request-creation.png` – Successful request creation.
3. `03-required-field-validation.png` – Required-field validation feedback.
4. `04-get-all-requests-api.png` – API response showing saved requests.
5. `05-status-filtering.png` – Status filtering results.
6. `06-backend-error-state.png` – Backend connection error state.
7. `07-dashboard-after-retry.png` – Dashboard after successful retry.
8. `08-get-request-by-id.png` – Individual request API response.
9. `09-request-details-page.png` – Request Details page displaying a valid request.
10. `10-request-details-not-found.png` – Request Details page displaying the not-found error state.

All ten evidence screenshots have been captured and saved in the screenshots folder.

## 6. Request Details Page Implementation and Verification

Implemented the frontend Request Details page using the existing individual request retrieval API.

Verified functionality:

- Clicking a request title opens its individual details page.
- A valid request ID loads and displays the request information.
- An invalid request ID displays an appropriate not-found error message.
- The Try Again control is available in the error state.
- Back to Requests navigation returns to the dashboard.
- Request information, including title, ID, status, category, priority, description, and timestamps, is displayed.
- Mobile, tablet, and desktop layouts were visually checked.
- No unnecessary horizontal scrolling was observed.

## 7. Current Limitations

- Backend status update functionality has not been implemented.
- Status transition rules require confirmation from the supervisor before implementation.
- No status update behavior has been claimed or tested.

## 8. Next Steps

- Confirm status transition rules with the supervisor.
- Implement status updates only after the required transition rules are confirmed.
- Perform any additional integration checks requested by the supervisor.
- Review the final Day-07 changes and evidence.

## 9. Overall Status

**Status:** Frontend and backend integration, request creation, request listing, status filtering, individual request retrieval, validation, error handling, retry behavior, and the Request Details page have been implemented and verified for the tested workflows.

The Request Details page was tested with both valid and invalid request IDs. Responsive layouts were also visually checked on mobile, tablet, and desktop.

Backend status update functionality remains pending supervisor confirmation of status transition rules.
