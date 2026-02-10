import { expect } from '@playwright/test';
import BasePage from './base.page.js';
import LoginSignupPage from './loginSignup.page.js';

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.loginButton = page.locator("a[href='/login']");
    this.homeButton = page.locator("li a[href='/']");
  }

  // ===== ACTIONS =====
  // Click 'Signup / Login' button
  async openLoginSignupPage() {
    await this.basePage.clickToElement(this.loginButton);
    //await this.basePage.waitForUrl("/login");
    return new LoginSignupPage(this.page);
  }
}
