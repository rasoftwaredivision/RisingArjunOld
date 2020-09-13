/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RoleaccessComponentsPage from './roleaccess-my-suffix.page-object';
import { RoleaccessDeleteDialog } from './roleaccess-my-suffix.page-object';
import RoleaccessUpdatePage from './roleaccess-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Roleaccess e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let roleaccessUpdatePage: RoleaccessUpdatePage;
  let roleaccessComponentsPage: RoleaccessComponentsPage;
  let roleaccessDeleteDialog: RoleaccessDeleteDialog;

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

  it('should load Roleaccesses', async () => {
    await navBarPage.getEntityPage('roleaccess-my-suffix');
    roleaccessComponentsPage = new RoleaccessComponentsPage();
    expect(await roleaccessComponentsPage.getTitle().getText()).to.match(/Roleaccesses/);
  });

  it('should load create Roleaccess page', async () => {
    await roleaccessComponentsPage.clickOnCreateButton();
    roleaccessUpdatePage = new RoleaccessUpdatePage();
    expect(await roleaccessUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.roleaccess.home.createOrEditLabel/);
    await roleaccessUpdatePage.cancel();
  });

  it('should create and save Roleaccesses', async () => {
    async function createRoleaccess() {
      await roleaccessComponentsPage.clickOnCreateButton();
      const selectedCreate = await roleaccessUpdatePage.getCreateInput().isSelected();
      if (selectedCreate) {
        await roleaccessUpdatePage.getCreateInput().click();
        expect(await roleaccessUpdatePage.getCreateInput().isSelected()).to.be.false;
      } else {
        await roleaccessUpdatePage.getCreateInput().click();
        expect(await roleaccessUpdatePage.getCreateInput().isSelected()).to.be.true;
      }
      const selectedRead = await roleaccessUpdatePage.getReadInput().isSelected();
      if (selectedRead) {
        await roleaccessUpdatePage.getReadInput().click();
        expect(await roleaccessUpdatePage.getReadInput().isSelected()).to.be.false;
      } else {
        await roleaccessUpdatePage.getReadInput().click();
        expect(await roleaccessUpdatePage.getReadInput().isSelected()).to.be.true;
      }
      const selectedUpdate = await roleaccessUpdatePage.getUpdateInput().isSelected();
      if (selectedUpdate) {
        await roleaccessUpdatePage.getUpdateInput().click();
        expect(await roleaccessUpdatePage.getUpdateInput().isSelected()).to.be.false;
      } else {
        await roleaccessUpdatePage.getUpdateInput().click();
        expect(await roleaccessUpdatePage.getUpdateInput().isSelected()).to.be.true;
      }
      const selectedDel = await roleaccessUpdatePage.getDelInput().isSelected();
      if (selectedDel) {
        await roleaccessUpdatePage.getDelInput().click();
        expect(await roleaccessUpdatePage.getDelInput().isSelected()).to.be.false;
      } else {
        await roleaccessUpdatePage.getDelInput().click();
        expect(await roleaccessUpdatePage.getDelInput().isSelected()).to.be.true;
      }
      await roleaccessUpdatePage.roleSelectLastOption();
      await roleaccessUpdatePage.featureSelectLastOption();
      await waitUntilDisplayed(roleaccessUpdatePage.getSaveButton());
      await roleaccessUpdatePage.save();
      await waitUntilHidden(roleaccessUpdatePage.getSaveButton());
      expect(await roleaccessUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createRoleaccess();
    await roleaccessComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await roleaccessComponentsPage.countDeleteButtons();
    await createRoleaccess();

    await roleaccessComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await roleaccessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Roleaccess', async () => {
    await roleaccessComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await roleaccessComponentsPage.countDeleteButtons();
    await roleaccessComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    roleaccessDeleteDialog = new RoleaccessDeleteDialog();
    expect(await roleaccessDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.roleaccess.delete.question/);
    await roleaccessDeleteDialog.clickOnConfirmButton();

    await roleaccessComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await roleaccessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
