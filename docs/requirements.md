# Service Request Management System
## Day 01 - Requirements and SDLC

## 1. Problem Statement

Many organizations receive internal service requests related to IT support, facilities, and other operational issues. When these requests are handled through informal communication methods such as emails, phone calls, or verbal discussions, it can become difficult to organize, monitor, prioritize, and track their progress.

The Service Request Management System aims to provide a centralized web-based platform where employees can submit service requests and authorized service personnel can manage and update them.

The system will allow users to create service requests with relevant details, view submitted requests, monitor their current status, and track progress.

The main goal is to improve request organization, transparency, accountability, and operational efficiency through a maintainable full-stack web application.

## 2. Project Objectives

- Provide a centralized service request management platform.
- Allow employees to submit service requests.
- Enable service personnel to manage requests.
- Track request progress through defined statuses.
- Store request information persistently.
- Ensure data validation and consistent error handling.
- Apply maintainable software architecture principles.

## 3. Identified Users

### 3.1 Employee / Requester

- Submit new service requests.
- View submitted requests.
- Track request status and progress.

### 3.2 Service Staff / Administrator

- View submitted service requests.
- Review request details.
- Update request statuses.
- Monitor requests according to their status.

Note: Authentication and authorization requirements must be confirmed with the supervisor before implementation.

## 4. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Create a service request. | High |
| FR-02 | View all service requests. | High |
| FR-03 | Filter requests by status. | High |
| FR-04 | View individual request details. | High |
| FR-05 | Update request status. | High |
| FR-06 | Validate request information on the server. | High |
| FR-07 | Reject invalid status transitions. | High |
| FR-08 | Persist request data in PostgreSQL. | High |
| FR-09 | Provide a backend health endpoint. | High |

## 5. Non-Functional Requirements

### Usability
The application should provide a simple and understandable user interface.

### Performance
The application should respond to user operations within reasonable time.

### Security
The system must validate input on the server and protect sensitive configuration.

### Maintainability
The codebase should follow separation of concerns and clear module boundaries.

### Reliability
The application should handle errors consistently without exposing internal details.

### Responsiveness
The frontend should support desktop and mobile screen sizes.

### Data Integrity
Database constraints and validation should protect stored information.

## 6. User Stories and Acceptance Criteria

### US-01: Create a Service Request

As an employee, I want to submit a service request so that I can report an issue and receive assistance.

Acceptance Criteria:
- The user can enter a title and description.
- The user can select a category.
- The user can select a priority.
- Required fields cannot be empty.
- Whitespace-only values are rejected.
- Valid requests are saved with OPEN status.
- The system confirms successful creation.

### US-02: View All Service Requests

As a service staff member, I want to view all service requests so that I can monitor and manage them.

Acceptance Criteria:
- The system displays available requests.
- Each request displays its title, category, priority and status.
- Creation dates are displayed.
- An appropriate empty state appears when no requests exist.
- Loading errors are handled appropriately.

### US-03: Filter Requests by Status

As a service staff member, I want to filter requests by status so that I can find requests requiring attention.

Acceptance Criteria:
- The user can select a status filter.
- Only matching requests are displayed.
- The user can return to the complete list.
- An appropriate message appears when no matching records exist.

### US-04: View Request Details

As a user, I want to view individual request details so that I can understand the reported issue and its progress.

Acceptance Criteria:
- The user can select a request.
- Complete request information is displayed.
- Current status and priority are visible.
- Missing records return HTTP 404.

### US-05: Update Request Status

As a service staff member, I want to update a request status so that I can communicate its progress.

Acceptance Criteria:
- Authorized staff can update request statuses.
- The system supports the agreed status workflow.
- Invalid status transitions are rejected.
- Valid changes are saved.
- The updated status is returned in the response.

### US-06: Validate Request Information

As a user, I want the system to validate submitted information so that incomplete or invalid requests are rejected.

Acceptance Criteria:
- Title and description are required.
- Whitespace-only values are rejected.
- Maximum and minimum length rules are enforced.
- Category and priority must contain supported values.
- Server-side validation is mandatory.
- Invalid input returns a consistent error response.

### US-07: Handle Missing Requests and Errors

As a user, I want clear error responses so that I can understand when an operation fails.

Acceptance Criteria:
- Missing records return HTTP 404.
- Invalid input returns HTTP 400.
- Unexpected server errors return HTTP 500.
- Error responses follow a consistent structure.
- Internal stack traces and sensitive information are not exposed.

### US-08: Check Application Health

As a developer or system operator, I want a health endpoint so that I can verify backend availability.

Acceptance Criteria:
- The backend provides GET /api/health.
- HTTP 200 is returned when documented health criteria pass.
- The response provides a clear health status.
- Sensitive configuration is never exposed.

## 7. Product Backlog

| ID | Backlog Item | Priority | Scope |
|---|---|---|---|
| PB-01 | Create service requests | High | MVP |
| PB-02 | List service requests | High | MVP |
| PB-03 | View request details | High | MVP |
| PB-04 | Filter requests by status | High | MVP |
| PB-05 | Update request status | High | MVP |
| PB-06 | Validate request information | High | MVP |
| PB-07 | Persist data in PostgreSQL | High | MVP |
| PB-08 | Handle API errors consistently | High | MVP |
| PB-09 | Implement health endpoint | High | MVP |
| PB-10 | User authentication | Medium | Future / Confirm scope |
| PB-11 | Role-based authorization | Medium | Future / Confirm scope |
| PB-12 | Search requests | Medium | Future |
| PB-13 | Pagination | Medium | Future |
| PB-14 | Email notifications | Low | Future |
| PB-15 | Dashboard analytics | Low | Future |
| PB-16 | File attachments | Low | Future |

## 8. MVP Scope

The Minimum Viable Product will include:

- Creating service requests.
- Listing all service requests.
- Viewing individual request details.
- Filtering requests by status.
- Updating request statuses.
- Server-side validation.
- PostgreSQL data persistence.
- Consistent API error handling.
- Backend health endpoint.

## 9. Future Improvements

- User authentication.
- Role-based access control.
- Request assignment.
- Search and pagination.
- Email notifications.
- Dashboard analytics.
- File attachments.


## 9.1 Request Status Workflow

The system will use the following request statuses:

- OPEN: The request has been submitted.
- IN_PROGRESS: The request is being handled.
- RESOLVED: The reported issue has been addressed.
- CLOSED: The request has been formally closed.

Status transitions must follow the agreed business workflow. Invalid transitions must be rejected by the backend service layer.
## 10. Assumptions and Constraints

- The application is intended for internal service request management.
- The initial project will use Next.js, Express.js, TypeScript and PostgreSQL.
- The backend will follow a modular monolith architecture.
- Request data will be stored persistently in PostgreSQL.
- The initial status workflow will be OPEN, IN_PROGRESS, RESOLVED and CLOSED.
- Only authorized users should perform administrative status updates.
- Authentication and authorization scope requires supervisor confirmation.

## 11. Definition of Done

A feature is considered complete when:

- Its requirements and acceptance criteria are satisfied.
- The implementation follows the agreed architecture.
- Server-side validation is applied where required.
- Normal and failure scenarios are tested.
- Relevant documentation is updated.
- Code is committed using meaningful Git messages.
- No credentials or sensitive information are committed.

## 12. Day 01 Completion Summary

Day 01 focuses on understanding the business problem, identifying users, defining functional and non-functional requirements, creating user stories, and establishing the MVP scope.

The requirements document will serve as the foundation for architecture and system design on Day 02.

