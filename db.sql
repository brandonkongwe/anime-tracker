CREATE DATABASE anime;

USE anime;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  favorites JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anime_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  anime_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  status ENUM('watching', 'completed', 'on-hold', 'dropped', 'plan-to-watch') NOT NULL,
  episodes_watched INT DEFAULT 0,
  rating INT CHECK (rating >= 1 AND rating <= 10),
  notes TEXT,
  image_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);