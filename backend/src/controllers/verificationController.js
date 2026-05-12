const fileService = require('../services/fileService');
const blockchainService = require('../services/blockchainService');
const { generateFileHash } = require('../utils/cryptoHelper');
const path = require('path');

/**
 * Verify file authenticity
 * @route POST /api/verify
 */
const verifyFile = async (req, res, next) => {
    try {
        const { fileHash, fileId } = req.body;

        if (!fileHash && !fileId) {
            return res.status(400).json({
                success: false,
                error: 'Either fileHash or fileId is required'
            });
        }

        let file = null;
        let hashToVerify = fileHash;

        // Get file by ID if provided
        if (fileId) {
            file = await fileService.getFileById(fileId);
            hashToVerify = file.fileHash;
        }

        // Verify on blockchain
        const blockchainVerification = await blockchainService.verifyFileHash(hashToVerify);

        // Get file details if available
        const fileDetails = file || await fileService.getFileByHash(hashToVerify);

        res.status(200).json({
            success: true,
            data: {
                fileHash: hashToVerify,
                isVerified: blockchainVerification.isValid,
                blockchain: {
                    verified: blockchainVerification.isValid,
                    verifier: blockchainVerification.verifier,
                    timestamp: blockchainVerification.timestamp,
                    transactionHash: blockchainVerification.transactionHash
                },
                fileDetails: fileDetails ? {
                    originalName: fileDetails.originalName,
                    fileSize: fileDetails.fileSize,
                    mimeType: fileDetails.mimeType,
                    trustScore: fileDetails.analysis?.trustScore,
                    uploadedAt: fileDetails.uploadedAt
                } : null,
                verificationTimestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Generate verification report
 * @route GET /api/verify/:id/report
 */
const generateVerificationReport = async (req, res, next) => {
    try {
        const file = await fileService.getFileById(req.params.id);

        const report = {
            fileInfo: {
                id: file._id,
                name: file.originalName,
                hash: file.fileHash,
                size: file.fileSize,
                type: file.mimeType,
                uploadedAt: file.uploadedAt
            },
            trustAnalysis: file.analysis ? {
                trustScore: file.analysis.trustScore,
                rating: file.analysis.trustScore >= 80 ? 'AUTHENTIC' : 
                        file.analysis.trustScore >= 60 ? 'CAUTION' : 'SUSPICIOUS',
                ocrConfidence: file.analysis.ocrConfidence,
                tamperingDetected: file.analysis.tamperingDetected,
                metadataIssues: file.analysis.metadataIssues,
                suspiciousRegions: file.analysis.suspiciousRegions
            } : null,
            blockchainVerification: file.blockchain ? {
                verified: file.blockchain.verified,
                transactionHash: file.blockchain.transactionHash,
                blockNumber: file.blockchain.blockNumber,
                timestamp: file.blockchain.timestamp
            } : null,
            verificationLink: file.verificationLink,
            generatedAt: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyFile,
    generateVerificationReport
};