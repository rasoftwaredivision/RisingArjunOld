import { element, by, ElementFinder } from 'protractor';

export default class StudentfeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.studentfee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  feeInput: ElementFinder = element(by.css('input#studentfee-my-suffix-fee'));
  feeCorrectionInput: ElementFinder = element(by.css('input#studentfee-my-suffix-feeCorrection'));
  monthSelect: ElementFinder = element(by.css('select#studentfee-my-suffix-month'));
  feeStatusInput: ElementFinder = element(by.css('input#studentfee-my-suffix-feeStatus'));
  remarksInput: ElementFinder = element(by.css('input#studentfee-my-suffix-remarks'));
  registrationnoSelect: ElementFinder = element(by.css('select#studentfee-my-suffix-registrationno'));
  subjectSelect: ElementFinder = element(by.css('select#studentfee-my-suffix-subject'));
  sessionSelect: ElementFinder = element(by.css('select#studentfee-my-suffix-session'));
  teacherSelect: ElementFinder = element(by.css('select#studentfee-my-suffix-teacher'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFeeInput(fee) {
    await this.feeInput.sendKeys(fee);
  }

  async getFeeInput() {
    return this.feeInput.getAttribute('value');
  }

  async setFeeCorrectionInput(feeCorrection) {
    await this.feeCorrectionInput.sendKeys(feeCorrection);
  }

  async getFeeCorrectionInput() {
    return this.feeCorrectionInput.getAttribute('value');
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
  getFeeStatusInput() {
    return this.feeStatusInput;
  }
  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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

  async subjectSelectLastOption() {
    await this.subjectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subjectSelectOption(option) {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect() {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption() {
    return this.subjectSelect.element(by.css('option:checked')).getText();
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

  async teacherSelectLastOption() {
    await this.teacherSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teacherSelectOption(option) {
    await this.teacherSelect.sendKeys(option);
  }

  getTeacherSelect() {
    return this.teacherSelect;
  }

  async getTeacherSelectedOption() {
    return this.teacherSelect.element(by.css('option:checked')).getText();
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
