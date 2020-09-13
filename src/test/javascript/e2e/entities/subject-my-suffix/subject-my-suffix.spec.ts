/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubjectComponentsPage from './subject-my-suffix.page-object';
import { SubjectDeleteDialog } from './subject-my-suffix.page-object';
import SubjectUpdatePage from './subject-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Subject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectUpdatePage: SubjectUpdatePage;
  let subjectComponentsPage: SubjectComponentsPage;
  let subjectDeleteDialog: SubjectDeleteDialog;

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

  it('should load Subjects', async () => {
    await navBarPage.getEntityPage('subject-my-suffix');
    subjectComponentsPage = new SubjectComponentsPage();
    expect(await subjectComponentsPage.getTitle().getText()).to.match(/Subjects/);
  });

  it('should load create Subject page', async () => {
    await subjectComponentsPage.clickOnCreateButton();
    subjectUpdatePage = new SubjectUpdatePage();
    expect(await subjectUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.subject.home.createOrEditLabel/);
    await subjectUpdatePage.cancel();
  });

  it('should create and save Subjects', async () => {
    async function createSubject() {
      await subjectComponentsPage.clickOnCreateButton();
      await subjectUpdatePage.setSubjectCodeInput('subjectCode');
      expect(await subjectUpdatePage.getSubjectCodeInput()).to.match(/subjectCode/);
      await subjectUpdatePage.setSubjectTitleInput('subjectTitle');
      expect(await subjectUpdatePage.getSubjectTitleInput()).to.match(/subjectTitle/);
      await waitUntilDisplayed(subjectUpdatePage.getSaveButton());
      await subjectUpdatePage.save();
      await waitUntilHidden(subjectUpdatePage.getSaveButton());
      expect(await subjectUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSubject();
    await subjectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await subjectComponentsPage.countDeleteButtons();
    await createSubject();

    await subjectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Subject', async () => {
    await subjectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await subjectComponentsPage.countDeleteButtons();
    await subjectComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    subjectDeleteDialog = new SubjectDeleteDialog();
    expect(await subjectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.subject.delete.question/);
    await subjectDeleteDialog.clickOnConfirmButton();

    await subjectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
