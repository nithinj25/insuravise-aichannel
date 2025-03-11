import { UserPreferences, InsurancePlan, PolicyAnalysis } from "@/types/insurance";
import * as pdfParse from 'pdf-parse';

// Mock function to simulate getting insurance plans based on user preferences
export const getInsurancePlans = async (preferences: UserPreferences): Promise<InsurancePlan[]> => {
  // In a real application, this would call an actual API
  console.log("Fetching insurance plans with preferences:", preferences);

  // Mock data for demonstration
  const mockPlans: InsurancePlan[] = [
    {
      id: "1",
      type: "Health",
      name: "Basic Health Plan",
      price: 150,
      features: ["Basic coverage", "Preventative care"],
      policyUrl: "https://example.com/policy1",
      providerName: "Apollo Insurance",
    },
    {
      id: "2",
      type: "Auto",
      name: "Standard Auto Insurance",
      price: 75,
      features: ["Liability", "Collision"],
      policyUrl: "https://example.com/policy2",
      providerName: "Tata Insurance",
    },
    {
      id: "3",
      type: "Home",
      name: "Homeowners Insurance",
      price: 200,
      features: ["Fire", "Theft", "Liability"],
      policyUrl: "https://example.com/policy3",
      providerName: "HDFC ERGO",
    },
  ];

  return mockPlans;
};

// Alias for getInsurancePlans for backwards compatibility
export const fetchInsurancePlans = async (type: string): Promise<{ success: boolean; data: InsurancePlan[]; error?: string }> => {
  try {
    const preferences: UserPreferences = { type, coverageLevel: 50 };
    const plans = await getInsurancePlans(preferences);
    return { success: true, data: plans };
  } catch (error) {
    console.error("Error fetching plans:", error);
    return { success: false, data: [], error: "Failed to fetch insurance plans" };
  }
};

// Mock function to simulate personalized recommendations
export const getPersonalizedRecommendations = async (preferences: UserPreferences): Promise<{ success: boolean; data: InsurancePlan[]; error?: string }> => {
  try {
    console.log("Fetching personalized recommendations with preferences:", preferences);

    // Mock data for demonstration
    const mockRecommendations: InsurancePlan[] = [
      {
        id: "4",
        type: "Health",
        name: "Premium Health Plan",
        price: 250,
        features: ["Comprehensive coverage", "Specialist care", "Dental & Vision"],
        policyUrl: "https://example.com/policy4",
        providerName: "Max Bupa",
        matchScore: 92,
        matchDetails: {
          coverageScore: 95,
          priceScore: 85,
          featureScore: 90,
          demographicScore: 95,
          priorityScore: 90,
        },
        explanation: "This plan offers excellent comprehensive coverage ideal for your family size and priorities."
      },
      {
        id: "5",
        type: "Life",
        name: "Term Life Insurance",
        price: 50,
        features: ["Death benefit", "Living benefits"],
        policyUrl: "https://example.com/policy5",
        providerName: "ICICI Prudential",
        matchScore: 85,
        matchDetails: {
          coverageScore: 80,
          priceScore: 95,
          featureScore: 75,
          demographicScore: 90,
          priorityScore: 85,
        },
        explanation: "Affordable term life insurance that aligns with your budget constraints."
      },
    ];

    return { success: true, data: mockRecommendations };
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return { success: false, data: [], error: "Failed to fetch personalized recommendations" };
  }
};

// Function to analyze a policy PDF file
export const analyzePolicyPdf = async (file: File): Promise<{ success: boolean; data?: PolicyAnalysis; error?: string }> => {
  try {
    console.log("Analyzing policy PDF:", file.name);
    
    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Parse the PDF
    const pdfData = await pdfParse.default(uint8Array);
    const pdfText = pdfData.text;
    
    // Extract key information from the text
    const keyPoints = extractKeyPoints(pdfText);
    const exclusions = extractExclusions(pdfText);
    const summary = generateSummary(pdfText);
    const readabilityScore = calculateReadabilityScore(pdfText);
    const simplifiedRating = calculateRating(pdfText);
    
    return {
      success: true,
      data: {
        title: `Analysis of ${file.name}`,
        summary,
        keyPoints,
        exclusions,
        simplifiedRating,
        readabilityScore,
        estimatedReadTime: `${Math.round(pdfText.length / 1500)} minutes`,
        confidenceScore: 0.9,
        sections: extractSections(pdfText),
        keyTerms: extractKeyTerms(pdfText)
      }
    };
  } catch (error) {
    console.error("Error analyzing policy:", error);
    return {
      success: false,
      error: "Failed to analyze the policy document. Please ensure it's a valid PDF file."
    };
  }
};

