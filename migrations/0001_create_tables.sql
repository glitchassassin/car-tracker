-- Migration number: 0001 	 2025-06-04T21:31:32.622Z

-- Create Cars table
CREATE TABLE cars (
    id INTEGER PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    color TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    current_status TEXT NOT NULL DEFAULT 'PRE_ARRIVAL',
    registration_time TEXT,
    service_start_time TEXT,
    completion_time TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create StatusHistoryEntry table
CREATE TABLE status_history_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_cars_current_status ON cars(current_status);
CREATE INDEX idx_cars_license_plate ON cars(license_plate);
CREATE INDEX idx_status_history_car_id ON status_history_entries(car_id);
CREATE INDEX idx_status_history_timestamp ON status_history_entries(timestamp);
