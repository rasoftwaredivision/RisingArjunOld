/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExpenseComponentsPage from './expense-my-suffix.page-object';
import { ExpenseDeleteDialog } from './expense-my-suffix.page-object';
import ExpenseUpdatePage from './expense-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Expense e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let expenseUpdatePage: ExpenseUpdatePage;
  let expenseComponentsPage: ExpenseComponentsPage;
  let expenseDeleteDialog: ExpenseDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Expenses', async () => {
    await navBarPage.getEntityPage('expense-my-suffix');
    expenseComponentsPage = new ExpenseComponentsPage();
    expect(await expenseComponentsPage.getTitle().getText()).to.match(/Expenses/);
  });

  it('should load create Expense page', async () => {
    await expenseComponentsPage.clickOnCreateButton();
    expenseUpdatePage = new ExpenseUpdatePage();
    expect(await expenseUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.expense.home.createOrEditLabel/);
    await expenseUpdatePage.cancel();
  });

  it('should create and save Expenses', async () => {
    async function createExpense() {
      await expenseComponentsPage.clickOnCreateButton();
      await expenseUpdatePage.setItemInput('item');
      expect(await expenseUpdatePage.getItemInput()).to.match(/item/);
      await expenseUpdatePage.setQuantityInput('5');
      expect(await expenseUpdatePage.getQuantityInput()).to.eq('5');
      await expenseUpdatePage.setRateInput('5');
      expect(await expenseUpdatePage.getRateInput()).to.eq('5');
      await expenseUpdatePage.setLaborCostInput('5');
      expect(await expenseUpdatePage.getLaborCostInput()).to.eq('5');
      await expenseUpdatePage.setOtherExpenseInput('5');
      expect(await expenseUpdatePage.getOtherExpenseInput()).to.eq('5');
      await expenseUpdatePage.setTotalInput('5');
      expect(await expenseUpdatePage.getTotalInput()).to.eq('5');
      await expenseUpdatePage.setDateInput('01-01-2001');
      expect(await expenseUpdatePage.getDateInput()).to.eq('2001-01-01');
      await expenseUpdatePage.setTransactionIdInput('transactionId');
      expect(await expenseUpdatePage.getTransactionIdInput()).to.match(/transactionId/);
      await expenseUpdatePage.expenseModeSelectLastOption();
      await expenseUpdatePage.typeSelectLastOption();
      await expenseUpdatePage.setBillInput(absolutePath);
      await expenseUpdatePage.setRemarksInput('remarks');
      expect(await expenseUpdatePage.getRemarksInput()).to.match(/remarks/);
      await expenseUpdatePage.enterpriseSelectLastOption();
      await expenseUpdatePage.incurredBySelectLastOption();
      await waitUntilDisplayed(expenseUpdatePage.getSaveButton());
      await expenseUpdatePage.save();
      await waitUntilHidden(expenseUpdatePage.getSaveButton());
      expect(await expenseUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createExpense();
    await expenseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await expenseComponentsPage.countDeleteButtons();
    await createExpense();

    await expenseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await expenseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Expense', async () => {
    await expenseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await expenseComponentsPage.countDeleteButtons();
    await expenseComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    expenseDeleteDialog = new ExpenseDeleteDialog();
    expect(await expenseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.expense.delete.question/);
    await expenseDeleteDialog.clickOnConfirmButton();

    await expenseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await expenseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
