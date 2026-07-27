const { BasePage } = require('./BasePage');

// Account information form shown at /signup after starting signup from LoginPage
class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.titleMrRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.address1Input = page.locator('#address1');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('[data-qa="create-account"]');

    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async fillAccountInfo(user) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(user.password);
    await this.daysSelect.selectOption(user.day);
    await this.monthsSelect.selectOption(user.month);
    await this.yearsSelect.selectOption(user.year);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.address1Input.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async submit() {
    await this.createAccountButton.click();
  }

  async continueAfterAccountAction() {
    await this.continueButton.click();
  }
}

module.exports = { SignupPage };
