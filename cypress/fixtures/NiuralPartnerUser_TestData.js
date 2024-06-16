export const registerUser = {
  firstName: "Sakura",
  middleName: "Haruno",
  lastName: "Uzumaki",
  email: "sakura.uzumaki@uhcir094.mailosaur.net",
  companyName: "Hidden Leaf Enterprises",
  companyWebsite: "www.hiddenleaf.com",
  businessClientsOption: "5-10 Clients",
  password: "Password@123",
  phoneNumber: "1234567890",
};

//This are the details that are need to onboard niural payroll partner
//Since it's for registration, we need to atleast change the email everytime running the test script "cypress/e2e/1signup.cy.js"

export const loginUser = {
  firstName: registerUser.firstName,
  email: registerUser.email,
  password: registerUser.password,
  companyName: registerUser.companyName,
  invalidPassword: "PassC0de#09123",
  invalidEmail: "TestInvalidEmail@gmail.com",
};
//This is to test login flow, so a registered user is required.
//No need to change the details for this.

export const adminUser = {
  firstName: "Sophia",
  email: "sophia.johnson456@uhcir094.mailosaur.net",
  password: "Password@123",
  companyName: "Innovative Technologies Inc",
};
//These are the details form the onboarded niural payroll partner, extracted from registerUser
//Need to update accordingly with respect to "registerUser".
//Can still proceed without changing this detail
