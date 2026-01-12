const BasePage = require('./base.page');
const locators = require('../locators/search.locators');
const { expect } = require('@playwright/test');

class SearchToursPage extends BasePage {
  constructor(page) {
    super(page);
  } 

  // Navigate to Tours Search Page
  async selectToursTab() {
    await this.click(locators.toursTab(this.page));
    }

  // Fill in search details
  async searchByCity(city) {
    await this.click(locators.cityContainer(this.page));
    await locators.cityInput(this.page).fill(city);
    await this.click(locators.selectCity(this.page));
  }

  // Select date
  async selectDate(date) {

    // 1. Extract the day (example: Get the day '24' from 24-01-2026')
    const day = date.split('-')[0]; // [0] is 'DD'

    // 2. Open calender
    await this.click(locators.dateContainer(this.page));

    // 3. Click on the specific day
    await this.click(locators.selectDate(this.page, day));

    // 4. Verify the input value matches the expected date
    await expect(locators.dateContainer(this.page)).toHaveValue(date);
  }

  // Input number of Adults and Childs
  async setTravellers(adults, childs) {
    await this.click(locators.travellersDropdown(this.page));
    await locators.adultsInput(this.page).clear();
    await locators.adultsInput(this.page).fill(adults.toString());
    await locators.childsInput(this.page).clear();
    await locators.childsInput(this.page).fill(childs.toString());
  }

  // Click on Search button
  async clickSearchButton() {
    await this.click(locators.searchBtn(this.page));
    await this.page.waitForURL(/.*tours.*/, { timeout: 10000 });
  }

  // Verify that tour result cards are visible
  async verifyTourCardsVisible() {
    const cards = locators.tourCards(this.page);
    await cards.first().waitFor({ state: 'visible', timeout: 15000 });
    const count = await cards.count();
    if (count > 0) {
        console.log(`-> Number of tours available: ${count}`);
    } else {
        console.log("Note: No tours are available for the selected tour");
    }
  }
}

module.exports = { SearchToursPage };