# Service Request Management System

A full-stack web application for submitting, tracking, and managing organizational service requests. This project is being developed as part of the VisionRoot Software Engineering Training programme.

## Project Overview

The system provides a centralized platform where users can submit service requests and view their progress. Staff workflows and business-level permissions remain subject to supervisor confirmation.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL |
| Validation | Zod |
| Development tools | Node.js, npm, Git, Visual Studio Code, PowerShell |

## Implemented Features

### Frontend
- Dashboard summary cards and service request list.
- Create request form with required-field validation.
- Request status filtering and request details page.
- Status update interface.
- Backend API integration for creating and retrieving requests.
- Loading, error, retry, and success feedback.
- Desktop sidebar and mobile navigation drawer.
- Responsive layout styling.

### Backend
- REST API built with Express.js and TypeScript.
- PostgreSQL persistence for service requests.
- Create, retrieve, filter, and status-update operations.
- Zod-based request and environment validation.
- Centralized error handling and not-found responses.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API root response |
| GET | `/api/health` | Basic API health check |
| POST | `/api/requests` | Create a service request |
| GET | `/api/requests` | Retrieve service requests |
| GET | `/api/requests?status=OPEN` | Filter requests by status |
| GET | `/api/requests/:id` | Retrieve a request by ID |
| PATCH | `/api/requests/:id/status` | Update a request status |

**Backend note:** The health endpoint reports API availability. PostgreSQL connectivity is checked during backend startup; the health endpoint does not independently query the database on each request. Business-level status-transition and authorization rules require supervisor confirmation.

## Development Environment

The following versions were verified during development:

- Node.js v22.21.0
- npm 10.9.4
- PostgreSQL 18.7
- Git, Visual Studio Code, and PowerShell

## Getting Started

### Prerequisites
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training.git
cd VisionRoot-Software-Engineering-Training
```

### 2. Configure and start the backend

Use `backend/.env.example` as a reference to create `backend/.env`. Configure the local PostgreSQL connection:

- `PORT` - Backend server port (default: 5000).
- `NODE_ENV` - Application environment.
- `FRONTEND_URL` - Allowed frontend origin for CORS.
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - PostgreSQL connection settings.

Apply `backend/database/schema.sql` to the configured database, then run:

```bash
cd backend
npm install
npm run dev
```

The backend API is available at `http://localhost:5000`.

### 3. Configure and start the frontend

Use `frontend/.env.example` as a reference to create `frontend/.env.local`. Set the API URL, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

### 4. Verification commands

Backend (from `backend/`):

```bash
npm test
npm run typecheck
npm run build
```

Frontend (from `frontend/`):

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Testing and Verification

### Day 08 – Backend tests

The latest additional Day 08 verification reports **36 automated backend tests passed, 0 failed**:

| Test group | Passed |
|---|---:|
| Request service tests | 10 |
| Request validation tests | 15 |
| HTTP API tests | 11 |
| **Total** | **36** |

The two additional API tests verify HTTP 404 responses for GET and PATCH requests using valid but non-existent request UUIDs. They were run with a separate PostgreSQL test database, `visionroot_test_db`.

Successful PostgreSQL-backed create, retrieve, filter, status-update, persistence, and cleanup workflows were also verified manually. The 36-test result does not represent a complete automated PostgreSQL integration suite.

Backend type checking and production build checks passed. Frontend linting, TypeScript validation, and production build checks also passed during the recorded verification sessions.

### Day 09 – Security review and deployment preparation

Work included reviewing environment-file protection and configuration validation; reviewing request validation, database configuration, CORS, and error handling; verifying local PostgreSQL connectivity; checking backend development and compiled runtime startup; running backend and frontend build checks; and preparing deployment instructions and security evidence.

**Deployment status:** No public production deployment has been performed. The frontend production build passed, but its production server was not separately started during Day 09 verification. These checks are local production-like verification, not proof of a live deployment or a complete security audit.

## Development Progress

| Training day | Work | Status |
|---|---|---|
| Day 01 | Project requirements and MVP scope documentation | Completed |
| Day 02 | System architecture and technical design | Completed |
| Day 03 | Development environment verification and repository preparation | Completed |
| Day 04 | Initial frontend UI implementation and verification | Completed |
| Day 05 | Backend API foundation, validation, and error handling | Completed |
| Day 06 | PostgreSQL database integration | Completed |
| Day 07 | Frontend and backend integration with manual verification | Completed |
| Day 08 | Backend automated tests, additional API not-found coverage, and manual PostgreSQL API verification | Completed; PR pending |
| Day 09 | Security review, deployment preparation, and local production-like verification | Completed; PR pending |
| Final review | Remaining tests, supervisor-confirmed business rules, and deployment decisions | Pending |

The Day 08 and Day 09 changes are in separate pull requests targeting `main`; neither has been merged.

## Security and Known Limitations

- Local environment files are ignored by Git; actual credentials must never be committed.
- Gitleaks was unavailable during the Day 09 review. A complete automated secret scan and historical Git content scan have not been completed.
- Authentication, authorization, role-based access, and exact status-transition authorization requirements remain pending supervisor confirmation.
- Automated PostgreSQL integration tests, browser end-to-end tests, and complete frontend-to-backend workflow tests remain outstanding.
- No public production deployment has been performed.
- The project should not yet be considered production-ready.

## Documentation and Evidence

- `docs/requirements.md` - Project requirements.
- `docs/architecture.md` - System architecture.
- `docs/data-model.md` - Database model.
- `docs/api-contract.md` - API specifications.
- `docs/decisions/` - Architecture decision records.
- `docs/deployment.md` - Local setup and deployment preparation.
- `evidence/Day-08/` - Automated test results, manual PostgreSQL verification, test output, and daily work log.
- `evidence/Day-09/` - Security checklist, deployment verification, known limitations, and daily work log.

## Repository Information

- Repository: [VisionRoot Software Engineering Training](https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training)
- Default branch: `main`

## Repository Structure

```text
VisionRoot-Software-Engineering-Training/
├── backend/
│   ├── database/schema.sql
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

- Complete automated PostgreSQL integration and browser end-to-end testing.
- Add regression coverage if a reproducible defect is identified and fixed.
- Obtain supervisor confirmation of authentication, authorization, roles, and permitted status transitions.
- Complete an approved automated secret scan, including historical repository content.
- Confirm production deployment requirements and obtain approval before any public deployment.
