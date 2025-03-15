
// Function to get AI chat response
export const getAIChatResponse = async (message: string, context: string = 'general-insurance') => {
  const apiUrl = 'http://localhost:5000/api/chat/response';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, context })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { 
      success: data.success, 
      data: data.data,
      error: data.error 
    };
  } catch (error) {
    console.error("Error in AI chat service:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get AI response"
    };
  }
};
