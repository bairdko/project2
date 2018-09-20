CREATE DATABASE persona_db;

USE persona_db;

CREATE TABLE users (
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(255),
		email VARCHAR(255) NOT NULL,
		password BINARY(60)
    );
