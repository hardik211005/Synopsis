const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  resumeName: {
    type: String,
    required: true,
  },
  targetJobTitle: {
    type: String,
    default: 'Target Position',
  },
  jobDescription: {
    type: String,
    required: true,
  },
  atsScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  verdict: {
    type: String,
    enum: ['Needs work', 'Moderate match', 'Strong match'],
    required: true,
  },
  matchedKeywords: [{
    type: String,
  }],
  missingKeywords: [{
    type: String,
  }],
  sectionsDetected: {
    contactInfo: { type: Boolean, default: false },
    education: { type: Boolean, default: false },
    experience: { type: Boolean, default: false },
    projects: { type: Boolean, default: false },
    skills: { type: Boolean, default: false },
  },
  sectionScore: {
    type: Number,
    default: 0,
  },
  suggestions: [{
    category: { type: String, default: 'General' },
    text: { type: String, required: true },
    type: { type: String, enum: ['critical', 'warning', 'tip'], default: 'warning' }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analysis', analysisSchema);
