import BasePage from './base.page.js';
import LoginSignupPage from './loginSignup.page.js';

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.homeButton = page.locator("li a[href='/']");
    this.productsButton = page.locator("a[href='/products']");
    this.cartButton = page.locator("a[href='/view_cart']");
    this.loginButton = page.locator("a[href='/login']");
    this.testCasesButton = page.locator("a[href='/test_cases']");
    this.apiTestingButton = page.locator("a[href='/api_list']");
    this.videoTutorialsButton = page.locator("a[href='https://www.youtube.com/c/AutomationExercise']");
    this.contactUsButton = page.locator("a[href='/contact_us']");
  }

  // ===== ACTIONS =====
  // Click 'Home' button
  async clickHomeButton() {
    await this.basePage.clickToElement(this.homeButton);
  }

  // Click 'Products' button
  async clickProductsButton() {
    await this.basePage.clickToElement(this.productsButton);
  }

  // Click 'Cart' button
  async clickCartButton() {
    await this.basePage.clickToElement(this.cartButton);
  }

  // Click 'Signup / Login' button
  async openLoginSignupPage() {
    await this.basePage.clickToElement(this.loginButton);
    //await this.basePage.waitForUrl("/login");
    return new LoginSignupPage(this.page);
  }

  // Click 'Test Cases' button
  async clickTestCasesButton() {
    await this.basePage.clickToElement(this.testCasesButton);
  }

  // Click 'API Testing' button
  async clickApiTestingButton() {
    await this.basePage.clickToElement(this.apiTestingButton);
  }

  // Click 'Video Tutorials' button
  async clickVideoTutorialsButton() {
    await this.basePage.clickToElement(this.videoTutorialsButton);
  }

  // Click 'Contact Us' button
  async clickContactUsButton() {
    await this.basePage.clickToElement(this.contactUsButton);
  }
}
