import { element, by, ElementFinder } from 'protractor';

export default class TeacherUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.teacher.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  teacherIdSelect: ElementFinder = element(by.css('select#teacher-my-suffix-teacherId'));
  subjectsSelect: ElementFinder = element(by.css('select#teacher-my-suffix-subjects'));
  coursesSelect: ElementFinder = element(by.css('select#teacher-my-suffix-courses'));

  getPageTitle() {
    return this.pageTitle;
  }

  async teacherIdSelectLastOption() {
    await this.teacherIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teacherIdSelectOption(option) {
    await this.teacherIdSelect.sendKeys(option);
  }

  getTeacherIdSelect() {
    return this.teacherIdSelect;
  }

  async getTeacherIdSelectedOption() {
    return this.teacherIdSelect.element(by.css('option:checked')).getText();
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

  async coursesSelectLastOption() {
    await this.coursesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coursesSelectOption(option) {
    await this.coursesSelect.sendKeys(option);
  }

  getCoursesSelect() {
    return this.coursesSelect;
  }

  async getCoursesSelectedOption() {
    return this.coursesSelect.element(by.css('option:checked')).getText();
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
