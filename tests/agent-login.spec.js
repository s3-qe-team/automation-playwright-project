const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config');
const { AgentLoginPage } = require('../pages/login.page.js');

test('login as an agent @login', async ({ page }) => {
    const agentPage = new AgentLoginPage(page);

    // Navigate to BASE_URL
    await agentPage.navigate(config.baseURL);

    // Navigate to Agent Login Page
    await agentPage.navigateToAgentLogin();

    // Verify Agent Login Page is loaded
    await expect(page).toHaveURL(/.*login\?agent=1/);

    // Fill in login credentials
    await agentPage.fillLoginCredentials(config.testUserEmail, config.testUserPassword);

    // Verify Login button color changes
    await agentPage.verifyButtonColorChange();
});