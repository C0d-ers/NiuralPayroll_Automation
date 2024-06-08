class AccountantDashboardPage {
  locators = {
    userNameTitle: "h1",
    roleTitle: ".caption",
    companyTitle: ".w-32",
  };

  verifyLogin(userName, companyName) {
    cy.get(this.locators.userNameTitle).should("contain", userName);
    cy.get(this.locators.roleTitle).should("contain", "Accountant");
    cy.get(this.locators.companyTitle).should("contain", companyName);
  }
}
export default new AccountantDashboardPage();
