
import { PolicyAnalysis } from "@/types/insurance";

// Analyze PDF document and extract insurance policy details
export const analyzePolicyPdf = async (file: File): Promise<{ success: boolean; data?: PolicyAnalysis; error?: string }> => {
  try {
    const apiUrl = 'http://localhost:5000/api/policy/analyze';
    const formData = new FormData();
    formData.append('policyFile', file);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
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
    console.error("Error analyzing policy document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

// Summarize a policy PDF from URL
export const summarizePolicyPdf = async (policyUrl: string) => {
  try {
    const apiUrl = 'http://localhost:5000/api/policy/summarize';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ policyUrl })
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
    console.error("Error summarizing policy from URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to summarize policy"
    };
  }
};
