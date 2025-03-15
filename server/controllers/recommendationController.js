
const { getPlans } = require('../models/insurancePlanModel');
const { enhanceRecommendationsWithAI } = require('../utils/recommendationUtils');

/**
 * Get personalized insurance recommendations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getPersonalizedRecommendations = async (req, res, next) => {
  try {
    const userProfile = req.body;
    
    if (!userProfile || !userProfile.type) {
      return res.status(400).json({
        success: false,
        error: 'User profile and insurance type are required'
      });
    }
    
    // Get matching plans from the model
    const allPlans = await getPlans({ type: userProfile.type });
    
    // Apply recommendation algorithm
    const matchedPlans = matchPlansToUserProfile(allPlans, userProfile);
    
    // Enhance recommendations with AI explanations
    const enhancedRecommendations = await enhanceRecommendationsWithAI(matchedPlans, userProfile);
    
    res.status(200).json({
      success: true,
      data: enhancedRecommendations
    });
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    next(error);
  }
};

/**
 * Match insurance plans to user profile
 * @param {Array} plans - List of insurance plans
 * @param {Object} userProfile - User preferences
 * @returns {Array} - Matched and scored plans
 */
function matchPlansToUserProfile(plans, userProfile) {
  return plans
    .map(plan => {
      // Calculate match score based on user preferences
      const coverageScore = calculateCoverageScore(plan, userProfile.coverageLevel);
      const priceScore = calculatePriceScore(plan, userProfile.budget);
      const featureScore = calculateFeatureScore(plan, userProfile);
      const demographicScore = calculateDemographicScore(plan, userProfile);
      const priorityScore = calculatePriorityScore(plan, userProfile.priorities);
      
      // Calculate weights based on user priorities
      const weights = calculateWeights(userProfile.priorities);
      
      // Calculate overall match score
      const matchScore = Math.round(
        (coverageScore * weights.coverage) +
        (priceScore * weights.price) +
        (featureScore * weights.features) +
        (demographicScore * weights.demographics) +
        (priorityScore * weights.priorities)
      );
      
      return {
        ...plan,
        matchScore,
        matchDetails: {
          coverageScore,
          priceScore,
          featureScore,
          demographicScore,
          priorityScore,
          appliedWeights: weights
        }
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3); // Return top 3 matches
}

/**
 * Calculate coverage match score
 * @param {Object} plan - Insurance plan
 * @param {number} desiredCoverageLevel - User's desired coverage level
 * @returns {number} - Coverage match score (0-100)
 */
function calculateCoverageScore(plan, desiredCoverageLevel) {
  // Simple algorithm - estimate plan's coverage level from price and features
  const planCoverageLevel = Math.min(100, Math.max(0, 
    plan.price / 100 * 25 + plan.features.length * 10
  ));
  
  // Calculate how close the plan's coverage is to the desired level
  const coverageDifference = Math.abs(planCoverageLevel - desiredCoverageLevel);
  return Math.max(0, 100 - coverageDifference * 2);
}

/**
 * Calculate price match score
 * @param {Object} plan - Insurance plan
 * @param {number} budget - User's budget
 * @returns {number} - Price match score (0-100)
 */
function calculatePriceScore(plan, budget) {
  if (!budget) return 70; // Default score if no budget specified
  
  // Calculate how close the plan's price is to the budget
  const priceDifference = plan.price - budget;
  
  if (priceDifference <= 0) {
    // Under budget - good match
    return 100;
  } else {
    // Over budget - reduce score based on how much over
    const percentOver = (priceDifference / budget) * 100;
    return Math.max(0, 100 - percentOver * 2);
  }
}

/**
 * Calculate feature match score
 * @param {Object} plan - Insurance plan
 * @param {Object} userProfile - User preferences
 * @returns {number} - Feature match score (0-100)
 */
function calculateFeatureScore(plan, userProfile) {
  // Simplified scoring algorithm - in reality, this would be much more complex
  // based on specific features needed for each insurance type
  
  let score = 70; // Default score
  
  // Adjust score based on plan type and user profile
  switch (plan.type) {
    case "health":
      if (userProfile.preExistingConditions?.length && 
          !userProfile.preExistingConditions.includes("none")) {
        // Check if plan covers pre-existing conditions
        score += plan.features.some(f => 
          f.toLowerCase().includes("pre-existing") || 
          f.toLowerCase().includes("condition")
        ) ? 20 : -10;
      }
      break;
    case "life":
      if (userProfile.age > 50) {
        // Older users need specific coverage options
        score += plan.features.some(f => 
          f.toLowerCase().includes("senior") || 
          f.toLowerCase().includes("elder")
        ) ? 15 : -5;
      }
      break;
    // Additional cases for other insurance types
  }
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate demographic match score
 * @param {Object} plan - Insurance plan
 * @param {Object} userProfile - User demographics
 * @returns {number} - Demographic match score (0-100)
 */
function calculateDemographicScore(plan, userProfile) {
  // Simplified scoring - in reality, this would be much more complex
  // and based on actuarial data
  
  let score = 70; // Default score
  
  switch (plan.type) {
    case "health":
      // Health factors
      if (userProfile.smokingStatus === "smoker") {
        score -= 10; // Smoking usually increases premiums
      }
      break;
    case "auto":
      // Driving record affects auto insurance
      if (userProfile.drivingRecord === "excellent") {
        score += 15;
      } else if (userProfile.drivingRecord === "poor") {
        score -= 15;
      }
      break;
    case "life":
      // Age affects life insurance
      if (userProfile.age > 60) {
        score -= 20;
      } else if (userProfile.age < 30) {
        score += 15;
      }
      break;
    // Additional cases for other insurance types
  }
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate priority match score
 * @param {Object} plan - Insurance plan
 * @param {Array} priorities - User's priorities
 * @returns {number} - Priority match score (0-100)
 */
function calculatePriorityScore(plan, priorities) {
  if (!priorities || priorities.length === 0) {
    return 70; // Default score if no priorities specified
  }
  
  let score = 70;
  
  // Adjust score based on priorities
  priorities.forEach(priority => {
    switch (priority) {
      case "price":
        // Lower price is better for this priority
        score += 100 - Math.min(100, plan.price / 5);
        break;
      case "coverage":
        // More features indicate better coverage
        score += Math.min(30, plan.features.length * 5);
        break;
      case "reputation":
        // Use provider name as proxy for reputation
        if (["Blue Cross", "Aetna", "Prudential", "State Farm"].includes(plan.providerName)) {
          score += 20;
        }
        break;
      // Additional cases for other priorities
    }
  });
  
  // Average the score adjustments
  score = score / (priorities.length + 1);
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate weights for different scoring factors
 * @param {Array} priorities - User's priorities
 * @returns {Object} - Weight factors
 */
function calculateWeights(priorities) {
  // Default weights
  const weights = {
    coverage: 0.25,
    price: 0.25,
    features: 0.20,
    demographics: 0.15,
    priorities: 0.15
  };
  
  // Adjust weights based on user priorities
  if (priorities && priorities.length > 0) {
    priorities.forEach(priority => {
      switch (priority) {
        case "price":
          weights.price += 0.15;
          weights.coverage -= 0.05;
          weights.features -= 0.05;
          weights.demographics -= 0.05;
          break;
        case "coverage":
          weights.coverage += 0.15;
          weights.price -= 0.05;
          weights.features -= 0.05;
          weights.demographics -= 0.05;
          break;
        // Additional cases for other priorities
      }
    });
    
    // Normalize weights to ensure they sum to 1
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key] = weights[key] / sum;
    });
  }
  
  return weights;
}
