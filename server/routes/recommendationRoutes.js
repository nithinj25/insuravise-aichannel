
const express = require('express');
const recommendationController = require('../controllers/recommendationController');
const router = express.Router();

// POST /api/recommendations/personalized - Get personalized recommendations
router.post('/personalized', recommendationController.getPersonalizedRecommendations);

module.exports = router;
