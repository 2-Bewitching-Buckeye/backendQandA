
DROP DATABASE IF EXISTS questionsAndAnswers;
CREATE DATABASE questionsAndAnswers;
USE questionsAndAnswers;

CREATE TABLE product (
  product_id INT NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE question (
  question_id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  prod_id INT NOT NULL,
  question_body TEXT(1000) NOT NULL,
  question_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  question_reported BOOLEAN DEFAULT 0,
  question_helpfulness SMALLINT UNSIGNED DEFAULT 0,
  FOREIGN KEY (prod_id) REFERENCES product(product_id)
);

CREATE INDEX prod_id ON question (prod_id);

CREATE TABLE answer (
  answer_id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  quest_id INT NOT NULL,
  body TEXT(1000) NOT NULL,
  answer_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  answer_reported BOOLEAN DEFAULT 0,
  answer_helpfulness SMALLINT UNSIGNED DEFAULT 0,
  FOREIGN KEY (quest_id) REFERENCES question(question_id)
);

CREATE INDEX quest_id ON answer (quest_id);

CREATE TABLE photo (
  photo_id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  ans_id INT NOT NULL,
  photo_url VARCHAR(300) NOT NULL,
  FOREIGN KEY (ans_id) REFERENCES answer(answer_id)
);

CREATE INDEX ans_id ON photo (ans_id);

--pager less -SFX

-- ALTER TABLE answer MODIFY COLUMN answer_id INT auto_increment


--SET GLOBAL local_infile = true;

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/answers_clean.csv' INTO TABLE answer FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/product_clean.csv' INTO TABLE product FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/questions_clean.csv' INTO TABLE question FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- LOAD DATA LOCAL INFILE '/Users/pattop/Desktop/MainCourse/bBuckeye/backendQandA/cleanFiles/answers_photos_clean.csv' INTO TABLE photo FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';