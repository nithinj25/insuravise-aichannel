
import { UserPreferences, InsurancePlan } from "@/types/insurance";

// Get base API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Function to enhance recommendations with AI-generated insights
export const enhanceRecommendationsWithAI = async (plans: InsurancePlan[], userProfile: UserPreferences) => {
  try {
    const apiUrl = `${API_BASE_URL}/recommendations/personalized`;
    console.log("Enhancing recommendations with AI from:", apiUrl);
    
    // Since the backend already handles the enhancement,
    // we'll simply pass the user profile and use the returned data
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Failed to enhance recommendations");
    }
    
    return result.data;
  } catch (error) {
    console.error("Error enhancing recommendations:", error);
    // If API fails, fall back to the local implementation
    // This ensures the app still works even if the backend is unavailable
    return fallbackEnhanceRecommendations(plans, userProfile);
  }
};

// Fallback local implementation if API calls fail
const fallbackEnhanceRecommendations = (plans: InsurancePlan[], userProfile: UserPreferences) => {
  return plans.map(plan => {
    let explanation = "";
    
    // Generate explanation based on insurance type and user preferences
    switch (plan.type) {
      case "health":
        if (userProfile.preExistingConditions?.length && !userProfile.preExistingConditions.includes("none")) {
          explanation = `This ${plan.name} plan from ${plan.providerName} offers coverage for pre-existing conditions with a ${plan.matchScore}% match to your health needs.`;
        } else {
          explanation = `This ${plan.name} plan from ${plan.providerName} provides excellent preventive care options and is a ${plan.matchScore}% match for your health profile.`;
        }
        break;
      case "life":
        explanation = `Based on your age (${userProfile.age}) and family size (${userProfile.familySize}), this ${plan.name} policy offers appropriate coverage with a ${plan.matchScore}% match to your needs.`;
        break;
      case "auto":
        explanation = `Given your ${userProfile.drivingRecord} driving record, this ${plan.name} plan from ${plan.providerName} offers a good balance of coverage and premium with a ${plan.matchScore}% match.`;
        break;
      case "home":
        explanation = `For your property valued at approximately ₹${(userProfile.propertyValue || 0) * 75}, this ${plan.name} plan provides solid protection with a ${plan.matchScore}% match to your needs.`;
        break;
      default:
        explanation = `This ${plan.name} plan from ${plan.providerName} is a ${plan.matchScore}% match to your insurance preferences.`;
    }
    
    // Consider user priorities if specified
    if (userProfile.priorities && userProfile.priorities.length > 0) {
      if (userProfile.priorities.includes("price")) {
        explanation += " The plan is competitively priced for the coverage offered.";
      }
      if (userProfile.priorities.includes("coverage")) {
        explanation += " It provides comprehensive coverage for the most important aspects you identified.";
      }
      if (userProfile.priorities.includes("network")) {
        explanation += " The provider network is extensive and includes most major healthcare facilities.";
      }
    }
    
    return {
      ...plan,
      explanation
    };
  });
};
