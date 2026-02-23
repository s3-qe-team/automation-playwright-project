import { test, expect } from '@playwright/test';
import { config } from '../utils/config.js';
import ContactUsPage from '../pages/contact-us.page.js';
import HomePage from '../pages/home.page.js';
import path from 'path';

test.describe('@smoke', () => {
    let contactUsPage;
    let homePage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        contactUsPage = new ContactUsPage(page);
        homePage = new HomePage(page);
    })

    test('Test Case 6: Contact Us Form', async ({ page }) => {
        // 2. Navigate to url
        await page.goto(config.baseURL);

        // 3. Verify that home page is visible successfully
        await expect(homePage.homeButton).toHaveCSS("color", "rgb(255, 165, 0)");

        // 4. Click on 'Contact Us' button
        await contactUsPage.clickContactUsButton();

        // 5. Verify 'GET IN TOUCH' is visible
        await expect(contactUsPage.getInTouchHeader).toBeVisible();
        await expect(contactUsPage.getInTouchHeader).toHaveText('Get In Touch');

        // 6. Enter name, email, subject and message
        await contactUsPage.fillContactForm({
            name: config.testUserName,
            email: config.testUserEmail,
            subject: config.testSubject,
            message: config.testMessage
        });

        // 7. Upload file
        const filePath = path.resolve(__dirname, '../data/upload_files/image_test.png');
        await contactUsPage.uploadFile(contactUsPage.uploadFileButton, filePath);

        // 8. Click 'Submit' button
        await contactUsPage.acceptAlert(() => contactUsPage.clickSubmitButton());

        // 9. Verify success message
        await expect(contactUsPage.successMessage).toBeVisible();
        await expect(contactUsPage.successMessage).toHaveText('Success! Your details have been submitted successfully.');

        // 10. Click 'Home' button and verify that landed to home page successfully
        await contactUsPage.clickHomeButton();
        await expect(homePage.homeButton).toHaveCSS("color", "rgb(255, 165, 0)");
    })
})