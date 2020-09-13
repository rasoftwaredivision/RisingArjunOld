import { element, by, ElementFinder } from 'protractor';

export default class CenterheadUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.centerhead.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  centerheadSelect: ElementFinder = element(by.css('select#centerhead-my-suffix-centerhead'));
  centerSelect: ElementFinder = element(by.css('select#centerhead-my-suffix-center'));

  getPageTitle() {
    return this.pageTitle;
  }

  async centerheadSelectLastOption() {
    await this.centerheadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async centerheadSelectOption(option) {
    await this.centerheadSelect.sendKeys(option);
  }

  getCenterheadSelect() {
    return this.centerheadSelect;
  }

  async getCenterheadSelectedOption() {
    return this.centerheadSelect.element(by.css('option:checked')).getText();
  }

  async centerSelectLastOption() {
    await this.centerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async centerSelectOption(option) {
    await this.centerSelect.sendKeys(option);
  }

  getCenterSelect() {
    return this.centerSelect;
  }

  async getCenterSelectedOption() {
    return this.centerSelect.element(by.css('option:checked')).getText();
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
