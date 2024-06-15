class RegistrationPage {
  // Element locators
  locators = {
    firstNameField: '[data-cy="input-first-name"]',
    middleNameField: '[data-cy="input-middle-name"]',
    lastNameField: '[data-cy="input-last-name"]',
    emailField: '[data-cy="input-email"]',
    companyNameField: '[data-cy="input-company-name"]',
    companyWebsiteField: '[data-cy="input-company-website"]',
    businessClientsDropdown: "#select-business-clients-number",
    businessClientsOption_1Client: "#react-select-2-option-0",
    businessClientsOption_0_4Clients: "#react-select-2-option-1",
    businessClientsOption_5_10Clients: "#react-select-2-option-2",
    businessClientsOption_10PlusClients: "#react-select-2-option-3",
    passwordField: '[data-cy="input-password"]',
    confirmPasswordField: '[data-cy="input-confirm-password"]',
    phoneNumberField: '[data-cy="input-phone-number"]',
    nextButton: '[data-cy="button-next"]',
    accountExistsMessage: ".button1",
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

    switch (noOfClients) {
      case "1 Client":
        cy.get(this.locators.businessClientsOption_1Client).click();
        break;
      case "0-4 Clients":
        cy.get(this.locators.businessClientsOption_0_4Clients).click();
        break;
      case "5-10 Clients":
        cy.get(this.locators.businessClientsOption_5_10Clients).click();
        break;
      case "10+ Clients":
        cy.get(this.locators.businessClientsOption_10PlusClients)
          .last()
          .click();
        break;
      default:
        throw new Error(`Invalid number of clients : ${noOfClients}`);
    }
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
