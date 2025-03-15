
import { InsurancePlan } from "@/types/insurance";

// Get base API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
    
    const apiUrl = `${API_BASE_URL}/insurance-plans?${queryParams.toString()}`;
    console.log("Fetching insurance plans from:", apiUrl);
    
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
    const apiUrl = `${API_BASE_URL}/recommendations/personalized`;
    console.log("Getting personalized recommendations from:", apiUrl);
    
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
    const apiUrl = `${API_BASE_URL}/insurance-plans/${category}`;
    console.log("Fetching insurance plans for comparison from:", apiUrl);
    
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
