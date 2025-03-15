
// In a production app, this would connect to a database
// For simplicity, we're using in-memory data that mirrors the mock data

const insurancePlans = require('../data/insurancePlans');

/**
 * Get insurance plans with optional filters
 * @param {Object} filters - Filter criteria
 * @returns {Promise<Array>} - Filtered insurance plans
 */
exports.getPlans = async (filters = {}) => {
  let filteredPlans = [...insurancePlans];
  
  // Apply filters if any
  if (filters.type && filters.type !== 'all') {
    filteredPlans = filteredPlans.filter(plan => 
      plan.type.toLowerCase() === filters.type.toLowerCase()
    );
  }
  
  if (filters.minPrice) {
    filteredPlans = filteredPlans.filter(plan => plan.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filteredPlans = filteredPlans.filter(plan => plan.price <= filters.maxPrice);
  }
  
  if (filters.providerId) {
    filteredPlans = filteredPlans.filter(plan => plan.providerId === filters.providerId);
  }
  
  return filteredPlans;
};

/**
 * Get a specific insurance plan by ID
 * @param {string} id - Insurance plan ID
 * @returns {Promise<Object|null>} - Insurance plan or null if not found
 */
exports.getPlanById = async (id) => {
  const plan = insurancePlans.find(p => p.id === id);
  return plan || null;
};
