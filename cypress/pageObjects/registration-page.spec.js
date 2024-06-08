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
    accountExistsMessage: ".space-y-2.text-center",
    termsOfServiceLink: 'a:contains("Terms of Service")',
    privacyPolicyLink: 'a:contains("Privacy Policy")',
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
  verifyTermsOfServiceHyperLink() {
    cy.get(this.locators.termsOfServiceLink).should(
      "have.attr",
      "href",
      "https://www.niural.com/legal/customer-terms-of-service"
    );
  }

  verifyPrivacyPolicyLink() {
    cy.get(this.locators.privacyPolicyLink).should(
      "have.attr",
      "href",
      "https://www.niural.com/privacy-policy"
    );
  }

  verifyAccountAlreadyExistsPopup(email) {
    cy.get("h3").should("be.visible").and("have.text", "Account Exists");

    cy.get(this.locators.accountExistsMessage)
      .should("be.visible")
      .and(
        "have.text",
        "An account with " +
          email +
          " already existsPlease signin using this email."
      );
  }
}

export default new RegistrationPage();
