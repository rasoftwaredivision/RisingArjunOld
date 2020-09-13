/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentsubjectComponentsPage from './studentsubject-my-suffix.page-object';
import { StudentsubjectDeleteDialog } from './studentsubject-my-suffix.page-object';
import StudentsubjectUpdatePage from './studentsubject-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Studentsubject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentsubjectUpdatePage: StudentsubjectUpdatePage;
  let studentsubjectComponentsPage: StudentsubjectComponentsPage;
  let studentsubjectDeleteDialog: StudentsubjectDeleteDialog;

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

  it('should load Studentsubjects', async () => {
    await navBarPage.getEntityPage('studentsubject-my-suffix');
    studentsubjectComponentsPage = new StudentsubjectComponentsPage();
    expect(await studentsubjectComponentsPage.getTitle().getText()).to.match(/Studentsubjects/);
  });

  it('should load create Studentsubject page', async () => {
    await studentsubjectComponentsPage.clickOnCreateButton();
    studentsubjectUpdatePage = new StudentsubjectUpdatePage();
    expect(await studentsubjectUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.studentsubject.home.createOrEditLabel/
    );
    await studentsubjectUpdatePage.cancel();
  });

  it('should create and save Studentsubjects', async () => {
    async function createStudentsubject() {
      await studentsubjectComponentsPage.clickOnCreateButton();
      await studentsubjectUpdatePage.monthSelectLastOption();
      await studentsubjectUpdatePage.registrationnoSelectLastOption();
      await studentsubjectUpdatePage.sessionSelectLastOption();
      // studentsubjectUpdatePage.subjectsSelectLastOption();
      // studentsubjectUpdatePage.courseSelectLastOption();
      await waitUntilDisplayed(studentsubjectUpdatePage.getSaveButton());
      await studentsubjectUpdatePage.save();
      await waitUntilHidden(studentsubjectUpdatePage.getSaveButton());
      expect(await studentsubjectUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStudentsubject();
    await studentsubjectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await studentsubjectComponentsPage.countDeleteButtons();
    await createStudentsubject();

    await studentsubjectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await studentsubjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Studentsubject', async () => {
    await studentsubjectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await studentsubjectComponentsPage.countDeleteButtons();
    await studentsubjectComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    studentsubjectDeleteDialog = new StudentsubjectDeleteDialog();
    expect(await studentsubjectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.studentsubject.delete.question/);
    await studentsubjectDeleteDialog.clickOnConfirmButton();

    await studentsubjectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await studentsubjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
