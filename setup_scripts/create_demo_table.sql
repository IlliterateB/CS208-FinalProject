CREATE DATABASE IF NOT EXISTS cs208demo;

USE cs208demo;

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    written DATETIME DEFAULT NOW()
);

TRUNCATE TABLE comments;

INSERT INTO comments(body)
VALUE ("hello, this is the initial comment to test");