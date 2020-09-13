/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DiscountComponentsPage from './discount-my-suffix.page-object';
import { DiscountDeleteDialog } from './discount-my-suffix.page-object';
import DiscountUpdatePage from './discount-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Discount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let discountUpdatePage: DiscountUpdatePage;
  let discountComponentsPage: DiscountComponentsPage;
  let discountDeleteDialog: DiscountDeleteDialog;

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

  it('should load Discounts', async () => {
    await navBarPage.getEntityPage('discount-my-suffix');
    discountComponentsPage = new DiscountComponentsPage();
    expect(await discountComponentsPage.getTitle().getText()).to.match(/Discounts/);
  });

  it('should load create Discount page', async () => {
    await discountComponentsPage.clickOnCreateButton();
    discountUpdatePage = new DiscountUpdatePage();
    expect(await discountUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.discount.home.createOrEditLabel/);
    await discountUpdatePage.cancel();
  });

  it('should create and save Discounts', async () => {
    async function createDiscount() {
      await discountComponentsPage.clickOnCreateButton();
      await discountUpdatePage.setSubject2Input('5');
      expect(await discountUpdatePage.getSubject2Input()).to.eq('5');
      await discountUpdatePage.setSubject3Input('5');
      expect(await discountUpdatePage.getSubject3Input()).to.eq('5');
      await discountUpdatePage.setSubject4Input('5');
      expect(await discountUpdatePage.getSubject4Input()).to.eq('5');
      await discountUpdatePage.setSubject5Input('5');
      expect(await discountUpdatePage.getSubject5Input()).to.eq('5');
      await discountUpdatePage.setSubject6Input('5');
      expect(await discountUpdatePage.getSubject6Input()).to.eq('5');
      await discountUpdatePage.setSubject7Input('5');
      expect(await discountUpdatePage.getSubject7Input()).to.eq('5');
      await discountUpdatePage.setSubject8Input('5');
      expect(await discountUpdatePage.getSubject8Input()).to.eq('5');
      await discountUpdatePage.setQuarterlyInput('5');
      expect(await discountUpdatePage.getQuarterlyInput()).to.eq('5');
      await discountUpdatePage.setHalfYearlyInput('5');
      expect(await discountUpdatePage.getHalfYearlyInput()).to.eq('5');
      await discountUpdatePage.setAnnuallyInput('5');
      expect(await discountUpdatePage.getAnnuallyInput()).to.eq('5');
      await discountUpdatePage.setSiblingInput('5');
      expect(await discountUpdatePage.getSiblingInput()).to.eq('5');
      await discountUpdatePage.setReferralInput('5');
      expect(await discountUpdatePage.getReferralInput()).to.eq('5');
      await discountUpdatePage.enterpriseSelectLastOption();
      await discountUpdatePage.sessionSelectLastOption();
      await waitUntilDisplayed(discountUpdatePage.getSaveButton());
      await discountUpdatePage.save();
      await waitUntilHidden(discountUpdatePage.getSaveButton());
      expect(await discountUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDiscount();
    await discountComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await discountComponentsPage.countDeleteButtons();
    await createDiscount();

    await discountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Discount', async () => {
    await discountComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await discountComponentsPage.countDeleteButtons();
    await discountComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    discountDeleteDialog = new DiscountDeleteDialog();
    expect(await discountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.discount.delete.question/);
    await discountDeleteDialog.clickOnConfirmButton();

    await discountComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
