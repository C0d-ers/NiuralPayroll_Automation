class ClientOnboardingPage {
  locators = {
    form: "form",
    companyName: "#companyName",
    DBAName: "#DBAName",
    noOfCurrentEmployees: "#noOfCurrentEmployees",
    noOfCurrentContractors: "#noOfCurrentContractors",
    firstName: "#firstName",
    lastName: "#lastName",
    email: "#email",
    companyWebsite: 'input[name="companyWebsite"]',
    selectCompanyNumberMembers: "#select-company-number-members",
    selectPhoneExtension: "#select-phone-extension",
    phoneNumberInput: 'input[type="number"]',
    nextButton: "button:contains('Next')",
    toast: ".Toastify__toast-body",
  };

  validateVisibleText(text) {
    cy.contains(text).scrollIntoView().should("be.visible");
    cy.get(this.locators.form).should("contain.text", text);
  }

  fillCompanyName(companyName) {
    this.validateVisibleText("Company name");
    cy.get(this.locators.companyName).type(companyName).click();
  }

  fillDBAName(DBAName) {
    this.validateVisibleText("Doing business as (DBA name)");
    this.validateVisibleText(
      "The name you use when advertising or doing business"
    );
    cy.get(this.locators.DBAName).type(DBAName);
  }

  fillNumberOfCurrentEmployees(employees) {
    this.validateVisibleText("Number of current W-2 employees");
    this.validateVisibleText("If your client is not paying employees, enter 0");
    cy.get(this.locators.noOfCurrentEmployees).type(employees).click();
  }

  fillNumberOfCurrentContractors(contractors) {
    this.validateVisibleText("Number of current contractors");
    this.validateVisibleText(
      "If your client is not paying contractors, enter 0"
    );
    cy.get(this.locators.noOfCurrentContractors).type(contractors);
  }

  fillFirstName(firstName) {
    this.validateVisibleText("First name");
    cy.get(this.locators.firstName).type(firstName).click();
  }

  fillLastName(lastName) {
    this.validateVisibleText("Last name");
    cy.get(this.locators.lastName).type(lastName);
  }

  fillEmail(email) {
    this.validateVisibleText("Email");
    cy.get(this.locators.email).type(email);
  }

  fillCompanyWebsite(website) {
    this.validateVisibleText("Company website");
    cy.get(this.locators.companyWebsite).type(website);
  }

  selectEmployeeNumber(option) {
    this.validateVisibleText("No. of employees");
    this.validateVisibleText("Select from dropdown");
    cy.get(this.locators.selectCompanyNumberMembers).click();
    this.validateVisibleText("Less than 25");
    this.validateVisibleText("More than 50");
    this.validateVisibleText("Between 25 and 50");

    switch (option) {
      case "Less than 25":
        cy.get("#react-select-2-option-0").click();
        break;
      case "More than 50":
        cy.get("#react-select-2-option-2").click();
        break;
      case "Between 25 and 50":
        cy.get("#react-select-2-option-1").click();
        break;
      default:
        throw new Error("Invalid optionText provided");
    }
  }

  fillPhoneNumber(phoneExtension, phoneNumber) {
    cy.get(this.locators.selectPhoneExtension).contains(phoneExtension);
    cy.get(this.locators.phoneNumberInput).type(phoneNumber);
  }

  clickNextButton() {
    cy.get(this.locators.nextButton).should("be.visible").click();
  }

  verifySuccessfulToast() {
    cy.get(this.locators.toast).should("be.visible");
  }
}

export default new ClientOnboardingPage();
