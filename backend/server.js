const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const fileRoutes = require('./src/routes/fileRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');
const verificationRoutes = require('./src/routes/verificationRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api', fileRoutes);
app.use('/api', analysisRoutes);
app.use('/api', verificationRoutes);

// Health Check Route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'ChainProof AI Backend',
        blockchain: 'Polygon Amoy',
        timestamp: new Date().toISOString()
    });
});

// Root Route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 ChainProof AI Backend Running',
        version: '1.0.0',
        status: 'ACTIVE'
    });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ChainProof AI Backend running on http://0.0.0.0:${PORT}`);
    console.log(`📁 Upload directory: ${__dirname}/uploads`);
    console.log(`🔗 Blockchain: Polygon Amoy Testnet`);
});