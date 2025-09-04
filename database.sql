-- Create database
CREATE DATABASE IF NOT EXISTS school_platform;

USE school_platform;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    adress TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT NOT NULL,
    email_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for testing
INSERT INTO
    schools (
        name,
        adress,
        city,
        state,
        contact,
        image,
        email_id
    )
VALUES (
        'St. Mary School',
        '123 Main Street',
        'New York',
        'NY',
        1234567890,
        'school1.jpg',
        'stmary@school.com'
    ),
    (
        'Lincoln High School',
        '456 Oak Avenue',
        'Los Angeles',
        'CA',
        9876543210,
        'school2.jpg',
        'lincoln@school.com'
    ),
    (
        'Central Academy',
        '789 Pine Road',
        'Chicago',
        'IL',
        5551234567,
        'school3.jpg',
        'central@academy.com'
    );