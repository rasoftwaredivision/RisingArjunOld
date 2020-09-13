import { element, by, ElementFinder } from 'protractor';

export default class StudentUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.student.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  studentRegIdInput: ElementFinder = element(by.css('input#student-my-suffix-studentRegId'));
  registrationFormInput: ElementFinder = element(by.css('input#file_registrationForm'));
  parentMobNo1Input: ElementFinder = element(by.css('input#student-my-suffix-parentMobNo1'));
  parentMobNo2Input: ElementFinder = element(by.css('input#student-my-suffix-parentMobNo2'));
  parentEmailIdInput: ElementFinder = element(by.css('input#student-my-suffix-parentEmailId'));
  studentStatusSelect: ElementFinder = element(by.css('select#student-my-suffix-studentStatus'));
  leavingReasonSelect: ElementFinder = element(by.css('select#student-my-suffix-leavingReason'));
  infoSourceSelect: ElementFinder = element(by.css('select#student-my-suffix-infoSource'));
  userSelect: ElementFinder = element(by.css('select#student-my-suffix-user'));
  courseSelect: ElementFinder = element(by.css('select#student-my-suffix-course'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStudentRegIdInput(studentRegId) {
    await this.studentRegIdInput.sendKeys(studentRegId);
  }

  async getStudentRegIdInput() {
    return this.studentRegIdInput.getAttribute('value');
  }

  async setRegistrationFormInput(registrationForm) {
    await this.registrationFormInput.sendKeys(registrationForm);
  }

  async getRegistrationFormInput() {
    return this.registrationFormInput.getAttribute('value');
  }

  async setParentMobNo1Input(parentMobNo1) {
    await this.parentMobNo1Input.sendKeys(parentMobNo1);
  }

  async getParentMobNo1Input() {
    return this.parentMobNo1Input.getAttribute('value');
  }

  async setParentMobNo2Input(parentMobNo2) {
    await this.parentMobNo2Input.sendKeys(parentMobNo2);
  }

  async getParentMobNo2Input() {
    return this.parentMobNo2Input.getAttribute('value');
  }

  async setParentEmailIdInput(parentEmailId) {
    await this.parentEmailIdInput.sendKeys(parentEmailId);
  }

  async getParentEmailIdInput() {
    return this.parentEmailIdInput.getAttribute('value');
  }

  async setStudentStatusSelect(studentStatus) {
    await this.studentStatusSelect.sendKeys(studentStatus);
  }

  async getStudentStatusSelect() {
    return this.studentStatusSelect.element(by.css('option:checked')).getText();
  }

  async studentStatusSelectLastOption() {
    await this.studentStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setLeavingReasonSelect(leavingReason) {
    await this.leavingReasonSelect.sendKeys(leavingReason);
  }

  async getLeavingReasonSelect() {
    return this.leavingReasonSelect.element(by.css('option:checked')).getText();
  }

  async leavingReasonSelectLastOption() {
    await this.leavingReasonSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setInfoSourceSelect(infoSource) {
    await this.infoSourceSelect.sendKeys(infoSource);
  }

  async getInfoSourceSelect() {
    return this.infoSourceSelect.element(by.css('option:checked')).getText();
  }

  async infoSourceSelectLastOption() {
    await this.infoSourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
