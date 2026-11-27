# Service Request Management System

## Project Overview

The Service Request Management System is a full-stack web application designed to help organizations manage service requests efficiently.

Users can submit service requests, track their progress, and manage request statuses through a centralized platform.

## Project Objectives

- Provide a centralized platform for service request management.
- Allow users to submit and track service requests.
- Enable authorized staff to manage and update requests.
- Maintain reliable and structured request data.
- Apply secure and maintainable software development practices.

## Technology Stack

- Frontend: Next.js 16, React, TypeScript and Tailwind CSS
- Backend: Express.js and TypeScript
- Database: PostgreSQL

## MVP Features

- Service request submission
- View service requests
- Filter requests by status
- Request details management
- Request status management
- Input validation
- Database integration

## Development Environment

- Node.js v22.21.0
- npm v10.9.4
- Git v2.52.0.windows.1
- Visual Studio Code
- PowerShell

## Environment Configuration

1. Refer to `.env.example` for the configuration structure.
2. Create local environment files when required.
3. Never commit actual credentials, passwords, API keys, or other secrets.
4. Environment files are excluded through `.gitignore`, except `.env.example`.

## Frontend Setup

The frontend application is located in the `frontend/` directory.

### Prerequisites

- Node.js
- npm

### Installation

Run these commands from the project root:

    cd frontend
    npm install

### Environment Configuration

The example frontend environment file is available at `frontend/.env.example`.

Create the local frontend environment file from the example template:

    Copy-Item .env.example .env.local

The API URL is configured in `frontend/.env.local` to connect the frontend to the backend API.

### Run the Development Server

    npm run dev

Open `http://localhost:3000` in your browser.

### Verification Commands

    npm run test
    npm run lint
    npx tsc --noEmit
    npm run build

## Backend Setup

The backend application is located in the `backend/` directory.

### Prerequisites

- Node.js
- npm

### Installation

Run these commands from the project root:

    cd backend
    npm install

### Environment Configuration

Create the local backend environment file from the example template:

    Copy-Item .env.example .env

Configure the local database credentials in the resulting `backend/.env` file.

The backend uses the following environment variables:

- `PORT` - Backend server port (default: 5000).
- `NODE_ENV` - Application environment.
- `FRONTEND_URL` - Allowed frontend origin for CORS.
- `DB_HOST` - PostgreSQL database host.
- `DB_PORT` - PostgreSQL database port (default: 5432).
- `DB_NAME` - PostgreSQL database name.
- `DB_USER` - PostgreSQL database username.
- `DB_PASSWORD` - PostgreSQL database password.

Actual database credentials must remain in the local `backend/.env` file and must never be committed to Git.

### Run the Development Server

    npm run dev

The backend API will be available at `http://localhost:5000`.

### Verification Commands

    npm test
    npm run test:integration
    npm run typecheck
    npm run build

### Currently Implemented API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Basic API health check |
| POST | `/api/requests` | Create a service request |
| GET | `/api/requests` | Retrieve all service requests |
| GET | `/api/requests?status=OPEN` | Filter requests by status |
| GET | `/api/requests/:id` | Retrieve a request by ID |
| PATCH | `/api/requests/:id/status` | Update a request status |

**Current backend status:** The backend uses PostgreSQL for persistent service request storage. Request creation, retrieval, status filtering and status updates are implemented. Request status updates are validated and manually verified. Business-level status transition rules remain subject to supervisor confirmation.

## Current Frontend Implementation

- Dashboard summary cards
- Service request list
- Status filtering
- Create request form
- Required-field validation
- Backend API integration for request submission and retrieval
- Request details page with status update functionality
- Loading, error, retry and success feedback
- Desktop sidebar navigation
- Mobile slide-in navigation drawer
- Responsive layout styling

The frontend retrieves and creates service requests through the backend API and displays request details, status information and API error states. PostgreSQL persistence is provided through the backend.

## Documentation

- `docs/requirements.md` - Project requirements
- `docs/architecture.md` - System architecture
- `docs/data-model.md` - Database model
- `docs/api-contract.md` - API specifications
- `docs/deployment.md` - Local setup and deployment guide
- `docs/decisions/` - Architecture decision records

## Evidence

Daily development logs, reports and screenshots are maintained in the `evidence/` directory.

## Repository Information

- Repository: https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training
- Default branch (remote HEAD): `main`

## Repository Structure

    VisionRoot-Software-Engineering-Training/
    |-- backend/
    |   |-- database/
    |   |-- src/
    |   |-- tests/
    |   |-- .env.example
    |   |-- package.json
    |-- frontend/
    |   |-- public/
    |   |-- src/
    |   |-- .env.example
    |   |-- package.json
    |-- docs/
    |   |-- decisions/
    |   |-- requirements.md
    |   |-- architecture.md
    |   |-- data-model.md
    |   |-- api-contract.md
    |   |-- deployment.md
    |-- evidence/
    |   |-- Day-01/
    |   |-- Day-02/
    |   |-- Day-03/
    |   |-- Day-04/
    |   |-- Day-05/
    |   |-- Day-06/
    |   |-- Day-07/
    |   |-- Day-08/
    |   |-- Day-09/
    |   |-- Day-10/
    |-- .env.example
    |-- .gitignore
    |-- README.md
## Development Progress

- [x] Day 01: Project requirements and MVP scope documentation
- [x] Day 02: System architecture and technical design
- [x] Day 03: Development environment verification and repository preparation
- [x] Day 04: Initial frontend UI implementation and verification
- [x] Day 05: Initial backend API foundation, validation and error handling
- [x] Day 06: PostgreSQL database integration
- [x] Day 07: Frontend and backend integration with manual verification
- [x] Day 08: Backend automated testing, PostgreSQL manual integration verification and evidence documentation
- [x] Day 09: Security review, environment configuration, deployment verification and known-limitations documentation
- [x] Day 10: Final backend/frontend verification, PostgreSQL API checks, browser-based functional verification, automated testing and local production-mode runtime verification
- [ ] Final handover: Remaining supervisor confirmations, security scanning and production-readiness checks

## Project Status

The Day 01–10 development activities and core MVP implementation have been completed. The frontend and backend are integrated, with PostgreSQL providing persistent service request storage. Local production-mode runtime verification was also completed on 27 November 2026. The application has not been publicly deployed.

### Verification Completed

- 34 backend automated tests passed: 10 service tests, 15 validation tests and 9 HTTP API tests.
- Backend TypeScript type checking and production build completed successfully.
- Frontend automated tests passed: 16/16 across two test files.
- Frontend ESLint completed with 0 errors and 0 warnings.
- Frontend TypeScript checks and Next.js production build completed successfully; static page generation passed 5/5.
- PostgreSQL repository integration test passed: 1/1 using the dedicated `visionroot_test_db` database.
- PostgreSQL-backed API workflows and browser-based frontend workflows were manually verified and documented.
- Request creation, retrieval, status filtering and status updates were verified.

### Known Verification Notes

- The Vitest run displays a non-blocking Vite configuration warning concerning native config loading and CommonJS/ESM compatibility.

### Outstanding Items

- Browser end-to-end tests.
- Full historical secret scanning.
- Public production deployment and production-readiness approval.
- Authentication and role-based access control.
- Supervisor confirmation of business-level status transition rules.
- Database migration framework and clean-environment deployment verification.
- Regression test coverage linked to a confirmed and fixed defect.
- Final supervisor review and project handover.
