/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JhiauthorityComponentsPage from './jhiauthority-my-suffix.page-object';
import { JhiauthorityDeleteDialog } from './jhiauthority-my-suffix.page-object';
import JhiauthorityUpdatePage from './jhiauthority-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Jhiauthority e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jhiauthorityUpdatePage: JhiauthorityUpdatePage;
  let jhiauthorityComponentsPage: JhiauthorityComponentsPage;
  let jhiauthorityDeleteDialog: JhiauthorityDeleteDialog;

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

  it('should load Jhiauthorities', async () => {
    await navBarPage.getEntityPage('jhiauthority-my-suffix');
    jhiauthorityComponentsPage = new JhiauthorityComponentsPage();
    expect(await jhiauthorityComponentsPage.getTitle().getText()).to.match(/Jhiauthorities/);
  });

  it('should load create Jhiauthority page', async () => {
    await jhiauthorityComponentsPage.clickOnCreateButton();
    jhiauthorityUpdatePage = new JhiauthorityUpdatePage();
    expect(await jhiauthorityUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.jhiauthority.home.createOrEditLabel/);
    await jhiauthorityUpdatePage.cancel();
  });

  it('should create and save Jhiauthorities', async () => {
    async function createJhiauthority() {
      await jhiauthorityComponentsPage.clickOnCreateButton();
      await jhiauthorityUpdatePage.setNameInput('name');
      expect(await jhiauthorityUpdatePage.getNameInput()).to.match(/name/);
      await waitUntilDisplayed(jhiauthorityUpdatePage.getSaveButton());
      await jhiauthorityUpdatePage.save();
      await waitUntilHidden(jhiauthorityUpdatePage.getSaveButton());
      expect(await jhiauthorityUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createJhiauthority();
    await jhiauthorityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await jhiauthorityComponentsPage.countDeleteButtons();
    await createJhiauthority();

    await jhiauthorityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await jhiauthorityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Jhiauthority', async () => {
    await jhiauthorityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await jhiauthorityComponentsPage.countDeleteButtons();
    await jhiauthorityComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    jhiauthorityDeleteDialog = new JhiauthorityDeleteDialog();
    expect(await jhiauthorityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.jhiauthority.delete.question/);
    await jhiauthorityDeleteDialog.clickOnConfirmButton();

    await jhiauthorityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await jhiauthorityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
