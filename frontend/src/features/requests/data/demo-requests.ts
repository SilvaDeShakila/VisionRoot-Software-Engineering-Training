import type { ServiceRequest } from "../types/request";

export const demoRequests: ServiceRequest[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Laptop is not starting",
    description: "My office laptop does not start when I press the power button.",
    category: "IT",
    priority: "HIGH",
    status: "OPEN",
    createdAt: "2026-11-15T08:30:00.000Z",
    updatedAt: "2026-11-15T08:30:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Printer connection issue",
    description: "The printer is not connecting to the office network.",
    category: "IT",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdAt: "2026-11-14T09:15:00.000Z",
    updatedAt: "2026-11-15T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Air conditioning maintenance",
    description: "The air conditioner in the meeting room needs maintenance.",
    category: "Facilities",
    priority: "LOW",
    status: "RESOLVED",
    createdAt: "2026-11-12T11:00:00.000Z",
    updatedAt: "2026-11-14T14:30:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Software installation request",
    description: "Requesting installation of approved office software.",
    category: "Other",
    priority: "MEDIUM",
    status: "CLOSED",
    createdAt: "2026-11-10T07:45:00.000Z",
    updatedAt: "2026-11-13T12:00:00.000Z",
  },
];
