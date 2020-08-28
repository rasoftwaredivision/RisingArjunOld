/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BlogComponentsPage from './blog.page-object';
import { BlogDeleteDialog } from './blog.page-object';
import BlogUpdatePage from './blog-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Blog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogUpdatePage: BlogUpdatePage;
  let blogComponentsPage: BlogComponentsPage;
  let blogDeleteDialog: BlogDeleteDialog;

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

  it('should load Blogs', async () => {
    await navBarPage.getEntityPage('blog');
    blogComponentsPage = new BlogComponentsPage();
    expect(await blogComponentsPage.getTitle().getText()).to.match(/Blogs/);
  });

  it('should load create Blog page', async () => {
    await blogComponentsPage.clickOnCreateButton();
    blogUpdatePage = new BlogUpdatePage();
    expect(await blogUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.blog.home.createOrEditLabel/);
    await blogUpdatePage.cancel();
  });

  it('should create and save Blogs', async () => {
    async function createBlog() {
      await blogComponentsPage.clickOnCreateButton();
      await blogUpdatePage.setNameInput('name');
      expect(await blogUpdatePage.getNameInput()).to.match(/name/);
      await blogUpdatePage.setHandleInput('handle');
      expect(await blogUpdatePage.getHandleInput()).to.match(/handle/);
      await blogUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(blogUpdatePage.getSaveButton());
      await blogUpdatePage.save();
      await waitUntilHidden(blogUpdatePage.getSaveButton());
      expect(await blogUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBlog();
    await blogComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await blogComponentsPage.countDeleteButtons();
    await createBlog();

    await blogComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Blog', async () => {
    await blogComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await blogComponentsPage.countDeleteButtons();
    await blogComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    blogDeleteDialog = new BlogDeleteDialog();
    expect(await blogDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.blog.delete.question/);
    await blogDeleteDialog.clickOnConfirmButton();

    await blogComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
