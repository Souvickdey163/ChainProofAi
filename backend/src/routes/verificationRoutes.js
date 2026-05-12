const express = require('express');
const router = express.Router();
const { verifyFile, generateVerificationReport } = require('../controllers/verificationController');

// POST /api/verify - Verify file authenticity
router.post('/verify', verifyFile);

// GET /api/verify/:id/report - Generate verification report
router.get('/verify/:id/report', generateVerificationReport);

module.exports = router;