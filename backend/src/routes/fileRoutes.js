const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadFile, getFileDetails } = require('../controllers/fileController');

// POST /api/upload - Upload file (supports PDF, images)
router.post('/upload', upload.single('file'), uploadFile);

// GET /api/file/:id - Get file details by ID
router.get('/file/:id', getFileDetails);

module.exports = router;