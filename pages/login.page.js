import BasePage from './base.page.js';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.emailInput = page.locator("input[data-qa='login-email']");
    this.passwordInput = page.locator("input[data-qa='login-password']");
    this.loginButton = page.locator("button[data-qa='login-button']");
    this.loginSuccessText = page.locator("//a[contains(.,'Logged in as')]");
  }

  // ===== ACTIONS =====
  async enterTextToEmailTextBox(email) {
    await this.basePage.fillTextToElement(this.emailInput, email);
  }
  async enterTextToPasswordTextBox(password) {
    await this.basePage.fillTextToElement(this.passwordInput, password);
  }
  async clickToLoginButton() {
    await this.basePage.clickToElement(this.loginButton);
  }
  async expectToSeeLogInAsText() {
    await expect(this.loginSuccessText.toBeVisible());
  }
}