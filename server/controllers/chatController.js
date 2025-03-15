
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Get AI chat response
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAIChatResponse = async (req, res, next) => {
  try {
    const { message, context = 'general-insurance' } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Customize system message based on context
    let systemMessage = '';
    if (context === 'insurance-finder') {
      systemMessage = 'You are InsuraAI, an insurance assistant helping users find appropriate insurance plans. All prices are in Indian Rupees (₹). Provide helpful, concise responses focused on insurance selection.';
    } else {
      systemMessage = 'You are InsuraAI, an insurance assistant helping users understand policies. All prices are in Indian Rupees (₹). Provide helpful, concise responses focused on insurance education.';
    }

    // Call OpenAI API
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = chatResponse.choices[0].message.content.trim();

    res.status(200).json({
      success: true,
      data: aiResponse
    });
  } catch (error) {
    console.error('Error in AI chat service:', error);
    next(error);
  }
};
