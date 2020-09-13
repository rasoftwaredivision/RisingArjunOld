import { element, by, ElementFinder } from 'protractor';

export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.employee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  employeeIdInput: ElementFinder = element(by.css('input#employee-my-suffix-employeeId'));
  jobNatureSelect: ElementFinder = element(by.css('select#employee-my-suffix-jobNature'));
  bgcInput: ElementFinder = element(by.css('input#employee-my-suffix-bgc'));
  resumeInput: ElementFinder = element(by.css('input#file_resume'));
  panInput: ElementFinder = element(by.css('input#employee-my-suffix-pan'));
  accountNoInput: ElementFinder = element(by.css('input#employee-my-suffix-accountNo'));
  bankInput: ElementFinder = element(by.css('input#employee-my-suffix-bank'));
  ifscInput: ElementFinder = element(by.css('input#employee-my-suffix-ifsc'));
  userSelect: ElementFinder = element(by.css('select#employee-my-suffix-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmployeeIdInput(employeeId) {
    await this.employeeIdInput.sendKeys(employeeId);
  }

  async getEmployeeIdInput() {
    return this.employeeIdInput.getAttribute('value');
  }

  async setJobNatureSelect(jobNature) {
    await this.jobNatureSelect.sendKeys(jobNature);
  }

  async getJobNatureSelect() {
    return this.jobNatureSelect.element(by.css('option:checked')).getText();
  }

  async jobNatureSelectLastOption() {
    await this.jobNatureSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getBgcInput() {
    return this.bgcInput;
  }
  async setResumeInput(resume) {
    await this.resumeInput.sendKeys(resume);
  }

  async getResumeInput() {
    return this.resumeInput.getAttribute('value');
  }

  async setPanInput(pan) {
    await this.panInput.sendKeys(pan);
  }

  async getPanInput() {
    return this.panInput.getAttribute('value');
  }

  async setAccountNoInput(accountNo) {
    await this.accountNoInput.sendKeys(accountNo);
  }

  async getAccountNoInput() {
    return this.accountNoInput.getAttribute('value');
  }

  async setBankInput(bank) {
    await this.bankInput.sendKeys(bank);
  }

  async getBankInput() {
    return this.bankInput.getAttribute('value');
  }

  async setIfscInput(ifsc) {
    await this.ifscInput.sendKeys(ifsc);
  }

  async getIfscInput() {
    return this.ifscInput.getAttribute('value');
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
