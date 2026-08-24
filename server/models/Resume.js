const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx', 'doc', 'txt'],
    required: true,
  },
  fileSize: {
    type: Number,
  },
  extractedText: {
    type: String,
    required: true,
  },
  wordCount: {
    type: Number,
    default: 0,
  },
  detectedSections: {
    contactInfo: { type: Boolean, default: false },
    education: { type: Boolean, default: false },
    experience: { type: Boolean, default: false },
    projects: { type: Boolean, default: false },
    skills: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
