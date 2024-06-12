//NOTE: Do not change the email domain, it must be "@uhcir094.mailosaur.net"

export const loginUser = {
  firstName: "Michael",
  email: "michael.brown@uhcir094.mailosaur.net",
  password: "Password@123",
  companyName: "NextGen Innovations",
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

export const clientRegistration = {
  companyName: "Innovative Tech Solutions",
  dbaName: "Innovative Tech",
  numOfCurrentEmployee: "55",
  numOfCurrentContractors: "8",
  firstName: "Emma",
  middleName: "Grace",
  lastName: "Taylor",
  email: "emma.taylor456@uhcir094.mailosaur.net",
  companyWebsite: "www.innovativetechsolutions.com",
  employeeNumber: "Between 25 and 50",
  phoneExtension: "+1",
  phoneNumber: "1222560090",
};

//These are the details that are used for client registration after a niural partner logs in.
//Need to Change as we cannot onboard same client again and again.
//need to change when running "cypress/e2e/3clientManagement.cy.js" everytime

export const registeredClient = {
  companyName: "Innovative Tech Solutions",
  firstName: "Emma",
  lastName: "Taylor",
  email: "emma.taylor456@uhcir094.mailosaur.net",
};
//These are the details of added client, Asserting these details will allow to further onboard the client details
//Change details in accordance with "clientRegistration"
//Above data should be same as "clientRegistration" regardless of if any script is executed or not.

export const registerCompany = {
  country: "United States",
  EIN: "123456789",
  registeredDate: "05-15-2024",
  businessEntityType: "LLC",
  natureOfBusiness: "Not Known",
  addressLine1: "789 Maple Avenue",
  addressLine2: "Suite 300",
  city: "New York",
  state: "New York",
  zipCode: "10001",
};
//These are the details to register company of the client.
//This needs to be change as we cannot register same company again and again
//need to change when running "cypress/e2e/4clientCompanyOnboarding.cy.js" everytime
