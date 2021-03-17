
DROP DATABASE IF EXISTS questionsAndAnswers;
CREATE DATABASE questionsAndAnswers;
USE questionsAndAnswers;

CREATE TABLE product (
  product_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(200) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price INT NOT NULL
);

CREATE TABLE question (
  question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT(1000) NOT NULL,
  date_written VARCHAR(100) NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE answer (
  answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  question_id INT NOT NULL,
  body TEXT(1000) NOT NULL,
  date_written VARCHAR(100) NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES question(question_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE photo (
  photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  answer_id INT NOT NULL,
  thumbnail_url VARCHAR(300) NOT NULL,
  photo_url VARCHAR(300) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answer(answer_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);