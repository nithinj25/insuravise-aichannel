
const { analyzePolicy, extractPolicyInfoFromPdf, extractPolicyInfoFromUrl } = require('../utils/policyAnalysisUtils');

/**
 * Analyze a policy PDF file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.analyzePolicyPdf = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    console.log('Analyzing policy file:', req.file.originalname);
    
    // Extract the PDF buffer from the request
    const pdfBuffer = req.file.buffer;
    
    // Analyze the policy using the utility function
    const analysisResult = await extractPolicyInfoFromPdf(pdfBuffer);
    
    res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error('Error analyzing policy PDF:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze policy document'
    });
  }
};

/**
 * Summarize a policy from a URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.summarizePolicyPdf = async (req, res) => {
  try {
    const { policyUrl } = req.body;
    
    if (!policyUrl) {
      return res.status(400).json({
        success: false,
        error: 'Policy URL is required'
      });
    }

    console.log('Analyzing policy from URL:', policyUrl);
    
    // Analyze the policy from the URL using the utility function
    const analysisResult = await extractPolicyInfoFromUrl(policyUrl);
    
    res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error('Error analyzing policy from URL:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze policy from URL'
    });
  }
};
