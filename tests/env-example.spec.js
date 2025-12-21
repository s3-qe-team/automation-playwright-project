/**
 * Example test demonstrating how to use environment variables
 * This shows best practices for using .env configuration
 */
const { test, expect } = require('@playwright/test');
const { config, displayConfig } = require('../utils/config');

test.describe('Environment Variables Example @demo', () => {
  
  test.beforeAll(() => {
    // Display current configuration before running tests
    console.log('\n');
    displayConfig();
    console.log('\n');
  });

  test('Example 1: Using BASE_URL from .env', async ({ page }) => {
    // Navigate to the BASE_URL defined in .env file
    await page.goto(config.baseURL);
    
    // Verify page loaded
    await expect(page).toHaveURL(config.baseURL);
    
    console.log('✅ Successfully navigated to:', config.baseURL);
  });

  test('Example 2: Access credentials from .env', async ({ page }) => {
    // You can access test credentials from config
    console.log('Test User Email:', config.testUserEmail);
    console.log('Environment:', config.env);
    
    // Note: Password should NOT be logged in real tests
    expect(config.testUserEmail).toBeTruthy();
    expect(config.testUserPassword).toBeTruthy();
  });

  test('Example 3: Using process.env directly', async ({ page }) => {
    // Alternative: Access environment variables directly
    const baseUrl = process.env.BASE_URL;
    const userEmail = process.env.TEST_USER_EMAIL;
    
    console.log('BASE_URL from process.env:', baseUrl);
    console.log('TEST_USER_EMAIL from process.env:', userEmail);
    
    expect(baseUrl).toBeTruthy();
    expect(userEmail).toBeTruthy();
  });

  test('Example 4: Check headless mode setting', async ({ page }) => {
    // Check if headless mode is enabled
    console.log('Headless mode:', config.headless);
    
    // This test demonstrates checking configuration
    if (config.headless) {
      console.log('🔇 Running in headless mode (no browser window)');
    } else {
      console.log('🖥️ Running in headed mode (browser visible)');
    }
  });
});

// Example: Environment-specific test
test.describe('Environment-Specific Tests', () => {
  
  test('run only in QA environment', async ({ page }) => {
    // Skip if not in QA environment
    const { isEnvironment } = require('../utils/config');
    test.skip(!isEnvironment('qa'), 'This test only runs in QA environment');
    
    console.log('✅ This test is running because ENV=qa in .env file');
    await page.goto(config.baseURL);
  });
});

/**
 * HOW TO USE THIS EXAMPLE:
 * 
 * 1. Make sure you have created .env file:
 *    Copy-Item .env.example .env
 * 
 * 2. Update .env with your values:
 *    BASE_URL=https://www.phptravels.net/
 *    TEST_USER_EMAIL=test@example.com
 *    TEST_USER_PASSWORD=password123
 *    ENV=qa
 *    HEADLESS=false
 * 
 * 3. Run this test:
 *    npx playwright test tests/env-example.spec.js --headed
 * 
 * 4. You should see:
 *    - Browser opens (because HEADLESS=false)
 *    - Configuration displayed in console
 *    - Tests navigate to your BASE_URL
 */

