const express = require('express');
const db = require('./mongoose.js');
const mongoose = require('mongoose');
const question = require('./mongoose.js');
const app = express();
const port = 3000;

const connection = mongoose.connection;

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.use(express.json());

//get requests
app.get('/qa/questions', (req, res) => {
  res.send('Hello World!')
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  res.send('Hello World!')
})

//post requests
app.post('/qa/questions', (req, res) => {
  res.send('Hello World!')
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.send('Hello World!')
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