// Helper function to extract key points from PDF text
function extractKeyPoints(text: string): string[] {
  const lines = text.split('\n');
  const keyPoints: string[] = [];
  const coverageKeywords = ['cover', 'benefit', 'protection', 'include', 'provide'];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 20 && trimmedLine.length < 200) {
      // Check if line contains coverage-related keywords
      if (coverageKeywords.some(keyword => trimmedLine.toLowerCase().includes(keyword))) {
        keyPoints.push(trimmedLine);
      }
    }
    
    // Limit to 7 key points
    if (keyPoints.length >= 7) break;
  }
  
  // If we found fewer than 3 key points, add some based on the text length
  if (keyPoints.length < 3) {
    keyPoints.push("Coverage begins from the date mentioned in the policy schedule");
    keyPoints.push("Claims must be filed within the specified period after the incident");
    keyPoints.push("Standard liability protection as per policy terms");
  }
  
  return keyPoints;
}

// Helper function to extract exclusions from PDF text
function extractExclusions(text: string): string[] {
  const exclusions: string[] = [];
  const exclusionKeywords = ['exclude', 'not cover', 'exception', 'deny', 'reject', 'limitation'];
  
  // Find paragraphs that might contain exclusions
  const paragraphs = text.split('\n\n');
  
  for (const paragraph of paragraphs) {
    if (exclusionKeywords.some(keyword => paragraph.toLowerCase().includes(keyword))) {
      // Split long paragraphs into more digestible exclusions
      const sentences = paragraph.split('. ');
      for (const sentence of sentences) {
        if (sentence.length > 20 && exclusionKeywords.some(keyword => sentence.toLowerCase().includes(keyword))) {
          exclusions.push(sentence.trim() + (sentence.endsWith('.') ? '' : '.'));
        }
      }
    }
    
    // Limit to 5 exclusions
    if (exclusions.length >= 5) break;
  }
  
  // If we found fewer than 2 exclusions, add some common ones
  if (exclusions.length < 2) {
    exclusions.push("Pre-existing conditions may not be covered as per policy terms");
    exclusions.push("Intentional damage or neglect");
    exclusions.push("Events outside the coverage territory");
  }
  
  return exclusions;
}

// Helper function to generate a summary of the PDF
function generateSummary(text: string): string {
  // Get the first 500 characters for context
  const firstPart = text.substring(0, 500).trim();
  
  // Check if it contains common insurance document sections
  const hasCoverage = text.toLowerCase().includes('coverage');
  const hasExclusions = text.toLowerCase().includes('exclusion');
  const hasDeductible = text.toLowerCase().includes('deductible');
  const hasPremium = text.toLowerCase().includes('premium');
  
  let summary = "This policy document ";
  
  if (hasCoverage) {
    summary += "outlines coverage details for specific events and circumstances. ";
  }
  
  if (hasExclusions) {
    summary += "contains exclusions for certain scenarios that aren't covered. ";
  }
  
  if (hasDeductible) {
    summary += "specifies deductible amounts that must be paid before coverage applies. ";
  }
  
  if (hasPremium) {
    summary += "includes premium payment information and schedule. ";
  }
  
  summary += "The document contains legal terminology and should be reviewed carefully. Overall, it appears to provide standard insurance coverage with standard limitations and exclusions.";
  
  return summary;
}

// Helper function to calculate readability score
function calculateReadabilityScore(text: string): string {
  // Simple readability estimation based on average sentence length
  const sentences = text.split(/[.!?]+/);
  const words = text.split(/\s+/);
  
  if (sentences.length === 0) return "Low";
  
  const avgWordsPerSentence = words.length / sentences.length;
  
  if (avgWordsPerSentence > 25) return "Complex";
  if (avgWordsPerSentence > 18) return "Moderate";
  return "Simple";
}

// Helper function to calculate overall policy rating
function calculateRating(text: string): number {
  // This is a very simplified rating calculation
  const clarity = text.length < 10000 ? 8 : (text.length < 20000 ? 6 : 4);
  const comprehensiveness = text.length > 15000 ? 8 : 6;
  
  return (clarity + comprehensiveness) / 2;
}

