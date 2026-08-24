const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// GET /api/history
router.get('/', historyController.getAllAnalyses);

// GET /api/history/:id
router.get('/:id', historyController.getAnalysisById);

// DELETE /api/history/:id
router.delete('/:id', historyController.deleteAnalysis);

module.exports = router;
