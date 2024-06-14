export const loginUser = {
  firstName: "Michael",
  email: "michael.brown@uhcir094.mailosaur.net",
  password: "Password@123",
  companyName: "NextGen Innovations",
  invalidPassword: "PassC0de#09123",
  invalidEmail: "InvalidEmailTest@gmail.com",
};
//This is to test login flow, so a registered user is required.
//No need to change the details for this.

export const registerUser = {
  firstName: "Oliver",
  middleName: "James",
  lastName: "Smith",
  email: "oliver.smith789@uhcir094.mailosaur.net",
  companyName: "Creative Solutions LLC",
  companyWebsite: "www.creativesolutions.com",
  businessClientsOption: "5-10 clients",
  password: "Password@123",
  phoneNumber: "1234567890",
};
//This are the details that are need to onboard niural payroll partner
//Since it's for registration, we need to atleast change the email everytime running the test script "cypress/e2e/1signup.cy.js"

export const adminUser = {
  firstName: "Sophia",
  email: "sophia.johnson456@uhcir094.mailosaur.net",
  password: "Password@123",
  companyName: "Innovative Technologies Inc",
};
//These are the details form the onboarded niural payroll partner, extracted from registerUser
//Need to update accordingly with respect to "registerUser".
//Can still proceed without changing this detail
