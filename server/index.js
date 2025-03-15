
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Import routes
const insurancePlanRoutes = require('./routes/insurancePlanRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const policyRoutes = require('./routes/policyRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Set up file upload middleware
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Origin not allowed by CORS:", origin);
      callback(null, true); // In development, allow all origins for easier testing
    }
  },
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// Attach upload middleware to request for use in route handlers
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes
app.use('/api/insurance-plans', insurancePlanRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/chat', chatRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
