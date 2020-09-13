import { element, by, ElementFinder } from 'protractor';

export default class CourseUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.course.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  courseIdInput: ElementFinder = element(by.css('input#course-my-suffix-courseId'));
  courseInput: ElementFinder = element(by.css('input#course-my-suffix-course'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCourseIdInput(courseId) {
    await this.courseIdInput.sendKeys(courseId);
  }

  async getCourseIdInput() {
    return this.courseIdInput.getAttribute('value');
  }

  async setCourseInput(course) {
    await this.courseInput.sendKeys(course);
  }

  async getCourseInput() {
    return this.courseInput.getAttribute('value');
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
