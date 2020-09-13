import { element, by, ElementFinder } from 'protractor';

export default class UserdetailUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.userdetail.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  mobileNoInput: ElementFinder = element(by.css('input#userdetail-my-suffix-mobileNo'));
  dobInput: ElementFinder = element(by.css('input#userdetail-my-suffix-dob'));
  houseNoInput: ElementFinder = element(by.css('input#userdetail-my-suffix-houseNo'));
  streetInput: ElementFinder = element(by.css('input#userdetail-my-suffix-street'));
  citySelect: ElementFinder = element(by.css('select#userdetail-my-suffix-city'));
  stateSelect: ElementFinder = element(by.css('select#userdetail-my-suffix-state'));
  countrySelect: ElementFinder = element(by.css('select#userdetail-my-suffix-country'));
  pincodeInput: ElementFinder = element(by.css('input#userdetail-my-suffix-pincode'));
  userSelect: ElementFinder = element(by.css('select#userdetail-my-suffix-user'));
  enterpriseSelect: ElementFinder = element(by.css('select#userdetail-my-suffix-enterprise'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMobileNoInput(mobileNo) {
    await this.mobileNoInput.sendKeys(mobileNo);
  }

  async getMobileNoInput() {
    return this.mobileNoInput.getAttribute('value');
  }

  async setDobInput(dob) {
    await this.dobInput.sendKeys(dob);
  }

  async getDobInput() {
    return this.dobInput.getAttribute('value');
  }

  async setHouseNoInput(houseNo) {
    await this.houseNoInput.sendKeys(houseNo);
  }

  async getHouseNoInput() {
    return this.houseNoInput.getAttribute('value');
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

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
