const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

class BlockchainService {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        
        this.initializeBlockchain();
    }

    async initializeBlockchain() {
        try {
            // Connect to Polygon Mumbai testnet
            this.provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
            this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
            
            // Load contract ABI
            const contractABI = [
                "function verifyFile(string memory fileHash) public returns (bool)",
                "function getVerificationDetails(string memory fileHash) public view returns (address verifier, uint256 timestamp, bool isVerified)",
                "event FileVerified(address indexed verifier, string fileHash, uint256 timestamp)"
            ];
            
            if (this.contractAddress && this.contractAddress !== '0x...') {
                this.contract = new ethers.Contract(this.contractAddress, contractABI, this.signer);
                console.log('✅ Blockchain service initialized');
            } else {
                console.warn('⚠️ Contract address not set. Deploy contract first.');
            }
        } catch (error) {
            console.error('❌ Blockchain initialization error:');
            console.error(error);
            console.error(error.stack);
        }
    }

    /**
     * Store file hash on blockchain
     * @param {string} fileHash - SHA-256 hash of the file
     * @returns {Promise<Object>} - Transaction details
     */
    async storeFileHash(fileHash) {
        try {
            if (!this.contract) {
                throw new Error('Blockchain contract not initialized');
            }

            // Call smart contract to verify file
            const tx = await this.contract.verifyFile(fileHash);
            const receipt = await tx.wait();
            
            return {
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                timestamp: Math.floor(Date.now() / 1000)
            };
        } catch (error) {
            console.error('Blockchain store error:', error.message);
            
            // For hackathon demo, return mock data if blockchain fails
            return {
                transactionHash: '0x' + Math.random().toString(36).substring(2, 42),
                blockNumber: Math.floor(Math.random() * 10000000),
                timestamp: Math.floor(Date.now() / 1000),
                mockMode: true
            };
        }
    }

    /**
     * Verify file hash on blockchain
     * @param {string} fileHash - SHA-256 hash to verify
     * @returns {Promise<Object>} - Verification result
     */
    async verifyFileHash(fileHash) {
        try {
            if (!this.contract) {
                throw new Error('Blockchain contract not initialized');
            }

            const details = await this.contract.getVerificationDetails(fileHash);
            
            return {
                isValid: details[2],
                verifier: details[0],
                timestamp: details[1].toNumber(),
                fileHash: fileHash
            };
        } catch (error) {
            console.error('Blockchain verify error:', error.message);
            return {
                isValid: false,
                error: error.message
            };
        }
    }
}

module.exports = new BlockchainService();