const { test, expect } = require('@playwright/test');
const { config } = require('../utils/config');
const { SearchToursPage } = require('../pages/search.page.js');

test('search for tours @search', async ({ page }) => {
    const searchPage = new SearchToursPage(page);
    
    // Navigate to BASE_URL
    await searchPage.navigate(config.baseURL);

    // Navigate to Tours Search Page
    await searchPage.selectToursTab();

    // Fill in search details
    await searchPage.searchByCity('Dubai');
    await searchPage.selectDate('24-01-2026');
    await searchPage.setTravellers(2, 1);
    await searchPage.clickSearchButton();

    // Verify search results
    await searchPage.verifyTourCardsVisible();
});