// Helper function to extract sections from the PDF
function extractSections(text: string): {heading: string, content: string}[] {
  const sections: {heading: string, content: string}[] = [];
  const lines = text.split('\n');
  
  let currentHeading = "";
  let currentContent: string[] = [];
  
  // Simple heuristic to identify headings: all caps, short lines
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.length > 0 && trimmedLine.length < 50 && trimmedLine === trimmedLine.toUpperCase()) {
      // This looks like a heading
      if (currentHeading && currentContent.length) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join(' ')
        });
      }
      
      currentHeading = trimmedLine;
      currentContent = [];
    } else if (trimmedLine.length > 0 && currentHeading) {
      // This is content for the current heading
      currentContent.push(trimmedLine);
    }
  }
  
  // Add the last section
  if (currentHeading && currentContent.length) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join(' ')
    });
  }
  
  // If we couldn't find any sections, create some default ones
  if (sections.length === 0) {
    sections.push({
      heading: "POLICY OVERVIEW",
      content: "This document contains important information about your insurance policy, including coverage details, exclusions, and claim procedures."
    });
    
    sections.push({
      heading: "COVERAGE SUMMARY",
      content: "The policy provides coverage for specified events and circumstances as detailed in the full policy document. Please refer to the complete terms and conditions for specifics."
    });
  }
  
  return sections.slice(0, 4); // Limit to 4 sections
}

// Helper function to extract key terms from the PDF
function extractKeyTerms(text: string): string[] {
  const commonTerms = [
    "Premium: The amount paid by the policyholder for insurance coverage",
    "Deductible: Amount you pay out-of-pocket before insurance covers a claim",
    "Coverage Limit: Maximum amount insurance will pay for a covered loss",
    "Policyholder: Person who owns the insurance policy"
  ];
  
  // Try to find defined terms in the document
  const terms: string[] = [];
  const lines = text.split('\n');
  const definitionPatterns = [/(.+)\s+means\s+(.+)/i, /(.+)\s+is defined as\s+(.+)/i, /(.+)\s+refers to\s+(.+)/i];
  
  for (const line of lines) {
    for (const pattern of definitionPatterns) {
      const match = line.match(pattern);
      if (match && match[1] && match[2]) {
        const term = match[1].trim();
        const definition = match[2].trim();
        if (term.length < 30 && definition.length < 100) {
          terms.push(`${term}: ${definition}`);
        }
      }
    }
    
    // Limit to 8 terms
    if (terms.length >= 8) break;
  }
  
  // If we found fewer than 4 terms, add some common ones
  if (terms.length < 4) {
    for (const commonTerm of commonTerms) {
      if (!terms.some(t => t.toLowerCase().includes(commonTerm.split(':')[0].toLowerCase()))) {
        terms.push(commonTerm);
      }
      
      if (terms.length >= 8) break;
    }
  }
  
  return terms;
}

// Function to summarize a policy PDF - now just calls the analyzePolicyPdf function
export const summarizePolicyPdf = async (file: File): Promise<{ success: boolean; data?: PolicyAnalysis; error?: string }> => {
  return analyzePolicyPdf(file);
};

// Mock AI chat response function
export const getAIChatResponse = async (message: string, context: string): Promise<{ success: boolean; data: string; error?: string }> => {
  try {
    console.log("Getting AI response for:", message, "with context:", context);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on different questions
    let response = "";
    
    if (message.toLowerCase().includes("coverage worth")) {
      response = "A coverage worth ₹500,000 in health insurance typically covers hospitalization expenses, pre and post hospitalization care, and sometimes critical illness treatments. This is considered a mid-range coverage in India that can handle most routine hospitalizations but might not be sufficient for long-term or serious conditions in premium hospitals.";
    } else if (message.toLowerCase().includes("premium")) {
      response = "Your insurance premium is calculated based on several factors including your age, health condition, coverage amount, policy term, and any add-ons you choose. For health insurance, family history and pre-existing conditions play a significant role in determining your premium amount in rupees.";
    } else if (message.toLowerCase().includes("deductible")) {
      response = "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. Choosing a higher deductible typically lowers your premium, but means you'll pay more upfront when making a claim. For example, with a ₹20,000 deductible, you would pay the first ₹20,000 of covered services yourself.";
    } else if (message.toLowerCase().includes("term insurance")) {
      response = "Term insurance is a type of life insurance that provides coverage for a specific period (term). It pays a death benefit to your beneficiaries if you die during the term. It's the most affordable type of life insurance, with premiums in India typically starting from ₹600-700 per month for a ₹1 crore coverage for a 30-year-old healthy individual.";
    } else {
      response = "I'd be happy to help explain that. Insurance policies in India typically include coverage details, exclusions, waiting periods, and claim procedures. The premium you pay is based on your risk profile and coverage amount. Is there something specific about insurance you'd like to know more about?";
    }
    
    return { success: true, data: response };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return {
      success: false,
      data: "",
      error: "Failed to get AI response."
    };
  }
};

// Helper function to enhance recommendations with AI explanations
export const enhanceRecommendationsWithAI = (recommendations: InsurancePlan[], preferences: UserPreferences): InsurancePlan[] => {
  // In a real application, this would use AI to generate personalized explanations
  // Here we're just returning the recommendations as is
  return recommendations;
};
