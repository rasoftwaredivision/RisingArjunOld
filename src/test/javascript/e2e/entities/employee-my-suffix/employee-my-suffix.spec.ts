/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeComponentsPage from './employee-my-suffix.page-object';
import { EmployeeDeleteDialog } from './employee-my-suffix.page-object';
import EmployeeUpdatePage from './employee-my-suffix-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeDeleteDialog: EmployeeDeleteDialog;
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

  it('should load Employees', async () => {
    await navBarPage.getEntityPage('employee-my-suffix');
    employeeComponentsPage = new EmployeeComponentsPage();
    expect(await employeeComponentsPage.getTitle().getText()).to.match(/Employees/);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle().getAttribute('id')).to.match(/risingArjunApp.employee.home.createOrEditLabel/);
    await employeeUpdatePage.cancel();
  });

  it('should create and save Employees', async () => {
    async function createEmployee() {
      await employeeComponentsPage.clickOnCreateButton();
      await employeeUpdatePage.setEmployeeIdInput('employeeId');
      expect(await employeeUpdatePage.getEmployeeIdInput()).to.match(/employeeId/);
      await employeeUpdatePage.jobNatureSelectLastOption();
      const selectedBgc = await employeeUpdatePage.getBgcInput().isSelected();
      if (selectedBgc) {
        await employeeUpdatePage.getBgcInput().click();
        expect(await employeeUpdatePage.getBgcInput().isSelected()).to.be.false;
      } else {
        await employeeUpdatePage.getBgcInput().click();
        expect(await employeeUpdatePage.getBgcInput().isSelected()).to.be.true;
      }
      await employeeUpdatePage.setResumeInput(absolutePath);
      await employeeUpdatePage.setPanInput('pan');
      expect(await employeeUpdatePage.getPanInput()).to.match(/pan/);
      await employeeUpdatePage.setAccountNoInput('accountNo');
      expect(await employeeUpdatePage.getAccountNoInput()).to.match(/accountNo/);
      await employeeUpdatePage.setBankInput('bank');
      expect(await employeeUpdatePage.getBankInput()).to.match(/bank/);
      await employeeUpdatePage.setIfscInput('ifsc');
      expect(await employeeUpdatePage.getIfscInput()).to.match(/ifsc/);
      await employeeUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(employeeUpdatePage.getSaveButton());
      await employeeUpdatePage.save();
      await waitUntilHidden(employeeUpdatePage.getSaveButton());
      expect(await employeeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEmployee();
    await employeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();
    await createEmployee();

    await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Employee', async () => {
    await employeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
    await employeeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    employeeDeleteDialog = new EmployeeDeleteDialog();
    expect(await employeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/risingArjunApp.employee.delete.question/);
    await employeeDeleteDialog.clickOnConfirmButton();

    await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
