const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Fallback regex extractor for text content from raw PDF buffers if pdf-parse fails on xref corruptions
 */
function extractRawPdfStrings(buffer) {
  try {
    const raw = buffer.toString('binary');
    // Extract text inside PDF text objects (BT ... ET) or parenthesized strings
    const matches = raw.match(/\(([^\(\)\\]|\\[\s\S])*\)/g) || [];
    const textArr = matches
      .map(str => str.slice(1, -1).replace(/\\([0-7]{3}|[\\()])/g, '$1'))
      .filter(str => str.length > 2 && /[a-zA-Z0-9]/.test(str));
    return textArr.join(' ');
  } catch (e) {
    return '';
  }
}

/**
 * Extract raw text from file buffer based on MIME type / extension
 */
async function parseResumeBuffer(buffer, fileType) {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('No valid file content received. Please select a valid document.');
  }

  let text = '';
  const ext = (fileType || '').toLowerCase().trim();

  if (ext === 'pdf' || ext === 'application/pdf') {
    try {
      const data = await pdfParse(buffer);
      text = data.text || '';
    } catch (err) {
      console.warn('[Parser Warning] Standard pdf-parse failed:', err.message);
      // Attempt fallback string stream extraction for slightly non-standard PDFs
      text = extractRawPdfStrings(buffer);
      if (!text || text.trim().length < 10) {
        throw new Error('Failed to parse PDF file. Ensure the file is not password-protected, encrypted, or an image-only scan.');
      }
    }
  } else if (
    ext === 'docx' ||
    ext === 'doc' ||
    ext.includes('word') ||
    ext.includes('officedocument')
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value || '';
    } catch (err) {
      console.warn('[Parser Warning] Mammoth DOCX parse failed:', err.message);
      // Fallback for plaintext DOC files
      text = buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
      if (!text || text.trim().length < 10) {
        throw new Error('Failed to parse Word document (.docx). Please save your document in standard .docx format and try again.');
      }
    }
  } else if (ext === 'txt' || ext === 'text/plain') {
    text = buffer.toString('utf-8');
  } else {
    // Unknown format fallback: try pdf-parse first, then text conversion
    try {
      const data = await pdfParse(buffer);
      text = data.text || '';
    } catch (err) {
      text = buffer.toString('utf-8');
    }
  }

  if (typeof text !== 'string') {
    text = String(text || '');
  }

  // Clean raw text (remove excessive empty lines and zero-width characters)
  const cleanedText = text
    .replace(/[\r\n]+/g, '\n')
    .replace(/[^\x20-\x7E\n\t]/g, ' ')
    .trim();

  return cleanedText;
}

module.exports = {
  parseResumeBuffer,
};
