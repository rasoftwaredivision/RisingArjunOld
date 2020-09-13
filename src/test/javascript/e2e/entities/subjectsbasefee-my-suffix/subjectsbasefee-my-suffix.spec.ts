/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubjectsbasefeeComponentsPage from './subjectsbasefee-my-suffix.page-object';
import { SubjectsbasefeeDeleteDialog } from './subjectsbasefee-my-suffix.page-object';
import SubjectsbasefeeUpdatePage from './subjectsbasefee-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Subjectsbasefee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectsbasefeeUpdatePage: SubjectsbasefeeUpdatePage;
  let subjectsbasefeeComponentsPage: SubjectsbasefeeComponentsPage;
  let subjectsbasefeeDeleteDialog: SubjectsbasefeeDeleteDialog;

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

  it('should load Subjectsbasefees', async () => {
    await navBarPage.getEntityPage('subjectsbasefee-my-suffix');
    subjectsbasefeeComponentsPage = new SubjectsbasefeeComponentsPage();
    expect(await subjectsbasefeeComponentsPage.getTitle().getText()).to.match(/Subjectsbasefees/);
  });

  it('should load create Subjectsbasefee page', async () => {
    await subjectsbasefeeComponentsPage.clickOnCreateButton();
    subjectsbasefeeUpdatePage = new SubjectsbasefeeUpdatePage();
    expect(await subjectsbasefeeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.subjectsbasefee.home.createOrEditLabel/
    );
    await subjectsbasefeeUpdatePage.cancel();
  });

  it('should create and save Subjectsbasefees', async () => {
    async function createSubjectsbasefee() {
      await subjectsbasefeeComponentsPage.clickOnCreateButton();
      await subjectsbasefeeUpdatePage.setBaseFeeInput('5');
      expect(await subjectsbasefeeUpdatePage.getBaseFeeInput()).to.eq('5');
      await subjectsbasefeeUpdatePage.courseSelectLastOption();
      await subjectsbasefeeUpdatePage.enterpriseSelectLastOption();
      await subjectsbasefeeUpdatePage.sessionSelectLastOption();
      await waitUntilDisplayed(subjectsbasefeeUpdatePage.getSaveButton());
      await subjectsbasefeeUpdatePage.save();
      await waitUntilHidden(subjectsbasefeeUpdatePage.getSaveButton());
      expect(await subjectsbasefeeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSubjectsbasefee();
    await subjectsbasefeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await subjectsbasefeeComponentsPage.countDeleteButtons();
    await createSubjectsbasefee();

    await subjectsbasefeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await subjectsbasefeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Subjectsbasefee', async () => {
    await subjectsbasefeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await subjectsbasefeeComponentsPage.countDeleteButtons();
    await subjectsbasefeeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    subjectsbasefeeDeleteDialog = new SubjectsbasefeeDeleteDialog();
    expect(await subjectsbasefeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /risingArjunApp.subjectsbasefee.delete.question/
    );
    await subjectsbasefeeDeleteDialog.clickOnConfirmButton();

    await subjectsbasefeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await subjectsbasefeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
