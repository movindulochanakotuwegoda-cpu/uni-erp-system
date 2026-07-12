-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS erp_db;
USE erp_db;

-- 1. Table structure for Student Management (SIMS)
CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    faculty VARCHAR(100) NOT NULL
);

-- 2. Table structure for Course Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    enrollment_date VARCHAR(50) NOT NULL
);

-- 3. Table structure for Exams & Grading
CREATE TABLE IF NOT EXISTS grades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    marks INT NOT NULL,
    grade VARCHAR(5) NOT NULL
);

-- 4. Table structure for Attendance Tracking
CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL
);