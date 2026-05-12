const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
    console.log('🚀 Starting ChainProof AI Deployment...\n');
    
    // Check prerequisites
    console.log('📋 Checking prerequisites...');
    
    if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === 'your_wallet_private_key_here') {
        console.error('❌ Please set your PRIVATE_KEY in .env file');
        process.exit(1);
    }
    
    if (!process.env.MONGODB_URI) {
        console.error('❌ Please set MONGODB_URI in .env file');
        process.exit(1);
    }
    
    console.log('✅ Prerequisites OK\n');
    
    // Deploy smart contract
    console.log('📡 Deploying smart contract...');
    const contractAddress = await require('./deployContract')();
    
    console.log('\n🎉 Deployment Complete!');
    console.log('═══════════════════════════════════════════════');
    console.log('📝 Next Steps:');
    console.log('1. Start MongoDB: mongod');
    console.log('2. Start Python AI service: cd python-service && python ai_analyzer.py');
    console.log('3. Start Node.js backend: npm start');
    console.log('4. Test APIs using Postman');
    console.log('═══════════════════════════════════════════════');
}

main().catch(console.error);