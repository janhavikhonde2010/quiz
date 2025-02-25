const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: { type: String, required: true },
      reference: { type: String },
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
