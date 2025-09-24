-- PostgreSQL Database Initialization Script for Recruitment App
-- Optimized for container deployment

-- Drop tables if they exist (for clean redeployment)
DROP TABLE IF EXISTS request_become_admin CASCADE;
DROP TABLE IF EXISTS request_become_recruiter CASCADE;
DROP TABLE IF EXISTS request_add_organization CASCADE;
DROP TABLE IF EXISTS request_join_organization CASCADE;
DROP TABLE IF EXISTS request CASCADE;
DROP TABLE IF EXISTS job_offer_management CASCADE;
DROP TABLE IF EXISTS attachment CASCADE;
DROP TABLE IF EXISTS application CASCADE;
DROP TABLE IF EXISTS job_description CASCADE;
DROP TABLE IF EXISTS job_offer CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- Create table for Organization
CREATE TABLE organization (
    org_siren VARCHAR(9) PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    org_hq VARCHAR(255),
    org_structure VARCHAR(20) CHECK (org_structure IN ('association', 'Eurl', 'Sarl', 'SASU'))
);

-- Create table for User (quoted because "user" is a PostgreSQL reserved word)
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_surname VARCHAR(100) NOT NULL,
    user_firstname VARCHAR(100) NOT NULL,
    user_phone VARCHAR(20),
    user_account_registration_date DATE DEFAULT CURRENT_DATE,
    user_status BOOLEAN DEFAULT true,
    user_organization VARCHAR(9) REFERENCES organization(org_siren),
    user_type VARCHAR(20) CHECK (user_type IN ('user', 'Administrator', 'Recruiter', 'Applicant')) NOT NULL
);

-- Create table for Job Offer
CREATE TABLE job_offer (
    job_offer_id SERIAL PRIMARY KEY,
    job_offer_expiration_date DATE,
    job_offer_indication TEXT,
    job_offer_num_docs_req INTEGER DEFAULT 0,
    job_offer_state VARCHAR(20) CHECK (job_offer_state IN ('non_published', 'published', 'expired')) DEFAULT 'non_published',
    job_offer_recruiter INTEGER REFERENCES "user"(user_id)
);

-- Create table for Job Description
CREATE TABLE job_description (
    job_description_id SERIAL PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    job_organization VARCHAR(9) REFERENCES organization(org_siren),
    job_contract_type VARCHAR(20) CHECK (job_contract_type IN ('permanent', 'temporary', 'internship', 'apprenticeship')),
    job_position_level VARCHAR(20) CHECK (job_position_level IN ('executive', 'manager', 'employee', 'worker')),
    job_supervisor VARCHAR(255),
    job_type VARCHAR(20) CHECK (job_type IN ('on-site', 'remote', 'hybrid')),
    job_location VARCHAR(255),
    job_rhythm VARCHAR(100),
    job_salary_range VARCHAR(100),
    job_description TEXT,
    UNIQUE (job_title, job_organization)
);

-- Create table for Application
CREATE TABLE application (
    application_id SERIAL,
    applicant_id INTEGER REFERENCES "user"(user_id),
    job_offer_id INTEGER REFERENCES job_offer(job_offer_id),
    application_date DATE DEFAULT CURRENT_DATE,
    application_status VARCHAR(20) DEFAULT 'pending' CHECK (application_status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
    recruiter_comment TEXT,
    PRIMARY KEY(applicant_id, job_offer_id)
);

-- Create table for Attachment
CREATE TABLE attachment (
    attachment_id SERIAL PRIMARY KEY,
    attachment_applicant_id INTEGER,
    attachment_job_offer_id INTEGER,
    attachment_file_path VARCHAR(500),
    attachment_filename VARCHAR(255),
    attachment_upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attachment_applicant_id, attachment_job_offer_id)
        REFERENCES application(applicant_id, job_offer_id) ON DELETE CASCADE
);

-- Create table for Job Offer Management
CREATE TABLE job_offer_management (
    recruiter_id INTEGER REFERENCES "user"(user_id),
    job_offer_id INTEGER REFERENCES job_offer(job_offer_id),
    assigned_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (recruiter_id, job_offer_id)
);

