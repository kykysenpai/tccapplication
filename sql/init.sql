DROP SCHEMA IF EXISTS tccapp CASCADE;
CREATE SCHEMA tccapp;

CREATE SEQUENCE tccapp.pk_users;
CREATE SEQUENCE tccapp.pk_posts;

CREATE TABLE tccapp.users(
	id_user INTEGER NOT NULL DEFAULT NEXTVAL('tccapp.pk_users') PRIMARY KEY,
	firstname VARCHAR(50),
	surname VARCHAR(50),
	login VARCHAR(50) NOT NULL,
	passwd VARCHAR(100) NOT NULL,
	email VARCHAR(70)
);

CREATE TABLE tccapp.posts(
	id_post INTEGER NOT NULL DEFAULT NEXTVAL('tccapp.pk_posts') PRIMARY KEY,
	val TEXT NOT NULL,
	id_user INTEGER NOT NULL,
	datePost TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT user_post_fk FOREIGN KEY (id_user) REFERENCES tccapp.users (id_user)
);


INSERT INTO tccapp.users VALUES (DEFAULT, NULL, NULL, 'KykySenpai', '$2a$10$7GhqeawTbD8XsV.ZvAvB8uKFUtS5NEkDhxyzVUaVxEbTHIWi0egx.', NULL); -- pwd = TCC --
INSERT INTO tccapp.users VALUES (DEFAULT, NULL, NULL, 'Locky', '$2a$10$7GhqeawTbD8XsV.ZvAvB8uKFUtS5NEkDhxyzVUaVxEbTHIWi0egx.', NULL);
