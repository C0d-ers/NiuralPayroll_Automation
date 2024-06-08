class RoleSelectionPage {
    locators = {
      employeeOption: '[data-cy="employee-option"]',
      employerOption: '[data-cy="employer-option"]',
      contractorOption: '[data-cy="contractor-option"]',
      niuralPartnersOption: ".space-y-9 a",
    };
    selectRole(role) {
      switch (role) {
        case 'Employee':
          cy.get(this.locators.employeeOption).click();
          break;
        case 'Employer':
          cy.get(this.locators.employerOption).click();
          break;
        case 'Contractor':
          cy.get(this.locators.contractorOption).click();
          break;
        case 'Niural Partners':
          cy.get(this.locators.niuralPartnersOption).last().click();
          break;
        default:
          throw new Error(`Invalid role: ${role}`);
      }
    }
  }
  
  export default new RoleSelectionPage();
  