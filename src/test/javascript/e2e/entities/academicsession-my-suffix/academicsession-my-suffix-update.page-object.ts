import { element, by, ElementFinder } from 'protractor';

export default class AcademicsessionUpdatePage {
  pageTitle: ElementFinder = element(by.id('risingArjunApp.academicsession.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  acadSessionIdInput: ElementFinder = element(by.css('input#academicsession-my-suffix-acadSessionId'));
  acadSessionInput: ElementFinder = element(by.css('input#academicsession-my-suffix-acadSession'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAcadSessionIdInput(acadSessionId) {
    await this.acadSessionIdInput.sendKeys(acadSessionId);
  }

  async getAcadSessionIdInput() {
    return this.acadSessionIdInput.getAttribute('value');
  }

  async setAcadSessionInput(acadSession) {
    await this.acadSessionInput.sendKeys(acadSession);
  }

  async getAcadSessionInput() {
    return this.acadSessionInput.getAttribute('value');
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
