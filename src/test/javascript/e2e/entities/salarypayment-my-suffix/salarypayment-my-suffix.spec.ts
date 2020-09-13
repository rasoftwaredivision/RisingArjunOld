/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SalarypaymentComponentsPage from './salarypayment-my-suffix.page-object';
import { SalarypaymentDeleteDialog } from './salarypayment-my-suffix.page-object';
import SalarypaymentUpdatePage from './salarypayment-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Salarypayment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salarypaymentUpdatePage: SalarypaymentUpdatePage;
  let salarypaymentComponentsPage: SalarypaymentComponentsPage;
  let salarypaymentDeleteDialog: SalarypaymentDeleteDialog;

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

  it('should load Salarypayments', async () => {
    await navBarPage.getEntityPage('salarypayment-my-suffix');
    salarypaymentComponentsPage = new SalarypaymentComponentsPage();
    expect(await salarypaymentComponentsPage.getTitle().getText()).to.match(/Salarypayments/);
  });

  it('should load create Salarypayment page', async () => {
    await salarypaymentComponentsPage.clickOnCreateButton();
    salarypaymentUpdatePage = new SalarypaymentUpdatePage();
    expect(await salarypaymentUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.salarypayment.home.createOrEditLabel/);
    await salarypaymentUpdatePage.cancel();
  });

  it('should create and save Salarypayments', async () => {
    async function createSalarypayment() {
      await salarypaymentComponentsPage.clickOnCreateButton();
      await salarypaymentUpdatePage.setSalaryInput('5');
      expect(await salarypaymentUpdatePage.getSalaryInput()).to.eq('5');
      await salarypaymentUpdatePage.monthSelectLastOption();
      await salarypaymentUpdatePage.setPaidInput('5');
      expect(await salarypaymentUpdatePage.getPaidInput()).to.eq('5');
      await salarypaymentUpdatePage.setUnpaidInput('5');
      expect(await salarypaymentUpdatePage.getUnpaidInput()).to.eq('5');
      await salarypaymentUpdatePage.setDateInput('01-01-2001');
      expect(await salarypaymentUpdatePage.getDateInput()).to.eq('2001-01-01');
      await salarypaymentUpdatePage.setTransactionIdInput('transactionId');
      expect(await salarypaymentUpdatePage.getTransactionIdInput()).to.match(/transactionId/);
      await salarypaymentUpdatePage.paymentModeSelectLastOption();
      await salarypaymentUpdatePage.setRemarksInput('remarks');
      expect(await salarypaymentUpdatePage.getRemarksInput()).to.match(/remarks/);
      await salarypaymentUpdatePage.employeeIdSelectLastOption();
      await salarypaymentUpdatePage.sessionSelectLastOption();
      await waitUntilDisplayed(salarypaymentUpdatePage.getSaveButton());
      await salarypaymentUpdatePage.save();
      await waitUntilHidden(salarypaymentUpdatePage.getSaveButton());
      expect(await salarypaymentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSalarypayment();
    await salarypaymentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await salarypaymentComponentsPage.countDeleteButtons();
    await createSalarypayment();

    await salarypaymentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await salarypaymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Salarypayment', async () => {
    await salarypaymentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await salarypaymentComponentsPage.countDeleteButtons();
    await salarypaymentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    salarypaymentDeleteDialog = new SalarypaymentDeleteDialog();
    expect(await salarypaymentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.salarypayment.delete.question/);
    await salarypaymentDeleteDialog.clickOnConfirmButton();

    await salarypaymentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await salarypaymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
