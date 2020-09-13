/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentfeeComponentsPage from './studentfee-my-suffix.page-object';
import { StudentfeeDeleteDialog } from './studentfee-my-suffix.page-object';
import StudentfeeUpdatePage from './studentfee-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Studentfee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentfeeUpdatePage: StudentfeeUpdatePage;
  let studentfeeComponentsPage: StudentfeeComponentsPage;
  let studentfeeDeleteDialog: StudentfeeDeleteDialog;

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

  it('should load Studentfees', async () => {
    await navBarPage.getEntityPage('studentfee-my-suffix');
    studentfeeComponentsPage = new StudentfeeComponentsPage();
    expect(await studentfeeComponentsPage.getTitle().getText()).to.match(/Studentfees/);
  });

  it('should load create Studentfee page', async () => {
    await studentfeeComponentsPage.clickOnCreateButton();
    studentfeeUpdatePage = new StudentfeeUpdatePage();
    expect(await studentfeeUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.studentfee.home.createOrEditLabel/);
    await studentfeeUpdatePage.cancel();
  });

  it('should create and save Studentfees', async () => {
    async function createStudentfee() {
      await studentfeeComponentsPage.clickOnCreateButton();
      await studentfeeUpdatePage.setFeeInput('5');
      expect(await studentfeeUpdatePage.getFeeInput()).to.eq('5');
      await studentfeeUpdatePage.setFeeCorrectionInput('5');
      expect(await studentfeeUpdatePage.getFeeCorrectionInput()).to.eq('5');
      await studentfeeUpdatePage.monthSelectLastOption();
      const selectedFeeStatus = await studentfeeUpdatePage.getFeeStatusInput().isSelected();
      if (selectedFeeStatus) {
        await studentfeeUpdatePage.getFeeStatusInput().click();
        expect(await studentfeeUpdatePage.getFeeStatusInput().isSelected()).to.be.false;
      } else {
        await studentfeeUpdatePage.getFeeStatusInput().click();
        expect(await studentfeeUpdatePage.getFeeStatusInput().isSelected()).to.be.true;
      }
      await studentfeeUpdatePage.setRemarksInput('remarks');
      expect(await studentfeeUpdatePage.getRemarksInput()).to.match(/remarks/);
      await studentfeeUpdatePage.registrationnoSelectLastOption();
      await studentfeeUpdatePage.subjectSelectLastOption();
      await studentfeeUpdatePage.sessionSelectLastOption();
      await studentfeeUpdatePage.teacherSelectLastOption();
      await waitUntilDisplayed(studentfeeUpdatePage.getSaveButton());
      await studentfeeUpdatePage.save();
      await waitUntilHidden(studentfeeUpdatePage.getSaveButton());
      expect(await studentfeeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStudentfee();
    await studentfeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await studentfeeComponentsPage.countDeleteButtons();
    await createStudentfee();

    await studentfeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await studentfeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Studentfee', async () => {
    await studentfeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await studentfeeComponentsPage.countDeleteButtons();
    await studentfeeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    studentfeeDeleteDialog = new StudentfeeDeleteDialog();
    expect(await studentfeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.studentfee.delete.question/);
    await studentfeeDeleteDialog.clickOnConfirmButton();

    await studentfeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await studentfeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
