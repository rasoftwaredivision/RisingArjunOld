import { element, by, ElementFinder } from 'protractor';

export default class TeachershareUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.teachershare.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  sharePercentInput: ElementFinder = element(by.css('input#teachershare-my-suffix-sharePercent'));
  plannedClassesInput: ElementFinder = element(by.css('input#teachershare-my-suffix-plannedClasses'));
  actualClassesInput: ElementFinder = element(by.css('input#teachershare-my-suffix-actualClasses'));
  shareCorrectionInput: ElementFinder = element(by.css('input#teachershare-my-suffix-shareCorrection'));
  shareInput: ElementFinder = element(by.css('input#teachershare-my-suffix-share'));
  monthSelect: ElementFinder = element(by.css('select#teachershare-my-suffix-month'));
  remarksInput: ElementFinder = element(by.css('input#teachershare-my-suffix-remarks'));
  teacherIdSelect: ElementFinder = element(by.css('select#teachershare-my-suffix-teacherId'));
  subjectSelect: ElementFinder = element(by.css('select#teachershare-my-suffix-subject'));
  sessionSelect: ElementFinder = element(by.css('select#teachershare-my-suffix-session'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSharePercentInput(sharePercent) {
    await this.sharePercentInput.sendKeys(sharePercent);
  }

  async getSharePercentInput() {
    return this.sharePercentInput.getAttribute('value');
  }

  async setPlannedClassesInput(plannedClasses) {
    await this.plannedClassesInput.sendKeys(plannedClasses);
  }

  async getPlannedClassesInput() {
    return this.plannedClassesInput.getAttribute('value');
  }

  async setActualClassesInput(actualClasses) {
    await this.actualClassesInput.sendKeys(actualClasses);
  }

  async getActualClassesInput() {
    return this.actualClassesInput.getAttribute('value');
  }

  async setShareCorrectionInput(shareCorrection) {
    await this.shareCorrectionInput.sendKeys(shareCorrection);
  }

  async getShareCorrectionInput() {
    return this.shareCorrectionInput.getAttribute('value');
  }

  async setShareInput(share) {
    await this.shareInput.sendKeys(share);
  }

  async getShareInput() {
    return this.shareInput.getAttribute('value');
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
  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
