/**
 * Custom Playwright fixtures for test setup and teardown
 */
const playwright = require('@playwright/test');
const base = playwright.test;
const LoginPage = require('../pages/login.page');
const Logger = require('../utils/logger');

/**
 * Extend base test with custom fixtures
 */
exports.test = base.extend({
  /**
   * Login Page fixture
   * Automatically creates a new LoginPage instance for each test
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Logger fixture
   * Provides a logger instance for each test
   */
  logger: async ({ page }, use, testInfo) => {
    const logger = new Logger(testInfo.title);
    await use(logger);
  },

  /**
   * Authenticated context fixture
   * Creates a context with authentication already completed
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // TODO: Replace with actual login credentials from environment
    // await loginPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
    
    await use(page);
  },

  /**
   * Screenshot on failure fixture
   * Automatically takes screenshot when test fails
   */
  autoScreenshot: async ({ page }, use, testInfo) => {
    await use(page);
    
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  },
});

exports.expect = playwright.expect;
