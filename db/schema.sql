DROP DATABASE IF EXISTS game;

CREATE DATABASE game;

USE game;

CREATE TABLE users (
id INT(50) auto_increment not null,
name VARCHAR(255) not null,
email VARCHAR(255) not null,
password VARCHAR(255) not null,
token VARCHAR(255),
level INT(50) not null,
coins INT(50) not null,
primary key(id)
);

CREATE TABLE riddles (
id INT(50) auto_increment not null,
text VARCHAR(255) not null,
answer VARCHAR(255) not null,
level INT(50) not null,
primary key(id)
);

CREATE TABLE riddles_correct(
user INT(50) not null,
riddle INT(50) not null
);