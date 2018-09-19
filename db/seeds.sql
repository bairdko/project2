
/*SEEDS - will indicate if test data or necessary for functionality*/

/*user seeds - TEST DATA ONLY*/
INSERT INTO users (first_name, last_name, email, password)
VALUES ("John", "Doe", "john@email.com", "password1"),
("Jane","Doe","jane@email.com","password2");

/*profile seeds - TEST DATA ONLY*/

INSERT INTO profile (user_id, profile_type_id, profile_name, user_pseduo)
VALUES ( 1, 

/*profile details seeds - TEST DATA ONLY*/

/*profile type seeds - NECESSARY FOR FUNCTIONALITY*/

INSERT INTO profile_type (profile_type)
VALUES 
("personal"),
("professional"),
("dating"),
("custom");

/*detail type seeds - NECESSARY FOR FUNCTIONALITY*/

INSERT INTO detail_type (detail_type)
VALUES
("text"),
("personal"),
("facebook"),
("instagram"),
("twitter"),
("youtube"),
("academic"),
("linkedin"),
("custom");