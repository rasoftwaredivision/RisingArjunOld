/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CenterheadComponentsPage from './centerhead-my-suffix.page-object';
import { CenterheadDeleteDialog } from './centerhead-my-suffix.page-object';
import CenterheadUpdatePage from './centerhead-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Centerhead e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let centerheadUpdatePage: CenterheadUpdatePage;
  let centerheadComponentsPage: CenterheadComponentsPage;
  let centerheadDeleteDialog: CenterheadDeleteDialog;

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

  it('should load Centerheads', async () => {
    await navBarPage.getEntityPage('centerhead-my-suffix');
    centerheadComponentsPage = new CenterheadComponentsPage();
    expect(await centerheadComponentsPage.getTitle().getText()).to.match(/Centerheads/);
  });

  it('should load create Centerhead page', async () => {
    await centerheadComponentsPage.clickOnCreateButton();
    centerheadUpdatePage = new CenterheadUpdatePage();
    expect(await centerheadUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.centerhead.home.createOrEditLabel/);
    await centerheadUpdatePage.cancel();
  });

  it('should create and save Centerheads', async () => {
    async function createCenterhead() {
      await centerheadComponentsPage.clickOnCreateButton();
      await centerheadUpdatePage.centerheadSelectLastOption();
      // centerheadUpdatePage.centerSelectLastOption();
      await waitUntilDisplayed(centerheadUpdatePage.getSaveButton());
      await centerheadUpdatePage.save();
      await waitUntilHidden(centerheadUpdatePage.getSaveButton());
      expect(await centerheadUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCenterhead();
    await centerheadComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await centerheadComponentsPage.countDeleteButtons();
    await createCenterhead();

    await centerheadComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await centerheadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Centerhead', async () => {
    await centerheadComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await centerheadComponentsPage.countDeleteButtons();
    await centerheadComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    centerheadDeleteDialog = new CenterheadDeleteDialog();
    expect(await centerheadDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.centerhead.delete.question/);
    await centerheadDeleteDialog.clickOnConfirmButton();

    await centerheadComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await centerheadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
