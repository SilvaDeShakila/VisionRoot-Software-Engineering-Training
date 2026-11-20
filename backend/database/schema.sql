CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(30) NOT NULL
        CHECK (category IN ('IT', 'Facilities', 'Other')),
    priority VARCHAR(10) NOT NULL
        CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
        CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_service_requests_status
    ON service_requests(status);

CREATE INDEX IF NOT EXISTS idx_service_requests_created_at
    ON service_requests(created_at);
