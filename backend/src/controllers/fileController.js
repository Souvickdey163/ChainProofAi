const fileService = require('../services/fileService');
const { generateFileHash } = require('../utils/cryptoHelper');
const qrService = require('../services/qrService');

/**
 * Handle file upload
 * @route POST /api/upload
 */
const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        // Generate SHA-256 hash of the uploaded file
        const fileHash = await generateFileHash(req.file.path);

        // Check if file already exists
        const existingFile = await fileService.getFileByHash(fileHash);
        if (existingFile) {
            // Delete duplicate file
            await fileService.deleteFileFromStorage(req.file.path);
            
            return res.status(200).json({
                success: true,
                message: 'File already exists',
                data: {
                    fileId: existingFile._id,
                    filename: existingFile.filename,
                    originalName: existingFile.originalName,
                    fileHash: existingFile.fileHash,
                    uploadedAt: existingFile.uploadedAt
                }
            });
        }

        // Save file metadata
        const savedFile = await fileService.saveFileMetadata(req.file, fileHash);

        // Generate QR code
        const verificationLink = qrService.generateVerificationLink(savedFile._id);
        const qrCode = await qrService.generateQRCode(savedFile._id, verificationLink);
        
        // Update file with QR code and verification link
        savedFile.qrCode = qrCode;
        savedFile.verificationLink = verificationLink;
        await savedFile.save();

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                fileId: savedFile._id,
                filename: savedFile.filename,
                originalName: savedFile.originalName,
                fileHash: savedFile.fileHash,
                fileSize: savedFile.fileSize,
                mimeType: savedFile.mimeType,
                verificationLink: savedFile.verificationLink,
                qrCode: savedFile.qrCode,
                uploadedAt: savedFile.uploadedAt
            }
        });
    } catch (error) {
        // Clean up uploaded file on error
        if (req.file) {
            await fileService.deleteFileFromStorage(req.file.path);
        }
        next(error);
    }
};

/**
 * Get file details by ID
 * @route GET /api/file/:id
 */
const getFileDetails = async (req, res, next) => {
    try {
        const file = await fileService.getFileById(req.params.id);
        
        res.status(200).json({
            success: true,
            data: {
                fileId: file._id,
                originalName: file.originalName,
                fileHash: file.fileHash,
                fileSize: file.fileSize,
                mimeType: file.mimeType,
                verificationLink: file.verificationLink,
                analysis: file.analysis,
                blockchain: file.blockchain,
                uploadedAt: file.uploadedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile,
    getFileDetails
};