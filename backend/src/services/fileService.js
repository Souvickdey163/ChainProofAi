const FileDocument = require('../models/FileDocument');
const { generateFileHash } = require('../utils/cryptoHelper');
const fs = require('fs').promises;

class FileService {
    /**
     * Save file metadata to database
     * @param {Object} file - Multer file object
     * @param {string} fileHash - SHA-256 hash
     * @returns {Promise<Object>} - Saved file document
     */
    async saveFileMetadata(file, fileHash) {
        const fileData = new FileDocument({
            originalName: file.originalname,
            filename: file.filename,
            filePath: file.path,
            fileSize: file.size,
            mimeType: file.mimetype,
            fileHash: fileHash
        });

        await fileData.save();
        return fileData;
    }

    /**
     * Get file by ID
     * @param {string} fileId - MongoDB file ID
     * @returns {Promise<Object>} - File document
     */
    async getFileById(fileId) {
        const file = await FileDocument.findById(fileId);
        if (!file) {
            throw new Error('File not found');
        }
        return file;
    }

    /**
     * Get file by hash
     * @param {string} fileHash - SHA-256 hash
     * @returns {Promise<Object>} - File document
     */
    async getFileByHash(fileHash) {
        return await FileDocument.findOne({ fileHash });
    }

    /**
     * Update file analysis results
     * @param {string} fileId - MongoDB file ID
     * @param {Object} analysisResults - Analysis results from AI
     * @returns {Promise<Object>} - Updated file document
     */
    async updateAnalysis(fileId, analysisResults) {
        const file = await FileDocument.findById(fileId);
        if (!file) {
            throw new Error('File not found');
        }

        file.analysis = {
            ...analysisResults,
            analyzedAt: new Date()
        };

        await file.save();
        return file;
    }

    /**
     * Update blockchain verification details
     * @param {string} fileId - MongoDB file ID
     * @param {Object} blockchainData - Blockchain transaction data
     * @returns {Promise<Object>} - Updated file document
     */
    async updateBlockchainData(fileId, blockchainData) {
        const file = await FileDocument.findById(fileId);
        if (!file) {
            throw new Error('File not found');
        }

        file.blockchain = {
            ...blockchainData,
            verified: true
        };

        await file.save();
        return file;
    }

    /**
     * Delete file from storage
     * @param {string} filePath - Path to file
     * @returns {Promise<void>}
     */
    async deleteFileFromStorage(filePath) {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error.message);
        }
    }
}

module.exports = new FileService();