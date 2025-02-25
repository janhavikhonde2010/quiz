const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // No need to remove, but it's deprecated
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); // Exit process with failure
  });

// Sample route to check server
app.get('/', (req, res) => {
  res.send('Quiz Game API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
