-- PostgreSQL setup script for CipherSQLStudio
-- This script creates sample tables for SQL practice

-- Create database (run this as superuser)
-- CREATE DATABASE ciphersqlstudio;

-- Connect to the database and create sample tables
-- \c ciphersqlstudio;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary INTEGER NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    employee_id INTEGER REFERENCES employees(id),
    start_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active'
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    manager_id INTEGER REFERENCES employees(id),
    budget INTEGER
);

-- Insert sample data into employees
INSERT INTO employees (first_name, last_name, email, department, salary) VALUES
('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000),
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000),
('Mike', 'Johnson', 'mike.johnson@company.com', 'Engineering', 80000),
('Sarah', 'Wilson', 'sarah.wilson@company.com', 'HR', 60000),
('David', 'Brown', 'david.brown@company.com', 'Finance', 70000),
('Lisa', 'Davis', 'lisa.davis@company.com', 'Marketing', 68000),
('Tom', 'Miller', 'tom.miller@company.com', 'Engineering', 90000),
('Amy', 'Garcia', 'amy.garcia@company.com', 'HR', 62000)
ON CONFLICT (email) DO NOTHING;

-- Insert sample data into projects
INSERT INTO projects (name, employee_id) VALUES
('Website Redesign', 1),
('Mobile App Development', 3),
('Database Migration', 7),
('Marketing Campaign', 2),
('HR System Upgrade', 4),
('Financial Dashboard', 5)
ON CONFLICT DO NOTHING;

-- Insert sample data into departments
INSERT INTO departments (name, manager_id, budget) VALUES
('Engineering', 7, 500000),
('Marketing', 2, 200000),
('HR', 4, 150000),
('Finance', 5, 300000)
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_projects_employee_id ON projects(employee_id);

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;

COMMIT;