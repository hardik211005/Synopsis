const Resume = require('../models/Resume');
const { parseResumeBuffer } = require('../utils/parser');
const { detectSections } = require('../utils/nlpEngine');

/**
 * Handle resume upload (PDF / DOCX / TXT)
 */
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        error: 'Please select a resume file (PDF or DOCX) to upload.',
      });
    }

    const file = req.file;
    const extension = (file.originalname || 'resume.pdf').split('.').pop().toLowerCase();
    
    console.log(`[Upload API] Received file "${file.originalname}" (${file.size} bytes, format: .${extension})`);

    // Parse resume buffer
    let extractedText = '';
    try {
      extractedText = await parseResumeBuffer(file.buffer, extension);
    } catch (parseError) {
      console.error('[Upload API] Parser step error:', parseError.message);
      return res.status(422).json({
        error: parseError.message || 'Failed to extract text from the uploaded resume file. Please ensure it is a valid PDF or DOCX file.',
      });
    }

    if (!extractedText || extractedText.trim().length < 10) {
      return res.status(422).json({
        error: 'Unable to extract legible text from file. Please ensure the resume is not an image-only scan or password-protected PDF.',
      });
    }

    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
    const sections = detectSections(extractedText);

    // Save to Database
    let newResume;
    try {
      newResume = new Resume({
        originalName: file.originalname || 'Resume Document',
        fileType: extension,
        fileSize: file.size,
        extractedText,
        wordCount,
        detectedSections: sections,
      });

      await newResume.save();
      console.log(`[Upload API] Successfully saved resume to DB with ID: ${newResume._id}`);
    } catch (dbError) {
      console.error('[Upload API] Database save error:', dbError.message);
      return res.status(500).json({
        error: 'Database error saving parsed resume. Please try again.',
      });
    }

    return res.status(201).json({
      message: 'Resume uploaded and parsed successfully!',
      resumeId: newResume._id,
      originalName: newResume.originalName,
      extractedText: newResume.extractedText,
      wordCount: newResume.wordCount,
      detectedSections: newResume.detectedSections,
    });
  } catch (error) {
    console.error('[Upload API] Unhandled controller error:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred while processing the uploaded resume.',
    });
  }
};

/**
 * Get resume by ID
 */
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume record not found.' });
    }
    return res.json(resume);
  } catch (error) {
    console.error('[GetResume API] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve resume record.' });
  }
};
