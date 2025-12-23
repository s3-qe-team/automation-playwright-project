const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config');

test('login as an agent', async ({ page }) => {
    // Navigate to the BASE_URL
    await page.goto(config.baseURL);

    // Open Agents dropdown menu
    await page.getByRole('button', { name: 'Agents' }).click();

    // Click Login link in the dropdown
    await page.getByRole('link', { name: 'Login' }).click();

    // Verify Agent Login page is loaded
    await expect(page).toHaveURL(/.*login\?agent=1/);

    // Locate Agent Login form to scope input fields
    const agentLoginForm = page.locator('form#login');

    // Fill in login credentials
    await agentLoginForm.getByPlaceholder('name@example.com').fill(config.testUserEmail);
    await agentLoginForm.getByPlaceholder('Enter your password').fill(config.testUserPassword);

    // Locate Login button
    const loginBtn = page.getByRole('button', { name: 'Login' });
    
    // Get the color before hovering
    const colorBefore = await loginBtn.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
    );    

    // Hover over Login button
    await loginBtn.hover();

    // Verify Login button color changes on hover
    await expect(loginBtn).not.toHaveCSS('background-color', colorBefore);
});