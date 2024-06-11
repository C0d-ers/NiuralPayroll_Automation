class ClientListPage {
  verifyCompanyDisplayed(companyName) {
    cy.contains(".sc-dhKdcB", companyName)
      .should("be.visible")
      .should("contain", companyName);
  }

  verifyClientNameDisplayed(clientName) {
    cy.contains(".sc-dhKdcB", clientName)
      .should("be.visible")
      .should("contain", clientName);
  }

  verifyClientEmailDisplayed(clientEmail) {
    cy.contains(".sc-dhKdcB", clientEmail)
      .should("be.visible")
      .should("contain", clientEmail);
  }
  clickClientDisplayed(clientName) {
    cy.contains(".sc-dhKdcB", clientName).click();
  }
}

export default new ClientListPage();
