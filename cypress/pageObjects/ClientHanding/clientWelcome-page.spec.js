class ClientWelcomePage {
  addClientTexts = [
    "Add a client",
    "Setup new client for your firm to manage",
    "Add client",
  ];

  revenueSharingTexts = [
    "The client with revenue sharing for your firm",
    "We’ll bill your client at the standard rate, and you’ll get money every month based on the cost of your client’s plan.",
  ];

  locators = {
    appContentLayout: "#appContentLayout",
    addClientButton: "button:contains('Add client')",
    addClientHeading: "button:contains('Add Client')",
    revenueSharingCheckBox: ".h-\\[60\\%\\]",
    sideMenuClient: "a[data-cy='side-menu-Clients']",
  };

  verifyTextInAppContentLayout(text) {
    cy.contains(this.locators.appContentLayout, text);
  }

  clickButtonWithText(buttonText) {
    cy.get(`button:contains('${buttonText}')`).should("be.visible").click();
  }

  verifyAddClientTexts() {
    this.addClientTexts.forEach((text) =>
      this.verifyTextInAppContentLayout(text)
    );
  }

  clickAddClient() {
    this.clickButtonWithText("Add client");
  }

  verifyRevenueSharingTexts() {
    this.revenueSharingTexts.forEach((text) =>
      this.verifyTextInAppContentLayout(text)
    );
  }

  clickRevenueSharingCheckBox() {
    cy.get(this.locators.revenueSharingCheckBox).should("be.visible").click();
  }

  clickFinalAddClient() {
    this.clickButtonWithText("Add Client");
  }
  clickSideMenuClient() {
    cy.get(this.locators.sideMenuClient).click();
  }
}

export default new ClientWelcomePage();
