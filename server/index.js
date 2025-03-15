
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

// Import routes
const chatRoutes = require('./routes/chatRoutes');
const policyRoutes = require('./routes/policyRoutes');
const insurancePlanRoutes = require('./routes/insurancePlanRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit to 10MB
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Make multer available to route handlers
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/insurance-plans', insurancePlanRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Internal Server Error' 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
