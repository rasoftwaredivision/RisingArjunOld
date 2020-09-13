import { element, by, ElementFinder } from 'protractor';

export default class EnterpriseUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.enterprise.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  abbrevationInput: ElementFinder = element(by.css('input#enterprise-my-suffix-abbrevation'));
  enterprisenameInput: ElementFinder = element(by.css('input#enterprise-my-suffix-enterprisename'));
  natureofbusinessSelect: ElementFinder = element(by.css('select#enterprise-my-suffix-natureofbusiness'));
  logoInput: ElementFinder = element(by.css('input#file_logo'));
  punchlineInput: ElementFinder = element(by.css('input#enterprise-my-suffix-punchline'));
  missionInput: ElementFinder = element(by.css('input#enterprise-my-suffix-mission'));
  visionInput: ElementFinder = element(by.css('input#enterprise-my-suffix-vision'));
  principlesInput: ElementFinder = element(by.css('input#enterprise-my-suffix-principles'));
  emailInput: ElementFinder = element(by.css('input#enterprise-my-suffix-email'));
  mobileInput: ElementFinder = element(by.css('input#enterprise-my-suffix-mobile'));
  landlineInput: ElementFinder = element(by.css('input#enterprise-my-suffix-landline'));
  faxInput: ElementFinder = element(by.css('input#enterprise-my-suffix-fax'));
  plotNoInput: ElementFinder = element(by.css('input#enterprise-my-suffix-plotNo'));
  streetInput: ElementFinder = element(by.css('input#enterprise-my-suffix-street'));
  citySelect: ElementFinder = element(by.css('select#enterprise-my-suffix-city'));
  stateSelect: ElementFinder = element(by.css('select#enterprise-my-suffix-state'));
  countrySelect: ElementFinder = element(by.css('select#enterprise-my-suffix-country'));
  pincodeInput: ElementFinder = element(by.css('input#enterprise-my-suffix-pincode'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAbbrevationInput(abbrevation) {
    await this.abbrevationInput.sendKeys(abbrevation);
  }

  async getAbbrevationInput() {
    return this.abbrevationInput.getAttribute('value');
  }

  async setEnterprisenameInput(enterprisename) {
    await this.enterprisenameInput.sendKeys(enterprisename);
  }

  async getEnterprisenameInput() {
    return this.enterprisenameInput.getAttribute('value');
  }

  async setNatureofbusinessSelect(natureofbusiness) {
    await this.natureofbusinessSelect.sendKeys(natureofbusiness);
  }

  async getNatureofbusinessSelect() {
    return this.natureofbusinessSelect.element(by.css('option:checked')).getText();
  }

  async natureofbusinessSelectLastOption() {
    await this.natureofbusinessSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setLogoInput(logo) {
    await this.logoInput.sendKeys(logo);
  }

  async getLogoInput() {
    return this.logoInput.getAttribute('value');
  }

  async setPunchlineInput(punchline) {
    await this.punchlineInput.sendKeys(punchline);
  }

  async getPunchlineInput() {
    return this.punchlineInput.getAttribute('value');
  }

  async setMissionInput(mission) {
    await this.missionInput.sendKeys(mission);
  }

  async getMissionInput() {
    return this.missionInput.getAttribute('value');
  }

  async setVisionInput(vision) {
    await this.visionInput.sendKeys(vision);
  }

  async getVisionInput() {
    return this.visionInput.getAttribute('value');
  }

  async setPrinciplesInput(principles) {
    await this.principlesInput.sendKeys(principles);
  }

  async getPrinciplesInput() {
    return this.principlesInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setMobileInput(mobile) {
    await this.mobileInput.sendKeys(mobile);
  }

  async getMobileInput() {
    return this.mobileInput.getAttribute('value');
  }

  async setLandlineInput(landline) {
    await this.landlineInput.sendKeys(landline);
  }

  async getLandlineInput() {
    return this.landlineInput.getAttribute('value');
  }

  async setFaxInput(fax) {
    await this.faxInput.sendKeys(fax);
  }

  async getFaxInput() {
    return this.faxInput.getAttribute('value');
  }

  async setPlotNoInput(plotNo) {
    await this.plotNoInput.sendKeys(plotNo);
  }

  async getPlotNoInput() {
    return this.plotNoInput.getAttribute('value');
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
