CREATE DATABASE video_conference;

USE video_conference;

CREATE TABLE hosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    conference_id VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT NOT NULL,
    session_time DATETIME NOT NULL,
    FOREIGN KEY (host_id) REFERENCES hosts(id)
);
