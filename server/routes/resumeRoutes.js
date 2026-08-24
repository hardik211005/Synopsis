const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resumeController');

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['pdf', 'docx', 'doc', 'txt'];
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    const mime = (file.mimetype || '').toLowerCase();

    if (
      allowedExtensions.includes(ext) ||
      mime.includes('pdf') ||
      mime.includes('word') ||
      mime.includes('text') ||
      mime.includes('officedocument')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX resume formats are supported.'));
    }
  },
});

// Middleware wrapper for Multer error handling
const handleMulterUpload = (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.warn('[Multer Middleware Warning]:', err.message);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size exceeds the 10MB limit. Please upload a smaller resume file.' });
        }
        return res.status(400).json({ error: `File upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message || 'Invalid resume file upload.' });
    }
    next();
  });
};

// POST /api/resumes/upload
router.post('/upload', handleMulterUpload, resumeController.uploadResume);

// GET /api/resumes/:id
router.get('/:id', resumeController.getResumeById);

module.exports = router;
