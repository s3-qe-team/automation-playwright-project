const BasePage = require("./base.page");

class ContactUsPage {
    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // ==== LOCATORS ====
        this.contactUsButton = page.locator('a[href="/contact_us"]');
        this.getInTouchHeader = page.locator('div.contact-form h2');
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageInput = page.getByPlaceholder('Your Message Here');
        this.uploadFileButton = page.locator('input[type="file"]');
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        this.successMessage = page.locator('#contact-page .alert-success');
        this.homeButton = page.locator('.btn-success[href="/"]');
    }

    // ==== ACTIONS ====
    // Click on 'Contact Us' button
    async clickContactUsButton() {
        await this.basePage.clickToElement(this.contactUsButton);
    }

    // Fill in contact form
    async fillContactForm(data) {
        await this.basePage.fillTextToElement(this.nameInput, data.name);
        await this.basePage.fillTextToElement(this.emailInput, data.email);
        await this.basePage.fillTextToElement(this.subjectInput, data.subject);
        await this.basePage.fillTextToElement(this.messageInput, data.message);
    }

    // Upload file
    async uploadFile(selector, filePath) {
        await this.basePage.uploadFile(selector, filePath);
    }

    // Accept alert
    async acceptAlert() {
        await this.basePage.acceptAlert();
    }

    async onceAcceptAlert() {
        await this.basePage.onceAcceptAlert();
    }

    // Click 'Submit' button
    async clickSubmitButton() {
        await this.basePage.clickToElement(this.submitButton);
    }

    // Click 'Home' button
    async clickHomeButton() {
        await this.basePage.clickToElement(this.homeButton);
    }
}

module.exports = ContactUsPage;