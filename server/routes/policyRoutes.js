
const express = require('express');
const policyController = require('../controllers/policyController');
const router = express.Router();

// POST /api/policy/analyze - Analyze policy PDF
router.post('/analyze', (req, res, next) => {
  req.upload.single('policyFile')(req, res, (err) => {
    if (err) return next(err);
    policyController.analyzePolicyPdf(req, res, next);
  });
});

// POST /api/policy/summarize - Summarize policy from URL
router.post('/summarize', policyController.summarizePolicyPdf);

module.exports = router;
