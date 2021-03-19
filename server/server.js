const express = require('express');
const mysql = require('mysql');
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

app.use(express.json());

//get requests
app.get('/qa/questions', (req, res) => {
  //requires product_id (from questions), page and count
  var body = req.body
  db.query(`SELECT * FROM question WHERE product_id=? LIMIT 20`, [body.product_id], (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      console.log(results)
      res.send(results)
    }
  })
})

app.get(`/qa/questions/:product_id/answers`, (req, res) => {
  console.log(req)
})

//post requests
app.post('/qa/questions', (req, res) => {
  console.log(req.body)
  // db.query('INSERT INTO question () LIMIT 20', (err, results) => {
  //   if (err) {
  //     console.log(err)
  //     res.sendStatus(400)
  //   } else {
  //     console.log(results)
  //     res.send(results)
  //   }
  // })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {

})

//put requests:
app.put('/qa/questions', (req, res) => {
  res.send('Hello World!')
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.send('Hello World!')
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send('Hello World!')
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})