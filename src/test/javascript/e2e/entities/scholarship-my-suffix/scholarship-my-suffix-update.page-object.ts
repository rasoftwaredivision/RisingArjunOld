import { element, by, ElementFinder } from 'protractor';

export default class ScholarshipUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.scholarship.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  minMarksInput: ElementFinder = element(by.css('input#scholarship-my-suffix-minMarks'));
  percentInput: ElementFinder = element(by.css('input#scholarship-my-suffix-percent'));
  enterpriseSelect: ElementFinder = element(by.css('select#scholarship-my-suffix-enterprise'));
  sessionSelect: ElementFinder = element(by.css('select#scholarship-my-suffix-session'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMinMarksInput(minMarks) {
    await this.minMarksInput.sendKeys(minMarks);
  }

  async getMinMarksInput() {
    return this.minMarksInput.getAttribute('value');
  }

  async setPercentInput(percent) {
    await this.percentInput.sendKeys(percent);
  }

  async getPercentInput() {
    return this.percentInput.getAttribute('value');
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
