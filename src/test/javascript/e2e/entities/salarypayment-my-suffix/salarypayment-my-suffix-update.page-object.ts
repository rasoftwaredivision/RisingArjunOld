import { element, by, ElementFinder } from 'protractor';

export default class SalarypaymentUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.salarypayment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  salaryInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-salary'));
  monthSelect: ElementFinder = element(by.css('select#salarypayment-my-suffix-month'));
  paidInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-paid'));
  unpaidInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-unpaid'));
  dateInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-date'));
  transactionIdInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-transactionId'));
  paymentModeSelect: ElementFinder = element(by.css('select#salarypayment-my-suffix-paymentMode'));
  remarksInput: ElementFinder = element(by.css('input#salarypayment-my-suffix-remarks'));
  employeeIdSelect: ElementFinder = element(by.css('select#salarypayment-my-suffix-employeeId'));
  sessionSelect: ElementFinder = element(by.css('select#salarypayment-my-suffix-session'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return this.salaryInput.getAttribute('value');
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
  async setPaidInput(paid) {
    await this.paidInput.sendKeys(paid);
  }

  async getPaidInput() {
    return this.paidInput.getAttribute('value');
  }

  async setUnpaidInput(unpaid) {
    await this.unpaidInput.sendKeys(unpaid);
  }

  async getUnpaidInput() {
    return this.unpaidInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setTransactionIdInput(transactionId) {
    await this.transactionIdInput.sendKeys(transactionId);
  }

  async getTransactionIdInput() {
    return this.transactionIdInput.getAttribute('value');
  }

  async setPaymentModeSelect(paymentMode) {
    await this.paymentModeSelect.sendKeys(paymentMode);
  }

  async getPaymentModeSelect() {
    return this.paymentModeSelect.element(by.css('option:checked')).getText();
  }

  async paymentModeSelectLastOption() {
    await this.paymentModeSelect
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

  async employeeIdSelectLastOption() {
    await this.employeeIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeIdSelectOption(option) {
    await this.employeeIdSelect.sendKeys(option);
  }

  getEmployeeIdSelect() {
    return this.employeeIdSelect;
  }

  async getEmployeeIdSelectedOption() {
    return this.employeeIdSelect.element(by.css('option:checked')).getText();
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
