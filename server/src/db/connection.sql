CREATE DATABASE IF NOT EXISTS groupdb;

USE groupdb;

CREATE TABLE user (
   id INT NOT NULL AUTO_INCREMENT, 
   name VARCHAR (50),
   lastname VARCHAR (50),
   username VARCHAR (50),
   email VARCHAR (50),
   password VARCHAR (100),
   PRIMARY KEY (id)
);

show tables;
-- ver como luce la tabla
describe user;

INSERT INTO user VALUES
(1, 'John', 'Doe', 'doe123', 'doe@gamil.com', '12345' );
