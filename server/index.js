const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const Job = require('./models/Job');

const seedJobs = require('./scripts/seedJobs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB().then(async () => {
  // Auto-seed sample jobs if collection is empty (ensures instant out-of-the-box demo readiness!)
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log('[Server] Job collection is empty. Auto-seeding sample job postings...');
      await seedJobs(false);
    }
  } catch (err) {
    console.warn('[Server] Auto-seed check notice:', err.message);
  }
});


// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/analyze', require('./routes/analyzeRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Career Compass API',
    timestamp: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Career Compass Backend Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
