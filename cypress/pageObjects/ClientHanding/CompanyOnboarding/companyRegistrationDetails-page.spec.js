class CompanyRegistrationDetailsPage {
  locators = {
    form: "form",
    countryOfRegistrationDropdown: "#dropdown-country-of-registration",
    countryOfRegistrationInput: "#react-select-2-input",
    EINInput: '[data-cy="input-ein"]',
    registeredDateInput: "#date-registered-date",
    businessEntityTypeDropdown: "#dropdown-business-entity-type",
    natureOfBusinessDropdown: "#dropdown-nature-of-business",
    submitButton: '[data-cy="button-next"]',
  };

  // Define the texts to verify
  texts = {
    companyDetailsHeader: "Company Details",
    basicsAboutBusiness: "Tell us some basics about your business.",
    countryOfRegistration: "Country of registration",
    EINTaxID: "EIN/ Tax ID",
    registeredDate: "Registered date",
    businessEntityType: "Business entity type",
    natureOfBusiness: "Nature of business",
    nextButton: "Next",
  };

  verifyElementVisibleWithText(selector, text) {
    cy.get(selector)
      .scrollIntoView()
      .should("contain.text", text)
      .and("be.visible");
  }

  selectDropdownOption(dropdownSelector, labelText, option) {
    this.verifyElementVisibleWithText(this.locators.form, labelText);
    cy.get(dropdownSelector).first().click().type(`${option}{enter}`);
  }

  verifyCompanyDetailsSection() {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.companyDetailsHeader
    );
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.basicsAboutBusiness
    );
    cy.contains("Tell us some basics about").should("be.visible");
  }

  selectCountryOfRegistration(country) {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.countryOfRegistration
    );
    this.selectDropdownOption(
      this.locators.countryOfRegistrationDropdown,
      this.texts.countryOfRegistration,
      country
    );
  }

  fillEIN_TaxID(taxID) {
    this.verifyElementVisibleWithText(this.locators.form, this.texts.EINTaxID);
    cy.get(this.locators.EINInput).type(taxID);
  }

  fillRegisteredDate(date) {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.registeredDate
    );
    cy.get(this.locators.registeredDateInput).click().type(date); // MM-DD-YYYY
    cy.get("body").click(0, 0); // Clicks at the top-left corner of the page to collapse the calendar
  }

  selectBusinessEntityType(entityType) {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.businessEntityType
    );
    this.selectDropdownOption(
      this.locators.businessEntityTypeDropdown,
      this.texts.businessEntityType,
      entityType
    );
  }

  selectNatureOfBusiness(natureOfBusiness) {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.natureOfBusiness
    );
    this.selectDropdownOption(
      this.locators.natureOfBusinessDropdown,
      this.texts.natureOfBusiness,
      natureOfBusiness
    );
  }

  submitForm() {
    this.verifyElementVisibleWithText(
      this.locators.form,
      this.texts.nextButton
    );
    cy.get(this.locators.submitButton).click();
  }

  fillCompanyDetails(
    country,
    taxId,
    companyRegisteredDate,
    businessEntityType,
    natureOfBusiness
  ) {
    this.verifyCompanyDetailsSection();
    this.selectCountryOfRegistration(country);
    this.fillEIN_TaxID(taxId);
    this.fillRegisteredDate(companyRegisteredDate);
    this.selectBusinessEntityType(businessEntityType);
    this.selectNatureOfBusiness(natureOfBusiness);
    this.submitForm();
  }
}

export default new CompanyRegistrationDetailsPage();
