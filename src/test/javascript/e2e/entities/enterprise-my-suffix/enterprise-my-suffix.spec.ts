/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnterpriseComponentsPage from './enterprise-my-suffix.page-object';
import { EnterpriseDeleteDialog } from './enterprise-my-suffix.page-object';
import EnterpriseUpdatePage from './enterprise-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Enterprise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enterpriseUpdatePage: EnterpriseUpdatePage;
  let enterpriseComponentsPage: EnterpriseComponentsPage;
  let enterpriseDeleteDialog: EnterpriseDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Enterprises', async () => {
    await navBarPage.getEntityPage('enterprise-my-suffix');
    enterpriseComponentsPage = new EnterpriseComponentsPage();
    expect(await enterpriseComponentsPage.getTitle().getText()).to.match(/Enterprises/);
  });

  it('should load create Enterprise page', async () => {
    await enterpriseComponentsPage.clickOnCreateButton();
    enterpriseUpdatePage = new EnterpriseUpdatePage();
    expect(await enterpriseUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.enterprise.home.createOrEditLabel/);
    await enterpriseUpdatePage.cancel();
  });

  it('should create and save Enterprises', async () => {
    async function createEnterprise() {
      await enterpriseComponentsPage.clickOnCreateButton();
      await enterpriseUpdatePage.setAbbrevationInput('abbrevation');
      expect(await enterpriseUpdatePage.getAbbrevationInput()).to.match(/abbrevation/);
      await enterpriseUpdatePage.setEnterprisenameInput('enterprisename');
      expect(await enterpriseUpdatePage.getEnterprisenameInput()).to.match(/enterprisename/);
      await enterpriseUpdatePage.natureofbusinessSelectLastOption();
      await enterpriseUpdatePage.setLogoInput(absolutePath);
      await enterpriseUpdatePage.setPunchlineInput('punchline');
      expect(await enterpriseUpdatePage.getPunchlineInput()).to.match(/punchline/);
      await enterpriseUpdatePage.setMissionInput('mission');
      expect(await enterpriseUpdatePage.getMissionInput()).to.match(/mission/);
      await enterpriseUpdatePage.setVisionInput('vision');
      expect(await enterpriseUpdatePage.getVisionInput()).to.match(/vision/);
      await enterpriseUpdatePage.setPrinciplesInput('principles');
      expect(await enterpriseUpdatePage.getPrinciplesInput()).to.match(/principles/);
      await enterpriseUpdatePage.setEmailInput('email');
      expect(await enterpriseUpdatePage.getEmailInput()).to.match(/email/);
      await enterpriseUpdatePage.setMobileInput('mobile');
      expect(await enterpriseUpdatePage.getMobileInput()).to.match(/mobile/);
      await enterpriseUpdatePage.setLandlineInput('landline');
      expect(await enterpriseUpdatePage.getLandlineInput()).to.match(/landline/);
      await enterpriseUpdatePage.setFaxInput('fax');
      expect(await enterpriseUpdatePage.getFaxInput()).to.match(/fax/);
      await enterpriseUpdatePage.setPlotNoInput('plotNo');
      expect(await enterpriseUpdatePage.getPlotNoInput()).to.match(/plotNo/);
      await enterpriseUpdatePage.setStreetInput('street');
      expect(await enterpriseUpdatePage.getStreetInput()).to.match(/street/);
      await enterpriseUpdatePage.citySelectLastOption();
      await enterpriseUpdatePage.stateSelectLastOption();
      await enterpriseUpdatePage.countrySelectLastOption();
      await enterpriseUpdatePage.setPincodeInput('5');
      expect(await enterpriseUpdatePage.getPincodeInput()).to.eq('5');
      await waitUntilDisplayed(enterpriseUpdatePage.getSaveButton());
      await enterpriseUpdatePage.save();
      await waitUntilHidden(enterpriseUpdatePage.getSaveButton());
      expect(await enterpriseUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEnterprise();
    await enterpriseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await enterpriseComponentsPage.countDeleteButtons();
    await createEnterprise();

    await enterpriseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Enterprise', async () => {
    await enterpriseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await enterpriseComponentsPage.countDeleteButtons();
    await enterpriseComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    enterpriseDeleteDialog = new EnterpriseDeleteDialog();
    expect(await enterpriseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.enterprise.delete.question/);
    await enterpriseDeleteDialog.clickOnConfirmButton();

    await enterpriseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
