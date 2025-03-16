
const express = require('express');
const policyController = require('../controllers/policyController');
const router = express.Router();

// Set up multer middleware for file uploads
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/policy/analyze - Analyze policy PDF
router.post('/analyze', upload.single('policyFile'), policyController.analyzePolicyPdf);

// POST /api/policy/summarize - Summarize policy from URL
router.post('/summarize', policyController.summarizePolicyPdf);

module.exports = router;
