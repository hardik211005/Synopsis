const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { analyzeResumeAgainstJD } = require('../utils/nlpEngine');

/**
 * Analyze resume against target job description with multi-pillar tracking
 */
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, targetJobTitle } = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({ error: 'Please enter a valid job description (at least 20 characters).' });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: 'Resume record not found. Please re-upload your resume.' });
    }

    // Perform Enhanced Multi-Pillar NLP Analysis
    const result = analyzeResumeAgainstJD(resume.extractedText, jobDescription);

    // Save Analysis to Database
    const newAnalysis = new Analysis({
      resumeId: resume._id,
      resumeName: resume.originalName,
      targetJobTitle: targetJobTitle || 'Target Position',
      jobDescription,
      atsScore: result.atsScore,
      verdict: result.verdict,
      matchedKeywords: result.matchedKeywords,
      missingKeywords: result.missingKeywords,
      sectionsDetected: result.sectionsDetected,
      sectionScore: result.scoreBreakdown.sectionScore,
      suggestions: result.suggestions,
    });

    await newAnalysis.save();

    return res.status(200).json({
      analysisId: newAnalysis._id,
      resumeId: resume._id,
      resumeName: resume.originalName,
      targetJobTitle: newAnalysis.targetJobTitle,
      atsScore: result.atsScore,
      verdict: result.verdict,
      scoreBreakdown: result.scoreBreakdown,
      matchedKeywords: result.matchedKeywords,
      missingKeywords: result.missingKeywords,
      categorizedMatched: result.categorizedMatched,
      categorizedMissing: result.categorizedMissing,
      sectionsDetected: result.sectionsDetected,
      impactMetricsCount: result.impactMetricsCount,
      suggestions: result.suggestions,
      createdAt: newAnalysis.createdAt,
    });
  } catch (error) {
    console.error('Analyze controller error:', error);
    return res.status(500).json({ error: 'An error occurred while analyzing the resume.' });
  }
};
