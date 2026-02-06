const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config');
const HomePage = require('../pages/home.page');
const RegisterPage = require('../pages/register.page');

test.describe('@smoke', () => {
    let registerPage, homePage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        registerPage = new RegisterPage(page);
        homePage = new HomePage(page);
    })

    test('Test Case 1: Register User', async ({ page }) => {
        // 2. Navigate to url
        await page.goto(config.baseURL);

        // 3. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 4. Click on 'Signup / Login' button
        await homePage.openLoginPage();

        // 5. Verify 'New User Signup!' is visible
        await expect(registerPage.signupHeader).toBeVisible();
        await expect(registerPage.signupHeader).toHaveText('New User Signup!');

        // 6 & 7. Enter name and email address and click 'Signup' button
        const randomEmail = `test_${Date.now()}@gmail.com`;
        await registerPage.signup(config.testUserName, randomEmail);

        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(registerPage.accountInformationHeader).toBeVisible();
        await expect(registerPage.accountInformationHeader).toHaveText('Enter Account Information');

        // 9. Fill details: Title, Name, Email, Password, Date of birth
        await registerPage.selectTitle('Mrs');
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
            address2: '',
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
        await expect(registerPage.loggedInUserText).toBeVisible();
        await expect(registerPage.loggedInUserText).toHaveText(`Logged in as ${config.testUserName}`);

        // 17. Click 'Delete Account' button
        await registerPage.clickDeleteAccountButton();

        // 18. Verify 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(registerPage.accountDeletedHeader).toBeVisible();
        await expect(registerPage.accountDeletedHeader).toHaveText('Account Deleted!');
        await registerPage.clickContinueButton();
    })
})