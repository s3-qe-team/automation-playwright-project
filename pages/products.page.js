import BasePage from './base.page.js';

export default class ProductsPage {
    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // ===== LOCATORS =====
        // --- Products page --- 
        this.productCards = (index) => page.locator('.single-products').nth(index);
        this.productsAddToCartButton = (index) => this.productCards(index).locator('.add-to-cart').first();
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        this.viewCartButton = page.locator('.modal-content').locator('a[href="/view_cart"]');
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.productListingPrice = (index) => this.productCards(index).locator('.productinfo h2');
        this.productPrice = (index) => this.cartRows.nth(index).locator('.cart_price');
        this.productQuantity = (index) => this.cartRows.nth(index).locator('.cart_quantity');
        this.productTotal = (index) => this.cartRows.nth(index).locator('.cart_total');

        // --- Product details page --- 
        this.viewProductlink = page.locator('a[href="/product_details/1"]');
        this.inputQuantity = page.locator('#quantity');
        this.productDetailsAddToCartButton = page.locator('button.cart');

        // --- Recommended items --- 
        this.recommendedItemsHeader = page.locator('div.recommended_items h2', { hasText: 'recommended items' });
        this.recommendedItemsName = (index) => page.locator('div.recommended_items .productinfo h2').nth(index);
        this.recommendedItemsAddToCartButton = (index) => page.locator('div.recommended_items .add-to-cart').nth(index);
    }

    // ===== ACTIONS =====
    async hoverProductCards(index) {
        await this.basePage.hoverToElement(this.productCards(index));
    }

    async clickProductsAddToCart(index) {
        await this.basePage.clickToElement(this.productsAddToCartButton(index));
    }

    async clickContinueShoppingButton() {
        await this.basePage.clickToElement(this.continueShoppingButton);
    }

    async clickViewCartButton() {
        await this.basePage.clickToElement(this.viewCartButton);
    }

    async clickViewProductLink() {
        await this.basePage.clickToElement(this.viewProductlink);
    }

    async fillQuantity(quantity) {
        await this.inputQuantity.fill(quantity);
    }

    async clickProductDetailsAddToCartButton() {
        await this.basePage.clickToElement(this.productDetailsAddToCartButton);
    }

    async clickrecommendedItemsAddToCartButton(index) {
        await this.basePage.clickToElement(this.recommendedItemsAddToCartButton(index));
    }
}
