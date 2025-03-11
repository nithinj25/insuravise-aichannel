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
    },
    {
      id: "2",
      type: "Auto",
      name: "Standard Auto Insurance",
      price: 75,
      features: ["Liability", "Collision"],
	  policyUrl: "https://example.com/policy2",
    },
    {
      id: "3",
      type: "Home",
      name: "Homeowners Insurance",
      price: 200,
      features: ["Fire", "Theft", "Liability"],
	  policyUrl: "https://example.com/policy3",
    },
  ];

  return mockPlans;
};

// Mock function to simulate personalized recommendations
export const getPersonalizedRecommendations = async (preferences: UserPreferences): Promise<InsurancePlan[]> => {
  // In a real application, this would call an actual API
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
    },
    {
      id: "5",
      type: "Life",
      name: "Term Life Insurance",
      price: 50,
      features: ["Death benefit", "Living benefits"],
	  policyUrl: "https://example.com/policy5",
    },
  ];

  return mockRecommendations;
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
