/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ScholarshipComponentsPage from './scholarship-my-suffix.page-object';
import { ScholarshipDeleteDialog } from './scholarship-my-suffix.page-object';
import ScholarshipUpdatePage from './scholarship-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Scholarship e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scholarshipUpdatePage: ScholarshipUpdatePage;
  let scholarshipComponentsPage: ScholarshipComponentsPage;
  let scholarshipDeleteDialog: ScholarshipDeleteDialog;

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

  it('should load Scholarships', async () => {
    await navBarPage.getEntityPage('scholarship-my-suffix');
    scholarshipComponentsPage = new ScholarshipComponentsPage();
    expect(await scholarshipComponentsPage.getTitle().getText()).to.match(/Scholarships/);
  });

  it('should load create Scholarship page', async () => {
    await scholarshipComponentsPage.clickOnCreateButton();
    scholarshipUpdatePage = new ScholarshipUpdatePage();
    expect(await scholarshipUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.scholarship.home.createOrEditLabel/);
    await scholarshipUpdatePage.cancel();
  });

  it('should create and save Scholarships', async () => {
    async function createScholarship() {
      await scholarshipComponentsPage.clickOnCreateButton();
      await scholarshipUpdatePage.setMinMarksInput('5');
      expect(await scholarshipUpdatePage.getMinMarksInput()).to.eq('5');
      await scholarshipUpdatePage.setPercentInput('5');
      expect(await scholarshipUpdatePage.getPercentInput()).to.eq('5');
      await scholarshipUpdatePage.enterpriseSelectLastOption();
      await scholarshipUpdatePage.sessionSelectLastOption();
      await waitUntilDisplayed(scholarshipUpdatePage.getSaveButton());
      await scholarshipUpdatePage.save();
      await waitUntilHidden(scholarshipUpdatePage.getSaveButton());
      expect(await scholarshipUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createScholarship();
    await scholarshipComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await scholarshipComponentsPage.countDeleteButtons();
    await createScholarship();

    await scholarshipComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await scholarshipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Scholarship', async () => {
    await scholarshipComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await scholarshipComponentsPage.countDeleteButtons();
    await scholarshipComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    scholarshipDeleteDialog = new ScholarshipDeleteDialog();
    expect(await scholarshipDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.scholarship.delete.question/);
    await scholarshipDeleteDialog.clickOnConfirmButton();

    await scholarshipComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await scholarshipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
