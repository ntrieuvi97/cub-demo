export const isHeadless = process.env.HEADLESS === undefined || process.env.HEADLESS === 'true';
export const baseUrl = 'https://belivi.wordpress.com/';

// Timeout configurations (in milliseconds)
export const timeouts = {
  navigation: 30000,       // 30 seconds for page navigation
  pageInteraction: 15000,  // 15 seconds for clicking, scrolling, etc.
  verification: 10000,     // 10 seconds for assertions and verifications
  elementLoad: 15000       // 15 seconds for element loading/finding
};