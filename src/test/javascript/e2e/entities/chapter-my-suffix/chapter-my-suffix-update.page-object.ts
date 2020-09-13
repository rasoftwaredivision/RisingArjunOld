import { element, by, ElementFinder } from 'protractor';

export default class ChapterUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.chapter.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  chapterIdInput: ElementFinder = element(by.css('input#chapter-my-suffix-chapterId'));
  chapterTitleInput: ElementFinder = element(by.css('input#chapter-my-suffix-chapterTitle'));
  courseSelect: ElementFinder = element(by.css('select#chapter-my-suffix-course'));
  subjectSelect: ElementFinder = element(by.css('select#chapter-my-suffix-subject'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setChapterIdInput(chapterId) {
    await this.chapterIdInput.sendKeys(chapterId);
  }

  async getChapterIdInput() {
    return this.chapterIdInput.getAttribute('value');
  }

  async setChapterTitleInput(chapterTitle) {
    await this.chapterTitleInput.sendKeys(chapterTitle);
  }

  async getChapterTitleInput() {
    return this.chapterTitleInput.getAttribute('value');
  }

  async courseSelectLastOption() {
    await this.courseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectOption(option) {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect() {
    return this.courseSelect;
  }

  async getCourseSelectedOption() {
    return this.courseSelect.element(by.css('option:checked')).getText();
  }

  async subjectSelectLastOption() {
    await this.subjectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subjectSelectOption(option) {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect() {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption() {
    return this.subjectSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
