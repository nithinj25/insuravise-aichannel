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

export const getPersonalizedRecommendations = async (preferences: UserPreferences): Promise<ApiResponse> => {
  try {
    console.log('Requesting recommendations with preferences:', preferences);
    
    // In a real implementation, this would call an external API or ML model
    // Example API call (commented out):
    /*
    const response = await axios.post('https://api.insurance-recommender.com/recommend', {
      preferences,
      apiKey: 'your-api-key'
    });
    return {
      success: true,
      data: response.data
    };
    */
    
    // For demonstration, we'll use our mock data with more sophisticated filtering
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
    
    // Apply recommendation algorithm
    const recommendedPlans = allPlans.map(plan => {
      let matchScore = 0;
      const maxScore = 100;
      
      // Base match on coverage level (0-100)
      if (coverageLevel <= 30) {
        // Prefer basic plans for low coverage
        matchScore += plan.name.toLowerCase().includes('basic') ? 30 : 15;
      } else if (coverageLevel <= 70) {
        // Prefer standard/plus plans for medium coverage
        matchScore += (plan.name.toLowerCase().includes('plus') || 
                      plan.name.toLowerCase().includes('standard')) ? 30 : 15;
      } else {
        // Prefer premium plans for high coverage
        matchScore += plan.name.toLowerCase().includes('premium') ? 30 : 15;
      }
      
      // Match on price/budget
      if (budget) {
        matchScore += plan.price <= budget ? 20 : Math.max(0, 20 - (plan.price - budget) / 10);
      }
      
      // Match on feature count for family size
      if (familySize && familySize > 1) {
        matchScore += plan.features.length >= 4 ? 10 : 5;
      }
      
      // Match on pre-existing conditions
      if (preExistingConditions && preExistingConditions.length > 0) {
        const hasCoverage = plan.features.some(feature => 
          feature.toLowerCase().includes('comprehensive') || 
          feature.toLowerCase().includes('pre-existing')
        );
        matchScore += hasCoverage ? 15 : 0;
      }
      
      // Match on smoking status (for health insurance)
      if (type === 'health' && smokingStatus === 'smoker') {
        // Smokers need more comprehensive coverage
        matchScore += plan.features.some(f => f.toLowerCase().includes('comprehensive')) ? 10 : 0;
      }
      
      // Match on driving record (for auto insurance)
      if (type === 'auto' && drivingRecord) {
        if (drivingRecord === 'excellent') {
          // Good drivers might prefer plans with discounts
          matchScore += plan.features.some(f => f.toLowerCase().includes('discount')) ? 10 : 0;
        } else if (drivingRecord === 'poor') {
          // Poor drivers need more comprehensive coverage
          matchScore += plan.features.some(f => f.toLowerCase().includes('comprehensive')) ? 10 : 0;
        }
      }
      
      // Match on property value (for home insurance)
      if (type === 'home' && propertyValue) {
        const valueThreshold = 500000; // Example threshold
        if (propertyValue > valueThreshold) {
          // More valuable homes need premium coverage
          matchScore += plan.features.some(f => f.toLowerCase().includes('premium')) ? 10 : 0;
        }
      }
      
      // Prioritize based on user preferences
      if (priorities && priorities.length > 0) {
        const priorityMatchCount = priorities.filter(priority => 
          plan.features.some(feature => feature.toLowerCase().includes(priority.toLowerCase()))
        ).length;
        
        matchScore += (priorityMatchCount / priorities.length) * 15;
      }
      
      // Cap the score at 100
      matchScore = Math.min(matchScore, maxScore);
      
      return {
        ...plan,
        matchScore: Math.round(matchScore)
      };
    });
    
    // Sort by match score (highest first)
    recommendedPlans.sort((a, b) => b.matchScore - a.matchScore);
    
    // Add explanation for each recommendation
    const recommendationsWithExplanations = recommendedPlans.map(plan => {
      let explanation = "";
      
      if (plan.matchScore >= 80) {
        explanation = "Excellent match for your needs and preferences.";
      } else if (plan.matchScore >= 60) {
        explanation = "Good match for your requirements.";
      } else if (plan.matchScore >= 40) {
        explanation = "Moderate match - may meet your basic needs.";
      } else {
        explanation = "Limited match - may not fully address your requirements.";
      }
      
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
      error: 'Failed to generate recommendations. Please try again later.'
    };
  }
};
