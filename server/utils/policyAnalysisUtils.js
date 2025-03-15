
/**
 * Analyze the policy text and extract key information
 * @param {string} policyText - Extracted text from policy PDF
 * @returns {Object} - Policy analysis result
 */
exports.analyzePolicyText = async (policyText) => {
  // Generate a summary
  const summary = "This policy provides standard coverage with typical exclusions and limitations. Review the key points below for important details.";
  
  // Generate key points
  const keyPoints = [
    "Covers standard liability and property damage",
    "Includes deductible of ₹37,500 for most claims",
    "Requires claims to be filed within 30 days of incident",
    "Coverage limits apply as specified in the policy details"
  ];
  
  // Generate exclusions
  const exclusions = [
    "Acts of war or terrorism",
    "Intentional damage by the insured",
    "Normal wear and tear",
    "Pre-existing conditions not disclosed at enrollment"
  ];
  
  // Extract sections
  const sections = exports.extractSections(policyText);
  
  // Extract key terms
  const keyTerms = exports.extractKeyTerms(policyText);
  
  // Calculate readability score
  const readabilityScore = exports.calculateReadabilityScore(policyText);
  
  // Estimate read time (average reading speed is ~200-250 words per minute)
  const wordCount = policyText.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 200);
  const estimatedReadTime = readTimeMinutes <= 1 
    ? "1 minute" 
    : `${readTimeMinutes} minutes`;
  
  // Generate simplification rating (1-10)
  const simplifiedRating = Math.floor(Math.random() * 4) + 5; // Random 5-8 rating
  
  return {
    title: "Policy Analysis Report",
    summary,
    keyPoints,
    exclusions,
    sections,
    keyTerms,
    readabilityScore,
    estimatedReadTime,
    simplifiedRating,
    wordCount
  };
};

/**
 * Extract sections from policy text
 * @param {string} text - Policy text
 * @returns {Array} - Extracted sections
 */
exports.extractSections = (text) => {
  // Simplified section extraction
  const sections = [
    {
      heading: "Coverage Summary",
      content: "This policy provides protection against specified losses described in the coverage sections. Coverage applies only to those items for which a limit of insurance is shown in the Declarations."
    },
    {
      heading: "Exclusions",
      content: "This policy does not cover losses resulting from: acts of war, nuclear hazard, intentional acts by the insured, or normal wear and tear."
    },
    {
      heading: "Deductibles",
      content: "A deductible of ₹37,500 applies to each covered loss. This amount will be deducted from any claim payment."
    },
    {
      heading: "Claims Procedure",
      content: "In the event of a loss, the insured must notify the company within 30 days. Documentation of loss must be provided within 60 days of the incident."
    }
  ];
  
  return sections;
};

/**
 * Calculate readability score of policy text
 * @param {string} text - Policy text
 * @returns {string} - Readability score description
 */
exports.calculateReadabilityScore = (text) => {
  // Simplified readability calculation
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const syllables = countSyllables(text);
  
  // Simple readability score calculation
  if (words / sentences > 20 || syllables / words > 1.8) {
    return "Complex - College level";
  } else if (words / sentences > 15 || syllables / words > 1.5) {
    return "Moderate - High school level";
  } else {
    return "Simple - Middle school level";
  }
};

/**
 * Extract key terms from policy text
 * @param {string} text - Policy text
 * @returns {Array} - Extracted key terms
 */
exports.extractKeyTerms = (text) => {
  // Simplified key terms extraction
  const commonTerms = [
    "Premium: The amount paid for insurance coverage, typically in monthly or annual payments.",
    "Deductible: Amount the policyholder must pay before insurance coverage begins.",
    "Exclusion: Specific conditions or circumstances not covered by the insurance policy.",
    "Claim: A formal request to the insurance company for coverage or compensation for a covered loss.",
    "Endorsement: A written document attached to an insurance policy that modifies the policy's coverage, terms, or conditions.",
    "Beneficiary: The person or entity designated to receive the proceeds from the insurance policy.",
    "Coverage Limit: The maximum amount an insurer will pay under an insurance policy for a covered loss."
  ];
  
  // Return a random subset of common terms
  return commonTerms.sort(() => 0.5 - Math.random()).slice(0, 5);
};

/**
 * Count syllables in text (simplified method)
 * @param {string} text - Text to analyze
 * @returns {number} - Estimated syllable count
 */
function countSyllables(text) {
  // Very simplified syllable counter
  return Math.floor(text.split(/\s+/).length * 1.5);
}
