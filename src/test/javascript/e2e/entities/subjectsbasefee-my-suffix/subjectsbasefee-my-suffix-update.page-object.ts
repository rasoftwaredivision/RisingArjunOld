import { element, by, ElementFinder } from 'protractor';

export default class SubjectsbasefeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.subjectsbasefee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  baseFeeInput: ElementFinder = element(by.css('input#subjectsbasefee-my-suffix-baseFee'));
  courseSelect: ElementFinder = element(by.css('select#subjectsbasefee-my-suffix-course'));
  enterpriseSelect: ElementFinder = element(by.css('select#subjectsbasefee-my-suffix-enterprise'));
  sessionSelect: ElementFinder = element(by.css('select#subjectsbasefee-my-suffix-session'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBaseFeeInput(baseFee) {
    await this.baseFeeInput.sendKeys(baseFee);
  }

  async getBaseFeeInput() {
    return this.baseFeeInput.getAttribute('value');
  }

  async courseSelectLastOption() {
    await this.courseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectOption(option) {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect() {
    return this.courseSelect;
  }

  async getCourseSelectedOption() {
    return this.courseSelect.element(by.css('option:checked')).getText();
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

  async sessionSelectLastOption() {
    await this.sessionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sessionSelectOption(option) {
    await this.sessionSelect.sendKeys(option);
  }

  getSessionSelect() {
    return this.sessionSelect;
  }

  async getSessionSelectedOption() {
    return this.sessionSelect.element(by.css('option:checked')).getText();
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
