
const mongoose = require('mongoose');

const { Schema } = mongoose;


const questionSchema = new Schema({
  product_id: {
    type: Number,
    required: true
  },
  questions: [
    {
      question_id: Number,
      page: Number,
      count: Number,
      asker_name: String,
      asker_email: String,
      question_body: String,
      question_date: Date,
      question_helpfulness: Number,
      reported: Boolean,
      answers: [
        {
          answer_id: Number,
          answer_body: String,
          answer_date: Date,
          answerer_name: String,
          answerer_email: String,
          answer_helpfulness: Number,
          reported: Boolean,
          photos: [
            {
              photo_id: Number,
              url: String,
              thumbnail: String,
            }
          ]
        }
      ]
    }
  ]
})

let question = mongoose.model('question', questionSchema);



module.exports = {
  question: question,
}

// const productSchema = new Schema({
//   product_id: Number,
//   questions: [
//     //questionsSchema.question_id, //multiple questions?
//    ],
//   answers: [
//     //answerSchema.answer_id,
//   ],
//   clients: [
//     //clientSchema.client_id,
//   ],
//   photos: [
//   //photoSchema.photo_id,
//   ]
// })

// const clientSchema = new Schema ({
//   client_id : Number,
//   client_name: String,
//   client_email: String,
//   client_questions: [
//     //questionsSchema.question_id,
//   ],
//   client_answers: [
//     //answerSchema.answer_id,
//   ],
//   client_photos: [
//     //photoSchema.photo_id,
//   ]
// })

// const questionsSchema = new Schema({
//   product_id: Number, //(productSchema.product_id),
//   client_id : Number, //( clientSchema.client_id),
//   question_id: Number,
//   question_body: String,
//   question_date: Date,
//   asker_name: String, //(clientSchema),
//   question_helpfulness: Number,
//   reported: Boolean,
//     answers: [
//       Number, //(answerSchema.answer_id),
//     ]
// })

// const answerSchema = new Schema ({
//   answer_id: Number,
//   product_id: Number, // (productSchema.product_id),
//     client_id : Number, // ( clientSchema.client_id),
//         question_id: Number, //(questionSchema.question_id),
//    page: Number,
//    count: Number,
//    answer_body: String,
//    answer_date: Date,
//    answerer_name: String, // (clientSchema.client_id.name),
//    answer_helpfulness: Number,
//    photos: [
//       //photoSchema.photo_id
//     ],
// })

// const photoSchema = new Schema ({
//  photo_id: Number,
//   photo_url: String,
// })