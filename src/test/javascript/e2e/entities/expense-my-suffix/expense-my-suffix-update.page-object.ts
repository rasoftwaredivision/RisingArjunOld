import { element, by, ElementFinder } from 'protractor';

export default class ExpenseUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.expense.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  itemInput: ElementFinder = element(by.css('input#expense-my-suffix-item'));
  quantityInput: ElementFinder = element(by.css('input#expense-my-suffix-quantity'));
  rateInput: ElementFinder = element(by.css('input#expense-my-suffix-rate'));
  laborCostInput: ElementFinder = element(by.css('input#expense-my-suffix-laborCost'));
  otherExpenseInput: ElementFinder = element(by.css('input#expense-my-suffix-otherExpense'));
  totalInput: ElementFinder = element(by.css('input#expense-my-suffix-total'));
  dateInput: ElementFinder = element(by.css('input#expense-my-suffix-date'));
  transactionIdInput: ElementFinder = element(by.css('input#expense-my-suffix-transactionId'));
  expenseModeSelect: ElementFinder = element(by.css('select#expense-my-suffix-expenseMode'));
  typeSelect: ElementFinder = element(by.css('select#expense-my-suffix-type'));
  billInput: ElementFinder = element(by.css('input#file_bill'));
  remarksInput: ElementFinder = element(by.css('input#expense-my-suffix-remarks'));
  enterpriseSelect: ElementFinder = element(by.css('select#expense-my-suffix-enterprise'));
  incurredBySelect: ElementFinder = element(by.css('select#expense-my-suffix-incurredBy'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setItemInput(item) {
    await this.itemInput.sendKeys(item);
  }

  async getItemInput() {
    return this.itemInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setRateInput(rate) {
    await this.rateInput.sendKeys(rate);
  }

  async getRateInput() {
    return this.rateInput.getAttribute('value');
  }

  async setLaborCostInput(laborCost) {
    await this.laborCostInput.sendKeys(laborCost);
  }

  async getLaborCostInput() {
    return this.laborCostInput.getAttribute('value');
  }

  async setOtherExpenseInput(otherExpense) {
    await this.otherExpenseInput.sendKeys(otherExpense);
  }

  async getOtherExpenseInput() {
    return this.otherExpenseInput.getAttribute('value');
  }

  async setTotalInput(total) {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput() {
    return this.totalInput.getAttribute('value');
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

  async setExpenseModeSelect(expenseMode) {
    await this.expenseModeSelect.sendKeys(expenseMode);
  }

  async getExpenseModeSelect() {
    return this.expenseModeSelect.element(by.css('option:checked')).getText();
  }

  async expenseModeSelectLastOption() {
    await this.expenseModeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setBillInput(bill) {
    await this.billInput.sendKeys(bill);
  }

  async getBillInput() {
    return this.billInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async enterpriseSelectLastOption() {
    await this.enterpriseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async enterpriseSelectOption(option) {
    await this.enterpriseSelect.sendKeys(option);
  }

  getEnterpriseSelect() {
    return this.enterpriseSelect;
  }

  async getEnterpriseSelectedOption() {
    return this.enterpriseSelect.element(by.css('option:checked')).getText();
  }

  async incurredBySelectLastOption() {
    await this.incurredBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async incurredBySelectOption(option) {
    await this.incurredBySelect.sendKeys(option);
  }

  getIncurredBySelect() {
    return this.incurredBySelect;
  }

  async getIncurredBySelectedOption() {
    return this.incurredBySelect.element(by.css('option:checked')).getText();
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
