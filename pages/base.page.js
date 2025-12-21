/**
 * BasePage class containing common functions for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Click on an element
   * @param {string} locator - Element locator
   */
  async click(locator) {
    await this.page.locator(locator).click();
  }

  /**
   * Fill input field
   * @param {string} locator - Element locator
   * @param {string} text - Text to fill
   */
  async fill(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  /**
   * Get text from element
   * @param {string} locator - Element locator
   * @returns {Promise<string>} Element text
   */
  async getText(locator) {
    return await this.page.locator(locator).textContent();
  }

  /**
   * Wait for element to be visible
   * @param {string} locator - Element locator
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForElement(locator, timeout = 30000) {
    await this.page.locator(locator).waitFor({ state: 'visible', timeout });
  }

  /**
   * Check if element is visible
   * @param {string} locator - Element locator
   * @returns {Promise<boolean>} True if visible
   */
  async isVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   * @returns {string} Current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Press keyboard key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Hover over element
   * @param {string} locator - Element locator
   */
  async hover(locator) {
    await this.page.locator(locator).hover();
  }

  /**
   * Select dropdown option by value
   * @param {string} locator - Dropdown locator
   * @param {string} value - Option value
   */
  async selectOption(locator, value) {
    await this.page.locator(locator).selectOption(value);
  }

  /**
   * Check checkbox
   * @param {string} locator - Checkbox locator
   */
  async check(locator) {
    await this.page.locator(locator).check();
  }

  /**
   * Uncheck checkbox
   * @param {string} locator - Checkbox locator
   */
  async uncheck(locator) {
    await this.page.locator(locator).uncheck();
  }
}

module.exports = BasePage;
