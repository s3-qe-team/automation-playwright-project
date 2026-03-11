import { test, expect } from '@playwright/test';
import { config } from '../utils/config.js';
import HomePage from "../pages/home.page";
import ProductsPage from "../pages/products.page";

test.describe('@smoke', () => {
    let productsPage, homePage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        productsPage = new ProductsPage(page);
        homePage = new HomePage(page);

        // 2. Navigate to url
        await page.goto(config.baseURL);
    })

    test('Test Case 12: Add Products in Cart', async () => {
        // 3. Verify that home page is visible successfully
        await expect(homePage.homeButton).toHaveCSS("color", "rgb(255, 165, 0)");

        // 4. Click 'Products' button
        await homePage.clickProductsButton();

        // 5. Hover over first product and click 'Add to cart'
        const firstProductPrice = await productsPage.productListingPrice(0).innerText(); // find price of first product
        await productsPage.hoverProductCards(0);
        await productsPage.clickProductsAddToCart(0);

        // 6. Click 'Continue Shopping' button
        await productsPage.clickContinueShoppingButton();

        // 7. Hover over second product and click 'Add to cart'
        const secondProductPrice = await productsPage.productListingPrice(1).innerText(); // find price of second product
        await productsPage.hoverProductCards(1);
        await productsPage.clickProductsAddToCart(1);

        // 8. Click 'View Cart' button
        await productsPage.clickViewCartButton();

        // 9. Verify both products are added to Cart
        await expect(homePage.cartButton).toHaveCSS("color", "rgb(255, 165, 0)");
        await expect(productsPage.cartRows).toHaveCount(2);

        // 10. Verify their prices, quantity and total price
        // First Product
        await expect(productsPage.productPrice(0)).toContainText(firstProductPrice);
        await expect(productsPage.productQuantity(0)).toHaveText('1');
        await expect(productsPage.productTotal(0)).toContainText(firstProductPrice);

        // Second Product
        await expect(productsPage.productPrice(1)).toContainText(secondProductPrice);
        await expect(productsPage.productQuantity(1)).toHaveText('1');
        await expect(productsPage.productTotal(1)).toContainText(secondProductPrice);
    })

    test('Test Case 13: Verify Product quantity in Cart', async () => {
        // 3. Verify that home page is visible successfully
        await expect(homePage.homeButton).toHaveCSS("color", "rgb(255, 165, 0)");

        // 4. Click 'View Product' for any product on home page
        await productsPage.clickViewProductLink();

        // 5. Verify product detail is opened
        await expect(productsPage.page).toHaveURL(/.*product_details\/1/);

        // 6. Increase quantity to 4
        await productsPage.fillQuantity("4");

        // 7. Click 'Add to cart' button
        await productsPage.clickProductDetailsAddToCartButton();

        // 8. Click 'View Cart' button
        await productsPage.clickViewCartButton();

        // 9. Verify that product is displayed in cart page with exact quantity
        await expect(productsPage.productQuantity(0)).toHaveText('4');
    })

    test('Test Case 22: Add to cart from Recommended items', async () => {
        // 3. Scroll to bottom of page
        await productsPage.basePage.scrollToBottom();

        // 4. Verify 'RECOMMENDED ITEMS' are visible
        await expect(productsPage.recommendedItemsHeader).toBeVisible();
        // Get name of recommended item
        const recommendedItemName = await productsPage.recommendedItemsName(4).innerText();

        // 5. Click on 'Add To Cart' on Recommended product
        await productsPage.clickrecommendedItemsAddToCartButton(4);

        // 6. Click on 'View Cart' button
        await productsPage.clickViewCartButton();

        // 7. Verify that product is displayed in cart page
        await expect(productsPage.cartRows).toHaveCount(1);
        // Verify product name
        await expect(productsPage.cartRows.nth(0)).toContainText(recommendedItemName);
    })
})
