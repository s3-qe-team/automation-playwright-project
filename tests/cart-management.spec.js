const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config.js');
const HomePage = require("../pages/home.page");
const LoginSignupPage = require("../pages/loginSignup.page");
const ProductsPage = require("../pages/products.page");
const CartPage = require('../pages/cart.page.js');

test.describe('@smoke', () => {
    let productsPage, homePage, cartPage, loginSignupPage;
    test.beforeEach(async ({ page }) => {
        // 1. Launch browser
        productsPage = new ProductsPage(page);
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        loginSignupPage = new LoginSignupPage(page);

        // 2. Navigate to url
        await page.goto(config.baseURL);

        // 3. Verify that home page is visible successfully
        await expect(homePage.homeButton).toHaveCSS("color", "rgb(255, 165, 0)");
    })

    test('Test Case 17: Remove Products From Cart', async ({ page }) => {
        // 4. Add products to cart
        await productsPage.clickProductsAddToCart(0);
        await productsPage.clickContinueShoppingButton();
        await productsPage.clickProductsAddToCart(1);
        await productsPage.clickContinueShoppingButton();

        // 5. Click 'Cart' button
        await homePage.clickCartButton();

        // 6. Verify that cart page is displayed
        await expect(page).toHaveURL(/view_cart/);

        // 7. Click 'X' button corresponding to particular product
        await cartPage.clickProductsRemoveButton(0);

        // 8. Verify that product is removed from the cart
        await expect(cartPage.cartRows).toHaveCount(1);
    })

    test('Test Case 20: Search Products and Verify Cart After Login', async () => {
        // 3. Click on 'Products' button
        await homePage.clickProductsButton();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(productsPage.allProductsHeader).toBeVisible();

        // 5. Enter product name in search input and click search button
        await productsPage.fillSearchInput('jeans');
        await productsPage.clickSearchButton();

        // 6. Verify 'SEARCHED PRODUCTS' is visible
        await expect(productsPage.searchedProductsHeader).toBeVisible();

        // 7. Verify all the products related to search are visible
        const searchKeyword = 'jeans';
        const productsCount = await productsPage.productListingNames.count();
        expect(productsCount).toBeGreaterThan(0);

        for (let i = 0; i < productsCount; i++) {
            await expect(productsPage.productListingNames.nth(i)).toBeVisible();
            const productName = await productsPage.productListingNames.nth(i).textContent();
            expect(productName.toLowerCase()).toContain(searchKeyword.toLowerCase());
        }

        // 8. Add those products to cart
        for (let i = 0; i < productsCount; i++) {
            await productsPage.hoverProductCards(i);
            await productsPage.clickProductsAddToCart(i);
            await productsPage.clickContinueShoppingButton();
        }

        // 9. Click 'Cart' button and verify that products are visible in cart
        await homePage.clickCartButton();

        // Kiểm tra xem số lượng sản phẩm trong giỏ hàng có bằng với số lượng đã thêm không
        await expect(cartPage.cartRows).toHaveCount(productsCount);

        for (let i = 0; i < productsCount; i++) {
            // Verify sản phẩm có hiển thị trong giỏ hàng và đúng tên
            await expect(cartPage.productName(i)).toBeVisible();
            const productNameInCart = await cartPage.productName(i).textContent();
            expect(productNameInCart.toLowerCase()).toContain(searchKeyword.toLowerCase());
        }

        // 10. Click 'Signup / Login' button and submit login details
        const email = "automationtest01@gmail.com";
        const password = "Abc123456";
        await homePage.openLoginSignupPage();
        await loginSignupPage.enterTextToEmailTextBox(email);
        await loginSignupPage.enterTextToPasswordTextBox(password);
        await loginSignupPage.clickToLoginButton();
        await expect(loginSignupPage.loginSuccessText).toBeVisible();

        // 11. Again, go to Cart page
        await homePage.clickCartButton();

        // 12. Verify that those products are visible in cart after login as well
        await expect(cartPage.cartRows).toHaveCount(productsCount);

        for (let i = 0; i < productsCount; i++) {
            // Verify sản phẩm có hiển thị trong giỏ hàng và đúng tên
            await expect(cartPage.productName(i)).toBeVisible();
            const productNameInCart = await cartPage.productName(i).textContent();
            expect(productNameInCart.toLowerCase()).toContain(searchKeyword.toLowerCase());
        }
    })
})