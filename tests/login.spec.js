const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/home.page.js');
const BasePage = require('../pages/base.page.js');

const email = 'automationtest01@gmail.com';
const password = 'Abc123456';
const cssValue = 'color';
const expectedColorInRba = 'rgb(255, 165, 0)';
const expectedLoginPageTitle = 'Login to your account';

test.describe('@smoke', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.openPage('/');
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.homeButton).toHaveCSS(cssValue, expectedColorInRba);
    const loginSignupPage = await homePage.openLoginSignupPage();
    await expect(page).toHaveURL('/login');
    await expect(loginSignupPage.loginPageTitle).toBeVisible();
    await expect(loginSignupPage.loginPageTitle).toHaveText(expectedLoginPageTitle);
    await loginSignupPage.enterTextToEmailTextBox(email);
    await loginSignupPage.enterTextToPasswordTextBox(password);
    await loginSignupPage.clickToLoginButton();
    await expect(loginSignupPage.loginSuccessText).toBeVisible();
  });
});
