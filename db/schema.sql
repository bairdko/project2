DROP DATABASE IF EXISTS persona_db;
CREATE DATABASE persona_db;

USE persona_db;

/*USER table schema*/

CREATE TABLE users (
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(255),
		email VARCHAR(255) NOT NULL,
		password BINARY(60)
    );

/* PROFILES table schema */
    
CREATE TABLE profile (
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        profile_type_id INTEGER NOT NULL,
        profile_name VARCHAR(255) NOT NULL,
        user_pseudo VARCHAR(255)
	);
    
/*PROFILE TYPE table schema */
CREATE TABLE profile_type (
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
        profile_type VARCHAR(255) NOT NULL,
        profile_icon VARCHAR(255)
	);
    
/*DETAIL TYPE table schema */
CREATE TABLE detail_type (
	id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	detail_type VARCHAR(255) NOT NULL,
    detail_icon VARCHAR(255)
    );
    
/*PROFILE DETAILS*/    
CREATE TABLE profile_details (
	id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    profile_id INTEGER NOT NULL,
    detail_type_id INTEGER NOT NULL,
    description VARCHAR(255),
    url VARCHAR(255),
    CONSTRAINT FK_profId 
        FOREIGN KEY (profile_id) 
        REFERENCES profile(id)
        ON DELETE CASCADE
);
