// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title FileVerification
 * @dev Smart contract for storing and verifying file hashes on Polygon blockchain
 */
contract FileVerification {
    
    // Struct to store verification details
    struct VerificationDetails {
        address verifier;
        uint256 timestamp;
        bool isVerified;
    }
    
    // Mapping from file hash to verification details
    mapping(string => VerificationDetails) public verifiedFiles;
    
    // Array to store all verified file hashes for indexing
    string[] public allVerifiedHashes;
    
    // Events
    event FileVerified(address indexed verifier, string fileHash, uint256 timestamp);
    event FileRevoked(address indexed revoker, string fileHash, uint256 timestamp);
    
    // Modifiers
    modifier onlyValidHash(string memory fileHash) {
        require(bytes(fileHash).length == 64, "Invalid hash length");
        _;
    }
    
    /**
     * @dev Verify a file by storing its hash on blockchain
     * @param fileHash SHA-256 hash of the file
     */
    function verifyFile(string memory fileHash) 
        public 
        onlyValidHash(fileHash) 
        returns (bool) 
    {
        require(!verifiedFiles[fileHash].isVerified, "File already verified");
        
        // Store verification details
        verifiedFiles[fileHash] = VerificationDetails({
            verifier: msg.sender,
            timestamp: block.timestamp,
            isVerified: true
        });
        
        // Add to array for indexing
        allVerifiedHashes.push(fileHash);
        
        // Emit event
        emit FileVerified(msg.sender, fileHash, block.timestamp);
        
        return true;
    }
    
    /**
     * @dev Get verification details for a file
     * @param fileHash SHA-256 hash of the file
     * @return verifier Address that verified the file
     * @return timestamp When the file was verified
     * @return isVerified Whether the file is verified
     */
    function getVerificationDetails(string memory fileHash) 
        public 
        view 
        returns (address verifier, uint256 timestamp, bool isVerified) 
    {
        VerificationDetails memory details = verifiedFiles[fileHash];
        return (details.verifier, details.timestamp, details.isVerified);
    }
    
    /**
     * @dev Check if a file is verified
     * @param fileHash SHA-256 hash of the file
     * @return bool True if verified
     */
    function isFileVerified(string memory fileHash) 
        public 
        view 
        returns (bool) 
    {
        return verifiedFiles[fileHash].isVerified;
    }
    
    /**
     * @dev Get total number of verified files
     * @return uint256 Count of verified files
     */
    function getVerifiedFilesCount() 
        public 
        view 
        returns (uint256) 
    {
        return allVerifiedHashes.length;
    }
    
    /**
     * @dev Get all verified file hashes (paginated)
     * @param offset Starting index
     * @param limit Number of records to fetch
     * @return string[] Array of file hashes
     */
    function getVerifiedFilesBatch(uint256 offset, uint256 limit) 
        public 
        view 
        returns (string[] memory) 
    {
        uint256 end = offset + limit;
        if (end > allVerifiedHashes.length) {
            end = allVerifiedHashes.length;
        }
        
        string[] memory batch = new string[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            batch[i - offset] = allVerifiedHashes[i];
        }
        
        return batch;
    }
}