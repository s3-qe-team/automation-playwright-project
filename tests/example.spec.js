/**
 * Example test demonstrating various Playwright features
 * This file serves as a reference for the team
 */
const { test, expect } = require("@playwright/test");
const helpers = require("../utils/helpers");

test.describe("Example Test Suite @smoke", () => {
  test("basic navigation test", async ({ page }) => {
    await page.goto("https://playwright.dev");

    // Verify page title
    await expect(page).toHaveTitle(/Playwright/);

    // Verify element is visible
    const getStarted = page.getByRole("link", { name: "Get started" });
    await expect(getStarted).toBeVisible();
  });

  test("using helper functions", async () => {
    // Generate random test data
    const email = helpers.generateRandomEmail("testuser");
    const randomString = helpers.generateRandomString(15);
    const phone = helpers.generateRandomPhone();

    console.log("Generated Email:", email);
    console.log("Generated String:", randomString);
    console.log("Generated Phone:", phone);

    // Validate email format
    expect(helpers.isValidEmail(email)).toBeTruthy();
    expect(helpers.isValidEmail("invalid-email")).toBeFalsy();
  });
});

// Tagged test examples
test.describe("Smoke Tests @smoke", () => {
  test("critical user flow", async ({ page }) => {
    // Critical path test
    await page.goto("https://playwright.dev");
    await expect(page).toHaveTitle(/Playwright/);
  });
});

test.describe("Regression Tests @regression", () => {
  test("detailed functionality test", async ({ page }) => {
    // Detailed regression test
    await page.goto("https://playwright.dev");
    // Add comprehensive test steps
  });
});

// Example with test hooks
test.describe("Test with Hooks", () => {
  test.beforeAll(async () => {
    console.log("Before all tests in this suite");
    // Setup that runs once before all tests
  });

  test.beforeEach(async ({ page }) => {
    console.log("Before each test");
    // Setup that runs before each test
    await page.goto("https://playwright.dev");
  });

  test.afterEach(async ({ page }) => {
    console.log("After each test");
    // Cleanup that runs after each test
  });

  test.afterAll(async () => {
    console.log("After all tests in this suite");
    // Cleanup that runs once after all tests
  });

  test("test with hooks example 1", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("test with hooks example 2", async ({ page }) => {
    await expect(page).toHaveURL(/playwright.dev/);
  });
});
