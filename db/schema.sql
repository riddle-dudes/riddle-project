DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
id INT(50) auto_increment not null,
burger_name VARCHAR(255),
devoured BOOLEAN,
primary key(id)
);

SELECT * FROM burgers;