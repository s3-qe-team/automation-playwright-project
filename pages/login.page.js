const BasePage = require('./base.page');
const locators = require('../locators/login.locators');
const { expect } = require('@playwright/test');

class AgentLoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Naviate to Agent Login Page
  async navigateToAgentLogin() {
    // Call the click method from BasePage with the Locator object
    await this.click(locators.agentsButton(this.page));
    await this.click(locators.loginLink(this.page));
  }

  // Fill in login credentials
  async fillLoginCredentials(email, password) {
    const form = locators.agentsLoginForm(this.page);
    await this.fill(locators.emailInput(form), email);
    await this.fill(locators.passwordInput(form), password);
  }

  // Get login button color
  async getLoginButtonColor() {  
    const btn = locators.loginButton(this.page);
    return await btn.evaluate(el => window.getComputedStyle(el).backgroundColor);
  }

  async verifyButtonColorChange() {
    // Check the button color before hover
    const actualBefore = await this.getLoginButtonColor();

    // Hover over login button
    await locators.loginButton(this.page).hover();

    // Check the button color after hover
    const actualAfter = await this.getLoginButtonColor();

    // Verify the color has changed
    expect(actualAfter).not.toBe(actualBefore);
  }
}

module.exports = { AgentLoginPage };