/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AcademicsessionComponentsPage from './academicsession-my-suffix.page-object';
import { AcademicsessionDeleteDialog } from './academicsession-my-suffix.page-object';
import AcademicsessionUpdatePage from './academicsession-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Academicsession e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let academicsessionUpdatePage: AcademicsessionUpdatePage;
  let academicsessionComponentsPage: AcademicsessionComponentsPage;
  let academicsessionDeleteDialog: AcademicsessionDeleteDialog;

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

  it('should load Academicsessions', async () => {
    await navBarPage.getEntityPage('academicsession-my-suffix');
    academicsessionComponentsPage = new AcademicsessionComponentsPage();
    expect(await academicsessionComponentsPage.getTitle().getText()).to.match(/Academicsessions/);
  });

  it('should load create Academicsession page', async () => {
    await academicsessionComponentsPage.clickOnCreateButton();
    academicsessionUpdatePage = new AcademicsessionUpdatePage();
    expect(await academicsessionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /risingArjunApp.academicsession.home.createOrEditLabel/
    );
    await academicsessionUpdatePage.cancel();
  });

  it('should create and save Academicsessions', async () => {
    async function createAcademicsession() {
      await academicsessionComponentsPage.clickOnCreateButton();
      await academicsessionUpdatePage.setAcadSessionIdInput('acadSessionId');
      expect(await academicsessionUpdatePage.getAcadSessionIdInput()).to.match(/acadSessionId/);
      await academicsessionUpdatePage.setAcadSessionInput('acadSession');
      expect(await academicsessionUpdatePage.getAcadSessionInput()).to.match(/acadSession/);
      await waitUntilDisplayed(academicsessionUpdatePage.getSaveButton());
      await academicsessionUpdatePage.save();
      await waitUntilHidden(academicsessionUpdatePage.getSaveButton());
      expect(await academicsessionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAcademicsession();
    await academicsessionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await academicsessionComponentsPage.countDeleteButtons();
    await createAcademicsession();

    await academicsessionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await academicsessionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Academicsession', async () => {
    await academicsessionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await academicsessionComponentsPage.countDeleteButtons();
    await academicsessionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    academicsessionDeleteDialog = new AcademicsessionDeleteDialog();
    expect(await academicsessionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /risingArjunApp.academicsession.delete.question/
    );
    await academicsessionDeleteDialog.clickOnConfirmButton();

    await academicsessionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await academicsessionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
