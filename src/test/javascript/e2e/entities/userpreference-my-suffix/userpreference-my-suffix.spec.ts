/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserpreferenceComponentsPage from './userpreference-my-suffix.page-object';
import { UserpreferenceDeleteDialog } from './userpreference-my-suffix.page-object';
import UserpreferenceUpdatePage from './userpreference-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Userpreference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userpreferenceUpdatePage: UserpreferenceUpdatePage;
  let userpreferenceComponentsPage: UserpreferenceComponentsPage;
  let userpreferenceDeleteDialog: UserpreferenceDeleteDialog;

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

  it('should load Userpreferences', async () => {
    await navBarPage.getEntityPage('userpreference-my-suffix');
    userpreferenceComponentsPage = new UserpreferenceComponentsPage();
    expect(await userpreferenceComponentsPage.getTitle().getText()).to.match(/Userpreferences/);
  });

  it('should load create Userpreference page', async () => {
    await userpreferenceComponentsPage.clickOnCreateButton();
    userpreferenceUpdatePage = new UserpreferenceUpdatePage();
    expect(await userpreferenceUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.userpreference.home.createOrEditLabel/
    );
    await userpreferenceUpdatePage.cancel();
  });

  it('should create and save Userpreferences', async () => {
    async function createUserpreference() {
      await userpreferenceComponentsPage.clickOnCreateButton();
      await userpreferenceUpdatePage.setThemeInput('theme');
      expect(await userpreferenceUpdatePage.getThemeInput()).to.match(/theme/);
      await userpreferenceUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(userpreferenceUpdatePage.getSaveButton());
      await userpreferenceUpdatePage.save();
      await waitUntilHidden(userpreferenceUpdatePage.getSaveButton());
      expect(await userpreferenceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserpreference();
    await userpreferenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userpreferenceComponentsPage.countDeleteButtons();
    await createUserpreference();

    await userpreferenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userpreferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Userpreference', async () => {
    await userpreferenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userpreferenceComponentsPage.countDeleteButtons();
    await userpreferenceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userpreferenceDeleteDialog = new UserpreferenceDeleteDialog();
    expect(await userpreferenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.userpreference.delete.question/);
    await userpreferenceDeleteDialog.clickOnConfirmButton();

    await userpreferenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userpreferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
