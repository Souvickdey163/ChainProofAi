const crypto = require('crypto');
const fs = require('fs');

/**
 * Generate SHA-256 hash of a file
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - SHA-256 hash
 */
const generateFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        
        stream.on('data', data => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
};

/**
 * Generate random verification token
 * @returns {string} - Random token
 */
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = {
    generateFileHash,
    generateVerificationToken
};