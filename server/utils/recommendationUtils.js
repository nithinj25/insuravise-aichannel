
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Enhance insurance recommendations with AI-generated explanations
 * @param {Array} matchedPlans - Matched insurance plans
 * @param {Object} userProfile - User preferences
 * @returns {Promise<Array>} - Enhanced recommendations
 */
exports.enhanceRecommendationsWithAI = async (matchedPlans, userProfile) => {
  try {
    // Use fallback if no API key is provided
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API key provided, using fallback enhancement');
      return fallbackEnhanceRecommendations(matchedPlans, userProfile);
    }

    // If there are no plans, return empty array
    if (!matchedPlans || matchedPlans.length === 0) {
      return [];
    }

    // Format user profile and plans for AI prompt
    const userProfileStr = JSON.stringify(userProfile, null, 2);
    const plansStr = JSON.stringify(matchedPlans.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      providerName: p.providerName,
      features: p.features,
      price: p.price,
      matchScore: p.matchScore
    })), null, 2);

    // Call OpenAI API
    const prompt = `
You are an insurance expert helping to explain insurance plan recommendations to a customer.

USER PROFILE:
${userProfileStr}

RECOMMENDED PLANS:
${plansStr}

For each plan, generate a personalized explanation of why this plan is a good match for this user.
Each explanation should be 1-2 sentences and mention the match score, specific plan features that align with user needs, and consider the user's priorities.
Return just a JSON array of objects with plan IDs and explanations, like:
[
  {
    "id": "plan-id-1",
    "explanation": "This plan is a 85% match for your needs because..."
  },
  ...
]
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an insurance expert assistant. Respond only with valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const aiResponse = response.choices[0].message.content.trim();
    let explanations;
    
    try {
      explanations = JSON.parse(aiResponse);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.log('AI Response:', aiResponse);
      return fallbackEnhanceRecommendations(matchedPlans, userProfile);
    }

    // Merge explanations with matched plans
    return matchedPlans.map(plan => {
      const explanation = explanations.find(e => e.id === plan.id);
      return {
        ...plan,
        explanation: explanation ? explanation.explanation : 
          `This ${plan.name} from ${plan.providerName} is a ${plan.matchScore}% match for your needs.`
      };
    });
  } catch (error) {
    console.error('Error enhancing recommendations with AI:', error);
    return fallbackEnhanceRecommendations(matchedPlans, userProfile);
  }
};

/**
 * Fallback function to generate explanations without AI
 * @param {Array} plans - Matched insurance plans
 * @param {Object} userProfile - User preferences
 * @returns {Array} - Enhanced recommendations
 */
const fallbackEnhanceRecommendations = (plans, userProfile) => {
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
