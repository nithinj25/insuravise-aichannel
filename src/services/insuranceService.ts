
import axios from 'axios';

// Mock data for insurance providers (to be replaced with actual API/scraping)
export const insuranceProviders = [
  {
    id: 'provider1',
    name: 'Acme Insurance',
    website: 'https://example.com/acme',
    plans: [
      {
        id: 'acme-health-basic',
        type: 'health',
        name: 'Basic Health Plan',
        price: 120,
        features: [
          'Essential coverage',
          '24/7 customer support',
          'Network of 2000+ doctors',
          '$1000 deductible'
        ],
        policyUrl: 'https://example.com/acme/policies/health-basic.pdf'
      },
      {
        id: 'acme-health-premium',
        type: 'health',
        name: 'Premium Health Plan',
        price: 220,
        features: [
          'Comprehensive coverage',
          'Premium customer support',
          'Network of 5000+ doctors',
          '$500 deductible',
          'Alternative medicine coverage'
        ],
        policyUrl: 'https://example.com/acme/policies/health-premium.pdf'
      }
    ]
  },
  {
    id: 'provider2',
    name: 'Omega Insurance',
    website: 'https://example.com/omega',
    plans: [
      {
        id: 'omega-health-basic',
        type: 'health',
        name: 'Basic Care',
        price: 140,
        features: [
          'Basic health coverage',
          'Online support',
          'Network of 1800+ doctors',
          '$1200 deductible'
        ],
        policyUrl: 'https://example.com/omega/policies/basic-care.pdf'
      },
      {
        id: 'omega-health-plus',
        type: 'health',
        name: 'Plus Care',
        price: 180,
        features: [
          'Enhanced coverage',
          '24/7 phone support',
          'Network of 3000+ doctors',
          '$800 deductible',
          'Mental health coverage'
        ],
        policyUrl: 'https://example.com/omega/policies/plus-care.pdf'
      }
    ]
  },
  {
    id: 'provider3',
    name: 'Delta Insurance',
    website: 'https://example.com/delta',
    plans: [
      {
        id: 'delta-auto-basic',
        type: 'auto',
        name: 'Basic Auto',
        price: 90,
        features: [
          'Liability coverage',
          'Roadside assistance',
          '$1000 deductible'
        ],
        policyUrl: 'https://example.com/delta/policies/auto-basic.pdf'
      },
      {
        id: 'delta-auto-premium',
        type: 'auto',
        name: 'Premium Auto',
        price: 150,
        features: [
          'Comprehensive coverage',
          'Roadside assistance',
          'Rental car coverage',
          '$500 deductible',
          'New car replacement'
        ],
        policyUrl: 'https://example.com/delta/policies/auto-premium.pdf'
      }
    ]
  }
];

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Function to fetch insurance plans by type
export const fetchInsurancePlans = async (type: string): Promise<ApiResponse> => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`https://api.insurance-data.com/plans?type=${type}`);
    
    // For now, we'll filter our mock data
    const filteredPlans = insuranceProviders.flatMap(provider => {
      const providerPlans = provider.plans.filter(plan => plan.type === type);
      return providerPlans.map(plan => ({
        ...plan,
        providerName: provider.name,
        providerId: provider.id
      }));
    });
    
    return {
      success: true,
      data: filteredPlans
    };
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    return {
      success: false,
      error: 'Failed to fetch insurance plans. Please try again later.'
    };
  }
};

