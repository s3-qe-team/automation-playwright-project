/**
 * Example test demonstrating various Playwright features
 * This file serves as a reference for the team
 */
 import { test, expect } from '@playwright/test';
 import HomePage from '../pages/home.page.js';
 import BasePage from '../pages/base.page.js';
  
  let loginPage;
  const email = "automationtest01@gmail.com";
  const password = "Abc123456";
  const cssValue = "color";
  const expectedColorInRba = "rgb(255, 165, 0";
  const loginPageTitle = "Login to your account";
  
test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.openPage('/');
});

 test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  await expect(homePage.homeButton).toHaveCSS(cssValue, expectedColorInRba);
  loginPage = await homePage.openLoginPage();
  await expect(page).toHaveURL('/login');
  await expect(loginPage.loginPageTitle).toHaveText(loginPageTitle);
  await loginPage.enterTextToEmailTextBox(email);
  await loginPage.enterTextToPasswordTextBox(password);
  await loginPage.clickToLoginButton();
  await expect(loginPage.loginSuccessText).toBeVisible();
  await page.pause();
});

/*test.afterAll(async () => {
  await context.close();
});*/