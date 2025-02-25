// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true, // No need to remove, but it's deprecated
// })
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//     process.exit(1); // Exit process with failure
//   });

// // Sample route to check server
// app.get('/', (req, res) => {
//   res.send('Quiz Game API is running...');
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS Configuration (Uncomment if needed for specific frontend domains)
const corsOptions = {
  origin: "https://quiz-yfee-frontend.vercel.app", // Your frontend domain
  methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allow specific headers
};
app.use(cors(corsOptions)); 

app.use(cors()); // Default CORS enabled for all origins

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
