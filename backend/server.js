const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const fileRoutes = require('./src/routes/fileRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');
const verificationRoutes = require('./src/routes/verificationRoutes');

// Load environment variables
dotenv.config();

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
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', fileRoutes);
app.use('/api', analysisRoutes);
app.use('/api', verificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'ChainProof AI Backend',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ChainProof AI Backend running on http://0.0.0.0:${PORT}`);
    console.log(`📁 Upload directory: ${__dirname}/uploads`);
    console.log(`🔗 Blockchain: Polygon Mumbai Testnet`);
});