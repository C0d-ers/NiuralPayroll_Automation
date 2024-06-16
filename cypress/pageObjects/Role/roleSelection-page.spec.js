class RoleSelectionPage {
  locators = {
    employeeOption: "[data-cy='employee-login']",
    employerOption: "[data-cy='employer-login']",
    contractorOption: '[data-cy="contractor-login"]',
    niuralPartnersOption: '[data-cy="accountant-login"]',
  };
  selectRole(role) {
    switch (role) {
      case "Employee":
        cy.get(this.locators.employeeOption).click();
        break;
      case "Employer":
        cy.get(this.locators.employerOption).click();
        break;
      case "Contractor":
        cy.get(this.locators.contractorOption).click();
        break;
      case "Niural Partners":
        cy.get(this.locators.niuralPartnersOption).last().click();
        break;
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }
}

export default new RoleSelectionPage();
