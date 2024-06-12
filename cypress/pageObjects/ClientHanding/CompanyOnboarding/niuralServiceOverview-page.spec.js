class NiuralServiceOverviewPage {
  locators = {
    needsHeader: ".text-primary-subtle",
    needsMessage: "#appContentLayout",
    fullAccessFeature: "Full access to all Features",
    fullAccessRadio: 'input[type="radio"]',
    billPayFeature: "Niural Bill Pay only",
    submitButton: 'button[data-cy="button-next"]',
  };

  // Define the texts to verify
  texts = {
    needsHeader: "What do you need Niural to help with?",
    needsMessage:
      "Optimize your Niural experience by sharing your needs with us.",
    fullAccessFeature:
      "Get access to everything Niural offers, including Payroll, Contractor Hiring, EOR Hiring, and Niural Bill Pay module.",
    billPayFeature:
      "Streamline your needs with Niural Bill Pay, concentrating solely on our robust bill payment module.",
  };

  verifyNeedsHeader() {
    cy.contains(this.texts.needsHeader).should("be.visible");
    cy.get(this.locators.needsHeader).should(
      "contain.text",
      this.texts.needsHeader
    );
  }

  verifyNeedsMessage() {
    cy.get(this.locators.needsMessage).should(
      "contain.text",
      this.texts.needsMessage
    );
    cy.contains(this.texts.needsMessage).should("be.visible");
  }

  verifyFullAccessFeature() {
    cy.contains(this.locators.fullAccessFeature).should("be.visible");
    cy.get(this.locators.needsMessage).should(
      "contain.text",
      this.texts.fullAccessFeature
    );
    cy.get(this.locators.fullAccessRadio).eq(0).should("not.be.checked");
  }

  verifyBillPayFeature() {
    cy.contains(this.locators.billPayFeature)
      .scrollIntoView()
      .should("be.visible");
    cy.get(this.locators.needsMessage).should(
      "contain.text",
      this.texts.billPayFeature
    );
    cy.get(this.locators.fullAccessRadio).eq(1).should("not.be.checked");
  }

  clickFullAccessRadioButton() {
    cy.get(this.locators.fullAccessRadio).eq(0).click();
  }

  clickBillPayRadioButton() {
    cy.get(this.locators.fullAccessRadio).eq(1).click();
  }

  verifySubmitButtonDisabled() {
    cy.get(this.locators.submitButton).should("be.disabled");
  }

  clickSubmitButton() {
    cy.get(this.locators.submitButton).should("be.enabled").click();
  }
  verifyAllAvailableNeuralService() {
    this.verifyNeedsHeader();
    this.verifyNeedsMessage();
    this.verifyFullAccessFeature();
    this.verifyBillPayFeature();
    this.verifySubmitButtonDisabled();
  }
}

export default new NiuralServiceOverviewPage();
