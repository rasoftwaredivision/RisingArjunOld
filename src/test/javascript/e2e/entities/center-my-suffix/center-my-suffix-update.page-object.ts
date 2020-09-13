import { element, by, ElementFinder } from 'protractor';

export default class CenterUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.center.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  centerCodeInput: ElementFinder = element(by.css('input#center-my-suffix-centerCode'));
  centerTitleInput: ElementFinder = element(by.css('input#center-my-suffix-centerTitle'));
  streetInput: ElementFinder = element(by.css('input#center-my-suffix-street'));
  citySelect: ElementFinder = element(by.css('select#center-my-suffix-city'));
  stateSelect: ElementFinder = element(by.css('select#center-my-suffix-state'));
  countrySelect: ElementFinder = element(by.css('select#center-my-suffix-country'));
  pincodeInput: ElementFinder = element(by.css('input#center-my-suffix-pincode'));
  enterpriseSelect: ElementFinder = element(by.css('select#center-my-suffix-enterprise'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCenterCodeInput(centerCode) {
    await this.centerCodeInput.sendKeys(centerCode);
  }

  async getCenterCodeInput() {
    return this.centerCodeInput.getAttribute('value');
  }

  async setCenterTitleInput(centerTitle) {
    await this.centerTitleInput.sendKeys(centerTitle);
  }

  async getCenterTitleInput() {
    return this.centerTitleInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setCitySelect(city) {
    await this.citySelect.sendKeys(city);
  }

  async getCitySelect() {
    return this.citySelect.element(by.css('option:checked')).getText();
  }

  async citySelectLastOption() {
    await this.citySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCountrySelect(country) {
    await this.countrySelect.sendKeys(country);
  }

  async getCountrySelect() {
    return this.countrySelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption() {
    await this.countrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setPincodeInput(pincode) {
    await this.pincodeInput.sendKeys(pincode);
  }

  async getPincodeInput() {
    return this.pincodeInput.getAttribute('value');
  }

  async enterpriseSelectLastOption() {
    await this.enterpriseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async enterpriseSelectOption(option) {
    await this.enterpriseSelect.sendKeys(option);
  }

  getEnterpriseSelect() {
    return this.enterpriseSelect;
  }

  async getEnterpriseSelectedOption() {
    return this.enterpriseSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
