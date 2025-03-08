
/**
 * Currency utility functions for the application
 */

// Conversion rate from USD to INR (approximate)
export const USD_TO_INR_RATE = 83.5;

/**
 * Convert USD amount to INR
 * @param usdAmount Amount in USD
 * @returns Amount in INR
 */
export const convertUSDtoINR = (usdAmount: number): number => {
  return usdAmount * USD_TO_INR_RATE;
};

/**
 * Format currency in INR with the ₹ symbol
 * @param amount Amount to format
 * @returns Formatted INR amount with symbol
 */
export const formatINR = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
