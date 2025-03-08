
import { UserPreferences } from "@/services/insuranceService";

/**
 * Constants for the AI recommendation engine
 */
const COVERAGE_WEIGHT = 0.35;
const BUDGET_MATCH_WEIGHT = 0.3;
const PRIORITY_MATCH_WEIGHT = 0.2;
const PERSONAL_FACTOR_WEIGHT = 0.15;

/**
 * Calculate match score between user preferences and an insurance plan
 * @param preferences User's insurance preferences
 * @param plan Insurance plan to evaluate
 * @returns Match score as a percentage (0-100)
 */
export const calculateMatchScore = (preferences: UserPreferences, plan: any): number => {
  // Coverage match - how well the plan's coverage matches the user's desired level
  const coverageMatch = 100 - Math.abs(preferences.coverageLevel - plan.coverageLevel);
  
  // Budget match - how well the plan's price fits within the user's budget
  const budgetRatio = plan.price / preferences.budget;
  const budgetMatch = budgetRatio <= 1 
    ? 100 - (budgetRatio * 20) // Under budget gets high score
    : Math.max(0, 100 - ((budgetRatio - 1) * 100)); // Over budget reduces score quickly
  
  // Priority match - how many of the user's priorities are addressed by the plan
  const priorityMatch = preferences.priorities?.length 
    ? preferences.priorities.filter(p => 
        plan.features.some((f: string) => f.toLowerCase().includes(p.toLowerCase()))
      ).length / preferences.priorities.length * 100
    : 100;
  
  // Personal factors match - based on specific insurance type
  let personalFactorMatch = 100;
  
  if (preferences.type === "health") {
    // For health insurance, consider pre-existing conditions and smoking status
    if (preferences.preExistingConditions?.length && 
        !preferences.preExistingConditions.includes("none")) {
      const conditionCovered = plan.features.some((f: string) => 
        f.toLowerCase().includes("pre-existing") || 
        f.toLowerCase().includes("condition"));
      personalFactorMatch = conditionCovered ? 100 : 60;
    }
    
    if (preferences.smokingStatus === "smoker" && 
        plan.features.some((f: string) => f.toLowerCase().includes("non-smoker"))) {
      personalFactorMatch -= 20;
    }
  } else if (preferences.type === "auto") {
    // For auto insurance, consider driving record
    if (preferences.drivingRecord === "poor" || preferences.drivingRecord === "fair") {
      const highRiskCovered = plan.features.some((f: string) => 
        f.toLowerCase().includes("high risk") || 
        f.toLowerCase().includes("all driver"));
      personalFactorMatch = highRiskCovered ? 100 : 70;
    }
  }
  
  // Calculate weighted final score
  const finalScore = (
    (coverageMatch * COVERAGE_WEIGHT) +
    (budgetMatch * BUDGET_MATCH_WEIGHT) +
    (priorityMatch * PRIORITY_MATCH_WEIGHT) +
    (personalFactorMatch * PERSONAL_FACTOR_WEIGHT)
  );
  
  // Round to nearest integer
  return Math.round(finalScore);
};

/**
 * Generate a personalized explanation for why a plan was recommended
 * @param preferences User's insurance preferences
 * @param plan Recommended insurance plan
 * @param matchScore The calculated match score
 * @returns Personalized explanation text
 */
export const generateRecommendationExplanation = (
  preferences: UserPreferences, 
  plan: any, 
  matchScore: number
): string => {
  const explanations = [];
  
  // Budget explanation
  if (plan.price <= preferences.budget) {
    const savingsPercent = Math.round((1 - (plan.price / preferences.budget)) * 100);
    if (savingsPercent > 15) {
      explanations.push(`This plan is ${savingsPercent}% under your budget`);
    } else {
      explanations.push(`This plan fits well within your budget`);
    }
  } else {
    explanations.push(`This plan slightly exceeds your budget but offers exceptional coverage`);
  }
  
  // Coverage level explanation
  if (Math.abs(preferences.coverageLevel - plan.coverageLevel) < 10) {
    explanations.push(`provides exactly the level of coverage you're looking for`);
  } else if (plan.coverageLevel > preferences.coverageLevel) {
    explanations.push(`offers better coverage than you requested`);
  } else {
    explanations.push(`has balanced coverage aligned with your needs`);
  }
  
  // Priorities explanation
  if (preferences.priorities?.length) {
    const matchedPriorities = preferences.priorities.filter(p => 
      plan.features.some((f: string) => f.toLowerCase().includes(p.toLowerCase()))
    );
    
    if (matchedPriorities.length === preferences.priorities.length) {
      explanations.push(`addresses all your key priorities`);
    } else if (matchedPriorities.length > 0) {
      explanations.push(`covers most of your priority needs`);
    }
  }
  
  // Type-specific explanations
  if (preferences.type === "health" && preferences.familySize > 1) {
    explanations.push(`provides good family coverage`);
  } else if (preferences.type === "auto" && preferences.drivingRecord === "excellent") {
    explanations.push(`rewards your excellent driving record`);
  } else if (preferences.type === "home" && plan.features.some((f: string) => 
    f.toLowerCase().includes("natural disaster") || f.toLowerCase().includes("catastrophe")
  )) {
    explanations.push(`includes strong protection against unexpected events`);
  }
  
  // Shuffle and take 2-3 explanations to combine
  const shuffledExplanations = explanations.sort(() => 0.5 - Math.random());
  const selectedExplanations = shuffledExplanations.slice(0, Math.min(3, explanations.length));
  
  if (selectedExplanations.length === 0) {
    return `This plan has a ${matchScore}% match with your requirements and offers a good balance of price and coverage.`;
  }
  
  return `This plan ${selectedExplanations.join(' and ')}. Overall ${matchScore}% match with your requirements.`;
};

/**
 * Sort and enhance recommendations with AI insights
 * @param plans Array of insurance plans
 * @param preferences User's insurance preferences 
 * @returns Enhanced recommendations with match scores and explanations
 */
export const enhanceRecommendationsWithAI = (plans: any[], preferences: UserPreferences) => {
  // Calculate match scores for each plan
  const enhancedPlans = plans.map(plan => {
    const matchScore = calculateMatchScore(preferences, plan);
    const explanation = generateRecommendationExplanation(preferences, plan, matchScore);
    
    return {
      ...plan,
      matchScore,
      explanation
    };
  });
  
  // Sort plans by match score (highest first)
  const sortedPlans = enhancedPlans.sort((a, b) => b.matchScore - a.matchScore);
  
  return sortedPlans;
};
