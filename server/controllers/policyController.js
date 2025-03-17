
const { analyzePolicyText } = require('../utils/policyAnalysisUtils');

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
    
    // For now, return a mock analysis as we don't have the actual PDF parsing code
    const mockAnalysis = {
      title: req.file.originalname,
      summary: "This is a standard insurance policy document covering basic protections and exclusions.",
      keyPoints: [
        "Coverage includes standard protections for the insured property",
        "Policy term is typically 12 months with renewal options",
        "Premium payments may be made monthly or annually"
      ],
      exclusions: [
        "Pre-existing conditions are not covered",
        "Acts of war or terrorism are excluded",
        "Intentional damage is not covered"
      ],
      readabilityScore: "Moderate",
      estimatedReadTime: "15 minutes",
      simplifiedRating: 7,
      sections: [
        {
          heading: "Coverage Details",
          content: "This policy provides coverage for standard insurance events including damage, theft, and liability."
        },
        {
          heading: "Exclusions",
          content: "Certain events and circumstances are excluded from coverage as detailed in section 4."
        }
      ],
      keyTerms: [
        "Premium: The amount paid for insurance coverage",
        "Deductible: Amount paid out of pocket before insurance coverage begins",
        "Claim: A formal request for coverage or compensation",
        "Exclusion: Specific conditions not covered by the policy"
      ]
    };
    
    res.status(200).json({
      success: true,
      data: mockAnalysis
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
    
    // For now, return a mock analysis as we don't have actual URL fetching
    const mockAnalysis = {
      title: "Insurance Policy Document",
      summary: "This is a standard insurance policy document retrieved from URL covering basic protections and exclusions.",
      keyPoints: [
        "Coverage includes standard protections for the insured property",
        "Policy term is typically 12 months with renewal options",
        "Premium payments may be made monthly or annually"
      ],
      exclusions: [
        "Pre-existing conditions are not covered",
        "Acts of war or terrorism are excluded",
        "Intentional damage is not covered"
      ],
      readabilityScore: "Moderate",
      estimatedReadTime: "15 minutes",
      simplifiedRating: 6,
      sections: [
        {
          heading: "Coverage Details",
          content: "This policy provides coverage for standard insurance events including damage, theft, and liability."
        },
        {
          heading: "Exclusions",
          content: "Certain events and circumstances are excluded from coverage as detailed in section 4."
        }
      ],
      keyTerms: [
        "Premium: The amount paid for insurance coverage",
        "Deductible: Amount paid out of pocket before insurance coverage begins",
        "Claim: A formal request for coverage or compensation",
        "Exclusion: Specific conditions not covered by the policy"
      ]
    };
    
    res.status(200).json({
      success: true,
      data: mockAnalysis
    });
  } catch (error) {
    console.error('Error analyzing policy from URL:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze policy from URL'
    });
  }
};
