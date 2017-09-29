﻿DROP SCHEMA IF EXISTS tccapp CASCADE;
CREATE SCHEMA tccapp;

CREATE SEQUENCE tccapp.pk_users;
CREATE SEQUENCE tccapp.pk_posts;

CREATE TABLE tccapp.users(
	id_user INTEGER NOT NULL DEFAULT NEXTVAL('tccapp.pk_users') PRIMARY KEY,
	firstname VARCHAR(50),
	surname VARCHAR(50),
	login VARCHAR(50) NOT NULL,
	passwd VARCHAR(50) NOT NULL,
	email VARCHAR(70)
);

CREATE TABLE tccapp.posts(
	id_post INTEGER NOT NULL DEFAULT NEXTVAL('tccapp.pk_posts') PRIMARY KEY,
	val TEXT NOT NULL,
	datePost TIMESTAMP NOT NULL DEFAULT NOW()
);
	