const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Store username or user ID
  category: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  answers: [
    {
      question: String,
      selectedOption: String,
      correctAnswer: String,
      reference: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', ResultSchema);
