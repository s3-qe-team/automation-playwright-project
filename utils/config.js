/**
 * Environment Configuration Helper
 * Provides easy access to environment variables from .env file
 */

require('dotenv').config();

const config = {
  // Application URLs
  baseURL: process.env.BASE_URL || 'https://automationexercise.com',
  
  // Test User Credentials
  testUserEmail: process.env.TEST_USER_EMAIL || 'test@example.com',
  testUserPassword: process.env.TEST_USER_PASSWORD || 'password',
  
  // Environment
  env: process.env.ENV || 'qa',
  
  // Browser Configuration
  headless: process.env.HEADLESS === 'true',
  
  // Timeouts (optional)
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  
  // Viewport (optional)
  viewportWidth: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
  viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT) || 1080,
};

/**
 * Get environment variable by key
 * @param {string} key - Environment variable key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Environment variable value
 */
function getEnv(key, defaultValue = null) {
  return process.env[key] || defaultValue;
}

/**
 * Check if running in specific environment
 * @param {string} envName - Environment name (dev, qa, staging, prod)
 * @returns {boolean}
 */
function isEnvironment(envName) {
  return config.env.toLowerCase() === envName.toLowerCase();
}

/**
 * Display current configuration (useful for debugging)
 */
function displayConfig() {
  console.log('=== Current Environment Configuration ===');
  console.log('Base URL:', config.baseURL);
  console.log('Environment:', config.env);
  console.log('Headless:', config.headless);
  console.log('Timeout:', config.timeout);
  console.log('========================================');
}

module.exports = {
  config,
  getEnv,
  isEnvironment,
  displayConfig,
};

