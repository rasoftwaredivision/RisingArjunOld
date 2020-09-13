import { element, by, ElementFinder } from 'protractor';

export default class StudentsubjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.studentsubject.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  monthSelect: ElementFinder = element(by.css('select#studentsubject-my-suffix-month'));
  registrationnoSelect: ElementFinder = element(by.css('select#studentsubject-my-suffix-registrationno'));
  sessionSelect: ElementFinder = element(by.css('select#studentsubject-my-suffix-session'));
  subjectsSelect: ElementFinder = element(by.css('select#studentsubject-my-suffix-subjects'));
  courseSelect: ElementFinder = element(by.css('select#studentsubject-my-suffix-course'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMonthSelect(month) {
    await this.monthSelect.sendKeys(month);
  }

  async getMonthSelect() {
    return this.monthSelect.element(by.css('option:checked')).getText();
  }

  async monthSelectLastOption() {
    await this.monthSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async registrationnoSelectLastOption() {
    await this.registrationnoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async registrationnoSelectOption(option) {
    await this.registrationnoSelect.sendKeys(option);
  }

  getRegistrationnoSelect() {
    return this.registrationnoSelect;
  }

  async getRegistrationnoSelectedOption() {
    return this.registrationnoSelect.element(by.css('option:checked')).getText();
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

  async subjectsSelectLastOption() {
    await this.subjectsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subjectsSelectOption(option) {
    await this.subjectsSelect.sendKeys(option);
  }

  getSubjectsSelect() {
    return this.subjectsSelect;
  }

  async getSubjectsSelectedOption() {
    return this.subjectsSelect.element(by.css('option:checked')).getText();
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
