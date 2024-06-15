class CompanyRegistrationAddressPage {
  locators = {
    form: "form",
    companyDetailsHeader: "[data-cy='text-company-details']",
    appContentLayout: "#appContentLayout",
    registeredAddressCountry: "div:contains('CountryUnited States')",
    addressLine1Input: '[data-cy="input-registeredAddress-address1"]',
    addressLine2Input: '[data-cy="input-registeredAddress-address2"]',
    cityInput: '[data-cy="input-registeredAddress-city"]',
    stateDropdown: "#dropdown-state",
    zipCodeInput: '[data-cy="input-registeredAddress-zipCode"',
    mailingAddressRadio: '[data-cy="button-isSameAddress"]',
    backButton: '[data-cy="button-back"]',
    submitButton: '[data-cy="button-next"]',
  };

  texts = {
    addressLine1: "Address line 1",
    addressLine2: "Address line 2",
    optional: "Optional",
    city: "City",
    state: "State",
    zipCode: "Zip code",
    mailingAddress: "Is the mailing address same as above ?",
    registeredAddress: "Registered Address",
    appContentText: "Let us know where your business is located.",
    companyDetailsHeaderText: "Add address",
  };

  verifyElementVisibleWithText(text) {
    cy.get(this.locators.form)
      .scrollIntoView()
      .should("contain.text", text)
      .and("be.visible");
  }

  verifyAddressSection() {
    cy.get("h1[data-cy='text-company-details']")
      .scrollIntoView()
      .should("contain.text", "Add address")
      .should("be.visible");
    cy.contains(this.texts.appContentText).should("be.visible");
    cy.get(this.locators.appContentLayout).should(
      "contain.text",
      this.texts.appContentText
    );
  }

  verifyRegisteredAddressCountry(country) {
    cy.contains(this.texts.registeredAddress).should("be.visible");
    cy.contains(country).should("be.visible");
  }

  fillAddressLine1(address1) {
    this.verifyElementVisibleWithText(this.texts.addressLine1);
    cy.get(this.locators.addressLine1Input).type(address1);
  }

  fillAddressLine2(address2) {
    this.verifyElementVisibleWithText(this.texts.addressLine2);
    cy.get(this.locators.addressLine2Input).type(address2);
    this.verifyElementVisibleWithText(this.texts.optional);
  }

  fillCity(city) {
    this.verifyElementVisibleWithText(this.texts.city);
    cy.get(this.locators.cityInput).type(city);
  }

  selectState(state) {
    this.verifyElementVisibleWithText(this.texts.state);
    cy.get(this.locators.stateDropdown).first().click().type(`${state}{enter}`);
  }

  fillZipCode(zipCode) {
    this.verifyElementVisibleWithText(this.texts.zipCode);
    cy.get(this.locators.zipCodeInput).click().type(zipCode);
  }

  confirmMailingAddress() {
    this.verifyElementVisibleWithText(this.texts.mailingAddress);
    cy.get(this.locators.mailingAddressRadio).should(
      "not.have.attr",
      "disabled"
    );
  }

  submitForm() {
    cy.get(this.locators.backButton).scrollIntoView().should("be.visible");
    cy.get(this.locators.submitButton).click();
  }

  fillAddressPage(country, address1, address2, city, state, zipcode) {
    this.verifyAddressSection();
    this.verifyRegisteredAddressCountry(country);
    this.fillAddressLine1(address1);
    this.fillAddressLine2(address2);
    this.fillCity(city);
    this.selectState(state);
    this.fillZipCode(zipcode);
    this.confirmMailingAddress();
    this.submitForm();
  }
}

export default new CompanyRegistrationAddressPage();
