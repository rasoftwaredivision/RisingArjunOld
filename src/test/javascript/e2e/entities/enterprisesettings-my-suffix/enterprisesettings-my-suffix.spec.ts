/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnterprisesettingsComponentsPage from './enterprisesettings-my-suffix.page-object';
import { EnterprisesettingsDeleteDialog } from './enterprisesettings-my-suffix.page-object';
import EnterprisesettingsUpdatePage from './enterprisesettings-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Enterprisesettings e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enterprisesettingsUpdatePage: EnterprisesettingsUpdatePage;
  let enterprisesettingsComponentsPage: EnterprisesettingsComponentsPage;
  let enterprisesettingsDeleteDialog: EnterprisesettingsDeleteDialog;

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

  it('should load Enterprisesettings', async () => {
    await navBarPage.getEntityPage('enterprisesettings-my-suffix');
    enterprisesettingsComponentsPage = new EnterprisesettingsComponentsPage();
    expect(await enterprisesettingsComponentsPage.getTitle().getText()).to.match(/Enterprisesettings/);
  });

  it('should load create Enterprisesettings page', async () => {
    await enterprisesettingsComponentsPage.clickOnCreateButton();
    enterprisesettingsUpdatePage = new EnterprisesettingsUpdatePage();
    expect(await enterprisesettingsUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.enterprisesettings.home.createOrEditLabel/
    );
    await enterprisesettingsUpdatePage.cancel();
  });

  it('should create and save Enterprisesettings', async () => {
    async function createEnterprisesettings() {
      await enterprisesettingsComponentsPage.clickOnCreateButton();
      await enterprisesettingsUpdatePage.setThemeInput('theme');
      expect(await enterprisesettingsUpdatePage.getThemeInput()).to.match(/theme/);
      await enterprisesettingsUpdatePage.setForegroundInput('foreground');
      expect(await enterprisesettingsUpdatePage.getForegroundInput()).to.match(/foreground/);
      await enterprisesettingsUpdatePage.setBackgroundInput('background');
      expect(await enterprisesettingsUpdatePage.getBackgroundInput()).to.match(/background/);
      await enterprisesettingsUpdatePage.setDisclaimerInput('disclaimer');
      expect(await enterprisesettingsUpdatePage.getDisclaimerInput()).to.match(/disclaimer/);
      await enterprisesettingsUpdatePage.setPolicyInput('policy');
      expect(await enterprisesettingsUpdatePage.getPolicyInput()).to.match(/policy/);
      await enterprisesettingsUpdatePage.setCopyrightsInput('copyrights');
      expect(await enterprisesettingsUpdatePage.getCopyrightsInput()).to.match(/copyrights/);
      await enterprisesettingsUpdatePage.setTermsOfUsageInput('termsOfUsage');
      expect(await enterprisesettingsUpdatePage.getTermsOfUsageInput()).to.match(/termsOfUsage/);
      await enterprisesettingsUpdatePage.adminSelectLastOption();
      await enterprisesettingsUpdatePage.enterpriseSelectLastOption();
      await waitUntilDisplayed(enterprisesettingsUpdatePage.getSaveButton());
      await enterprisesettingsUpdatePage.save();
      await waitUntilHidden(enterprisesettingsUpdatePage.getSaveButton());
      expect(await enterprisesettingsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEnterprisesettings();
    await enterprisesettingsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await enterprisesettingsComponentsPage.countDeleteButtons();
    await createEnterprisesettings();

    await enterprisesettingsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await enterprisesettingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Enterprisesettings', async () => {
    await enterprisesettingsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await enterprisesettingsComponentsPage.countDeleteButtons();
    await enterprisesettingsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    enterprisesettingsDeleteDialog = new EnterprisesettingsDeleteDialog();
    expect(await enterprisesettingsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /risingArjunApp.enterprisesettings.delete.question/
    );
    await enterprisesettingsDeleteDialog.clickOnConfirmButton();

    await enterprisesettingsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await enterprisesettingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
