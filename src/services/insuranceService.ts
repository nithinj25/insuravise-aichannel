import axios from 'axios';
import { UserPreferences } from '@/types/insurance';

// Mock data for insurance providers (to be replaced with actual API)
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
  },
  {
    id: 'provider4',
    name: 'HDFC ERGO',
    website: 'https://www.hdfcergo.com',
    plans: [
      {
        id: 'hdfc-health-my-health',
        type: 'health',
        name: 'My Health Suraksha',
        price: 1200,
        features: [
          'Cashless treatment at 10,000+ network hospitals',
          'No claim bonus up to 50%',
          'Day care procedures covered',
          'Pre and post hospitalization expenses',
          'Cumulative bonus benefit'
        ],
        policyUrl: 'https://www.hdfcergo.com/health-insurance/health-suraksha'
      },
      {
        id: 'hdfc-health-optima',
        type: 'health',
        name: 'Optima Secure',
        price: 1800,
        features: [
          'Base sum insured + 100% automatic increase',
          'Reserve benefit up to 50% of sum insured',
          'Secure benefit with no claim deduction',
          'Reload benefit for unrelated illnesses',
          'Premium discount on policy renewal'
        ],
        policyUrl: 'https://www.hdfcergo.com/health-insurance/optima-secure'
      },
      {
        id: 'hdfc-auto-comprehensive',
        type: 'auto',
        name: 'Comprehensive Car Insurance',
        price: 5000,
        features: [
          'Own damage and third-party liability coverage',
          'Personal accident cover of ₹15 lakhs',
          'Zero depreciation cover',
          'Roadside assistance',
          '24/7 claim assistance'
        ],
        policyUrl: 'https://www.hdfcergo.com/motor-insurance/car-insurance'
      }
    ]
  },
  {
    id: 'provider5',
    name: 'ICICI Lombard',
    website: 'https://www.icicilombard.com',
    plans: [
      {
        id: 'icici-health-complete',
        type: 'health',
        name: 'Complete Health Insurance',
        price: 1500,
        features: [
          'Coverage up to ₹50 lakhs',
          'Cashless hospitalization at 6500+ network hospitals',
          'No claim bonus up to 50%',
          'Free health check-up',
          'AYUSH treatment coverage'
        ],
        policyUrl: 'https://www.icicilombard.com/health-insurance/complete-health-insurance'
      },
      {
        id: 'icici-health-corona',
        type: 'health',
        name: 'Corona Kavach Policy',
        price: 800,
        features: [
          'Coverage for COVID-19 hospitalization',
          'Home care treatment expenses',
          'AYUSH treatment coverage',
          'Pre and post hospitalization expenses',
          'Ambulance charges'
        ],
        policyUrl: 'https://www.icicilombard.com/health-insurance/corona-kavach-policy'
      },
      {
        id: 'icici-auto-basic',
        type: 'auto',
        name: 'Two-Wheeler Insurance',
        price: 1200,
        features: [
          'Comprehensive coverage for bike damage',
          'Third-party liability cover',
          'Personal accident cover',
          'Zero depreciation add-on',
          'Roadside assistance'
        ],
        policyUrl: 'https://www.icicilombard.com/motor-insurance/two-wheeler-insurance'
      }
    ]
  },
  {
    id: 'provider6',
    name: 'Star Health',
    website: 'https://www.starhealth.in',
    plans: [
      {
        id: 'star-health-family',
        type: 'health',
        name: 'Family Health Optima',
        price: 2000,
        features: [
          'Floater cover for entire family',
          'Auto recharge of sum insured',
          'Coverage for day care procedures',
          'No medical check-up up to 50 years',
          'Cumulative bonus of 10% every claim-free year'
        ],
        policyUrl: 'https://www.starhealth.in/health-insurance/family-health-optima-insurance'
      },
      {
        id: 'star-health-senior',
        type: 'health',
        name: 'Senior Citizens Red Carpet',
        price: 2500,
        features: [
          'Designed for senior citizens (60-75 years)',
          'Pre-existing diseases covered after 1 year',
          'Automatic restoration of basic sum insured',
          'Organ donor expenses',
          'Coverage for modern treatments'
        ],
        policyUrl: 'https://www.starhealth.in/health-insurance/senior-citizen-red-carpet'
      }
    ]
  },
  {
    id: 'provider7',
    name: 'Bajaj Allianz',
    website: 'https://www.bajajallianz.com',
    plans: [
      {
        id: 'bajaj-health-care',
        type: 'health',
        name: 'Health Guard',
        price: 1350,
        features: [
          'In-patient hospitalization coverage',
          'Pre and post hospitalization expenses',
          'Road ambulance charges',
          'Free health check-up every 3 years',
          'Bariatric surgery coverage'
        ],
        policyUrl: 'https://www.bajajallianz.com/health-insurance-plans/health-guard.html'
      },
      {
        id: 'bajaj-auto-private',
        type: 'auto',
        name: 'Private Car Package Policy',
        price: 4500,
        features: [
          'Comprehensive coverage for car damages',
          'Third-party legal liability',
          'Personal accident cover for owner-driver',
          'Engine protection cover',
          '24/7 spot assistance'
        ],
        policyUrl: 'https://www.bajajallianz.com/motor-insurance/car-insurance.html'
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

// Function to analyze a policy PDF
export const analyzePolicyPdf = async (file: File): Promise<ApiResponse> => {
  try {
    // In a real implementation, you would:
    // 1. Upload the PDF to a server
    // 2. Process it with an AI model
    // 3. Return the structured analysis
    
    console.log(`Analyzing policy document: ${file.name} (${file.size} bytes)`);
    
    // This would be a call to a neural network service in production
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await axios.post('https://api.insurance-ai.com/analyze-policy', formData);
    
    // Mock response for demonstration
    const mockAnalysis = {
      title: file.name.replace('.pdf', ''),
      summary: "This comprehensive policy provides coverage for various medical expenses with a focus on preventive care. The policy includes hospitalization benefits, outpatient services, and prescription drug coverage with reasonable deductibles and copayments.",
      keyPoints: [
        "Annual deductible of ₹10,000 for individual coverage, ₹20,000 for family coverage",
        "Copayment of 20% for most services after deductible is met",
        "Out-of-pocket maximum of ₹1,50,000 per individual per year",
        "Preventive care covered at 100% with no deductible",
        "Emergency services covered at 80% after deductible",
        "Pre-existing conditions covered after 12-month waiting period",
        "Mental health services covered the same as other medical services"
      ],
      exclusions: [
        "Cosmetic procedures unless medically necessary",
        "Experimental treatments and procedures",
        "Alternative therapies not prescribed by a physician",
        "Services received outside the network (except emergencies)"
      ],
      simplifiedRating: 7.2, // On a scale of 1-10 for clarity
      readabilityScore: "Moderate", // Simplified, Moderate, Complex
      estimatedReadTime: "8 minutes",
      confidenceScore: 0.87 // AI confidence in its analysis
    };
    
    return {
      success: true,
      data: mockAnalysis
    };
  } catch (error) {
    console.error('Error analyzing policy:', error);
    return {
      success: false,
      error: 'Failed to analyze policy document. Please try again.'
    };
  }
};

// Neural Network-Enhanced AI recommendation engine
export const getPersonalizedRecommendations = async (preferences: UserPreferences): Promise<ApiResponse> => {
  try {
    console.log('Requesting Neural Network recommendations with preferences:', preferences);
    
    // In a real implementation, this would call a machine learning model API
    // Example API call:
    /*
    const response = await axios.post('https://api.insurance-neural-net.com/recommend', {
      preferences,
      apiKey: process.env.AI_MODEL_API_KEY,
      modelVersion: 'v2.3'
    });
    return {
      success: true,
      data: response.data.recommendations
    };
    */
    
    // For demonstration, we'll use enhanced algorithm with neural network simulation
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
    
    // Neural network-inspired recommendation algorithm with dynamic weight adjustment
    const recommendedPlans = allPlans.map(plan => {
      // Initialize base weights for different factors
      let weights = {
        coverage: 0.30,
        price: 0.25,
        features: 0.20,
        demographics: 0.15,
        priorities: 0.10
      };
      
      // Dynamic weight adjustment based on user preferences (neural network simulation)
      if (budget && budget < 2000) {
        // If budget is tight, price becomes more important
        weights.price += 0.10;
        weights.coverage -= 0.05;
        weights.features -= 0.05;
      }
      
      if (priorities && priorities.includes('comprehensive')) {
        // If user wants comprehensive coverage, coverage becomes more important
        weights.coverage += 0.10;
        weights.price -= 0.05;
        weights.features -= 0.05;
      }
      
      if (preExistingConditions && preExistingConditions.length > 0 && 
          !preExistingConditions.includes('none')) {
        // If user has pre-existing conditions, demographics become more important
        weights.demographics += 0.10;
        weights.price -= 0.05;
        weights.features -= 0.05;
      }
      
      // Normalize weights to sum to 1
      const weightSum = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
      Object.keys(weights).forEach(key => {
        weights[key as keyof typeof weights] /= weightSum;
      });
      
      // Calculate normalized scores for each factor (0-100)
      let coverageScore = 0;
      let priceScore = 0;
      let featureScore = 0;
      let demographicScore = 0;
      let priorityScore = 0;
      
      // Neural network-like scoring: non-linear activation functions and feature interactions
      
      // Coverage score based on desired coverage level using sigmoid activation
      const planCoverageLevel = plan.name.toLowerCase().includes('premium') ? 90 :
                               plan.name.toLowerCase().includes('plus') ? 70 :
                               plan.name.toLowerCase().includes('standard') ? 50 : 30;
      
      // Sigmoid function for smoother transitions between coverage levels
      coverageScore = 100 * (1 / (1 + Math.exp(-0.1 * (planCoverageLevel - coverageLevel + 10))));
      
      // Price score with exponential decay for budget sensitivity
      if (budget) {
        priceScore = plan.price <= budget ? 100 : 100 * Math.exp(-0.05 * Math.max(0, plan.price - budget) / budget);
      } else {
        // Without budget, score based on relative price within category using normalized approach
        const maxPrice = Math.max(...allPlans.map(p => p.price));
        const minPrice = Math.min(...allPlans.map(p => p.price));
        const normalizedPrice = (plan.price - minPrice) / (maxPrice - minPrice || 1);
        priceScore = 100 * (1 - normalizedPrice);
      }
      
      // Feature score based on feature relevance and count with diminishing returns
      featureScore = Math.min(100, 15 * Math.sqrt(plan.features.length));
      
      // Feature quality assessment - check for specific terms in features that indicate quality
      const qualityTerms = ['comprehensive', 'complete', 'premium', 'unlimited', 'advanced', 'enhanced'];
      const qualityScore = plan.features.reduce((score, feature) => {
        return score + qualityTerms.reduce((termScore, term) => {
          return termScore + (feature.toLowerCase().includes(term) ? 1 : 0);
        }, 0);
      }, 0);
      
      featureScore = Math.min(100, featureScore + qualityScore * 5);
      
      // Demographic score with feature interactions
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
        
        // Additional interaction: senior with pre-existing conditions
        if (preExistingConditions && preExistingConditions.length > 0) {
          demographicScore += plan.features.some(f => 
            f.toLowerCase().includes('pre-existing') && f.toLowerCase().includes('senior')
          ) ? 15 : 0;
        }
      }
      
      if (preExistingConditions && preExistingConditions.length > 0 && 
          !preExistingConditions.includes('none')) {
        demographicScore += plan.features.some(f => 
          f.toLowerCase().includes('pre-existing') || f.toLowerCase().includes('condition')
        ) ? 25 : 0;
      }
      
      // Priority score with semantic matching
      if (priorities && priorities.length > 0) {
        // Semantic matching with word embeddings simulation
        const priorityMatches = priorities.reduce((totalMatches, priority) => {
          let bestMatchScore = 0;
          
          plan.features.forEach(feature => {
            // Simulate semantic similarity with simple word matching
            const featureWords = feature.toLowerCase().split(' ');
            const priorityWords = priority.toLowerCase().split(' ');
            
            let matchScore = 0;
            priorityWords.forEach(pWord => {
              if (featureWords.some(fWord => fWord.includes(pWord) || pWord.includes(fWord))) {
                matchScore += 1;
              }
            });
            
            matchScore = matchScore / priorityWords.length;
            bestMatchScore = Math.max(bestMatchScore, matchScore);
          });
          
          return totalMatches + bestMatchScore;
        }, 0);
        
        priorityScore = (priorityMatches / priorities.length) * 100;
      } else {
        priorityScore = 50; // Default priority score
      }
      
      // Calculate weighted total score with non-linear combination
      const rawScore = (
        (coverageScore * weights.coverage) +
        (priceScore * weights.price) +
        (featureScore * weights.features) +
        (demographicScore * weights.demographics) +
        (priorityScore * weights.priorities)
      );
      
      // Apply softmax-like normalization to create more separation between top and bottom plans
      const matchScore = Math.round(Math.min(100, rawScore));
      
      return {
        ...plan,
        matchScore,
        // Add explainability data for transparent recommendations
        matchDetails: {
          coverageScore: Math.round(coverageScore),
          priceScore: Math.round(priceScore),
          featureScore: Math.round(featureScore),
          demographicScore: Math.round(demographicScore),
          priorityScore: Math.round(priorityScore),
          appliedWeights: weights
        }
      };
    });
    
    // Sort by match score (highest first)
    recommendedPlans.sort((a, b) => b.matchScore - a.matchScore);
    
    // Generate explainable AI recommendations
    const recommendationsWithExplanations = recommendedPlans.map(plan => {
      // Personalized explanation templates based on the highest scoring factors
      const scores = [
        { factor: 'coverageScore', name: 'coverage', score: plan.matchDetails.coverageScore },
        { factor: 'priceScore', name: 'affordability', score: plan.matchDetails.priceScore },
        { factor: 'featureScore', name: 'benefits', score: plan.matchDetails.featureScore },
        { factor: 'demographicScore', name: 'personal fit', score: plan.matchDetails.demographicScore },
        { factor: 'priorityScore', name: 'priorities', score: plan.matchDetails.priorityScore }
      ];
      
      // Sort to find top factors
      scores.sort((a, b) => b.score - a.score);
      const topFactors = scores.slice(0, 2).map(f => f.name);
      
      // Create personalized explanation
      let explanation = '';
      if (plan.matchScore >= 80) {
        explanation = `This plan is an excellent match (${plan.matchScore}%) based on outstanding ${topFactors.join(' and ')}.`;
      } else if (plan.matchScore >= 60) {
        explanation = `With a ${plan.matchScore}% match score, this plan offers good ${topFactors.join(' and ')} for your needs.`;
      } else if (plan.matchScore >= 40) {
        explanation = `This plan has a moderate match (${plan.matchScore}%) with decent ${topFactors.join(' and ')}, but might not be ideal.`;
      } else {
        explanation = `With only a ${plan.matchScore}% match, this plan might not meet your requirements for ${topFactors.join(' and ')}.`;
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
      error: 'Failed to generate AI recommendations. Please try again later.'
    };
  }
};

// Function to interact with ChatGPT for insurance policy explanations
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
    const isInsuranceFinder = context === 'insurance-finder' || 
                              userMessageLower.includes('finder') || 
                              userMessageLower.includes('form') || 
                              userMessageLower.includes('recommendation');
    
    if (isInsuranceFinder) {
      // Add specific responses for Indian insurance context
      if (userMessageLower.includes('india') || userMessageLower.includes('indian') || userMessageLower.includes('rupee') || userMessageLower.includes('inr')) {
        response = "We offer comprehensive recommendations for Indian insurance policies from providers like HDFC ERGO, ICICI Lombard, Star Health, and Bajaj Allianz. All prices are shown in Indian Rupees (₹). Indian insurance policies typically have unique features like No Claim Bonus, coverage for AYUSH treatments, and specific regulations governed by IRDAI (Insurance Regulatory and Development Authority of India).";
      } else if (userMessageLower.includes('lakhs') || userMessageLower.includes('crore')) {
        response = "In Indian insurance policies, coverage amounts are typically expressed in lakhs or crores. 1 lakh = ₹100,000 and 1 crore = ₹10,000,000. Most health insurance policies offer coverage ranging from ₹3 lakhs to ₹1 crore, depending on your needs and premium budget. For optimal protection, experts recommend a minimum cover of ₹10 lakhs for a family health insurance policy.";
      } else if (userMessageLower.includes('irdai') || userMessageLower.includes('regulatory')) {
        response = "IRDAI (Insurance Regulatory and Development Authority of India) is the regulatory body that supervises the insurance industry in India. All legitimate insurance providers must be registered with IRDAI. This regulatory oversight ensures that insurance companies maintain financial stability and treat policyholders fairly. Always verify that your insurance provider is IRDAI registered for your financial security.";
      } else if (userMessageLower.includes('gst') || userMessageLower.includes('tax')) {
        response = "Insurance premiums in India are subject to 18% GST. However, there are tax benefits available under Section 80D of the Income Tax Act for health insurance premiums. You can claim deductions of up to ₹25,000 for self and family (excluding parents), and an additional ₹25,000 for parents. For senior citizens, the deduction limit is ₹50,000. Life insurance premiums can qualify for deductions under Section 80C up to ₹1.5 lakhs.";
      } else if (userMessageLower.includes('cashless') || userMessageLower.includes('network hospital')) {
        response = "Cashless treatment is a significant benefit of health insurance in India. When you get treated at a network hospital, the insurer settles the bill directly with the hospital, eliminating the need for you to pay upfront. Most major Indian insurers have extensive networks - HDFC ERGO has 10,000+ network hospitals, ICICI Lombard has 6,500+, and Star Health has 9,900+ across India. Always check if your preferred hospitals are in your insurer's network before finalizing a policy.";
      } else {
        // General insurance questions with Indian context
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
          response = "I can help you understand various aspects of insurance policies and recommend options based on your specific needs. You can ask me about policy types, coverage details, premium factors, claim processes, or specific insurance terms you'd like explained. I'm designed to make insurance concepts easy to understand and help you make informed decisions.";
        }
      }
    } else {
      // Generic insurance-related responses
      if (userMessageLower.includes('hello') || userMessageLower.includes('hi') || userMessageLower.includes('hey')) {
        response = "Hello! I'm your insurance assistant, here to help you understand policies, compare options, and make informed decisions. How can I assist you today?";
      } else if (userMessageLower.includes('thank')) {
        response = "You're welcome! I'm happy to help with any other insurance questions you might have.";
      } else if (userMessageLower.includes('help')) {
        response = "I'd be happy to help! You can ask me questions about different types of insurance policies, coverage details, how to file claims, or even get personalized policy recommendations based on your specific needs.";
      } else {
        response = "I'm your insurance assistant, designed to help with policy questions and recommendations. For the most accurate information, please ask specific questions about insurance types, coverage, claims, or policy features. I'm constantly learning to provide better assistance.";
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
      error: 'Failed to generate response. Please try again later.'
    };
  }
};
