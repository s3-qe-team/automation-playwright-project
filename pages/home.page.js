import BasePage from './base.page.js';
import LoginPage from './login.page.js';

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.loginButton = this.loginLink = page.locator("a[href='/login']");
;
  }

  // ===== ACTIONS =====
  async openLoginPage() {
    await this.basePage.clickToElement(this.loginButton);
    return new LoginPage(this.page);
  }

  
}