// Function to summarize a policy PDF
export const summarizePolicyPdf = async (policyUrl: string): Promise<ApiResponse> => {
  try {
    // In a real implementation, you would:
    // 1. Fetch the PDF from the URL
    // 2. Extract text from the PDF
    // 3. Use an AI service to summarize the content
    
    // Simulating an API call with a timeout
    console.log(`Fetching and summarizing policy from: ${policyUrl}`);
    
    // This would be a call to OpenAI or similar service in production
    // const response = await axios.post('https://api.openai.com/v1/summarize', {
    //   document_url: policyUrl,
    //   max_length: 500
    // });
    
    // Mock response for demonstration
    const mockSummary = {
      title: "Policy Summary",
      sections: [
        {
          heading: "Coverage Overview",
          content: "This policy provides coverage for medical expenses, hospital stays, and prescription drugs. It includes preventive care services with no deductible or copay requirements."
        },
        {
          heading: "Key Benefits",
          content: "Includes emergency services, hospital care, preventive services, prescription drug coverage, lab tests, mental health services, and pediatric services."
        },
        {
          heading: "Exclusions",
          content: "This policy does not cover cosmetic surgery, dental care (except as required by accident), vision care, long-term care, non-emergency care when traveling outside the US."
        },
        {
          heading: "Deductibles and Costs",
          content: "Annual deductible: $1000 individual / $2000 family. Out-of-pocket maximum: $6500 individual / $13000 family. Primary care visit copay: $25. Specialist visit copay: $50."
        }
      ],
      keyTerms: [
        "Premium: Monthly payment required to maintain coverage",
        "Deductible: Amount you pay before insurance begins to pay",
        "Copayment: Fixed amount you pay for a covered service",
        "Coinsurance: Percentage of costs you pay after meeting your deductible",
        "Out-of-pocket maximum: Most you'll pay during a policy period (usually one year)"
      ],
      simplifiedRating: 7.5, // On a scale of 1-10 for clarity
      readabilityScore: "Moderate", // Simplified, Moderate, Complex
      estimatedReadTime: "5 minutes"
    };
    
    return {
      success: true,
      data: mockSummary
    };
  } catch (error) {
    console.error('Error summarizing policy:', error);
    return {
      success: false,
      error: 'Failed to summarize policy. Please try again later.'
    };
  }
};

// Function to scrape insurance provider websites (in a real app)
export const scrapeProviderWebsite = async (url: string): Promise<ApiResponse> => {
  try {
    // In a real implementation, this would use a web scraping service or backend
    // For demonstration, we're simulating a response
    console.log(`Scraping website: ${url}`);
    
    // This would be implemented with a backend service like Puppeteer, Cheerio, etc.
    // For frontend-only apps, you might use a proxy service or CORS-friendly API
    
    return {
      success: true,
      data: {
        scrapedAt: new Date().toISOString(),
        message: "Website scraping completed successfully",
        // This would contain the actual scraped data
      }
    };
  } catch (error) {
    console.error('Error scraping website:', error);
    return {
      success: false,
      error: 'Failed to scrape website data. Please try again later.'
    };
  }
};

export interface UserPreferences {
  type: string;
  coverageLevel: number;
  budget?: number;
  familySize?: number;
  age?: number;
  preExistingConditions?: string[];
  smokingStatus?: string;
  drivingRecord?: string;
  propertyValue?: number;
  priorities?: string[];
}

