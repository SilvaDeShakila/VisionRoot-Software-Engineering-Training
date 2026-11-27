# Deployment and Local Setup Guide

## 1. Overview

This document explains how to configure, build, and run the VisionRoot Service Request Management System in a local or production-like environment.

This guide describes local setup and reproducible production builds. It does not claim that the application has been deployed to a public production server.

## 2. Prerequisites

Install the following tools:

- Node.js and npm
- PostgreSQL
- Git

Use compatible versions of the dependencies specified in the project package files.

## 3. Clone the Repository

```powershell
git clone https://github.com/SilvaDeShakila/VisionRoot-Software-Engineering-Training.git
cd VisionRoot-Software-Engineering-Training
```

## 4. Configure the Database

1. Start the PostgreSQL service.
2. Create a database named `visionroot_db`, or use another database name and update the backend environment configuration accordingly.
3. Apply the database schema.

Example commands:

```powershell
createdb -U postgres visionroot_db
```

From the backend directory:

```powershell
psql -U postgres -d visionroot_db -f database/schema.sql
```

The schema creates the `service_requests` table and its indexes.

If the database already exists and the schema has already been applied, do not recreate it unnecessarily.

## 5. Configure the Backend

Open a terminal in the repository root:

```powershell
cd backend
Copy-Item .env.example .env
```

Configure the backend `.env` file using your local PostgreSQL settings.

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `FRONTEND_URL` | Allowed frontend origin for CORS |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Local database password |

Do not commit `.env` or share its contents.

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The default backend URL is:

`http://localhost:5000`

## 6. Configure the Frontend

Open another terminal in the repository root:

```powershell
cd frontend
Copy-Item .env.example .env.local
```

Configure the frontend environment variable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

For the default local setup, the frontend API base URL is:

`http://localhost:5000/api`

Install dependencies:

```powershell
npm install
```

Start the frontend development server:

```powershell
npm run dev
```

The default frontend URL is:

`http://localhost:3000`

## 7. Production-like Build

Build the backend:

```powershell
cd backend
npm run typecheck
npm run build
```

Start the compiled backend:

```powershell
npm start
```

Build the frontend in another terminal:

```powershell
cd frontend
npm run lint
npm run build
```

Start the frontend production server:

```powershell
npm run start
```

Ensure the required environment variables are configured before starting either application.

## 8. Health Verification

Check the API root:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
```

Check the health endpoint:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

A healthy API response contains:

- `status`: `healthy`
- A message indicating that the API is running
- A timestamp

The health endpoint verifies API availability. It does not independently verify database readiness. The backend checks the PostgreSQL connection during startup.

## 9. Security and Configuration Notes

- Keep actual environment files local and out of version control.
- Use the backend and frontend `.env.example` files as configuration templates.
- Replace placeholder database credentials with local or deployment-specific values.
- Do not place database credentials in frontend environment variables.
- Configure `FRONTEND_URL` for the intended frontend origin.
- Review authentication and authorization requirements with the supervisor before deployment.
- Do not deploy publicly without supervisor approval.

### HTTPS

- Use HTTPS for public or production deployments.
- Configure TLS through the approved hosting platform or a trusted reverse proxy.
- Do not transmit credentials or sensitive application data over unencrypted public HTTP.
- Local development may use HTTP on localhost; this is not a production security configuration.
- Verify HTTPS certificates and the approved deployment configuration before going live.

## 10. Operational Notes

The backend performs a PostgreSQL connectivity check during startup.

The backend also handles `SIGINT` and `SIGTERM` shutdown signals by closing the HTTP server and PostgreSQL connection pool.

Review application logs when investigating startup, database, or runtime problems.

### Rollback Awareness

- Keep a known-good application build or release available before deploying a new version.
- If a deployment fails, follow the hosting platform's approved procedure to restore the previous known-good application release.
- Back up the database before applying schema or data changes.
- Do not assume that rolling back application code automatically reverses database changes.
- Review database compatibility and restoration requirements before attempting a rollback.
- No automated deployment rollback procedure has been implemented or verified as part of this training task.

## 11. Deployment Status

The documented verification covers local development and production-like builds.

A public production deployment has not been claimed or performed as part of this verification.
