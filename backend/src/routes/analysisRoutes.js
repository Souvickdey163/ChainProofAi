const express = require('express');
const router = express.Router();
const { analyzeFile } = require('../controllers/analysisController');

// POST /api/analyze - Analyze uploaded file
router.post('/analyze', analyzeFile);

module.exports = router;