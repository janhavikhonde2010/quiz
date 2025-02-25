const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

// Save quiz result
router.post('/save', async (req, res) => {
  try {
    const { username, category, score, totalQuestions, answers } = req.body;

    const newResult = new Result({
      username,
      category,
      score,
      totalQuestions,
      answers,
    });

    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save result', details: error.message });
  }
});

// Get all results
router.get('/', async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

module.exports = router;
