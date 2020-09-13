/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentComponentsPage from './student-my-suffix.page-object';
import { StudentDeleteDialog } from './student-my-suffix.page-object';
import StudentUpdatePage from './student-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Student e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentUpdatePage: StudentUpdatePage;
  let studentComponentsPage: StudentComponentsPage;
  let studentDeleteDialog: StudentDeleteDialog;
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

  it('should load Students', async () => {
    await navBarPage.getEntityPage('student-my-suffix');
    studentComponentsPage = new StudentComponentsPage();
    expect(await studentComponentsPage.getTitle().getText()).to.match(/Students/);
  });

  it('should load create Student page', async () => {
    await studentComponentsPage.clickOnCreateButton();
    studentUpdatePage = new StudentUpdatePage();
    expect(await studentUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.student.home.createOrEditLabel/);
    await studentUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    async function createStudent() {
      await studentComponentsPage.clickOnCreateButton();
      await studentUpdatePage.setStudentRegIdInput('studentRegId');
      expect(await studentUpdatePage.getStudentRegIdInput()).to.match(/studentRegId/);
      await studentUpdatePage.setRegistrationFormInput(absolutePath);
      await studentUpdatePage.setParentMobNo1Input('parentMobNo1');
      expect(await studentUpdatePage.getParentMobNo1Input()).to.match(/parentMobNo1/);
      await studentUpdatePage.setParentMobNo2Input('parentMobNo2');
      expect(await studentUpdatePage.getParentMobNo2Input()).to.match(/parentMobNo2/);
      await studentUpdatePage.setParentEmailIdInput('parentEmailId');
      expect(await studentUpdatePage.getParentEmailIdInput()).to.match(/parentEmailId/);
      await studentUpdatePage.studentStatusSelectLastOption();
      await studentUpdatePage.leavingReasonSelectLastOption();
      await studentUpdatePage.infoSourceSelectLastOption();
      await studentUpdatePage.userSelectLastOption();
      // studentUpdatePage.courseSelectLastOption();
      await waitUntilDisplayed(studentUpdatePage.getSaveButton());
      await studentUpdatePage.save();
      await waitUntilHidden(studentUpdatePage.getSaveButton());
      expect(await studentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStudent();
    await studentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await studentComponentsPage.countDeleteButtons();
    await createStudent();

    await studentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Student', async () => {
    await studentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await studentComponentsPage.countDeleteButtons();
    await studentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    studentDeleteDialog = new StudentDeleteDialog();
    expect(await studentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.student.delete.question/);
    await studentDeleteDialog.clickOnConfirmButton();

    await studentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
