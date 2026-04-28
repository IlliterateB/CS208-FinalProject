CREATE DATABASE IF NOT EXISTS cs208demo;

USE cs208demo;

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    written TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRUNCATE TABLE comments;

-- INSERT INTO comments(body)
-- VALUES ("hello, this is the initial comment to test,
--  and it comments each time the website is set up from the codespace.");