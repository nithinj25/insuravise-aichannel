
import { UserPreferences, InsurancePlan } from "@/types/insurance";

// Function to enhance recommendations with AI-generated insights
export const enhanceRecommendationsWithAI = (plans: InsurancePlan[], userProfile: UserPreferences) => {
  // In a real app, this would call an AI service to generate personalized explanations
  // For this demo, we'll simply add pre-written explanations based on user preferences
  
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
