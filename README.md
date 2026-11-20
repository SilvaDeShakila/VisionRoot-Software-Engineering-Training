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

The API URL can be configured in `frontend/.env.local` when backend integration is introduced.

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

**Current limitation:** The backend currently uses temporary in-memory storage. PostgreSQL persistence and the request status update endpoint are planned for subsequent development stages.

## Current Frontend Implementation

- Dashboard summary cards
- Service request list
- Status filtering
- Create request form
- Required-field validation
- Client-side request submission
- Desktop sidebar navigation
- Mobile slide-in navigation drawer
- Responsive layout styling

The frontend currently uses local demo data and React component state. Backend API integration and PostgreSQL persistence have not yet been completed.

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
    |       |-- screenshots/
    |       |-- Daily-Work-Log.md
    |       |-- Backend-Architecture-Notes.md
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
- [ ] Day 06: PostgreSQL database integration
- [ ] Frontend and backend integration
- [ ] Automated testing and final review

## Project Status

The project requirements, architecture documentation and development environment setup have been completed.

The initial frontend dashboard has been implemented and verified through linting, TypeScript checks, production builds and browser testing.

The initial Express.js and TypeScript backend foundation has also been implemented. Request creation, listing, status filtering, request retrieval, validation and centralized error handling are available and have been manually verified. TypeScript validation and the production build have completed successfully.

The backend currently uses temporary in-memory storage. PostgreSQL persistence, the request status update endpoint and frontend-backend integration remain pending.