-- Create table for Request (base table)
CREATE TABLE request (
    request_id SERIAL PRIMARY KEY,
    organization_id VARCHAR(9) REFERENCES organization(org_siren),
    user_id INTEGER REFERENCES "user"(user_id),
    request_type VARCHAR(50) NOT NULL CHECK (request_type <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tables for different types of requests

-- Create table for Request to Join Organization
CREATE TABLE request_join_organization (
    request_id SERIAL PRIMARY KEY,
    request_user_id INTEGER REFERENCES "user"(user_id),
    request_target_org_siren VARCHAR(9) REFERENCES organization(org_siren),
    request_target_org_name VARCHAR(255),
    request_reason TEXT,
    request_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_status VARCHAR(20) DEFAULT 'pending' CHECK (request_status IN ('pending', 'accepted', 'rejected')),
    request_approval_date TIMESTAMP,
    approved_by INTEGER REFERENCES "user"(user_id)
);

-- Create table for Request to Add Organization
CREATE TABLE request_add_organization (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(user_id),
    org_siren VARCHAR(9),
    request_org_name VARCHAR(255),
    request_org_hq VARCHAR(255),
    request_org_type VARCHAR(20) CHECK (request_org_type IN ('association', 'Eurl', 'Sarl', 'SASU')),
    request_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_status VARCHAR(20) DEFAULT 'pending' CHECK (request_status IN ('pending', 'accepted', 'rejected')),
    request_approval_date TIMESTAMP,
    approved_by INTEGER REFERENCES "user"(user_id)
);

-- Create table for Request to Become Recruiter
CREATE TABLE request_become_recruiter (
    request_id SERIAL PRIMARY KEY,
    request_user_id INTEGER REFERENCES "user"(user_id),
    request_target_org_siren VARCHAR(9) REFERENCES organization(org_siren),
    request_reason TEXT,
    request_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_status VARCHAR(20) DEFAULT 'pending' CHECK (request_status IN ('pending', 'accepted', 'rejected')),
    request_approval_date TIMESTAMP,
    approved_by INTEGER REFERENCES "user"(user_id)
);

-- Create table for Request to Become Admin
CREATE TABLE request_become_admin (
    request_id SERIAL PRIMARY KEY,
    request_user_id INTEGER REFERENCES "user"(user_id),
    request_reason TEXT,
    request_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_status VARCHAR(20) DEFAULT 'pending' CHECK (request_status IN ('pending', 'accepted', 'rejected')),
    request_approval_date TIMESTAMP,
    approved_by INTEGER REFERENCES "user"(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON "user"(user_email);
CREATE INDEX idx_user_organization ON "user"(user_organization);
CREATE INDEX idx_job_offer_recruiter ON job_offer(job_offer_recruiter);
CREATE INDEX idx_job_offer_state ON job_offer(job_offer_state);
CREATE INDEX idx_application_applicant ON application(applicant_id);
CREATE INDEX idx_application_job_offer ON application(job_offer_id);
CREATE INDEX idx_application_status ON application(application_status);

-- Sample data insertion (corrected)
INSERT INTO organization (org_siren, org_name, org_hq, org_structure)
VALUES ('123456789', 'Example Organization', 'Main Headquarters', 'association');

INSERT INTO "user" (user_email, user_password, user_surname, user_firstname, user_phone, user_account_registration_date, user_status, user_organization, user_type)
VALUES
    ('admin@example.com', '$2b$10$encrypted_password_hash', 'Admin', 'System', '+33123456789', CURRENT_DATE, true, '123456789', 'Administrator'),
    ('recruiter@example.com', '$2b$10$encrypted_password_hash', 'Recruiter', 'John', '+33123456790', CURRENT_DATE, true, '123456789', 'Recruiter'),
    ('applicant@example.com', '$2b$10$encrypted_password_hash', 'Doe', 'Jane', '+33123456791', CURRENT_DATE, true, '123456789', 'Applicant');

INSERT INTO job_description (job_title, job_organization, job_contract_type, job_position_level, job_supervisor, job_type, job_location, job_rhythm, job_salary_range, job_description)
VALUES ('Software Developer', '123456789', 'permanent', 'employee', 'Tech Lead', 'hybrid', 'Paris, France', 'Full-time', '45000-55000 EUR', 'Full-stack developer position for recruitment platform');

INSERT INTO job_offer (job_offer_expiration_date, job_offer_indication, job_offer_num_docs_req, job_offer_state, job_offer_recruiter)
VALUES (CURRENT_DATE + INTERVAL '30 days', 'Urgent hiring for development team', 3, 'published', 2);

INSERT INTO application (applicant_id, job_offer_id, application_date)
VALUES (3, 1, CURRENT_DATE);

INSERT INTO attachment (attachment_applicant_id, attachment_job_offer_id, attachment_file_path, attachment_filename)
VALUES (3, 1, '/uploads/cv_jane_doe.pdf', 'CV_Jane_Doe.pdf');

INSERT INTO job_offer_management (recruiter_id, job_offer_id)
VALUES (2, 1);

-- Create a function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Grant permissions (adjust as needed for your container setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
