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
    ├── docs/
    │   ├── decisions/
    │   ├── requirements.md
    │   ├── architecture.md
    │   ├── data-model.md
    │   └── api-contract.md
    ├── evidence/
    │   ├── Day-01/
    │   ├── Day-02/
    │   ├── Day-03/
    │   └── Day-04/
    │       ├── screenshots/
    │       ├── Daily-Work-Log.md
    │       └── Frontend-Architecture-Notes.md
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── .env.example
    │   └── package.json
    ├── .env.example
    ├── .gitignore
    └── README.md

## Development Progress

- [x] Day 01: Project requirements and MVP scope documentation
- [x] Day 02: System architecture and technical design
- [x] Day 03: Development environment verification and repository preparation
- [x] Day 04: Initial frontend UI implementation and verification
- [ ] Backend implementation
- [ ] Database integration
- [ ] Frontend and backend integration
- [ ] Testing and final review

## Project Status

The project requirements, architecture documentation and development environment setup have been completed.

The initial frontend dashboard has been implemented and verified through linting, TypeScript checks, production builds and browser testing.

Backend development, database integration and full-stack functionality remain pending.
