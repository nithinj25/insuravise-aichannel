
import { InsurancePlan } from "@/types/insurance";
import { mockInsurancePlans } from "@/utils/mockData";
import { enhanceRecommendationsWithAI } from "./recommendationService";

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
