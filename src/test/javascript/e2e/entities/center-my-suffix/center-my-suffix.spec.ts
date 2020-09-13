/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CenterComponentsPage from './center-my-suffix.page-object';
import { CenterDeleteDialog } from './center-my-suffix.page-object';
import CenterUpdatePage from './center-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Center e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let centerUpdatePage: CenterUpdatePage;
  let centerComponentsPage: CenterComponentsPage;
  let centerDeleteDialog: CenterDeleteDialog;

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

  it('should load Centers', async () => {
    await navBarPage.getEntityPage('center-my-suffix');
    centerComponentsPage = new CenterComponentsPage();
    expect(await centerComponentsPage.getTitle().getText()).to.match(/Centers/);
  });

  it('should load create Center page', async () => {
    await centerComponentsPage.clickOnCreateButton();
    centerUpdatePage = new CenterUpdatePage();
    expect(await centerUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.center.home.createOrEditLabel/);
    await centerUpdatePage.cancel();
  });

  it('should create and save Centers', async () => {
    async function createCenter() {
      await centerComponentsPage.clickOnCreateButton();
      await centerUpdatePage.setCenterCodeInput('centerCode');
      expect(await centerUpdatePage.getCenterCodeInput()).to.match(/centerCode/);
      await centerUpdatePage.setCenterTitleInput('centerTitle');
      expect(await centerUpdatePage.getCenterTitleInput()).to.match(/centerTitle/);
      await centerUpdatePage.setStreetInput('street');
      expect(await centerUpdatePage.getStreetInput()).to.match(/street/);
      await centerUpdatePage.citySelectLastOption();
      await centerUpdatePage.stateSelectLastOption();
      await centerUpdatePage.countrySelectLastOption();
      await centerUpdatePage.setPincodeInput('5');
      expect(await centerUpdatePage.getPincodeInput()).to.eq('5');
      await centerUpdatePage.enterpriseSelectLastOption();
      await waitUntilDisplayed(centerUpdatePage.getSaveButton());
      await centerUpdatePage.save();
      await waitUntilHidden(centerUpdatePage.getSaveButton());
      expect(await centerUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCenter();
    await centerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await centerComponentsPage.countDeleteButtons();
    await createCenter();

    await centerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await centerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Center', async () => {
    await centerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await centerComponentsPage.countDeleteButtons();
    await centerComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    centerDeleteDialog = new CenterDeleteDialog();
    expect(await centerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.center.delete.question/);
    await centerDeleteDialog.clickOnConfirmButton();

    await centerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await centerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
