const BasePage = require('./base.page.js');

class CartPage {
    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // ===== LOCATORS =====
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.productName = (index) => this.cartRows.nth(index).locator('.cart_description h4 a');
        this.productPrice = (index) => this.cartRows.nth(index).locator('.cart_price');
        this.productQuantity = (index) => this.cartRows.nth(index).locator('.cart_quantity');
        this.productTotal = (index) => this.cartRows.nth(index).locator('.cart_total');
        this.productsRemoveButton = (index) => page.locator('#cart_info_table tbody tr').nth(index).locator('.cart_quantity_delete');
    }

    // ===== ACTIONS =====
    async clickProductsRemoveButton(index) {
        await this.basePage.clickToElement(this.productsRemoveButton(index));
    }
}

module.exports = CartPage;
