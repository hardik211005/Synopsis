const Analysis = require('../models/Analysis');

/**
 * Get all past analyses sorted by creation date descending
 */
exports.getAllAnalyses = async (req, res) => {
  try {
    const history = await Analysis.find({})
      .select('resumeName targetJobTitle atsScore verdict matchedKeywords missingKeywords createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json(history);
  } catch (error) {
    console.error('History list error:', error);
    return res.status(500).json({ error: 'Failed to retrieve analysis history.' });
  }
};

/**
 * Get single analysis detail by ID
 */
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis record not found.' });
    }
    return res.status(200).json(analysis);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve analysis details.' });
  }
};

/**
 * Delete analysis by ID
 */
exports.deleteAnalysis = async (req, res) => {
  try {
    const deleted = await Analysis.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Analysis record not found.' });
    }
    return res.status(200).json({ message: 'Analysis record deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete analysis.' });
  }
};
