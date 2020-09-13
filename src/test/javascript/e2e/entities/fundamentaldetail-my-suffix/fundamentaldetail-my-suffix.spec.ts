/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FundamentaldetailComponentsPage from './fundamentaldetail-my-suffix.page-object';
import { FundamentaldetailDeleteDialog } from './fundamentaldetail-my-suffix.page-object';
import FundamentaldetailUpdatePage from './fundamentaldetail-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Fundamentaldetail e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fundamentaldetailUpdatePage: FundamentaldetailUpdatePage;
  let fundamentaldetailComponentsPage: FundamentaldetailComponentsPage;
  let fundamentaldetailDeleteDialog: FundamentaldetailDeleteDialog;

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

  it('should load Fundamentaldetails', async () => {
    await navBarPage.getEntityPage('fundamentaldetail-my-suffix');
    fundamentaldetailComponentsPage = new FundamentaldetailComponentsPage();
    expect(await fundamentaldetailComponentsPage.getTitle().getText()).to.match(/Fundamentaldetails/);
  });

  it('should load create Fundamentaldetail page', async () => {
    await fundamentaldetailComponentsPage.clickOnCreateButton();
    fundamentaldetailUpdatePage = new FundamentaldetailUpdatePage();
    expect(await fundamentaldetailUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.fundamentaldetail.home.createOrEditLabel/
    );
    await fundamentaldetailUpdatePage.cancel();
  });

  it('should create and save Fundamentaldetails', async () => {
    async function createFundamentaldetail() {
      await fundamentaldetailComponentsPage.clickOnCreateButton();
      await fundamentaldetailUpdatePage.conceptSelectLastOption();
      await fundamentaldetailUpdatePage.setDetailsInput('details');
      expect(await fundamentaldetailUpdatePage.getDetailsInput()).to.match(/details/);
      await waitUntilDisplayed(fundamentaldetailUpdatePage.getSaveButton());
      await fundamentaldetailUpdatePage.save();
      await waitUntilHidden(fundamentaldetailUpdatePage.getSaveButton());
      expect(await fundamentaldetailUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFundamentaldetail();
    await fundamentaldetailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await fundamentaldetailComponentsPage.countDeleteButtons();
    await createFundamentaldetail();

    await fundamentaldetailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await fundamentaldetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Fundamentaldetail', async () => {
    await fundamentaldetailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await fundamentaldetailComponentsPage.countDeleteButtons();
    await fundamentaldetailComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    fundamentaldetailDeleteDialog = new FundamentaldetailDeleteDialog();
    expect(await fundamentaldetailDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /risingArjunApp.fundamentaldetail.delete.question/
    );
    await fundamentaldetailDeleteDialog.clickOnConfirmButton();

    await fundamentaldetailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await fundamentaldetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
