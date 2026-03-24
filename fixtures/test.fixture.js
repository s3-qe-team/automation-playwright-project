/**
 * Custom Playwright fixtures for test setup and teardown
 */
const playwright = require('@playwright/test');
const base = playwright.test;
const LoginSignupPage = require('../pages/login-signup.page.js');
const HomePage = require('../pages/home.page.js');
const RegisterPage = require('../pages/register.page.js');
const ContactUsPage = require('../pages/contact-us.page.js');
const Logger = require('../utils/logger');

/**
 * Extend base test with custom fixtures
 */
exports.test = base.extend({
  /**
   * LoginSignup Page fixture
   * Automatically creates a new LoginSignupPage instance for each test
   */
  loginSignupPage: async ({ page }, use) => {
    const loginSignupPage = new LoginSignupPage(page);
    await use(loginSignupPage);
  },

  /**
   * Home Page fixture
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Register Page fixture
   */
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  /**
   * Contact Us Page fixture
   */
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
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
    const loginSignupPage = new LoginSignupPage(page);
    // TODO: Replace with actual login credentials from environment
    // await loginSignupPage.goto();
    // await loginSignupPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
    
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
