CREATE DATABASE IF NOT EXISTS chat_group;

USE groupdb;

-- tabla de usuarios
CREATE TABLE user (
   id INT NOT NULL, 
   name VARCHAR (50),
   lastname VARCHAR (50),
   email VARCHAR (50),
   password VARCHAR (100),
   PRIMARY KEY (id),
   UNIQUE KEY email (email),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--agregar columana
ALTER TABLE user
ADD COLUMN profile_image VARCHAR(300);
ALTER TABLE user
ADD COLUMN image_id VARCHAR(100);

show tables;
-- ver como luce la tabla
describe user;

INSERT INTO user VALUES
(52, 'John', 'Doe', 'doe@gamil.com', '12345' );

-- tabla de canales
CREATE TABLE channel (
   id INT NOT NULL AUTO_INCREMENT, 
   name VARCHAR (50),
   description VARCHAR(200),
   creator_id INT,
   PRIMARY KEY (id),
   FOREIGN KEY (creator_id) REFERENCES user(id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabla de members
CREATE TABLE members (
   id INT NOT NULL AUTO_INCREMENT, 
   user_id INT,
   channel_id INT,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (channel_id) REFERENCES channel(id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabla de comments
CREATE TABLE comments (
   id VARCHAR(40) NOT NULL, 
   content VARCHAR (500),
   user_id INT,
   channel_id INT,
   date_creation DATETIME,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (channel_id) REFERENCES channel(id),
   INDEX (user_id),
   INDEX (channel_id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--tabla de imagenes comentario
CREATE TABLE comment_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment_id VARCHAR(40),
  image_url VARCHAR(255),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  INDEX (comment_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO channel ( name, description, creator_id) 
VALUES (Comunidad JavaScript, Bienvenidos al canal, hablamso sobre codigos js noticas y mucho mas, 615);

--add column
ALTER TABLE comment_images
ADD COLUMN imageComment_id VARCHAR(30);

--modify column
ALTER TABLE comment_images
MODIFY COLUMN imageComment_id VARCHAR(255);


ALTER TABLE comment_images
DROP FOREIGN KEY CONSTRAINT_NAME;

ALTER TABLE comment_images
DROP COLUMN CONSTRAINT_NAME;

--elimar columan de un atabla
ALTER TABLE comments
DROP COLUMN id;

--tabla eliminar
DROP TABLE comment_images;

--agregar columna 
ALTER TABLE comments
ADD COLUMN id VARCHAR(100) NOT NULL;


--clave primaria de una tabla
SHOW KEYS FROM comments WHERE Key_name = 'PRIMARY';

--agregar columa y colocar de priamry key
ALTER TABLE comments
ADD COLUMN id VARCHAR(100) NOT NULL,
ADD PRIMARY KEY (id);


ALTER TABLE user
ADD COLUMN image_id VARCHAR(255);







