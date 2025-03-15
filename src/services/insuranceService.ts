
import { InsurancePlan, PolicyAnalysis, RecommendationResult } from "@/types/insurance";
import { mockInsurancePlans } from "@/utils/mockData";

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

// Function to add AI-generated explanations to recommendations
export const enhanceRecommendationsWithAI = async (plans: InsurancePlan[], userProfile: any) => {
  // In a real app, this would call an AI service to generate personalized explanations
  // For demo, we'll return the plans with pre-written explanations
  return plans;
};

// Function to get AI chat response
export const getAIChatResponse = async (message: string, context: string = 'general-insurance') => {
  // For a real backend implementation, we'd make an API call to a language model service
  const apiUrl = 'https://api.example.com/ai-chat';
  
  try {
    // In a real implementation, we would make a fetch call like this:
    /*
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ message, context })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data: data.response };
    */
    
    // For now, we'll simulate a response
    return new Promise<{ success: boolean; data?: string; error?: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: `I'm InsuraAI, your virtual insurance assistant. Regarding "${message}", I recommend reviewing your coverage needs based on your life stage and financial situation. Would you like me to explain more about specific insurance types?`
        });
      }, 1500);
    });
  } catch (error) {
    console.error("Error in AI chat service:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get AI response"
    };
  }
};

// Fetch insurance plans for comparison
export const fetchInsurancePlans = async (category: string) => {
  // For a real backend implementation, we would fetch from an API
  const apiUrl = `https://api.example.com/insurance-plans?category=${category}`;
  
  try {
    // In a real implementation, we would make a fetch call like this:
    /*
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data: data.plans };
    */
    
    // For now, we'll use mock data
    return new Promise<{ success: boolean; data: InsurancePlan[]; error?: string }>((resolve) => {
      setTimeout(() => {
        // Filter mock data based on category if needed
        const filtered = mockInsurancePlans.filter(
          plan => category === "all" ? true : plan.type.toLowerCase() === category.toLowerCase()
        );
        resolve({
          success: true,
          data: filtered
        });
      }, 1500);
    });
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch insurance plans",
      data: []
    };
  }
};

// Analyze PDF document and extract insurance policy details
export const analyzePolicyPdf = async (file: File): Promise<{ success: boolean; data?: PolicyAnalysis; error?: string }> => {
  try {
    // In a real backend implementation, we would upload the file to a server endpoint
    // const formData = new FormData();
    // formData.append('policyFile', file);
    
    // const response = await fetch('https://api.example.com/analyze-policy', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // return { success: true, data: data.analysis };
    
    // For now, we'll use our local processing
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

// Analyze the policy text and extract key information
const analyzeInsurancePolicyText = async (policyText: string): Promise<PolicyAnalysis> => {
  // In a real application, this might use NLP or ML models via an API
  // For demo, we'll use simple text analysis
  
  // Generate a default summary if it doesn't exist
  const summary = "This policy provides standard coverage with typical exclusions and limitations. Review the key points below for important details.";
  
  // Generate default key points if they don't exist
  const keyPoints = [
    "Covers standard liability and property damage",
    "Includes deductible of $500 for most claims",
    "Requires claims to be filed within 30 days of incident",
    "Coverage limits apply as specified in the policy details"
  ];
  
  // Generate default exclusions if they don't exist
  const exclusions = [
    "Acts of war or terrorism",
    "Intentional damage by the insured",
    "Normal wear and tear",
    "Pre-existing conditions not disclosed at enrollment"
  ];
  
  // Extract sections
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
  // In a real backend implementation, we would fetch the PDF file from the URL
  // and analyze it using a server API
  // const response = await fetch('https://api.example.com/summarize-policy', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ policyUrl })
  // });
  
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  
  // const data = await response.json();
  // return { success: true, data: data.analysis };
  
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
