/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestionComponentsPage from './question-my-suffix.page-object';
import { QuestionDeleteDialog } from './question-my-suffix.page-object';
import QuestionUpdatePage from './question-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Question e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionUpdatePage: QuestionUpdatePage;
  let questionComponentsPage: QuestionComponentsPage;
  let questionDeleteDialog: QuestionDeleteDialog;
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

  it('should load Questions', async () => {
    await navBarPage.getEntityPage('question-my-suffix');
    questionComponentsPage = new QuestionComponentsPage();
    expect(await questionComponentsPage.getTitle().getText()).to.match(/Questions/);
  });

  it('should load create Question page', async () => {
    await questionComponentsPage.clickOnCreateButton();
    questionUpdatePage = new QuestionUpdatePage();
    expect(await questionUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.question.home.createOrEditLabel/);
    await questionUpdatePage.cancel();
  });

  it('should create and save Questions', async () => {
    async function createQuestion() {
      await questionComponentsPage.clickOnCreateButton();
      await questionUpdatePage.setQuestionInput('question');
      expect(await questionUpdatePage.getQuestionInput()).to.match(/question/);
      await questionUpdatePage.setDiagramInput(absolutePath);
      await questionUpdatePage.setOption1Input('option1');
      expect(await questionUpdatePage.getOption1Input()).to.match(/option1/);
      await questionUpdatePage.setOption2Input('option2');
      expect(await questionUpdatePage.getOption2Input()).to.match(/option2/);
      await questionUpdatePage.setOption3Input('option3');
      expect(await questionUpdatePage.getOption3Input()).to.match(/option3/);
      await questionUpdatePage.setOption4Input('option4');
      expect(await questionUpdatePage.getOption4Input()).to.match(/option4/);
      const selectedMultiChoice = await questionUpdatePage.getMultiChoiceInput().isSelected();
      if (selectedMultiChoice) {
        await questionUpdatePage.getMultiChoiceInput().click();
        expect(await questionUpdatePage.getMultiChoiceInput().isSelected()).to.be.false;
      } else {
        await questionUpdatePage.getMultiChoiceInput().click();
        expect(await questionUpdatePage.getMultiChoiceInput().isSelected()).to.be.true;
      }
      await questionUpdatePage.setAnswerInput('answer');
      expect(await questionUpdatePage.getAnswerInput()).to.match(/answer/);
      await questionUpdatePage.setMaxMarksInput('5');
      expect(await questionUpdatePage.getMaxMarksInput()).to.eq('5');
      await questionUpdatePage.setNegativeMarksInput('5');
      expect(await questionUpdatePage.getNegativeMarksInput()).to.eq('5');
      await questionUpdatePage.setDurationMinsInput('5');
      expect(await questionUpdatePage.getDurationMinsInput()).to.eq('5');
      await questionUpdatePage.levelSelectLastOption();
      await questionUpdatePage.setSolutionInput('solution');
      expect(await questionUpdatePage.getSolutionInput()).to.match(/solution/);
      await questionUpdatePage.setVideoInput('video');
      expect(await questionUpdatePage.getVideoInput()).to.match(/video/);
      await questionUpdatePage.statusSelectLastOption();
      await questionUpdatePage.enterpriseSelectLastOption();
      await questionUpdatePage.courseSelectLastOption();
      await questionUpdatePage.subjectSelectLastOption();
      await questionUpdatePage.chapterSelectLastOption();
      await questionUpdatePage.writerSelectLastOption();
      await questionUpdatePage.approverSelectLastOption();
      // questionUpdatePage.fundamentalsSelectLastOption();
      await waitUntilDisplayed(questionUpdatePage.getSaveButton());
      await questionUpdatePage.save();
      await waitUntilHidden(questionUpdatePage.getSaveButton());
      expect(await questionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createQuestion();
    await questionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await questionComponentsPage.countDeleteButtons();
    await createQuestion();

    await questionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Question', async () => {
    await questionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await questionComponentsPage.countDeleteButtons();
    await questionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    questionDeleteDialog = new QuestionDeleteDialog();
    expect(await questionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.question.delete.question/);
    await questionDeleteDialog.clickOnConfirmButton();

    await questionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
