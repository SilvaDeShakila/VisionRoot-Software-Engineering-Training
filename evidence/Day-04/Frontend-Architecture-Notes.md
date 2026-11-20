# Day 04 – Frontend Architecture Notes

## 1. Architecture Overview

The frontend is developed using Next.js with TypeScript and the App Router.

The implementation separates layout components, request-related components, data, types and API communication logic.

## 2. Component Structure

### Layout Components

Location: `src/components/layout/`

- `sidebar.tsx` – Desktop sidebar and responsive mobile navigation drawer.
- `header.tsx` – Dashboard header and workspace information.

### Request Feature Components

Location: `src/features/requests/components/`

- `dashboard.tsx` – Main dashboard composition and client-side request state.
- `summary-cards.tsx` – Displays request summary counts.
- `request-list.tsx` – Displays requests and filters them by status.
- `create-request-form.tsx` – Collects and validates new request information.

### Types

Location: `src/features/requests/types/`

- `request.ts` – Defines request categories, priorities, statuses and TypeScript interfaces.

### Demo Data

Location: `src/features/requests/data/`

- `demo-requests.ts` – Provides sample request records for frontend development and testing.

### Services

Location: `src/features/requests/services/`

- `request-service.ts` – Separates HTTP API communication from UI components.

## 3. Component Boundary Decisions

- The dashboard coordinates the main page and request state.
- Summary cards receive request data through props.
- The request list receives request data through props and manages its own filter selection.
- The create request form manages its input fields and validation state.
- The sidebar manages mobile drawer visibility independently.
- Shared request types are defined separately to improve consistency.
- API communication is kept in a service module rather than being placed directly inside UI components.

## 4. State Management

React component state is used for the current frontend implementation.

The dashboard maintains the request collection in memory. The request list maintains its selected status filter, while the form manages its input and feedback state.

This is suitable for the current frontend stage. Persistent state will be provided through backend API and PostgreSQL integration later.

## 5. Responsive Design

- Desktop screens use a fixed-width sidebar.
- Mobile screens use a hamburger menu with a slide-in navigation drawer.
- A backdrop is displayed while the mobile drawer is open.
- Navigation links close the drawer after selection.
- Tailwind CSS responsive utilities are used to adapt the layout.

## 6. Validation and Error Feedback

The request form checks required fields and trims whitespace before submission. The title field also has a maximum length of 150 characters.

Server-side validation will still be required when backend integration is implemented.

## 7. Design Decisions

The interface uses a navy blue, royal blue, soft gray and white color palette.

Reusable components and feature-based folders are used to improve readability, maintainability and future testing.

## 8. Future Improvements

- Connect request services to the Express backend.
- Load and persist requests through PostgreSQL.
- Implement request details and status updates.
- Handle API loading and error states.
- Add authentication and authorization after requirements are confirmed.
