import { test, expect } from '@playwright/test';
import { config } from '../utils/config.js';
import HomePage from '../pages/home.page.js';
import RegisterPage from '../pages/register.page.js';
import LoginSignupPage from '../pages/loginSignup.page.js';

test.describe('@smoke', () => {
    let registerPage, homePage, loginSignupPage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        registerPage = new RegisterPage(page);
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignupPage(page);
    })

    test('Test Case 1: Register User', async ({ page }) => {
        // 2. Navigate to url
        await page.goto(config.baseURL);

        // 3. Verify that home page is visible successfully
        await homePage.verifyHomePageIsVisible();

        // 4. Click on 'Signup / Login' button
        await homePage.openLoginSignupPage();

        // 5. Verify 'New User Signup!' is visible
        await expect(loginSignupPage.signupHeader).toBeVisible();
        await expect(loginSignupPage.signupHeader).toHaveText('New User Signup!');

        // 6 & 7. Enter name and email address and click 'Signup' button
        const randomEmail = `test_${Date.now()}@gmail.com`;
        await loginSignupPage.signup(config.testUserName, randomEmail);
        await loginSignupPage.clickToSignupButton();

        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(registerPage.accountInformationHeader).toBeVisible();
        await expect(registerPage.accountInformationHeader).toHaveText('Enter Account Information');

        // 9. Fill details: Title, Name, Email, Password, Date of birth
        await registerPage.selectTitleMr();
        await registerPage.fillAccountInformation({
            name: config.testUserName,
            password: config.testUserPassword,
            day: '13',
            month: 'December',
            year: '2000'
        });

        // 10. Select checkbox 'Sign up for our newsletter!'
        // 11. Select checkbox 'Receive special offers from our partners!'  
        await registerPage.checkNewsLetterAndSpecialOffers();

        // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await registerPage.fillAddressInformation({
            firstName: config.testUserFirstName,
            lastName: config.testUserLastName,
            company: config.testUserCompany,
            address: config.testUserAddress,
            country: 'Singapore',
            state: config.testUserState,
            city: config.testUserCity,
            zipCode: config.testUserZipCode,
            phoneNumber: config.testUserMobileNumber
        });

        // 13. Click 'Create Account button' 
        await registerPage.clickCreateAccountButton();

        // 14. Verify 'ACCOUNT CREATED!' is visible
        await expect(registerPage.accountCreatedHeader).toBeVisible();
        await expect(registerPage.accountCreatedHeader).toHaveText('Account Created!');

        // 15. Click 'Continue' button
        await registerPage.clickContinueButton();

        // 16. Verify that ' Logged in as username' is visible
        await expect(loginSignupPage.loginSuccessText).toBeVisible();
        await expect(loginSignupPage.loginSuccessText).toHaveText(`Logged in as ${config.testUserName}`);

        // 17. Click 'Delete Account' button
        await registerPage.clickDeleteAccountButton();

        // 18. Verify 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(registerPage.accountDeletedHeader).toBeVisible();
        await expect(registerPage.accountDeletedHeader).toHaveText('Account Deleted!');
        await registerPage.clickContinueButton();
    })
})