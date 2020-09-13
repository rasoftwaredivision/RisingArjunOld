import { element, by, ElementFinder } from 'protractor';

export default class StudentscoreUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.studentscore.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  answerInput: ElementFinder = element(by.css('input#studentscore-my-suffix-answer'));
  scoreInput: ElementFinder = element(by.css('input#studentscore-my-suffix-score'));
  dateInput: ElementFinder = element(by.css('input#studentscore-my-suffix-date'));
  studentSelect: ElementFinder = element(by.css('select#studentscore-my-suffix-student'));
  questionSelect: ElementFinder = element(by.css('select#studentscore-my-suffix-question'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnswerInput(answer) {
    await this.answerInput.sendKeys(answer);
  }

  async getAnswerInput() {
    return this.answerInput.getAttribute('value');
  }

  async setScoreInput(score) {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput() {
    return this.scoreInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async studentSelectLastOption() {
    await this.studentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async studentSelectOption(option) {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect() {
    return this.studentSelect;
  }

  async getStudentSelectedOption() {
    return this.studentSelect.element(by.css('option:checked')).getText();
  }

  async questionSelectLastOption() {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option) {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect() {
    return this.questionSelect;
  }

  async getQuestionSelectedOption() {
    return this.questionSelect.element(by.css('option:checked')).getText();
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
