const express = require('express');
const mysql = require('mysql2');
const mysqlConfig = require('../db/config.js');

const app = express();
const port = 3000;
const db = mysql.createConnection(mysqlConfig);


db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log('I connected')
  }
});

//reusable question format
const questionObj = (question) => {
  const { question_id, question_body, asker_email, question_date, asker_name, question_helpfulness, question_reported} = question;

  return {
  "question_id": question_id,
  "question_body": question_body,
  "question_date": question_date,
  "asker_name": asker_name,
  "asker_email": asker_email,
  "question_helpfulness": question_helpfulness,
  "reported": question_reported === 0 ? false : true,
  "answers": {}
  }
};

//reusable answer format
const answerObj = (answer) => {
  const { answer_id, body, answer_date, answerer_name, answer_reported, answer_helpfulness } = answer
  return {
    "answer_id": answer_id,
    "body": body,
    "date": answer_date,
    "answerer_name": answerer_name,
    "helpfulness": answer_helpfulness,
    "reported": answer_reported === 0 ? false : true,
    "photos": []
  }
};

//reusable photo format
const photoObj = (photo) => {
  const { photo_id, photo_url } = photo
  return {
    "id": photo_id,
    "url": photo_url
  }
};

app.use(express.json());

//get requests
// app.get('/qa/questions', (req, res) => {
//   //requires product_id (from questions), page and count
//   var query = req.query
//   db.query(`SELECT * FROM question WHERE product_id=?`, [query.product_id], (err, results) => {
//     if (err) {
//       console.log(err)
//       res.sendStatus(400)
//     } else {
//       console.log(results)
//       res.send(results)
//     }
//   })
// })

app.get('/qa/questions', (req, res) => {
  //requires product_id (from questions), page and count
  var query = req.query
  var productObj = {
    "product_id": query.product_id,
    "results": []
  };
  //select all related data where product_id = ?
  db.query(`SELECT * FROM product INNER JOIN (question, answer, photo) ON (question.prod_id=product.product_id AND answer.quest_id=question.question_id AND photo.ans_id=answer.answer_id) WHERE product.product_id=?`, [query.product_id, query.page, query.count], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {

      var questionID;
      var answerID;
      var photoID;
      var questionCount = -1;
      //loop over results array, format data to match atelier
        //tons of if else statements to add answers or photos, depending on if they've appeared or not in results. Only adding when they haven't appeared, skipping if they have appeared.
      results.forEach((question) => {

        if (question.question_id !== questionID) {
          productObj.results.push(questionObj(question));
          questionID = question.question_id;
          questionCount++;

          if (question.answer_id && question.answer_id !== answerID) {
            productObj.results[questionCount].answers[question.answer_id] = answerObj(question)
            answerID = question.answer_id;

            if (question.photo_id && question.photo_id !== photoID) {
              productObj.results[questionCount].answers[question.answer_id].photos.push(photoObj(question))
              photoID = question.photo_id
            }

          }

        } else {
          if (question.answer_id && question.answer_id !== answerID) {
            productObj.results[questionCount].answers[question.answer_id] = answerObj(question)
            answerID = question.answer_id;

            if (question.photo_id && question.photo_id !== photoID) {
              productObj.results[questionCount].answers[question.answer_id].photos.push(photoObj(question))
              photoID = question.photo_id
            }
          } else {
            if (question.photo_id && question.photo_id !== photoID) {
              productObj.results[questionCount].answers[question.answer_id].photos.push(photoObj(question))
              photoID = question.photo_id
            }
          }
        }
      })
      res.send(productObj)
    }
  })
})

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  var params = req.params
  var query = req.query
  console.log(query)
  var answerResult = {
    "question": params.question_id,
    "page": query.page,
    "count": query.count,
    "results": []
  }
  db.query(`SELECT * FROM answer INNER JOIN photo ON photo.ans_id=answer.answer_id WHERE answer.quest_id=?`, [params.question_id, query.page, query.count], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {

      var answerID;
      var photoID;
      var answerCount = -1;

      results.forEach((answer) => {
        if (answer.answer_id !== answerID) {
          answerResult.results.push(answerObj(answer))
          answerID = answer.answer_id;
          answerCount++;
          if (answer.photo_id !== photoID) {
            answerResult.results[answerCount].photos.push(photoObj(answer));
            photoID = answer.photo_id
          }
        } else {
          if (answer.photo_id !== photoID) {
            answerResult.results[answerCount].photos.push(photoObj(answer));
            photoID = answer.photo_id
          }
        }
      })

      res.send(answerResult)
    }
  })
})

//post requests
app.post('/qa/questions', (req, res) => {
  const body = req.body
  console.log(body)
  db.query('INSERT INTO question (prod_id, question_body, asker_name, asker_email) VALUES (?, ?, ?, ?)', [body.product_id, body.question_body, body.asker_name, body.asker_email], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      console.log(results)
      res.sendStatus(200)
      // db.query(`SELECT * FROM question WHERE question_id=?`, [results.insertId], (err, results) => {
      //   if (err) {
      //     console.log(err)
      //     res.sendStatus(400)
      //   } else {
      //     console.log(results)
      //     res.send(results)
      //   }
      // })
    }
  })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  var params = req.params
  var body = req.body
  db.query('INSERT INTO answer (quest_id, body, answerer_name, answerer_email) VALUES (?, ?, ?, ?)', [params.question_id, body.body, body.answerer_name, body.answerer_email], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      //need to figure out how to loop through array of multiple photos and insert each one individually.
      if (body.photos) {
        db.query('INSERT INTO photo (ans_id, photo_url) VALUES (?, ?)', [results.insertId, body.photos], (err, results) => {
          if (err) {
            console.log(err),
            res.sendStatus(400)
          } else {
            console.log(results)
            res.sendStatus(200)
          }
        })
      } else {
      res.sendStatus(200)
      }
      // db.query(`SELECT * FROM answer WHERE answer_id=?`, [results.insertId], (err, results) => {
      //   if (err) {
      //     console.log(err)
      //     res.sendStatus(400)
      //   } else {
      //     console.log(results)
      //     res.sendStatus(200).send(results)
      //   }
      // })
    }
  })
})

//question put requests:
app.put('/qa/questions/:question_id/report', (req, res) => {
  var params = req.params
  db.query(`UPDATE question SET question_reported = question_reported + 1 WHERE question_id=?`, [params.question_id], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      console.log(results)
      res.sendStatus(200)
    }
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  var params = req.params
  db.query(`UPDATE question SET question_helpfulness = question_helpfulness + 1 WHERE question_id=?`, [params.question_id], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

//answer put requests:
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  var params = req.params
  db.query(`UPDATE answer SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id=?`, [params.answer_id], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {

      res.sendStatus(200)
    }
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  var params = req.params
  db.query(`UPDATE answer SET answer_reported = answer_reported + 1 WHERE answer_id=?`, [params.answer_id], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {

      res.sendStatus(200)
    }
  })
})

//port listen:
app.listen(port, () => {
  console.log(`Listening at port:${port}`)
})