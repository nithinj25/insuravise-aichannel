
import { InsurancePlan } from "@/types/insurance";

// Get insurance plans based on filters
export const getInsurancePlans = async (filters: any) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    
    const apiUrl = `http://localhost:5000/api/insurance-plans?${queryParams.toString()}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      success: result.success, 
      data: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch insurance plans",
      data: []
    };
  }
};

// Get personalized recommendations based on user profile
export const getPersonalizedRecommendations = async (userProfile: any) => {
  try {
    const apiUrl = 'http://localhost:5000/api/recommendations/personalized';
    
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
    return { 
      success: result.success, 
      data: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error getting personalized recommendations:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate recommendations"
    };
  }
};

// Fetch insurance plans for comparison
export const fetchInsurancePlans = async (category: string) => {
  try {
    const apiUrl = `http://localhost:5000/api/insurance-plans/${category}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      success: result.success, 
      data: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch insurance plans",
      data: []
    };
  }
};
