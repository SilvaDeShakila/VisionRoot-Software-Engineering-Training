# ADR-001: Modular Monolith Architecture

## 1. Status

Proposed

This decision is documented for review and confirmation. It may be updated after supervisor feedback.

## 2. Context

The Service Request Management System is a training project designed to allow users to submit, view and track service requests.

The project uses the following technology stack:

- Frontend: Next.js with TypeScript
- Backend: Express.js with TypeScript
- Database: PostgreSQL
- Communication: REST API using HTTP and JSON

The application requires clear separation between user interface responsibilities, HTTP request handling, business logic and database operations.

The architecture should be understandable, maintainable and suitable for the current project scope without introducing unnecessary complexity.

## 3. Decision

The proposed architecture is a modular monolith with clearly separated application responsibilities.

The system will contain:

1. A Next.js frontend responsible for the user interface, form state, API communication and visible application states.
2. An Express.js backend responsible for API routes, controllers, application services and request processing.
3. A PostgreSQL database responsible for persistent data, relationships and data integrity constraints.

The backend will follow a layered structure:

- Routes: Define API endpoints and connect them to controllers.
- Controllers: Handle HTTP requests, validate or map incoming data and produce HTTP responses.
- Services: Apply business rules and coordinate application operations.
- Repositories: Handle database queries and persistence.
- Database: Store service request records and enforce database constraints.

The frontend will communicate with the backend through REST API endpoints. It will not connect directly to PostgreSQL.

## 4. Alternatives Considered

### 4.1 Microservices Architecture

Description:

Split the application into multiple independently deployable services.

Reason for not selecting:

- The current project scope does not require independently deployable services.
- It introduces additional communication and deployment complexity.
- It requires additional monitoring and operational management.
- It creates unnecessary overhead for a small training application.

### 4.2 Monolithic Application Without Clear Layer Separation

Description:

Implement application functionality without clearly separating HTTP handling, business logic and data access.

Reason for not selecting:

- Responsibilities could become mixed together.
- Business rules may become difficult to maintain and test.
- Database operations could become scattered across the application.
- Changes may become harder to understand and review.

## 5. Consequences

### 5.1 Positive Consequences

- Clear separation of responsibilities.
- Easier understanding of the application structure.
- Business rules can be maintained in the service layer.
- Database operations remain separated in repositories.
- The application is suitable for incremental implementation and testing.
- The architecture avoids unnecessary microservice complexity.

### 5.2 Trade-offs and Limitations

- The backend is deployed as one application rather than as independently deployable services.
- The modular boundaries must be maintained through consistent development practices.
- As the application grows, some modules may require further architectural evaluation.
- The architecture does not automatically provide authentication, authorization or other security features; these require separate implementation decisions.

## 6. Known Risks

| Risk | Consideration |
|---|---|
| Module coupling | Keep dependencies between modules clear and controlled |
| Unconfirmed authentication scope | Confirm authentication and authorization requirements before implementation |
| Unconfirmed status workflow | Obtain supervisor confirmation before implementing status transition rules |
| Data integrity | Apply validation in the backend and appropriate constraints in PostgreSQL |
| Error handling | Maintain consistent API error responses without exposing sensitive details |

## 7. Review Trigger

This decision should be reviewed when:

- The supervisor provides architecture review feedback.
- Project requirements change significantly.
- Authentication or authorization requirements are confirmed.
- The application grows beyond the current training project scope.
- The selected architecture creates significant implementation or maintenance difficulties.

## 8. References

- `docs/requirements.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api-contract.md`
- Trainee Software Engineer Learning Guide, Section 3: Software Architecture and Day 02: Architecture and System Design

## 9. Summary

A modular monolith with a layered Express.js backend, Next.js frontend and PostgreSQL database is proposed for the Service Request Management System.

This approach provides clear responsibility boundaries while keeping the architecture appropriate for the current training project scope.

The decision remains proposed until it has been reviewed.