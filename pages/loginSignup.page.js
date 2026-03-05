import BasePage from './base.page.js';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    // --- Login form ---
    this.emailInput = page.locator("input[data-qa='login-email']");
    this.passwordInput = page.locator("input[data-qa='login-password']");
    this.loginButton = page.locator("button[data-qa='login-button']");
    this.loginSuccessText = page.locator("//a[contains(.,'Logged in as')]");
    this.loginPageTitle = page.locator("div.login-form>h2");

    // --- Signup form ---
    this.signupHeader = page.locator('div.signup-form h2');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
  }

  // ===== ACTIONS =====
  // --- Login form ---
  // Enter email and password
  async enterTextToEmailTextBox(email) {
    await this.basePage.fillTextToElement(this.emailInput, email);
  }
  async enterTextToPasswordTextBox(password) {
    await this.basePage.fillTextToElement(this.passwordInput, password);
  }

  // Click login button
  async clickToLoginButton() {
    await this.basePage.clickToElement(this.loginButton);
  }

  // --- Signup form ---
  // Enter name and email address 
  async signup(name, email) {
    await this.basePage.fillTextToElement(this.signupNameInput, name);
    await this.basePage.fillTextToElement(this.signupEmailInput, email);
  }
  // Click signup button
  async clickToSignupButton() {
    await this.basePage.clickToElement(this.signupButton);
  }
}