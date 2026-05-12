const QRCode = require('qrcode');

class QRService {
    /**
     * Generate QR code for file verification
     * @param {string} fileId - MongoDB file ID
     * @param {string} verificationLink - Full verification URL
     * @returns {Promise<string>} - QR code as data URL
     */
    async generateQRCode(fileId, verificationLink) {
        try {
            // Create verification URL
            const qrData = JSON.stringify({
                fileId: fileId,
                verificationUrl: verificationLink,
                timestamp: Date.now()
            });

            // Generate QR code as data URL
            const qrCodeDataURL = await QRCode.toDataURL(qrData, {
                errorCorrectionLevel: 'H',
                margin: 2,
                width: 300,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            return qrCodeDataURL;
        } catch (error) {
            console.error('QR generation error:', error.message);
            return null;
        }
    }

    /**
     * Generate verification link
     * @param {string} fileId - MongoDB file ID
     * @returns {string} - Verification link URL
     */
    generateVerificationLink(fileId) {
        const baseUrl = process.env.APP_URL || 'http://localhost:5000';
        return `${baseUrl}/verify/${fileId}`;
    }
}

module.exports = new QRService();