# Day 02 – Architecture and System Design

**Date:** 2026-11-16
**Branch:** `docs/day-02-architecture-design`
**Project:** Service Request Management System

## 1. Objective

Design the system architecture, data model, API contract, and architecture decision before starting application implementation.

## 2. Topics Studied

- Frontend, backend, and database responsibilities.
- Modular Monolith architecture.
- Separation of concerns and layered architecture.
- HTTP request and response flow.
- Entity design and data integrity.
- REST API endpoint and response design.
- Architecture Decision Records (ADRs).

## 3. Documentation Created

The following documentation files were created:

- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api-contract.md`
- `docs/decisions/ADR-001-architecture.md`

## 4. Design Work

- Documented the System Context and Container Architecture diagrams.
- Defined the responsibilities of the frontend, backend, and database.
- Documented the backend layers and service request flow.
- Designed the proposed ServiceRequest entity and its constraints.
- Defined the proposed REST API endpoints, request formats, response formats, and HTTP status codes.
- Documented the Modular Monolith architecture decision in ADR-001.
- Recorded architecture trade-offs and known risks.

## 5. Verification

- Reviewed the architecture documentation and corrected the System Context Diagram to show external users and the system boundary.
- Confirmed that PostgreSQL is represented as an internal system component in the Container Architecture Diagram.
- Reviewed consistency between the architecture, data model, API contract, and ADR.
- Ran `git diff --check`; no whitespace errors were reported.
- Application implementation and automated application tests have not started as part of this documentation work.

## 6. Pending Confirmations

The following decisions require clarification or confirmation before implementation:

- Whether authentication is included in the MVP.
- User roles and authorization permissions.
- Exact allowed service request status transitions.
- Final title and description length limits.
- Whether pagination and sorting are required.
- Health endpoint dependency-check criteria.

## 7. Evidence

- Documentation files are available in the `docs/` directory.
- Captured 20 genuine screenshots covering the architecture diagrams, data model, API contract, and ADR-001.

## 8. GitHub Progress

- Working branch: `docs/day-02-architecture-design`
- Day 02 documentation commit: `0319a32` (committed and pushed).
- Day 02 evidence screenshots commit: `3d3de5a` (20 screenshots committed and pushed).
- Day 02 pull request: [PR #2](https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training/pull/2) (Open; awaiting supervisor review).
- Supervisor review and approval: pending.

## 9. Next Steps

- Monitor PR #2 for supervisor review and feedback.
- Obtain supervisor clarification on the pending decisions before implementation.
