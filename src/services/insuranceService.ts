
import { InsurancePlan, RecommendationResult } from "@/types/insurance";
import { mockInsurancePlans } from "@/utils/mockData";
import { enhanceRecommendationsWithAI } from "@/utils/recommendationUtils";

// Get insurance plans based on filters
export const getInsurancePlans = async (filters: any) => {
  // In a real app, we would fetch data from an API with filters
  // For now, we're using mock data
  return new Promise<{ success: boolean; data: InsurancePlan[]; error?: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockInsurancePlans
      });
    }, 1500);
  });
};

// Get personalized recommendations based on user profile
export const getPersonalizedRecommendations = async (userProfile: any) => {
  // In a real app, this would use an algorithm to match user needs with appropriate plans
  try {
    // Get all insurance plans first
    const plansResponse = await getInsurancePlans({});
    
    if (!plansResponse.success) {
      return {
        success: false,
        error: plansResponse.error || "Failed to fetch insurance plans"
      };
    }

    // Filter and sort plans based on user profile to create recommendations
    // This is a simplified algorithm for demo purposes
    let filteredPlans = plansResponse.data.slice(0, 3);
    
    // Enhance recommendations with AI-generated explanations
    const enhancedRecommendations = await enhanceRecommendationsWithAI(filteredPlans, userProfile);
    
    return {
      success: true,
      data: enhancedRecommendations
    };
  } catch (error) {
    console.error("Error getting personalized recommendations:", error);
    return {
      success: false,
      error: "Failed to generate recommendations"
    };
  }
};

// Function to get AI chat response
export const getAIChatResponse = async (message: string) => {
  // In a real app, this would call an AI API
  return new Promise<{ success: boolean; data?: string; error?: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: `I'm InsuraAI, your virtual insurance assistant. Regarding "${message}", I recommend reviewing your coverage needs based on your life stage and financial situation. Would you like me to explain more about specific insurance types?`
      });
    }, 1500);
  });
};

// Fetch insurance plans for comparison
export const fetchInsurancePlans = async (category: string) => {
  // In a real app, we would fetch filtered data based on category
  return new Promise<InsurancePlan[]>((resolve) => {
    setTimeout(() => {
      // Filter mock data based on category if needed
      const filtered = mockInsurancePlans.filter(
        plan => category === "all" ? true : plan.type.toLowerCase() === category.toLowerCase()
      );
      resolve(filtered);
    }, 1500);
  });
};

// Convert base64 PDF data to text
const extractTextFromPdfData = async (pdfData: ArrayBuffer) => {
  try {
    // Instead of using pdf-parse directly, use a browser-compatible PDF.js approach
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set worker path for PDF.js
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let fullText = '';

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

// Analyze PDF document and extract insurance policy details
export const analyzePolicyDocument = async (file: File) => {
  try {
    // Read the uploaded file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Extract text from PDF
    const pdfText = await extractTextFromPdfData(arrayBuffer);
    
    // Perform analysis on the extracted text
    const analysis = await analyzeInsurancePolicyText(pdfText);
    
    return {
      success: true,
      data: analysis
    };
  } catch (error) {
    console.error("Error analyzing policy document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

// Analyze the policy text and extract key information
const analyzeInsurancePolicyText = async (policyText: string) => {
  // In a real app, this might use NLP or ML models
  // For demo, we'll use simple text analysis
  
  // Extract policy sections
  const sections = extractSections(policyText);
  
  // Extract key terms
  const keyTerms = extractKeyTerms(policyText);
  
  // Calculate readability score
  const readabilityScore = calculateReadabilityScore(policyText);
  
  // Estimate read time (average reading speed is ~200-250 words per minute)
  const wordCount = policyText.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 200);
  const estimatedReadTime = readTimeMinutes <= 1 
    ? "1 minute" 
    : `${readTimeMinutes} minutes`;
  
  // Generate simplification rating (1-10)
  const simplifiedRating = Math.floor(Math.random() * 4) + 5; // Random 5-8 rating for demo
  
  return {
    sections,
    keyTerms,
    readabilityScore,
    estimatedReadTime,
    simplifiedRating,
    wordCount
  };
};

// Helper functions for policy analysis
function extractSections(text: string) {
  // Simplified section extraction for demo
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
      content: "A deductible of $500 applies to each covered loss. This amount will be deducted from any claim payment."
    },
    {
      heading: "Claims Procedure",
      content: "In the event of a loss, the insured must notify the company within 30 days. Documentation of loss must be provided within 60 days of the incident."
    }
  ];
  
  return sections;
}

function calculateReadabilityScore(text: string) {
  // Simplified readability calculation for demo
  // In reality, this would use a proper readability formula like Flesch-Kincaid
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
}

function countSyllables(text: string) {
  // Very simplified syllable counter for demo
  // In reality, this would use a proper linguistic algorithm
  return Math.floor(text.split(/\s+/).length * 1.5);
}

function extractKeyTerms(text: string) {
  // Simplified key terms extraction for demo
  // In a real app, this might use NLP to identify defined terms
  const commonTerms = [
    "Premium: The amount paid for insurance coverage, typically in monthly or annual payments.",
    "Deductible: Amount the policyholder must pay before insurance coverage begins.",
    "Exclusion: Specific conditions or circumstances not covered by the insurance policy.",
    "Claim: A formal request to the insurance company for coverage or compensation for a covered loss.",
    "Endorsement: A written document attached to an insurance policy that modifies the policy's coverage, terms, or conditions.",
    "Beneficiary: The person or entity designated to receive the proceeds from the insurance policy.",
    "Coverage Limit: The maximum amount an insurer will pay under an insurance policy for a covered loss."
  ];
  
  // Return a random subset of common terms for demo purposes
  return commonTerms.sort(() => 0.5 - Math.random()).slice(0, 5);
}

// Summarize a policy PDF from URL
export const summarizePolicyPdf = async (policyUrl: string) => {
  // In a real app, this would fetch the PDF and analyze it
  // For demo, we'll return a mock analysis after a delay
  return new Promise<{ success: boolean; data?: any; error?: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          sections: [
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
              content: "A deductible of $500 applies to each covered loss. This amount will be deducted from any claim payment."
            },
            {
              heading: "Claims Procedure",
              content: "In the event of a loss, the insured must notify the company within 30 days. Documentation of loss must be provided within 60 days of the incident."
            }
          ],
          keyTerms: [
            "Premium: The amount paid for insurance coverage, typically in monthly or annual payments.",
            "Deductible: Amount the policyholder must pay before insurance coverage begins.",
            "Exclusion: Specific conditions or circumstances not covered by the insurance policy.",
            "Claim: A formal request to the insurance company for coverage or compensation for a covered loss.",
            "Beneficiary: The person or entity designated to receive the proceeds from the insurance policy."
          ],
          readabilityScore: "Moderate - High school level",
          estimatedReadTime: "15 minutes",
          simplifiedRating: 7,
          wordCount: 3000
        }
      });
    }, 1500);
  });
};
