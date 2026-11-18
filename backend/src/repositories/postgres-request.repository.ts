import type { Pool } from "pg";
import type { ServiceRequest, RequestStatus } from "../types/request.types";
import type { RequestRepository } from "./request.repository";

interface ServiceRequestRow {
  id: string;
  title: string;
  description: string;
  category: ServiceRequest["category"];
  priority: ServiceRequest["priority"];
  status: RequestStatus;
  created_at: Date;
  updated_at: Date;
}

export class PostgresRequestRepository implements RequestRepository {
  constructor(private readonly pool: Pool) {}

  private mapRow(row: ServiceRequestRow): ServiceRequest {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      priority: row.priority,
      status: row.status,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
    };
  }

  async findAll(status?: RequestStatus): Promise<ServiceRequest[]> {
    const result = status
      ? await this.pool.query<ServiceRequestRow>(
          `SELECT * FROM service_requests WHERE status = $1 ORDER BY created_at DESC`,
          [status],
        )
      : await this.pool.query<ServiceRequestRow>(
          `SELECT * FROM service_requests ORDER BY created_at DESC`,
        );

    return result.rows.map((row) => this.mapRow(row));
  }

  async findById(id: string): Promise<ServiceRequest | null> {
    const result = await this.pool.query<ServiceRequestRow>(
      `SELECT * FROM service_requests WHERE id = $1`,
      [id],
    );

    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  async create(request: ServiceRequest): Promise<ServiceRequest> {
    const result = await this.pool.query<ServiceRequestRow>(
      `INSERT INTO service_requests
        (id, title, description, category, priority, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        request.id,
        request.title,
        request.description,
        request.category,
        request.priority,
        request.status,
      ],
    );

    const createdRequest = result.rows[0];

    if (!createdRequest) {
      throw new Error("Failed to create service request.");
    }

    return this.mapRow(createdRequest);
  }

  async update(request: ServiceRequest): Promise<ServiceRequest | null> {
    const result = await this.pool.query<ServiceRequestRow>(
      `UPDATE service_requests
       SET title = $2,
           description = $3,
           category = $4,
           priority = $5,
           status = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [
        request.id,
        request.title,
        request.description,
        request.category,
        request.priority,
        request.status,
      ],
    );

    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }
}
