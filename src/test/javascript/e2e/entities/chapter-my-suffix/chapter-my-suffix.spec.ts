/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChapterComponentsPage from './chapter-my-suffix.page-object';
import { ChapterDeleteDialog } from './chapter-my-suffix.page-object';
import ChapterUpdatePage from './chapter-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Chapter e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chapterUpdatePage: ChapterUpdatePage;
  let chapterComponentsPage: ChapterComponentsPage;
  let chapterDeleteDialog: ChapterDeleteDialog;

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

  it('should load Chapters', async () => {
    await navBarPage.getEntityPage('chapter-my-suffix');
    chapterComponentsPage = new ChapterComponentsPage();
    expect(await chapterComponentsPage.getTitle().getText()).to.match(/Chapters/);
  });

  it('should load create Chapter page', async () => {
    await chapterComponentsPage.clickOnCreateButton();
    chapterUpdatePage = new ChapterUpdatePage();
    expect(await chapterUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.chapter.home.createOrEditLabel/);
    await chapterUpdatePage.cancel();
  });

  it('should create and save Chapters', async () => {
    async function createChapter() {
      await chapterComponentsPage.clickOnCreateButton();
      await chapterUpdatePage.setChapterIdInput('chapterId');
      expect(await chapterUpdatePage.getChapterIdInput()).to.match(/chapterId/);
      await chapterUpdatePage.setChapterTitleInput('chapterTitle');
      expect(await chapterUpdatePage.getChapterTitleInput()).to.match(/chapterTitle/);
      await chapterUpdatePage.courseSelectLastOption();
      await chapterUpdatePage.subjectSelectLastOption();
      await waitUntilDisplayed(chapterUpdatePage.getSaveButton());
      await chapterUpdatePage.save();
      await waitUntilHidden(chapterUpdatePage.getSaveButton());
      expect(await chapterUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createChapter();
    await chapterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await chapterComponentsPage.countDeleteButtons();
    await createChapter();

    await chapterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await chapterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Chapter', async () => {
    await chapterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await chapterComponentsPage.countDeleteButtons();
    await chapterComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    chapterDeleteDialog = new ChapterDeleteDialog();
    expect(await chapterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.chapter.delete.question/);
    await chapterDeleteDialog.clickOnConfirmButton();

    await chapterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await chapterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
