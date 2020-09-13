import { element, by, ElementFinder } from 'protractor';

export default class EnterprisesettingsUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.enterprisesettings.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  themeInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-theme'));
  foregroundInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-foreground'));
  backgroundInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-background'));
  disclaimerInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-disclaimer'));
  policyInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-policy'));
  copyrightsInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-copyrights'));
  termsOfUsageInput: ElementFinder = element(by.css('input#enterprisesettings-my-suffix-termsOfUsage'));
  adminSelect: ElementFinder = element(by.css('select#enterprisesettings-my-suffix-admin'));
  enterpriseSelect: ElementFinder = element(by.css('select#enterprisesettings-my-suffix-enterprise'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setThemeInput(theme) {
    await this.themeInput.sendKeys(theme);
  }

  async getThemeInput() {
    return this.themeInput.getAttribute('value');
  }

  async setForegroundInput(foreground) {
    await this.foregroundInput.sendKeys(foreground);
  }

  async getForegroundInput() {
    return this.foregroundInput.getAttribute('value');
  }

  async setBackgroundInput(background) {
    await this.backgroundInput.sendKeys(background);
  }

  async getBackgroundInput() {
    return this.backgroundInput.getAttribute('value');
  }

  async setDisclaimerInput(disclaimer) {
    await this.disclaimerInput.sendKeys(disclaimer);
  }

  async getDisclaimerInput() {
    return this.disclaimerInput.getAttribute('value');
  }

  async setPolicyInput(policy) {
    await this.policyInput.sendKeys(policy);
  }

  async getPolicyInput() {
    return this.policyInput.getAttribute('value');
  }

  async setCopyrightsInput(copyrights) {
    await this.copyrightsInput.sendKeys(copyrights);
  }

  async getCopyrightsInput() {
    return this.copyrightsInput.getAttribute('value');
  }

  async setTermsOfUsageInput(termsOfUsage) {
    await this.termsOfUsageInput.sendKeys(termsOfUsage);
  }

  async getTermsOfUsageInput() {
    return this.termsOfUsageInput.getAttribute('value');
  }

  async adminSelectLastOption() {
    await this.adminSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adminSelectOption(option) {
    await this.adminSelect.sendKeys(option);
  }

  getAdminSelect() {
    return this.adminSelect;
  }

  async getAdminSelectedOption() {
    return this.adminSelect.element(by.css('option:checked')).getText();
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
