
const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

// POST /api/chat/response - Get AI chat response
router.post('/response', chatController.getAIChatResponse);

module.exports = router;
