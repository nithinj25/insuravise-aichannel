
const pdf = require('pdf-parse');
const axios = require('axios');
const { analyzePolicyText, extractSections, calculateReadabilityScore, extractKeyTerms } = require('../utils/policyAnalysisUtils');

/**
 * Analyze policy PDF document
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.analyzePolicyPdf = async (req, res, next) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Get buffer from multer
    const pdfBuffer = req.file.buffer;

    // Extract text from PDF
    const pdfData = await pdf(pdfBuffer);
    const pdfText = pdfData.text;

    // Analyze the policy text
    const analysis = await analyzePolicyText(pdfText);

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing policy document:', error);
    next(error);
  }
};

/**
 * Summarize policy PDF from a URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.summarizePolicyPdf = async (req, res, next) => {
  try {
    const { policyUrl } = req.body;

    if (!policyUrl) {
      return res.status(400).json({
        success: false,
        error: 'Policy URL is required'
      });
    }

    // Fetch the PDF from the URL
    const response = await axios.get(policyUrl, {
      responseType: 'arraybuffer'
    });

    // Extract text from PDF
    const pdfData = await pdf(response.data);
    const pdfText = pdfData.text;

    // Analyze the policy text
    const analysis = await analyzePolicyText(pdfText);

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error summarizing policy from URL:', error);
    next(error);
  }
};
