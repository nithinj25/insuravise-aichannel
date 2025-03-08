
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

/**
 * Check if a price is likely in INR already (not requiring conversion)
 * This is a heuristic - prices over 1000 are likely already in INR
 * @param price Price to check
 * @returns Boolean indicating if price is likely in INR
 */
export const isLikelyINR = (price: number): boolean => {
  return price >= 1000; // Heuristic - prices over 1000 are likely already in INR
};

/**
 * Format price appropriately - either convert from USD or use directly if already in INR
 * @param price Price value
 * @returns Formatted INR amount with symbol
 */
export const formatPrice = (price: number): string => {
  if (isLikelyINR(price)) {
    // Already in INR, don't convert
    return formatINR(price);
  } else {
    // Convert from USD to INR
    return formatINR(convertUSDtoINR(price));
  }
};
