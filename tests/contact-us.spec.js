const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config');
const ContactUsPage = require('../pages/contact-us.page');
const path = require('path');

test.describe('@smoke', () => {
    let contactUsPage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        contactUsPage = new ContactUsPage(page);
    })

    test('Test Case 6: Contact Us Form', async ({ page }) => {
        // 2. Navigate to url
        await page.goto(config.baseURL);

        // 3. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

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
        await contactUsPage.uploadFile('input[name="upload_file"]', filePath);

        // 8. Click 'Submit' button
        await contactUsPage.onceAcceptAlert();
        await contactUsPage.clickSubmitButton();

        // 9. Verify success message
        await expect(contactUsPage.successMessage).toBeVisible();
        await expect(contactUsPage.successMessage).toHaveText('Success! Your details have been submitted successfully.');

        // 10. Click 'Home' button
        await contactUsPage.clickHomeButton();
    })
})