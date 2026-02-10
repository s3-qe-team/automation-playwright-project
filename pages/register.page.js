import BasePage from './base.page.js';

export default class RegisterPage {
    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // ====  LOCATORS ====
        // --- Enter Account Information section ---
        this.accountInformationHeader = page.locator('div.login-form h2', { hasText: /Enter Account Information/i });

        // Title & Personal Information
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');
        this.accountNameInput = page.locator('input[data-qa="name"]');
        this.passwordInput = page.locator('input[data-qa="password"]');

        // Date of Birth
        this.day = page.locator('#days');
        this.month = page.locator('#months');
        this.year = page.locator('#years');

        // Checkboxes
        this.newsletter = page.locator('#newsletter');
        this.specialOffers = page.locator('#optin');

        // --- Address Information section ---
        this.firstName = page.locator('input[data-qa="first_name"]');
        this.lastName = page.locator('input[data-qa="last_name"]');
        this.company = page.locator('input[data-qa="company"]');
        this.address = page.locator('input[data-qa="address"]');
        this.address2 = page.locator('input[data-qa="address2"]');
        this.country = page.locator('select[data-qa="country"]');
        this.state = page.locator('input[data-qa="state"]');
        this.city = page.locator('input[data-qa="city"]');
        this.zipCode = page.locator('input[data-qa="zipcode"]');
        this.phoneNumber = page.locator('input[data-qa="mobile_number"]');

        // Create Account button
        this.createAccountButton = page.locator('button[data-qa="create-account"]');

        // --- Confirmation section ---
        // Account Created
        this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');

        // Account Deleted
        this.deleteAccountButton = page.locator('a[href="/delete_account"]');
        this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
    }

    // ==== ACTIONS ====
    // Fill details: Title, Name, Email, Password, Date of birth
    async selectTitleMr() {
        await this.basePage.checkElement(this.titleMr);
    }
    async selectTitleMrs() {
        await this.basePage.checkElement(this.titleMrs);
    }
    async fillAccountInformation(data) {
        await this.basePage.fillTextToElement(this.accountNameInput, data.name);
        await this.basePage.fillTextToElement(this.passwordInput, data.password);
        await this.basePage.selectItemInDropDown(this.day, data.day);
        await this.basePage.selectItemInDropDown(this.month, data.month);
        await this.basePage.selectItemInDropDown(this.year, data.year);
    }

    // Check checboxes
    async checkNewsLetterAndSpecialOffers() {
        await this.basePage.checkElement(this.newsletter);
        await this.basePage.checkElement(this.specialOffers);
    }

    // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    async fillAddressInformation(data) {
        await this.basePage.fillTextToElement(this.firstName, data.firstName);
        await this.basePage.fillTextToElement(this.lastName, data.lastName);
        await this.basePage.fillTextToElement(this.company, data.company);
        await this.basePage.fillTextToElement(this.address, data.address);
        await this.basePage.fillTextToElement(this.address2, data.address2 || '');
        await this.basePage.selectItemInDropDown(this.country, data.country);
        await this.basePage.fillTextToElement(this.state, data.state);
        await this.basePage.fillTextToElement(this.city, data.city);
        await this.basePage.fillTextToElement(this.zipCode, data.zipCode);
        await this.basePage.fillTextToElement(this.phoneNumber, data.phoneNumber);
    }

    // Click 'Create Account button'
    async clickCreateAccountButton() {
        await this.basePage.clickToElement(this.createAccountButton);
    }

    // Click 'Continue' button
    async clickContinueButton() {
        await this.basePage.clickToElement(this.continueButton);
    }

    // Click 'Delete Account' button
    async clickDeleteAccountButton() {
        await this.basePage.clickToElement(this.deleteAccountButton);
    }
}