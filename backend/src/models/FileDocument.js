const mongoose = require('mongoose');

const fileDocumentSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true,
        unique: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    fileHash: {
        type: String,
        required: true,
        unique: true
    },
    analysis: {
        trustScore: {
            type: Number,
            min: 0,
            max: 100
        },
        ocrConfidence: Number,
        tamperingDetected: Boolean,
        suspiciousRegions: [{
            type: String,
            coordinates: Object,
            reason: String
        }],
        metadataIssues: [String],
        detailedReport: Object,
        analyzedAt: Date
    },
    blockchain: {
        transactionHash: String,
        blockNumber: Number,
        timestamp: Number,
        verified: {
            type: Boolean,
            default: false
        }
    },
    qrCode: {
        type: String,
        unique: true
    },
    verificationLink: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

// Create index for faster queries
fileDocumentSchema.index({ fileHash: 1 });
fileDocumentSchema.index({ uploadedAt: -1 });

module.exports = mongoose.model('FileDocument', fileDocumentSchema);