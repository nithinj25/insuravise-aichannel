
import { PolicyAnalysis } from "@/types/insurance";

// Get base API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Analyze a policy document from a URL
export const summarizePolicyUrl = async (policyUrl: string): Promise<{ 
  success: boolean; 
  data?: PolicyAnalysis; 
  error?: string 
}> => {
  try {
    console.log("Analyzing policy from URL:", policyUrl);
    
    const response = await fetch(`${API_BASE_URL}/policy/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ policyUrl })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      success: result.success, 
      data: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error analyzing policy:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze policy document"
    };
  }
};

// Upload and analyze a policy document file
export const analyzePolicyFile = async (file: File): Promise<{ 
  success: boolean; 
  data?: PolicyAnalysis; 
  error?: string 
}> => {
  try {
    console.log("Uploading and analyzing policy file:", file.name);
    
    const formData = new FormData();
    formData.append('policyFile', file);
    
    const response = await fetch(`${API_BASE_URL}/policy/analyze`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      success: result.success, 
      data: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error analyzing policy file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze policy document"
    };
  }
};
