/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FeatureComponentsPage from './feature-my-suffix.page-object';
import { FeatureDeleteDialog } from './feature-my-suffix.page-object';
import FeatureUpdatePage from './feature-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Feature e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let featureUpdatePage: FeatureUpdatePage;
  let featureComponentsPage: FeatureComponentsPage;
  let featureDeleteDialog: FeatureDeleteDialog;

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

  it('should load Features', async () => {
    await navBarPage.getEntityPage('feature-my-suffix');
    featureComponentsPage = new FeatureComponentsPage();
    expect(await featureComponentsPage.getTitle().getText()).to.match(/Features/);
  });

  it('should load create Feature page', async () => {
    await featureComponentsPage.clickOnCreateButton();
    featureUpdatePage = new FeatureUpdatePage();
    expect(await featureUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.feature.home.createOrEditLabel/);
    await featureUpdatePage.cancel();
  });

  it('should create and save Features', async () => {
    async function createFeature() {
      await featureComponentsPage.clickOnCreateButton();
      await featureUpdatePage.setFeatureIdInput('featureId');
      expect(await featureUpdatePage.getFeatureIdInput()).to.match(/featureId/);
      await featureUpdatePage.setFeatureDetailInput('featureDetail');
      expect(await featureUpdatePage.getFeatureDetailInput()).to.match(/featureDetail/);
      await waitUntilDisplayed(featureUpdatePage.getSaveButton());
      await featureUpdatePage.save();
      await waitUntilHidden(featureUpdatePage.getSaveButton());
      expect(await featureUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFeature();
    await featureComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await featureComponentsPage.countDeleteButtons();
    await createFeature();

    await featureComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await featureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Feature', async () => {
    await featureComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await featureComponentsPage.countDeleteButtons();
    await featureComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    featureDeleteDialog = new FeatureDeleteDialog();
    expect(await featureDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.feature.delete.question/);
    await featureDeleteDialog.clickOnConfirmButton();

    await featureComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await featureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
