/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentscoreComponentsPage from './studentscore-my-suffix.page-object';
import { StudentscoreDeleteDialog } from './studentscore-my-suffix.page-object';
import StudentscoreUpdatePage from './studentscore-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Studentscore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentscoreUpdatePage: StudentscoreUpdatePage;
  let studentscoreComponentsPage: StudentscoreComponentsPage;
  let studentscoreDeleteDialog: StudentscoreDeleteDialog;

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

  it('should load Studentscores', async () => {
    await navBarPage.getEntityPage('studentscore-my-suffix');
    studentscoreComponentsPage = new StudentscoreComponentsPage();
    expect(await studentscoreComponentsPage.getTitle().getText()).to.match(/Studentscores/);
  });

  it('should load create Studentscore page', async () => {
    await studentscoreComponentsPage.clickOnCreateButton();
    studentscoreUpdatePage = new StudentscoreUpdatePage();
    expect(await studentscoreUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.studentscore.home.createOrEditLabel/);
    await studentscoreUpdatePage.cancel();
  });

  it('should create and save Studentscores', async () => {
    async function createStudentscore() {
      await studentscoreComponentsPage.clickOnCreateButton();
      await studentscoreUpdatePage.setAnswerInput('answer');
      expect(await studentscoreUpdatePage.getAnswerInput()).to.match(/answer/);
      await studentscoreUpdatePage.setScoreInput('5');
      expect(await studentscoreUpdatePage.getScoreInput()).to.eq('5');
      await studentscoreUpdatePage.setDateInput('01-01-2001');
      expect(await studentscoreUpdatePage.getDateInput()).to.eq('2001-01-01');
      await studentscoreUpdatePage.studentSelectLastOption();
      await studentscoreUpdatePage.questionSelectLastOption();
      await waitUntilDisplayed(studentscoreUpdatePage.getSaveButton());
      await studentscoreUpdatePage.save();
      await waitUntilHidden(studentscoreUpdatePage.getSaveButton());
      expect(await studentscoreUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStudentscore();
    await studentscoreComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await studentscoreComponentsPage.countDeleteButtons();
    await createStudentscore();

    await studentscoreComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await studentscoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Studentscore', async () => {
    await studentscoreComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await studentscoreComponentsPage.countDeleteButtons();
    await studentscoreComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    studentscoreDeleteDialog = new StudentscoreDeleteDialog();
    expect(await studentscoreDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.studentscore.delete.question/);
    await studentscoreDeleteDialog.clickOnConfirmButton();

    await studentscoreComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await studentscoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
