/**
 * Locators for the Tours Search page
 */

module.exports = {
    // Click on Tours tab
    toursTab: (page) => page.getByRole('tab', { name: 'Tours' }),

    // Search by City 
    cityContainer: (page) => page.getByRole('combobox', { name: 'Search by City' }),
    cityInput: (page) => page.getByRole('searchbox'),
    selectCity: (page) => page.locator('.select2-results__option'),
    
    // Select Date
    dateContainer: (page) => page.locator('#tours-search #date'),
    selectDate: (page, day) => page.locator('.datepicker:visible .datepicker-days td.day', { hasText: day }),

    // Select number of travelers
    travellersDropdown: (page) => page.getByRole('button', { name: 'Travellers 1' }),

    // Add number of adults
    adultsInput: (page) => page.locator('#tours_adults'),

    // Add number of childs
    childsInput: (page) => page.locator('#tours_child'),

    // Search button
    searchBtn: (page) => page.locator('#tours-search button.search_button'),

    // Tour result cards
    tourCards: (page) => page.locator('.card--item'),
};