
import { UserPreferences, InsurancePlan, PolicyAnalysis } from "@/types/insurance";

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
  // This is a mock implementation - in a real app this would call an AI service
  try {
    console.log("Analyzing policy PDF:", file.name);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful response
    return {
      success: true,
      data: {
        title: "Sample Insurance Policy Analysis",
        summary: "This policy provides standard coverage with some notable exclusions. The terms are generally favorable but contain some restrictive clauses regarding claim filing periods.",
        keyPoints: [
          "Coverage begins 30 days after policy start date",
          "Includes standard liability protection up to $300,000",
          "Requires claims to be filed within 60 days of incident",
          "Excludes coverage for pre-existing conditions older than 2 years",
          "Offers premium discounts for safe driving history"
        ],
        exclusions: [
          "Natural disasters in high-risk zones",
          "Intentional damage or neglect",
          "Unauthorized modifications to property"
        ],
        simplifiedRating: 7.5,
        readabilityScore: "Moderate",
        estimatedReadTime: "15 minutes",
        confidenceScore: 0.85
      }
    };
  } catch (error) {
    console.error("Error analyzing policy:", error);
    return {
      success: false,
      error: "Failed to analyze the policy document."
    };
  }
};

// Function to summarize a policy PDF
export const summarizePolicyPdf = async (file: File): Promise<{ success: boolean; data?: PolicyAnalysis; error?: string }> => {
  // This is just an alias for analyzePolicyPdf in this mock implementation
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
