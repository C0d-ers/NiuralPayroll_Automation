class RegistrationPage {
  // Element locators
  locators = {
    firstNameField: 'input[name="firstName"]',
    middleNameField: 'input[name="middleName"]',
    lastNameField: 'input[name="lastName"]',
    emailField: 'input[name="email"]',
    companyNameField: 'input[name="companyName"]',
    companyWebsiteField: 'input[name="companyWebsite"]',
    businessClientsDropdown: ".css-1u6tjmp",
    businessClientsOption: "#react-select-2-option-2",
    passwordField: 'input[name="password"]',
    confirmPasswordField: 'input[name="confirmPassword"]',
    phoneNumberField: "input[name='phoneNumber']",
    nextButton: "button[type='submit']",
  };

  enterFirstName(firstName) {
    cy.get(this.locators.firstNameField).type(firstName);
  }

  enterMiddleName(middleName) {
    cy.get(this.locators.middleNameField).type(middleName);
  }

  enterLastName(lastName) {
    cy.get(this.locators.lastNameField).type(lastName);
  }

  enterEmail(email) {
    cy.get(this.locators.emailField).type(email);
  }

  enterCompanyName(companyName) {
    cy.get(this.locators.companyNameField).type(companyName);
  }

  enterCompanyWebsite(companyWebsite) {
    cy.get(this.locators.companyWebsiteField).type(companyWebsite);
  }

  selectBusinessClientsOption(optionText) {
    cy.get(this.locators.businessClientsDropdown).first().click();
    cy.contains(this.locators.businessClientsOption, optionText).click();
  }

  enterPassword(password) {
    cy.get(this.locators.passwordField).type(password);
  }

  enterConfirmPassword(confirmPassword) {
    cy.get(this.locators.confirmPasswordField).type(confirmPassword);
  }

  enterPhoneNumber(phoneNumber) {
    cy.get(this.locators.phoneNumberField).type(phoneNumber);
  }

  clickNextButton() {
    cy.get(this.locators.nextButton).click();
  }
}

export default new RegistrationPage();
