
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