// Enhanced AI recommendation engine with advanced matching algorithm
export const getPersonalizedRecommendations = async (preferences: UserPreferences): Promise<ApiResponse> => {
  try {
    console.log('Requesting AI-powered recommendations with preferences:', preferences);
    
    // In a real implementation, this would call a machine learning model API
    // Example API call:
    /*
    const response = await axios.post('https://api.insurance-ai-model.com/recommend', {
      preferences,
      apiKey: process.env.AI_MODEL_API_KEY
    });
    return {
      success: true,
      data: response.data.recommendations
    };
    */
    
    // For demonstration, we'll use our mock data with an enhanced algorithm
    const { type, coverageLevel, budget, familySize, age, preExistingConditions,
            smokingStatus, drivingRecord, propertyValue, priorities } = preferences;
    
    // Get all plans of the requested type
    const allPlans = insuranceProviders.flatMap(provider => {
      const providerPlans = provider.plans.filter(plan => plan.type === type);
      return providerPlans.map(plan => ({
        ...plan,
        providerName: provider.name,
        providerId: provider.id,
        matchScore: 0 // Initialize match score
      }));
    });
    
    // AI-inspired recommendation algorithm with weighted features
    const recommendedPlans = allPlans.map(plan => {
      // Initialize weights for different factors based on machine learning principles
      const weights = {
        coverage: 0.35,
        price: 0.25,
        features: 0.2,
        demographics: 0.1,
        priorities: 0.1
      };
      
      // Calculate normalized scores for each factor (0-100)
      let coverageScore = 0;
      let priceScore = 0;
      let featureScore = 0;
      let demographicScore = 0;
      let priorityScore = 0;
      
      // Coverage score based on desired coverage level
      const planCoverageLevel = plan.name.toLowerCase().includes('premium') ? 90 :
                               plan.name.toLowerCase().includes('plus') ? 70 :
                               plan.name.toLowerCase().includes('standard') ? 50 : 30;
      
      // Gaussian function to score based on proximity to desired coverage
      coverageScore = 100 * Math.exp(-0.0005 * Math.pow(planCoverageLevel - coverageLevel, 2));
      
      // Price score - inverse relationship with price (lower price = higher score)
      if (budget) {
        priceScore = plan.price <= budget ? 100 : Math.max(0, 100 - ((plan.price - budget) / budget) * 100);
      } else {
        // Without budget, score based on relative price within category
        const maxPrice = Math.max(...allPlans.map(p => p.price));
        priceScore = 100 - (plan.price / maxPrice) * 100;
      }
      
      // Feature score based on number and quality of features
      featureScore = Math.min(100, plan.features.length * 15);
      
      // Demographic score based on user attributes
      demographicScore = 50; // Base score
      
      if (familySize && familySize > 1) {
        demographicScore += plan.features.some(f => 
          f.toLowerCase().includes('family') || f.toLowerCase().includes('dependent')
        ) ? 25 : 0;
      }
      
      if (age && age > 60) {
        demographicScore += plan.features.some(f => 
          f.toLowerCase().includes('senior') || f.toLowerCase().includes('elder')
        ) ? 25 : 0;
      }
      
      if (preExistingConditions && preExistingConditions.length > 0 && 
          !preExistingConditions.includes('none')) {
        demographicScore += plan.features.some(f => 
          f.toLowerCase().includes('pre-existing') || f.toLowerCase().includes('condition')
        ) ? 25 : 0;
      }
      
      // Priority score based on user's stated priorities
      if (priorities && priorities.length > 0) {
        const priorityMatches = priorities.filter(priority => 
          plan.features.some(feature => feature.toLowerCase().includes(priority.toLowerCase()))
        ).length;
        
        priorityScore = (priorityMatches / priorities.length) * 100;
      } else {
        priorityScore = 50; // Default priority score
      }
      
      // Calculate weighted total score
      const totalScore = (
        (coverageScore * weights.coverage) +
        (priceScore * weights.price) +
        (featureScore * weights.features) +
        (demographicScore * weights.demographics) +
        (priorityScore * weights.priorities)
      );
      
      // Scale to 0-100
      const matchScore = Math.round(totalScore);
      
      return {
        ...plan,
        matchScore,
        // Add explainability data for transparent recommendations
        matchDetails: {
          coverageScore: Math.round(coverageScore),
          priceScore: Math.round(priceScore),
          featureScore: Math.round(featureScore),
          demographicScore: Math.round(demographicScore),
          priorityScore: Math.round(priorityScore)
        }
      };
    });
    
    // Sort by match score (highest first)
    recommendedPlans.sort((a, b) => b.matchScore - a.matchScore);
    
    // Generate AI-style explanations for each recommendation
    const recommendationsWithExplanations = recommendedPlans.map(plan => {
      // Define explanation templates based on score ranges
      const explanationTemplates = {
        excellent: [
          `This plan is an excellent match for your needs with a ${plan.matchScore}% match score. It offers ideal coverage at your preferred price point.`,
          `With a match score of ${plan.matchScore}%, this plan aligns perfectly with your stated preferences and priorities.`,
          `Based on your profile, this plan scores ${plan.matchScore}% and provides exceptional value with features that match your requirements.`
        ],
        good: [
          `This plan is a good match (${plan.matchScore}%) that balances coverage and cost effectively for your situation.`,
          `With a ${plan.matchScore}% match score, this plan meets most of your requirements and offers solid coverage.`,
          `This plan scores ${plan.matchScore}% based on your preferences, making it a reliable option for your insurance needs.`
        ],
        moderate: [
          `This plan is a moderate match (${plan.matchScore}%) that meets your basic needs but may lack some preferred features.`,
          `With a ${plan.matchScore}% match, this plan offers adequate coverage but might not address all your priorities.`,
          `This plan's ${plan.matchScore}% match score indicates it covers your essentials but might require compromises.`
        ],
        limited: [
          `This plan has a limited match score of ${plan.matchScore}% and may not fully address your specific requirements.`,
          `With only a ${plan.matchScore}% match, this plan might not be ideal but could work as a backup option.`,
          `This plan's ${plan.matchScore}% match score suggests you might want to consider higher-ranked alternatives.`
        ]
      };
      
      // Select explanation category and random template within category
      let explanationCategory;
      if (plan.matchScore >= 80) explanationCategory = 'excellent';
      else if (plan.matchScore >= 60) explanationCategory = 'good';
      else if (plan.matchScore >= 40) explanationCategory = 'moderate';
      else explanationCategory = 'limited';
      
      const templates = explanationTemplates[explanationCategory];
      const randomIndex = Math.floor(Math.random() * templates.length);
      const explanation = templates[randomIndex];
      
      return {
        ...plan,
        explanation
      };
    });
    
    return {
      success: true,
      data: recommendationsWithExplanations.slice(0, 5) // Return top 5 recommendations
    };
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return {
      success: false,
      error: 'Failed to generate AI recommendations. Please try again later.'
    };
  }
};

