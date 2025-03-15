
const express = require('express');
const insurancePlanController = require('../controllers/insurancePlanController');
const router = express.Router();

// GET /api/insurance-plans - Get all insurance plans
router.get('/', insurancePlanController.getInsurancePlans);

// GET /api/insurance-plans/:type - Get insurance plans by type
router.get('/:type', insurancePlanController.getInsurancePlansByType);

// GET /api/insurance-plans/details/:id - Get insurance plan details
router.get('/details/:id', insurancePlanController.getInsurancePlanDetails);

module.exports = router;
