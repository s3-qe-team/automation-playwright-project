const BasePage = require('./base.page.js');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.basePage = new BasePage(page);

        // ===== LOCATORS =====
        // --- Products page --- 
        this.allProductsHeader = page.locator('div.features_items h2.text-center', { hasText: 'All Products' });
        this.productCards = (index) => page.locator('.single-products').nth(index);
        this.productsAddToCartButton = (index) => this.productCards(index).locator('.add-to-cart').first();
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        this.viewCartButton = page.locator('.modal-content').locator('a[href="/view_cart"]');
        this.productListingPrice = (index) => this.productCards(index).locator('.productinfo h2');
        this.productListingNames = page.locator('.single-products .productinfo p');
        this.searchInput = page.locator('input[name="search"]');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsHeader = page.locator('div.features_items h2.text-center', { hasText: 'Searched Products' });

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

    async fillSearchInput(text) {
        await this.basePage.fillTextToElement(this.searchInput, text);
    }

    async clickSearchButton() {
        await this.basePage.clickToElement(this.searchButton);
    }
}

module.exports = ProductsPage;
