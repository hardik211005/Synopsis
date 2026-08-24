const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Remote / Flexible',
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Internship'],
    default: 'Mid Level',
  },
  jobType: {
    type: String,
    default: 'Full-time',
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  salaryRange: {
    type: String,
    default: 'Competitive',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
