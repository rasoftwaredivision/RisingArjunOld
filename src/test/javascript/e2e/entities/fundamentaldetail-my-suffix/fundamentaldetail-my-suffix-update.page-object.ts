import { element, by, ElementFinder } from 'protractor';

export default class FundamentaldetailUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.fundamentaldetail.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  conceptSelect: ElementFinder = element(by.css('select#fundamentaldetail-my-suffix-concept'));
  detailsInput: ElementFinder = element(by.css('input#fundamentaldetail-my-suffix-details'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setConceptSelect(concept) {
    await this.conceptSelect.sendKeys(concept);
  }

  async getConceptSelect() {
    return this.conceptSelect.element(by.css('option:checked')).getText();
  }

  async conceptSelectLastOption() {
    await this.conceptSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
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
