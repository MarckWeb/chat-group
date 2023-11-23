CREATE DATABASE IF NOT EXISTS groupdb;

USE groupdb;

-- tabla de usuarios
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

-- tabla de canales
CREATE TABLE channel (
   id INT NOT NULL AUTO_INCREMENT, 
   name VARCHAR (50),
   description VARCHAR(200),
   creator_id INT,
   PRIMARY KEY (id),
   FOREIGN KEY (creator_id) REFERENCES user(id)
);

-- tabla de members
CREATE TABLE members (
   id INT NOT NULL AUTO_INCREMENT, 
   user_id INT,
   channel_id INT,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (channel_id) REFERENCES channel(id)
);

-- tabla de comments
CREATE TABLE comments (
   id INT NOT NULL AUTO_INCREMENT, 
   content VARCHAR (500),
   user_id INT,
   channel_id INT,
   date_creation DATETIME,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (channel_id) REFERENCES channel(id),
    INDEX (user_id),
   INDEX (channel_id)
);

--tabla de imagenes comentario
CREATE TABLE comment_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment_id INT,
  image_url VARCHAR(255),
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);