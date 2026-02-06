/**
 * Example test demonstrating various Playwright features
 * This file serves as a reference for the team
 */
 import { test, expect } from '@playwright/test';
 import HomePage from '../pages/home.page.js';
 import BasePage from '../pages/base.page.js';
  
  const email = "automationtest01@gmail.com";
  const password = "Abc123456";
  const cssValue = "color";
  const expectedColorInRba = "rgb(255, 165, 0)";
  const expectedLoginPageTitle = "Login to your account";
  
test.describe('@smoke', () => {
  test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.openPage('/');
});

 test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  await expect(homePage.homeButton).toHaveCSS(cssValue,expectedColorInRba);
  const loginPage = await homePage.openLoginPage();
  await expect(page).toHaveURL('/login');
  await expect(loginPage.loginPageTitle).toBeVisible();
  await expect(loginPage.loginPageTitle).toHaveText(expectedLoginPageTitle);
  await loginPage.enterTextToEmailTextBox(email);
  await loginPage.enterTextToPasswordTextBox(password);
  await loginPage.clickToLoginButton();
  await expect(loginPage.loginSuccessText).toBeVisible();

});
})

/*test.afterAll(async () => {
  await context.close();
});*/