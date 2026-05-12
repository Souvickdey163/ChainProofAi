const fileService = require('../services/fileService');
const pythonAIService = require('../services/pythonBridge');
const blockchainService = require('../services/blockchainService');

/**
 * Analyze uploaded file for tampering
 * @route POST /api/analyze
 */
const analyzeFile = async (req, res, next) => {
    try {
        const { fileId } = req.body;
        
        if (!fileId) {
            return res.status(400).json({
                success: false,
                error: 'File ID is required'
            });
        }

        // Get file from database
        const file = await fileService.getFileById(fileId);

        // Check if already analyzed
        if (file.analysis && file.analysis.trustScore) {
            return res.status(200).json({
                success: true,
                message: 'File already analyzed',
                data: {
                    fileId: file._id,
                    fileHash: file.fileHash,
                    trustScore: file.analysis.trustScore,
                    analysis: file.analysis,
                    blockchain: file.blockchain?.verified ? {
                        verified: true,
                        transactionHash: file.blockchain.transactionHash,
                        blockNumber: file.blockchain.blockNumber
                    } : null
                }
            });
        }

        // Call Python AI service for analysis
        const analysisResults = await pythonAIService.analyzeFile(
            file.filePath,
            file.fileHash
        );

        // Update file with analysis results
        const updatedFile = await fileService.updateAnalysis(fileId, analysisResults);

        // Store hash on blockchain if trust score is good
        let blockchainData = null;
        if (analysisResults.trustScore >= 70) {
            blockchainData = await blockchainService.storeFileHash(file.fileHash);
            await fileService.updateBlockchainData(fileId, blockchainData);
        }

        res.status(200).json({
            success: true,
            message: 'Analysis completed successfully',
            data: {
                fileId: file._id,
                fileHash: file.fileHash,
                trustScore: analysisResults.trustScore,
                analysis: {
                    ocrConfidence: analysisResults.ocrConfidence,
                    tamperingDetected: analysisResults.tamperingDetected,
                    suspiciousRegions: analysisResults.suspiciousRegions,
                    metadataIssues: analysisResults.metadataIssues,
                    detailedReport: analysisResults.detailedReport,
                    analyzedAt: new Date()
                },
                blockchain: blockchainData ? {
                    verified: true,
                    transactionHash: blockchainData.transactionHash,
                    blockNumber: blockchainData.blockNumber
                } : null
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzeFile
};
