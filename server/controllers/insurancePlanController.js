
const insurancePlans = require('../data/insurancePlans');

/**
 * Get all insurance plans
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getInsurancePlans = (req, res) => {
  try {
    // Apply filters if provided
    let filteredPlans = [...insurancePlans];
    
    if (req.query.type) {
      filteredPlans = filteredPlans.filter(plan => 
        plan.type.toLowerCase() === req.query.type.toLowerCase()
      );
    }
    
    if (req.query.priceMin) {
      filteredPlans = filteredPlans.filter(plan => 
        plan.price >= parseFloat(req.query.priceMin)
      );
    }
    
    if (req.query.priceMax) {
      filteredPlans = filteredPlans.filter(plan => 
        plan.price <= parseFloat(req.query.priceMax)
      );
    }
    
    if (req.query.provider) {
      filteredPlans = filteredPlans.filter(plan => 
        plan.providerName.toLowerCase().includes(req.query.provider.toLowerCase())
      );
    }
    
    res.status(200).json({
      success: true,
      data: filteredPlans
    });
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch insurance plans'
    });
  }
};

/**
 * Get insurance plans by type
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getInsurancePlansByType = (req, res) => {
  try {
    const { type } = req.params;
    
    // Return mock data for now
    const filteredPlans = insurancePlans.filter(plan => 
      plan.type.toLowerCase() === type.toLowerCase()
    );
    
    res.status(200).json({
      success: true,
      data: filteredPlans
    });
  } catch (error) {
    console.error('Error fetching insurance plans by type:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch insurance plans'
    });
  }
};

/**
 * Get insurance plan details by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getInsurancePlanDetails = (req, res) => {
  try {
    const { id } = req.params;
    
    const plan = insurancePlans.find(plan => plan.id === id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Insurance plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Error fetching insurance plan details:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch insurance plan details'
    });
  }
};
