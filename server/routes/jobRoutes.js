const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// GET /api/jobs/recommendations/:resumeId
router.get('/recommendations/:resumeId', jobController.getRecommendations);

// GET /api/jobs
router.get('/', jobController.getAllJobs);

module.exports = router;
