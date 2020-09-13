/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TeacherComponentsPage from './teacher-my-suffix.page-object';
import { TeacherDeleteDialog } from './teacher-my-suffix.page-object';
import TeacherUpdatePage from './teacher-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Teacher e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teacherUpdatePage: TeacherUpdatePage;
  let teacherComponentsPage: TeacherComponentsPage;
  let teacherDeleteDialog: TeacherDeleteDialog;

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

  it('should load Teachers', async () => {
    await navBarPage.getEntityPage('teacher-my-suffix');
    teacherComponentsPage = new TeacherComponentsPage();
    expect(await teacherComponentsPage.getTitle().getText()).to.match(/Teachers/);
  });

  it('should load create Teacher page', async () => {
    await teacherComponentsPage.clickOnCreateButton();
    teacherUpdatePage = new TeacherUpdatePage();
    expect(await teacherUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.teacher.home.createOrEditLabel/);
    await teacherUpdatePage.cancel();
  });

  it('should create and save Teachers', async () => {
    async function createTeacher() {
      await teacherComponentsPage.clickOnCreateButton();
      await teacherUpdatePage.teacherIdSelectLastOption();
      // teacherUpdatePage.subjectsSelectLastOption();
      // teacherUpdatePage.coursesSelectLastOption();
      await waitUntilDisplayed(teacherUpdatePage.getSaveButton());
      await teacherUpdatePage.save();
      await waitUntilHidden(teacherUpdatePage.getSaveButton());
      expect(await teacherUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTeacher();
    await teacherComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await teacherComponentsPage.countDeleteButtons();
    await createTeacher();

    await teacherComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Teacher', async () => {
    await teacherComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await teacherComponentsPage.countDeleteButtons();
    await teacherComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    teacherDeleteDialog = new TeacherDeleteDialog();
    expect(await teacherDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.teacher.delete.question/);
    await teacherDeleteDialog.clickOnConfirmButton();

    await teacherComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
