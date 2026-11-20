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

The API URL is configured in `frontend/.env.local` to connect the frontend to the backend API.

### Run the Development Server

    npm run dev

Open `http://localhost:3000` in your browser.

### Verification Commands

    npm run lint
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

Create a local `.env` file using `.env.example` as a reference.

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
- `docs/decisions/` - Architecture decision records

## Evidence

Daily development logs, reports and screenshots are maintained in the `evidence/` directory.

## Repository Information

- Repository: https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training
- Default branch (remote HEAD): `docs/day-01-requirements`

## Repository Structure

    VisionRoot-Software-Engineering-Training/
    |-- backend/
    |   |-- database/
    |   |   |-- schema.sql
    |   |-- src/
    |   |   |-- config/
    |   |   |-- controllers/
    |   |   |-- middlewares/
    |   |   |-- repositories/
    |   |   |-- routes/
    |   |   |-- services/
    |   |   |-- types/
    |   |   |-- validators/
    |   |-- .env.example
    |   |-- package.json
    |   |-- package-lock.json
    |   |-- tsconfig.json
    |-- docs/
    |   |-- decisions/
    |   |-- requirements.md
    |   |-- architecture.md
    |   |-- data-model.md
    |   |-- api-contract.md
    |-- evidence/
    |   |-- Day-01/
    |   |-- Day-02/
    |   |-- Day-03/
    |   |-- Day-04/
    |   |-- Day-05/
    |   |   |-- screenshots/
    |   |   |-- Daily-Work-Log.md
    |   |   |-- Backend-Architecture-Notes.md
    |   |-- Day-06/
    |   |   |-- screenshots/
    |   |   |-- Daily-Work-Log.md
    |   |   |-- PostgreSQL-Integration-Notes.md
    |   |-- Day-07/
    |   |   |-- screenshots/
    |   |   |-- Daily-Work-Log.md
    |   |   |-- Frontend-Backend-Integration-Notes.md
    |   |   |-- Status-Update-Implementation-Addendum.md
    |-- frontend/
    |   |-- src/
    |   |-- public/
    |   |-- .env.example
    |   |-- package.json
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
- [ ] Day 08: Automated testing and regression verification
- [ ] Final review and remaining supervisor-confirmed business rules

## Project Status

The project requirements, architecture documentation and development environment setup have been completed.

The initial frontend dashboard has been implemented and verified through linting, TypeScript checks, production builds and browser testing.

The initial Express.js and TypeScript backend foundation has also been implemented. Request creation, listing, status filtering, request retrieval, validation and centralized error handling are available and have been manually verified. TypeScript validation and the production build have completed successfully.

The backend uses PostgreSQL for persistent service request storage. Request creation, retrieval, status filtering and status updates have been manually verified. The frontend is integrated with the backend API, including request creation, listing, details retrieval, status updates and error handling. Backend and frontend type checks, linting where applicable, and production builds have completed successfully. Automated tests and supervisor confirmation of permitted status transitions remain outstanding.
