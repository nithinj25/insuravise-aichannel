
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze insurance policy text
 * @param {string} policyText - Extracted policy text
 * @returns {Object} - Policy analysis result
 */
exports.analyzePolicyText = async (policyText) => {
  try {
    // Use fallback if no API key is provided
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API key provided, using fallback analysis');
      return fallbackAnalyzePolicy(policyText);
    }

    // Extract key sections
    const sections = exports.extractSections(policyText);
    
    // Calculate readability score
    const readabilityScore = exports.calculateReadabilityScore(policyText);
    
    // Extract key terms
    const keyTerms = await exports.extractKeyTerms(policyText);

    // Generate summary with OpenAI
    const prompt = `
You are an insurance expert helping to analyze an insurance policy.

Here's an excerpt from the policy:
${policyText.slice(0, 4000)}...

Please provide:
1. A clear, 2-paragraph summary of what this policy covers (100 words max)
2. Identify 3-5 key benefits of this policy
3. List 3-5 major exclusions or limitations
4. Rate the clarity of this policy on a scale of 1-10

Format your response as JSON with the following structure:
{
  "summary": "...",
  "keyBenefits": ["benefit1", "benefit2", ...],
  "majorExclusions": ["exclusion1", "exclusion2", ...],
  "clarityRating": 7
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an insurance expert assistant. Respond only with valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const aiResponse = response.choices[0].message.content.trim();
    let analysis;
    
    try {
      analysis = JSON.parse(aiResponse);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.log('AI Response:', aiResponse);
      return fallbackAnalyzePolicy(policyText);
    }

    return {
      summary: analysis.summary,
      keyBenefits: analysis.keyBenefits,
      majorExclusions: analysis.majorExclusions,
      clarityRating: analysis.clarityRating,
      sections,
      readability: {
        score: readabilityScore,
        level: getReadabilityLevel(readabilityScore)
      },
      keyTerms
    };
  } catch (error) {
    console.error('Error in policy analysis:', error);
    return fallbackAnalyzePolicy(policyText);
  }
};

/**
 * Extract sections from policy text
 * @param {string} policyText - Policy text
 * @returns {Object} - Extracted sections
 */
exports.extractSections = (policyText) => {
  // Simple section extraction logic
  const sections = {};
  
  // Common section titles in insurance policies
  const sectionTitles = [
    'coverage', 'benefits', 'exclusions', 'limitations', 
    'deductible', 'premium', 'claims', 'definitions'
  ];
  
  sectionTitles.forEach(title => {
    // Create regex pattern to find sections
    const pattern = new RegExp(`(${title}|${title.toUpperCase()}|${title.charAt(0).toUpperCase() + title.slice(1)})\\s*[:\\.]?\\s*([^#]+?)(?=\\n\\s*\\n|$)`, 'i');
    const match = policyText.match(pattern);
    
    if (match && match[2]) {
      sections[title] = match[2].trim();
    }
  });
  
  return sections;
};

/**
 * Calculate readability score using Flesch-Kincaid formula
 * @param {string} text - Policy text
 * @returns {number} - Readability score
 */
exports.calculateReadabilityScore = (text) => {
  // Simple implementation of Flesch-Kincaid readability
  const words = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const syllables = countSyllables(text);
  
  if (sentences === 0 || words === 0) return 0;
  
  // Flesch-Kincaid formula
  return 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
};

/**
 * Extract key terms from policy text
 * @param {string} policyText - Policy text
 * @returns {Array} - Extracted key terms
 */
exports.extractKeyTerms = async (policyText) => {
  try {
    // Use OpenAI to extract key terms if API key is available
    if (process.env.OPENAI_API_KEY) {
      const prompt = `
Extract 6-8 key terms and their definitions from this insurance policy text.
Focus on terms that are crucial for understanding coverage and limitations.

POLICY TEXT:
${policyText.slice(0, 3000)}...

Return only a JSON array like this:
[
  {"term": "Deductible", "definition": "The amount you pay out of pocket before insurance coverage begins."},
  ...
]`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an insurance expert assistant. Respond only with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      });

      const aiResponse = response.choices[0].message.content.trim();
      let terms;
      
      try {
        terms = JSON.parse(aiResponse);
        return terms;
      } catch (error) {
        console.error('Error parsing AI terms response:', error);
        return fallbackExtractKeyTerms(policyText);
      }
    } else {
      return fallbackExtractKeyTerms(policyText);
    }
  } catch (error) {
    console.error('Error extracting key terms:', error);
    return fallbackExtractKeyTerms(policyText);
  }
};

/**
 * Count syllables in text (helper function)
 * @param {string} text - Input text
 * @returns {number} - Syllable count
 */
function countSyllables(text) {
  // Very basic syllable counter
  text = text.toLowerCase();
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  
  const words = text.split(/\s+/);
  let syllableCount = 0;
  
  words.forEach(word => {
    // Count vowel groups as syllables
    let wordSyllables = word.match(/[aeiouy]{1,}/g);
    
    if (wordSyllables) {
      syllableCount += wordSyllables.length;
    } else {
      syllableCount += 1; // Every word has at least one syllable
    }
    
    // Adjust for common patterns
    if (word.endsWith('e')) syllableCount--;
    if (word.endsWith('le')) syllableCount++;
    if (word.endsWith('ed')) syllableCount--;
  });
  
  return Math.max(1, syllableCount);
}

/**
 * Get readability level based on score
 * @param {number} score - Readability score
 * @returns {string} - Readability level
 */
function getReadabilityLevel(score) {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

/**
 * Fallback function for policy analysis when API fails
 * @param {string} policyText - Policy text
 * @returns {Object} - Basic policy analysis
 */
function fallbackAnalyzePolicy(policyText) {
  return {
    summary: "This policy appears to be a standard insurance contract covering risks and outlining terms and conditions. Please review the full document for complete details about coverage, exclusions, and claim procedures.",
    keyBenefits: [
      "Coverage for standard insurance events",
      "Claims process outlined in document",
      "Renewal terms specified"
    ],
    majorExclusions: [
      "Certain high-risk activities likely excluded",
      "Pre-existing conditions may have limitations",
      "Force majeure events may be excluded"
    ],
    clarityRating: 5,
    sections: exports.extractSections(policyText),
    readability: {
      score: exports.calculateReadabilityScore(policyText),
      level: "Standard"
    },
    keyTerms: fallbackExtractKeyTerms(policyText)
  };
}

/**
 * Fallback function to extract key terms
 * @param {string} policyText - Policy text
 * @returns {Array} - Key terms
 */
function fallbackExtractKeyTerms(policyText) {
  return [
    { term: "Policy", definition: "The legal document outlining the terms and conditions of insurance coverage." },
    { term: "Premium", definition: "The amount paid by the policyholder for insurance coverage." },
    { term: "Deductible", definition: "The amount you pay out of pocket before insurance coverage begins." },
    { term: "Claim", definition: "A formal request by a policyholder for coverage or compensation for a covered loss." },
    { term: "Coverage", definition: "The specific protections or benefits provided to the policyholder by the insurance company." },
    { term: "Exclusion", definition: "Specific conditions or circumstances not covered by the policy." }
  ];
}
