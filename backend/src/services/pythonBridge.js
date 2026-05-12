const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class PythonAIService {
    constructor() {
        this.serviceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:5002';
    }

    /**
     * Analyze file for tampering and authenticity
     * @param {string} filePath - Path to the file
     * @param {string} fileHash - SHA-256 hash of the file
     * @returns {Promise<Object>} - Analysis results
     */
    async analyzeFile(filePath, fileHash) {
        try {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath));
            formData.append('fileHash', fileHash);

            const response = await axios.post(`${this.serviceUrl}/analyze`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 30000 // 30 seconds timeout
            });

            return response.data;
        } catch (error) {
            console.error('Python service error:', error.message);
            // Return default analysis if Python service is unavailable
            return this.getDefaultAnalysis();
        }
    }

    /**
     * Get default analysis when AI service is unavailable
     * @returns {Object} - Default analysis results
     */
    getDefaultAnalysis() {
        return {
            trustScore: 50,
            ocrConfidence: 0.7,
            tamperingDetected: false,
            suspiciousRegions: [],
            metadataIssues: ['AI analysis service unavailable'],
            detailedReport: {
                summary: 'Automatic analysis failed. Manual verification recommended.',
                recommendations: ['Verify file source', 'Check metadata manually']
            }
        };
    }
}

module.exports = new PythonAIService();
