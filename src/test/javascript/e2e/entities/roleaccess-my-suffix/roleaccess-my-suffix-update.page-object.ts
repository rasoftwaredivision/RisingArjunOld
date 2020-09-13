import { element, by, ElementFinder } from 'protractor';

export default class RoleaccessUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.roleaccess.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createInput: ElementFinder = element(by.css('input#roleaccess-my-suffix-create'));
  readInput: ElementFinder = element(by.css('input#roleaccess-my-suffix-read'));
  updateInput: ElementFinder = element(by.css('input#roleaccess-my-suffix-update'));
  delInput: ElementFinder = element(by.css('input#roleaccess-my-suffix-del'));
  roleSelect: ElementFinder = element(by.css('select#roleaccess-my-suffix-role'));
  featureSelect: ElementFinder = element(by.css('select#roleaccess-my-suffix-feature'));

  getPageTitle() {
    return this.pageTitle;
  }

  getCreateInput() {
    return this.createInput;
  }
  getReadInput() {
    return this.readInput;
  }
  getUpdateInput() {
    return this.updateInput;
  }
  getDelInput() {
    return this.delInput;
  }
  async roleSelectLastOption() {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async roleSelectOption(option) {
    await this.roleSelect.sendKeys(option);
  }

  getRoleSelect() {
    return this.roleSelect;
  }

  async getRoleSelectedOption() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async featureSelectLastOption() {
    await this.featureSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async featureSelectOption(option) {
    await this.featureSelect.sendKeys(option);
  }

  getFeatureSelect() {
    return this.featureSelect;
  }

  async getFeatureSelectedOption() {
    return this.featureSelect.element(by.css('option:checked')).getText();
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
