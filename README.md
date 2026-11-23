# Service Request Management System

<p align="center">
  <strong>A full-stack service request management application</strong><br />
  Built with Next.js, TypeScript, Express.js, and PostgreSQL
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-VisionRoot%20Training-2563EB?style=for-the-badge" alt="VisionRoot Training Project" />
  <img src="https://img.shields.io/badge/Frontend-Next.js%2016-000000?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/Backend-Express.js-404D59?style=for-the-badge&logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Automated%20Tests-36%20Passed-2E8B57?style=flat-square" alt="36 automated tests passed" />
  <img src="https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Status-Under%20Development-orange?style=flat-square" alt="Under development" />
</p>

---

## Overview

The **Service Request Management System** is a full-stack web application developed as part of the **VisionRoot Software Engineering Training programme**. It provides a centralized platform for submitting, tracking, and managing organizational service requests.

The application combines a responsive Next.js frontend with a RESTful Express.js backend and PostgreSQL persistence. The current implementation focuses on the core request lifecycle, API integration, input validation, and reliable error handling.

> **Project maturity:** This is an actively developed training project. The implemented features and verification results are documented below. Authentication, authorization, additional automated integration coverage, and production deployment remain outstanding.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Implemented Capabilities](#implemented-capabilities)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Verification and Test Results](#verification-and-test-results)
- [Development Progress](#development-progress)
- [Security and Known Limitations](#security-and-known-limitations)
- [Project Documentation](#project-documentation)
- [Repository Structure](#repository-structure)

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| Validation | Zod |
| API style | REST |
| Development tools | Git, npm, Visual Studio Code, PowerShell |

### Verified Development Environment

| Tool | Version |
|---|---:|
| Node.js | 22.21.0 |
| npm | 10.9.4 |
| PostgreSQL | 18.7 |

## Implemented Capabilities

### Frontend

- Dashboard with service-request summary cards.
- Service request listing and status filtering.
- Request creation form with required-field validation.
- Request details view.
- Status update interface.
- Frontend-to-backend API integration for request creation and retrieval.
- Loading, error, retry, and success feedback.
- Desktop sidebar navigation and mobile slide-in navigation drawer.
- Responsive layout styling.

### Backend

- REST API implemented with Express.js and TypeScript.
- PostgreSQL-backed service request persistence.
- Service request creation and retrieval.
- Request filtering by status.
- Request status update endpoint.
- Zod-based request and environment validation.
- Centralized error handling and not-found responses.

## Architecture

The application follows a separated frontend/backend architecture:

```text
┌──────────────────────────────┐
│       Next.js Frontend       │
│   React · TypeScript · UI    │
└──────────────┬───────────────┘
               │ HTTP / REST
               ▼
┌──────────────────────────────┐
│       Express.js API         │
│  Routes · Validation · Logic │
└──────────────┬───────────────┘
               │ SQL
               ▼
┌──────────────────────────────┐
│         PostgreSQL           │
│       Persistent Data        │
└──────────────────────────────┘
```

The frontend communicates with the backend through HTTP requests. The backend validates incoming data, processes request operations, and interacts with PostgreSQL for persistent storage.

## API Reference

The following endpoints are currently implemented:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API root response |
| `GET` | `/api/health` | Basic API health check |
| `POST` | `/api/requests` | Create a service request |
| `GET` | `/api/requests` | Retrieve service requests |
| `GET` | `/api/requests?status=OPEN` | Filter requests by status |
| `GET` | `/api/requests/:id` | Retrieve a request by ID |
| `PATCH` | `/api/requests/:id/status` | Update a request status |

**Implementation note:** PostgreSQL connectivity is checked during backend startup. The `/api/health` endpoint reports API availability and does not independently query the database on every request. Business-level status-transition and authorization rules still require supervisor confirmation.

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training.git
cd VisionRoot-Software-Engineering-Training
```

### 2. Configure the database

Create a PostgreSQL database for local development and apply the schema:

```bash
psql -U <your_postgres_user> -d <your_database_name> -f backend/database/schema.sql
```

Replace the placeholders with your local PostgreSQL username and database name.

### 3. Configure and run the backend

Create `backend/.env` using `backend/.env.example` as a reference. Configure the following variables:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `NODE_ENV` | Application environment |
| `FRONTEND_URL` | Allowed frontend origin for CORS |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default: 5432) |
| `DB_NAME` | PostgreSQL database name |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |

Then install dependencies and start the backend:

```bash
cd backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:5000`.

### 4. Configure and run the frontend

Create `frontend/.env.local` using `frontend/.env.example` as a reference. Set the backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Open a separate terminal, navigate to the frontend directory, and run:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run verification commands

Backend commands (from `backend/`):

```bash
npm test
npm run typecheck
npm run build
```

Frontend commands (from `frontend/`):

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Verification and Test Results

### Day 08 — Backend Automated Tests

The latest recorded Day 08 test run completed successfully:

<p align="center">
  <img src="https://img.shields.io/badge/Tests-36%2F36%20Passed-2E8B57?style=for-the-badge" alt="36 of 36 tests passed" />
  <img src="https://img.shields.io/badge/Failures-0-2E8B57?style=for-the-badge" alt="Zero test failures" />
</p>

| Test suite | Passed | Result |
|---|---:|---|
| Request service tests | 10 | ✔ Passed |
| Request validation tests | 15 | ✔ Passed |
| HTTP API tests | 11 | ✔ Passed |
| **Total** | **36** | **✔ 36/36 passed** |

The two additional API tests cover HTTP 404 responses for GET and PATCH requests using valid but non-existent request UUIDs. These tests were run with a separate PostgreSQL test database, `visionroot_test_db`.

PostgreSQL-backed create, retrieve, filter, status-update, persistence, and cleanup workflows were also verified manually. **The 36 automated tests do not constitute a complete automated PostgreSQL integration suite.**

Additional recorded checks:
- ✔ Backend TypeScript type checking.
- ✔ Backend production build.
- ✔ Frontend linting.
- ✔ Frontend TypeScript validation.
- ✔ Frontend production build.
- ✔ Backend development and compiled runtime startup checks.

### Day 09 — Security Review and Deployment Preparation

The Day 09 work included:
- Reviewing environment-file protection and configuration validation.
- Reviewing request validation, database configuration, CORS, and error handling.
- Verifying local PostgreSQL connectivity.
- Checking backend development and compiled runtime startup.
- Running backend and frontend build checks.
- Preparing deployment instructions and security evidence.

**Deployment verification:** No public production deployment has been performed. The frontend production build passed, but its production server was not separately started during the Day 09 verification. These checks represent local production-like verification, not a live deployment or a complete security audit.

## Development Progress

| Phase | Scope | Status |
|---|---|---|
| Day 01 | Requirements and MVP scope | ✔ Completed |
| Day 02 | System architecture and technical design | ✔ Completed |
| Day 03 | Development environment and repository preparation | ✔ Completed |
| Day 04 | Initial frontend implementation | ✔ Completed |
| Day 05 | Backend API foundation, validation, and error handling | ✔ Completed |
| Day 06 | PostgreSQL database integration | ✔ Completed |
| Day 07 | Frontend/backend integration and manual verification | ✔ Completed |
| Day 08 | Automated backend tests and manual PostgreSQL API verification | ✔ Completed — PR pending |
| Day 09 | Security review and deployment preparation | ✔ Completed — PR pending |
| Final review | Remaining tests, supervisor-confirmed rules, and deployment decisions | ◷ Pending |

The Day 08 and Day 09 implementation/evidence changes are maintained in separate pull requests targeting `main`. Their changes have not been merged.

## Security and Known Limitations

The following items remain open and should be addressed before production use:

- **Authentication and authorization:** Authentication, role-based access, and authorization requirements have not yet been finalized with the supervisor.
- **Business rules:** Permitted request status transitions and related authorization rules require supervisor confirmation.
- **Automated integration testing:** A complete automated PostgreSQL integration test suite remains outstanding.
- **End-to-end testing:** Browser-based end-to-end and complete frontend-to-backend workflow tests remain outstanding.
- **Secret scanning:** Gitleaks was unavailable during the Day 09 review. A complete automated secret scan and historical Git content scan have not been completed.
- **Production deployment:** No public production deployment has been performed.

> **Readiness statement:** The application is under active development and is not yet considered production-ready.

## Project Documentation

| Resource | Description |
|---|---|
| `docs/requirements.md` | Project requirements and scope |
| `docs/architecture.md` | System architecture |
| `docs/data-model.md` | Database model |
| `docs/api-contract.md` | API specifications |
| `docs/decisions/` | Architecture decision records |
| `docs/deployment.md` | Deployment preparation and instructions |
| `evidence/Day-08/` | Automated test results, manual PostgreSQL verification, test output, and daily work log |
| `evidence/Day-09/` | Security checklist, deployment verification, known limitations, and daily work log |

## Repository Structure

```text
VisionRoot-Software-Engineering-Training/
├── backend/
│   ├── database/
│   │   └── schema.sql
│   ├── src/
│   ├── tests/
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── decisions/
│   ├── requirements.md
│   ├── architecture.md
│   ├── data-model.md
│   ├── api-contract.md
│   └── deployment.md
├── evidence/
│   ├── Day-01/ ... Day-07/
│   ├── Day-08/
│   └── Day-09/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Next Steps

- [ ] Complete automated PostgreSQL integration testing.
- [ ] Add browser-based end-to-end and complete workflow tests.
- [ ] Confirm authentication, authorization, roles, and permitted status transitions with the supervisor.
- [ ] Complete an approved automated secret scan, including historical repository content.
- [ ] Confirm deployment requirements and obtain approval before any public production deployment.

---

<p align="center">
  <sub>Developed as part of the VisionRoot Software Engineering Training programme.</sub><br />
  <sub>Repository: <a href="https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training">VisionRoot Software Engineering Training</a></sub>
</p>
