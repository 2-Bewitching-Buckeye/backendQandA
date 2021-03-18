
DROP DATABASE IF EXISTS questionsAndAnswers;
CREATE DATABASE questionsAndAnswers;
USE questionsAndAnswers;

CREATE TABLE product (
  product_id INT NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE question (
  question_id INT NOT NULL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT(1000) NOT NULL,
  date_written VARCHAR(100) NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT 0,
  helpful INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE answer (
  answer_id INT NOT NULL UNIQUE PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT(1000) NOT NULL,
  date_written VARCHAR(100) NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT 0,
  helpful INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES question(question_id)
);

CREATE TABLE photo (
  photo_id INT NOT NULL UNIQUE PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(300) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answer(answer_id)
);

--pager less -SFX

--SET GLOBAL local_infile = true;

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/answers_clean.csv' INTO TABLE answer FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/product_clean.csv' INTO TABLE product FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/questions_clean.csv' INTO TABLE question FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/answers_photos_clean.csv' INTO TABLE photo FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;