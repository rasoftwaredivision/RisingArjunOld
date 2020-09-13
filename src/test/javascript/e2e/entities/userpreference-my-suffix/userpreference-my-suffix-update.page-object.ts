import { element, by, ElementFinder } from 'protractor';

export default class UserpreferenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.userpreference.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  themeInput: ElementFinder = element(by.css('input#userpreference-my-suffix-theme'));
  userSelect: ElementFinder = element(by.css('select#userpreference-my-suffix-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setThemeInput(theme) {
    await this.themeInput.sendKeys(theme);
  }

  async getThemeInput() {
    return this.themeInput.getAttribute('value');
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
