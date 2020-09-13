/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TeachershareComponentsPage from './teachershare-my-suffix.page-object';
import { TeachershareDeleteDialog } from './teachershare-my-suffix.page-object';
import TeachershareUpdatePage from './teachershare-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Teachershare e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teachershareUpdatePage: TeachershareUpdatePage;
  let teachershareComponentsPage: TeachershareComponentsPage;
  let teachershareDeleteDialog: TeachershareDeleteDialog;

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

  it('should load Teachershares', async () => {
    await navBarPage.getEntityPage('teachershare-my-suffix');
    teachershareComponentsPage = new TeachershareComponentsPage();
    expect(await teachershareComponentsPage.getTitle().getText()).to.match(/Teachershares/);
  });

  it('should load create Teachershare page', async () => {
    await teachershareComponentsPage.clickOnCreateButton();
    teachershareUpdatePage = new TeachershareUpdatePage();
    expect(await teachershareUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.teachershare.home.createOrEditLabel/);
    await teachershareUpdatePage.cancel();
  });

  it('should create and save Teachershares', async () => {
    async function createTeachershare() {
      await teachershareComponentsPage.clickOnCreateButton();
      await teachershareUpdatePage.setSharePercentInput('5');
      expect(await teachershareUpdatePage.getSharePercentInput()).to.eq('5');
      await teachershareUpdatePage.setPlannedClassesInput('5');
      expect(await teachershareUpdatePage.getPlannedClassesInput()).to.eq('5');
      await teachershareUpdatePage.setActualClassesInput('5');
      expect(await teachershareUpdatePage.getActualClassesInput()).to.eq('5');
      await teachershareUpdatePage.setShareCorrectionInput('5');
      expect(await teachershareUpdatePage.getShareCorrectionInput()).to.eq('5');
      await teachershareUpdatePage.setShareInput('5');
      expect(await teachershareUpdatePage.getShareInput()).to.eq('5');
      await teachershareUpdatePage.monthSelectLastOption();
      await teachershareUpdatePage.setRemarksInput('remarks');
      expect(await teachershareUpdatePage.getRemarksInput()).to.match(/remarks/);
      await teachershareUpdatePage.teacherIdSelectLastOption();
      await teachershareUpdatePage.subjectSelectLastOption();
      await teachershareUpdatePage.sessionSelectLastOption();
      await waitUntilDisplayed(teachershareUpdatePage.getSaveButton());
      await teachershareUpdatePage.save();
      await waitUntilHidden(teachershareUpdatePage.getSaveButton());
      expect(await teachershareUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTeachershare();
    await teachershareComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await teachershareComponentsPage.countDeleteButtons();
    await createTeachershare();

    await teachershareComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await teachershareComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Teachershare', async () => {
    await teachershareComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await teachershareComponentsPage.countDeleteButtons();
    await teachershareComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    teachershareDeleteDialog = new TeachershareDeleteDialog();
    expect(await teachershareDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.teachershare.delete.question/);
    await teachershareDeleteDialog.clickOnConfirmButton();

    await teachershareComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await teachershareComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