// New function to interact with ChatGPT for insurance policy explanations
export const getAIChatResponse = async (userMessage: string, context?: string): Promise<ApiResponse> => {
  try {
    console.log('Getting AI chat response for:', userMessage);
    
    // In a real implementation, this would call OpenAI's API
    // Example API call:
    /*
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an insurance assistant bot that helps users understand insurance policies, 
                   terms, and make informed decisions. ${context || ''}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: true,
      data: response.data.choices[0].message.content
    };
    */
    
    // For demonstration, we'll use a sophisticated rule-based system to mimic AI responses
    // This simulates what a ChatGPT integration would provide
    let response = "";
    const userMessageLower = userMessage.toLowerCase();
    
    // Check if this is related to the insurance finder tool
    const isInsuranceFinderRelated = context === 'insurance-finder' || 
                                    userMessageLower.includes('finder') || 
                                    userMessageLower.includes('form') || 
                                    userMessageLower.includes('recommendation');
    
    if (isInsuranceFinderRelated) {
      if (userMessageLower.includes('how') && 
          (userMessageLower.includes('work') || userMessageLower.includes('use'))) {
        response = "To use our insurance finder, simply fill in your details including insurance type, coverage needs, and budget. Our AI analyzes thousands of policies to find the best matches specifically for your situation. The match score shows how well each recommendation aligns with your stated preferences. The higher the percentage, the more tailored the policy is to your needs.";
      } else if (userMessageLower.includes('match') && userMessageLower.includes('score')) {
        response = "The match score represents how well a policy aligns with your specific needs on a scale of 0-100%. It's calculated using a sophisticated algorithm that considers several factors:\n\n• How closely the coverage level matches your preference (35%)\n• How well the price fits your budget (25%)\n• The relevance of the policy features (20%)\n• How well it fits your demographic profile (10%)\n• How it addresses your stated priorities (10%)\n\nA score above 80% indicates an excellent match that meets most or all of your requirements.";
      } else if (userMessageLower.includes('recommendation') || userMessageLower.includes('suggest')) {
        response = "Our recommendations are powered by an AI algorithm that analyzes your inputs against thousands of policies. We consider multiple factors including coverage level, price point, specific features, and your stated priorities. Each recommendation includes a detailed explanation of why it might be suitable for you, along with a match score. I suggest focusing on policies with match scores above 70% for the best experience.";
      } else if (userMessageLower.includes('coverage level') || userMessageLower.includes('coverage')) {
        response = "The coverage level slider lets you indicate how comprehensive you want your insurance to be. A lower setting (0-30%) prioritizes basic, more affordable plans with essential coverage. A middle setting (40-70%) balances coverage and cost with standard plans. A higher setting (80-100%) prioritizes premium plans with comprehensive coverage, which typically cost more but provide better protection and additional benefits.";
      } else if (userMessageLower.includes('budget') || userMessageLower.includes('cost') || userMessageLower.includes('price')) {
        response = "Setting your monthly budget helps our AI find insurance options that fit your financial constraints. It's one of the most heavily weighted factors in our algorithm. Be realistic but also consider that extremely low budgets might limit your options. Insurance with higher deductibles typically costs less per month but means you'll pay more out-of-pocket when you need to use it.";
      } else if (userMessageLower.includes('priority') || userMessageLower.includes('important')) {
        response = "Your priorities help our algorithm understand what matters most to you in an insurance policy. You can select up to 3 priorities, such as low price, coverage breadth, provider network, or low deductible. Each selected priority influences the recommendation algorithm to favor plans that specifically address these concerns. This ensures the recommended policies align with what you value most.";
      } else {
        response = "I can help you navigate our insurance finder tool. You can ask me about how the matching algorithm works, what the coverage levels mean, how to set your budget, or what your priorities should be. I'm also happy to explain insurance concepts or provide guidance on selecting the right policy for your needs.";
      }
    } else {
      // General insurance questions
      if (userMessageLower.includes('premium') || userMessageLower.includes('cost')) {
        response = "Insurance premiums are the regular payments you make to maintain your coverage. Several factors affect your premium:\n\n• The type and amount of coverage you choose\n• Your deductible amount (higher deductibles generally mean lower premiums)\n• Your personal risk factors (age, health, driving record, etc.)\n• The value of what you're insuring (home, car, etc.)\n• Your location and its associated risks\n• Your claims history\n\nInsurers use complex statistical models to determine the likelihood you'll file a claim and price your premium accordingly.";
      } else if (userMessageLower.includes('deductible')) {
        response = "A deductible is the amount you pay out-of-pocket before your insurance starts covering costs. For example, with a $1,000 deductible, if you have a $5,000 claim, you pay the first $1,000 and your insurance covers the remaining $4,000.\n\nHigher deductibles typically result in lower premium payments but mean you'll pay more when you file a claim. Lower deductibles mean higher premiums but less financial burden at claim time.\n\nWhen choosing a deductible, consider your financial situation, risk tolerance, and how likely you are to file claims.";
      } else if (userMessageLower.includes('claim')) {
        response = "To file an insurance claim effectively:\n\n1. Document everything immediately (photos, videos, police reports if applicable)\n2. Contact your insurance provider as soon as possible\n3. Provide all requested information accurately and completely\n4. Keep detailed records of all communications\n5. Follow up regularly on your claim status\n6. Understand the appeals process if your claim is denied\n\nClaims typically take 2-6 weeks to process depending on complexity, though some may resolve faster or take longer. Be aware that filing claims, especially multiple claims, may affect your future premium rates.";
      } else if (userMessageLower.includes('coverage') || userMessageLower.includes('covered')) {
        response = "Insurance coverage defines exactly what your policy will pay for. Coverage varies by policy type:\n\n• Health insurance: Medical services, hospital stays, prescriptions, and sometimes dental/vision care\n• Auto insurance: Liability (legal obligations), collision (vehicle damage from accidents), comprehensive (non-accident damage)\n• Home insurance: Dwelling (structure), personal property, liability, additional living expenses\n• Life insurance: Death benefit, and sometimes cash value accumulation\n\nIt's crucial to understand both what is covered AND what is excluded in your policy. Exclusions are specific situations or items that your policy will not cover under any circumstances.";
      } else if (userMessageLower.includes('term') || userMessageLower.includes('whole life')) {
        response = "Term life insurance provides coverage for a specific period (10, 20, 30 years) with lower premiums. If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, the coverage ends with no value.\n\nWhole life insurance covers your entire lifetime and includes a cash value component that grows over time. It's significantly more expensive than term insurance but provides lifetime coverage and can function as a form of forced savings.\n\nMost financial experts recommend term insurance for most people due to its affordability, allowing you to invest the difference elsewhere for potentially better returns.";
      } else {
        response = "I can help explain insurance concepts, policy details, and coverage options. You can ask me about premiums, deductibles, claims processes, coverage types, or specific insurance products like term life vs. whole life insurance. What specific insurance topic would you like to learn more about?";
      }
    }
    
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error getting AI chat response:', error);
    return {
      success: false,
      error: 'Unable to generate a response. Please try again later.'
    };
  }
};
