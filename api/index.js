const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB Atlas
connectDB().catch(console.error);

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/materials', require('../src/routes/materials'));
app.use('/api/transactions', require('../src/routes/transactions'));

// Fallback: serve index.html for all non-API routes (Express v5 syntax)
app.get('/{*path}', (req, res) => {
  // Don't serve HTML for /api routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;
