/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserdetailComponentsPage from './userdetail-my-suffix.page-object';
import { UserdetailDeleteDialog } from './userdetail-my-suffix.page-object';
import UserdetailUpdatePage from './userdetail-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Userdetail e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userdetailUpdatePage: UserdetailUpdatePage;
  let userdetailComponentsPage: UserdetailComponentsPage;
  let userdetailDeleteDialog: UserdetailDeleteDialog;

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

  it('should load Userdetails', async () => {
    await navBarPage.getEntityPage('userdetail-my-suffix');
    userdetailComponentsPage = new UserdetailComponentsPage();
    expect(await userdetailComponentsPage.getTitle().getText()).to.match(/Userdetails/);
  });

  it('should load create Userdetail page', async () => {
    await userdetailComponentsPage.clickOnCreateButton();
    userdetailUpdatePage = new UserdetailUpdatePage();
    expect(await userdetailUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.userdetail.home.createOrEditLabel/);
    await userdetailUpdatePage.cancel();
  });

  it('should create and save Userdetails', async () => {
    async function createUserdetail() {
      await userdetailComponentsPage.clickOnCreateButton();
      await userdetailUpdatePage.setMobileNoInput('mobileNo');
      expect(await userdetailUpdatePage.getMobileNoInput()).to.match(/mobileNo/);
      await userdetailUpdatePage.setDobInput('01-01-2001');
      expect(await userdetailUpdatePage.getDobInput()).to.eq('2001-01-01');
      await userdetailUpdatePage.setHouseNoInput('houseNo');
      expect(await userdetailUpdatePage.getHouseNoInput()).to.match(/houseNo/);
      await userdetailUpdatePage.setStreetInput('street');
      expect(await userdetailUpdatePage.getStreetInput()).to.match(/street/);
      await userdetailUpdatePage.citySelectLastOption();
      await userdetailUpdatePage.stateSelectLastOption();
      await userdetailUpdatePage.countrySelectLastOption();
      await userdetailUpdatePage.setPincodeInput('5');
      expect(await userdetailUpdatePage.getPincodeInput()).to.eq('5');
      await userdetailUpdatePage.userSelectLastOption();
      await userdetailUpdatePage.enterpriseSelectLastOption();
      await waitUntilDisplayed(userdetailUpdatePage.getSaveButton());
      await userdetailUpdatePage.save();
      await waitUntilHidden(userdetailUpdatePage.getSaveButton());
      expect(await userdetailUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserdetail();
    await userdetailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userdetailComponentsPage.countDeleteButtons();
    await createUserdetail();

    await userdetailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userdetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Userdetail', async () => {
    await userdetailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userdetailComponentsPage.countDeleteButtons();
    await userdetailComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userdetailDeleteDialog = new UserdetailDeleteDialog();
    expect(await userdetailDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.userdetail.delete.question/);
    await userdetailDeleteDialog.clickOnConfirmButton();

    await userdetailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userdetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
