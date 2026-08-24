const Job = require('../models/Job');
const Resume = require('../models/Resume');
const { calculateCosineSimilarity, tokenizeAndClean } = require('../utils/nlpEngine');

/**
 * Get top job recommendations for a given resume
 */
exports.getRecommendations = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    const allJobs = await Job.find({});
    if (!allJobs || allJobs.length === 0) {
      return res.status(200).json({
        message: 'No seed job postings available. Run npm run seed on the backend to populate jobs.',
        recommendations: [],
      });
    }

    const resumeTokens = new Set(tokenizeAndClean(resume.extractedText));

    const scoredJobs = allJobs.map(job => {
      const matchScore = calculateCosineSimilarity(resume.extractedText, job.description);

      // Find matching tags / keywords
      const matchedTags = (job.tags || []).filter(tag => resumeTokens.has(tag.toLowerCase()));
      const missingTags = (job.tags || []).filter(tag => !resumeTokens.has(tag.toLowerCase()));

      return {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        experienceLevel: job.experienceLevel,
        jobType: job.jobType,
        description: job.description,
        tags: job.tags,
        salaryRange: job.salaryRange,
        matchPercentage: matchScore,
        matchedTags,
        missingTags,
      };
    });

    // Sort by match percentage descending
    scoredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Return top 5 recommendations
    const topRecommendations = scoredJobs.slice(0, 5);

    return res.status(200).json({
      resumeId: resume._id,
      resumeName: resume.originalName,
      totalJobsEvaluated: allJobs.length,
      recommendations: topRecommendations,
    });
  } catch (error) {
    console.error('Job recommendations controller error:', error);
    return res.status(500).json({ error: 'Failed to generate job recommendations.' });
  }
};

/**
 * Get all job postings
 */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve jobs.' });
  }
};
