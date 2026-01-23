
class BasePage {
  constructor(page) {
    this.page = page;
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
    const dialog = await this.page.waitForEvent('dialog');
    await dialog.accept();
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


}

module.exports = BasePage;
