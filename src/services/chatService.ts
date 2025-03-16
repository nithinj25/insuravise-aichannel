
import { ChatResponse } from "@/types/insurance";

// Get API base URL from environment
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Get chat response from AI
export const getChatResponse = async (message: string, context: string = 'general-insurance'): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${apiBaseUrl}/chat/response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, context })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      success: result.success, 
      message: result.data,
      error: result.error 
    };
  } catch (error) {
    console.error("Error getting chat response:", error);
    return {
      success: false,
      message: "",
      error: error instanceof Error ? error.message : "Failed to get response"
    };
  }
};
