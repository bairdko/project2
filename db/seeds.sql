
/*SEEDS - will indicate if test data or necessary for functionality*/

/*

/*profile seeds - TEST DATA ONLY*/

INSERT INTO profile (user_id, profile_type_id, profile_name, user_pseudo)
VALUES ( 1, 2, "Test", "Test");

/*profile details seeds - TEST DATA ONLY*/
/* I accidentally deleted this*/

/*profile type seeds - NECESSARY FOR FUNCTIONALITY*/

INSERT INTO profile_type (profile_type,profile_icon)
VALUES 
("personal","fa-user"),
("professional","fa-briefcase"),
("dating","fa-heart"),
("custom","fa-comment-dots");

/*detail type seeds - NECESSARY FOR FUNCTIONALITY*/

INSERT INTO detail_type (detail_type,detail_icon)
VALUES
("text",null),
("facebook","/assets/img/facebook.png"),
("instagram","/assets/img/instagram.png"),
("twitter","/assets/img/twitter.png"),
("youtube","/assets/img/youtube.png"),
("spotify","/assets/img/spotify.png"),
("linkedin","/assets/img/linkedin.png"),
("custom",null);