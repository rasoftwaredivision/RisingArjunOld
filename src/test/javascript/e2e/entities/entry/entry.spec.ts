/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EntryComponentsPage from './entry.page-object';
import { EntryDeleteDialog } from './entry.page-object';
import EntryUpdatePage from './entry-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Entry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entryUpdatePage: EntryUpdatePage;
  let entryComponentsPage: EntryComponentsPage;
  let entryDeleteDialog: EntryDeleteDialog;

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

  it('should load Entries', async () => {
    await navBarPage.getEntityPage('entry');
    entryComponentsPage = new EntryComponentsPage();
    expect(await entryComponentsPage.getTitle().getText()).to.match(/Entries/);
  });

  it('should load create Entry page', async () => {
    await entryComponentsPage.clickOnCreateButton();
    entryUpdatePage = new EntryUpdatePage();
    expect(await entryUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.entry.home.createOrEditLabel/);
    await entryUpdatePage.cancel();
  });

  it('should create and save Entries', async () => {
    async function createEntry() {
      await entryComponentsPage.clickOnCreateButton();
      await entryUpdatePage.setTitleInput('title');
      expect(await entryUpdatePage.getTitleInput()).to.match(/title/);
      await entryUpdatePage.setContentInput('content');
      expect(await entryUpdatePage.getContentInput()).to.match(/content/);
      await entryUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await entryUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await entryUpdatePage.blogSelectLastOption();
      // entryUpdatePage.tagSelectLastOption();
      await waitUntilDisplayed(entryUpdatePage.getSaveButton());
      await entryUpdatePage.save();
      await waitUntilHidden(entryUpdatePage.getSaveButton());
      expect(await entryUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEntry();
    await entryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await entryComponentsPage.countDeleteButtons();
    await createEntry();

    await entryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await entryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Entry', async () => {
    await entryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await entryComponentsPage.countDeleteButtons();
    await entryComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    entryDeleteDialog = new EntryDeleteDialog();
    expect(await entryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.entry.delete.question/);
    await entryDeleteDialog.clickOnConfirmButton();

    await entryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await entryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
