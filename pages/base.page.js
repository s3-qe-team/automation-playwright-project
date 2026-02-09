
class BasePage {
  constructor(page) {
    this.page = page;
    this.mainPage = page; // save original page to switch back  
  }

  //Actions with page
  async openPage(url) {
    await this.page.goto(url);
  }

  getCurrentUrl() {
    return this.page.url();
  }
  async getPageSourceCode() {
    return await this.page.content();
  }

  async goBackPage() {
    await this.page.goBack({ waitUntil: 'load' });
  }

  async forwardToPage() {
    await this.page.goForward({ waitUntil: 'load' });
  }
  async refreshCurrentPage() {
    await this.page.reload({ waitUntil: 'load' });
  }



  //Alert
  async acceptAlert() {
    const dialog = await this.page.waitForEvent('dialog', { timeout: 10000 });
    await dialog.accept();
  }

  async onceAcceptAlert() {
    this.page.once('dialog', dialog => dialog.accept());
  }
  async dismissAlert() {
    const dialog = await this.page.waitForEvent('dialog');
    await dialog.dismiss();
  }
  async enterTextToAlert(text) {
    const dialog = await this.page.waitForEvent('dialog');
    await dialog.accept(text);
  }
  async getAlertMassage() {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    await dialog.accept();
    return message;
  }

  //Element

  async clickToElement(element) {
    await element.click();
  }

  async fillTextToElement(element, text) {
    await element.fill(text);
  }

  async getElementText(element) {
    return await element.textContent();

  }
  async clear(element) {
    await element.fill('');
  }
  async isElementVisible(element) {
    return await element.isVisible();
  }
  //Dropdown
  async selectItemInDropDown(dropDownEl, optionEl) { //default dropdown - select tagname with Option
    await dropDownEl.selectOption(optionEl);
  }
  async selectItemInCustomDropDown(dropDownEl, optionEl) { //custom dropdown 
    await dropDownEl.click();
    await optionEl.click();
  }
  async getSelectedItemInDropDown(dropdownEl) {
    return await dropdownEl.inputValue();
  }
  async isDropdownMultiple(dropDownEl) {
    return await dropDownEl.evaluate(el => el.multiple);
  }
  //Checkbox, radio
  async checkElement(element) {
    await element.check();
  }

  async uncheckElement(element) {
    await element.uncheck();
  }

  //Wait
  async waitForUrl(urlPart) {
    await this.page.waitForURL(`**${urlPart}**`);
  }
  async waitForElementToBeVisible(element, timeout = 30000) {
    await element.waitFor({ state: 'visible', timeout });
  }
  async waitForElementVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }
  async waitForTextVisible(text) {
    await this.page.getByText(text).waitFor({ state: 'visible' });
  }
  async waitForLoadingDisappear(loadingLocator) {
    await loadingLocator.waitFor({ state: 'hidden' });
  }

  async waitForElementHidden(locator) {
    await locator.waitFor({ state: 'hidden' });
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  // Switch to frame
  switchToFrame(frameSelector) {
    return this.page.frameLocator(frameSelector);
  }

  // Switch to original page
  async switchToOriginalTab() {
    this.page = this.mainPage;
    await this.page.bringToFront();
  }

  // Switch to main page
  async switchToMainPage() {
    return this.page.mainFrame();
  }

  // Open new tab
  async openNewTab(url) {
    const newPage = await this.page.context().newPage();
    await newPage.goto(url);
    this.page = newPage;
    return newPage;
  }

  // Close current tab
  async closeCurrentTab() {
    await this.page.close();
    if (this.page !== this.mainPage) {
      this.page = this.mainPage;
    }
  }

  // Scroll to bottom
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  // Scroll element to top
  async scrollElementToTop(element) {
    await element.evaluate(el => {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  // Hover to element
  async hoverToElement(element) {
    await element.hover();
  }

  // Release mouse
  async releaseMouse() {
    await this.page.mouse.up();
  }

  // Click and hold
  async clickAndHold(element) {
    await element.hover();
    await this.page.mouse.down();
  }

  // Double click
  async doubleClick(element) {
    await element.dblclick();
  }

  // Right click
  async rightClick(element) {
    await element.click({ button: 'right' });
  }

  // Drag and drop
  async dragAndDrop(element, target) {
    await element.dragTo(target);
  }

  // Move mouse to element
  async moveToElement(element) {
    await element.hover();
  }

  // Keyboard Actions
  /**
   * @param {string} key - (example: 'Enter', 'Tab', 'Control+A', 'ArrowUp')
   */
  async pressKeyOnElement(element, key) {
    await element.press(key);
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  // Upload file
  async uploadFile(selector, filePath) {
    const fileInput = this.page.locator(selector);
    await fileInput.setInputFiles(filePath);
  }
}

module.exports = BasePage;  
