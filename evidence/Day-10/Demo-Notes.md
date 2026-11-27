# Day 10 – Final Project Demonstration Notes

**Project:** VisionRoot Service Request Management System
**Target Duration:** 5–10 minutes

## 1. Introduction (30–60 seconds)

Introduce the project as a service request management application designed to allow users to submit, view, and track internal service requests.

Briefly introduce the architecture:

- Next.js frontend
- Express backend API
- PostgreSQL database

## 2. Dashboard Overview (1 minute)

Open the application at:

http://localhost:3001 (local production-mode demonstration)

Demonstrate:

- Dashboard overview.
- Total request count.
- Open, In Progress, and Resolved summary cards.
- Recent requests table.

Explain that dashboard data is retrieved from the backend API.

## 3. Request Filtering (1 minute)

Demonstrate the status dropdown.

Show:
- All statuses
- Open
- In Progress
- Resolved

Explain how the list filters requests based on their current status.

## 4. Request Details (1 minute)

Open an existing request.

Demonstrate:
- Request ID
- Title and description
- Category and priority
- Current status
- Created and updated timestamps

## 5. Status Update (1 minute)

Select a different status and click Update Status.

Demonstrate:
- Updated status badge.
- Success message.
- Updated timestamp.

Explain that the frontend sends the update to the backend API.

## 6. Create a New Request (1–2 minutes)

Navigate to Create Request.

Demonstrate:
- Entering a title.
- Entering a description.
- Selecting a category.
- Selecting a priority.
- Submitting the request.

Show the success message and the newly created request in the dashboard.

## 7. Technical Verification (1 minute)

Briefly explain the completed technical checks:

- Backend automated tests: 34/34 passed.
- PostgreSQL integration test: 1/1 passed.
- Backend typecheck and production build passed.
- Frontend ESLint passed with 0 errors and 0 warnings.
- Frontend TypeScript checks and production build passed.
- Frontend automated tests: 16/16 passed.
- PostgreSQL connection verified.
- API create, retrieve, filter, and update operations verified.
- Browser-based request workflows verified.

## 8. Limitations and Conclusion (30–60 seconds)

Mention the current project limitations honestly:

- No public production deployment.
- Authentication and authorization are not confirmed.
- Frontend automated tests are available using Vitest and React Testing Library; all 16 tests passed.
- Additional security verification remains.

Conclude by summarizing the completed request management workflows and the successful local verification.

## Demonstration Checklist

- [ ] Dashboard loads successfully.
- [ ] Request summary cards are visible.
- [ ] Status filtering works.
- [ ] Request details page opens.
- [ ] Status update works.
- [ ] New request creation works.
- [ ] Newly created request appears in the dashboard.
- [ ] Technical verification results are explained.
- [ ] Known limitations are acknowledged.
