
const { getPlans, getPlanById } = require('../models/insurancePlanModel');

/**
 * Get all insurance plans with optional filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getInsurancePlans = async (req, res, next) => {
  try {
    // Extract filter parameters from query string
    const filters = req.query;
    
    // Get plans from the model
    const plans = await getPlans(filters);
    
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    next(error);
  }
};

/**
 * Get insurance plans by type
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getInsurancePlansByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    
    if (!type) {
      return res.status(400).json({
        success: false,
        error: 'Insurance type is required'
      });
    }
    
    // Get plans by type from the model
    const plans = await getPlans({ type: type === 'all' ? undefined : type });
    
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching insurance plans by type:', error);
    next(error);
  }
};

/**
 * Get insurance plan details by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getInsurancePlanDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Plan ID is required'
      });
    }
    
    // Get plan details by ID from the model
    const plan = await getPlanById(id);
    
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
    next(error);
  }
};
