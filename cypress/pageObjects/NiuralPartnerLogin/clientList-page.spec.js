class ClientListPage {
  locators = {
    clientItem: ".sc-dhKdcB", // Locator for client list container, as this will catch if any new client is added
  };

  verifyCompanyDisplayed(companyName) {
    cy.contains(this.locators.clientItem, companyName)
      .should("be.visible")
      .should("contain", companyName);
  }

  verifyClientNameDisplayed(clientName) {
    cy.contains(this.locators.clientItem, clientName)
      .should("be.visible")
      .should("contain", clientName);
  }

  verifyClientEmailDisplayed(clientEmail) {
    cy.contains(this.locators.clientItem, clientEmail)
      .should("be.visible")
      .should("contain", clientEmail);
  }

  clickClientDisplayed(clientName) {
    cy.contains(this.locators.clientItem, clientName).click();
  }
}

export default new ClientListPage();
