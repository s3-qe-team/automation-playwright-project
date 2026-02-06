const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
const { config: myConfig } = require('./utils/config');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for */
  timeout: myConfig.timeout,

  /* Test execution settings */
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporter configuration */
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/json-report/results.json' }],
    ['junit', { outputFile: 'reports/junit-report/results.xml' }],
    ['list']
  ],

  /* Shared settings for all the projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: myConfig.baseURL,

    /* Browser will open when running tests (can be overridden by .env HEADLESS variable) */
    /* Default to headless in CI environments, headed mode locally */
    headless: myConfig.headless,

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video recording - disabled in CI to save time and resources */
    video: myConfig.video,

    /* Collect trace on failure */
    trace: 'retain-on-failure',

    /* Navigation timeout */
    navigationTimeout: myConfig.timeout,

    /* Action timeout */
    actionTimeout: myConfig.actionTimeout,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'mobile-safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
});
