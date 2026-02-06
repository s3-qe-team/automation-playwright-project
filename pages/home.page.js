import BasePage from './base.page.js';
import LoginPage from './login.page.js';

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.loginButton = page.locator("a[href='/login']");
    this.homeButton = page.locator("li a[href='/']");
  }

  // ===== ACTIONS =====
  async openLoginPage() {
    await this.basePage.clickToElement(this.loginButton);
    //await this.basePage.waitForUrl("/login");
    return new LoginPage(this.page);
  }

  
}