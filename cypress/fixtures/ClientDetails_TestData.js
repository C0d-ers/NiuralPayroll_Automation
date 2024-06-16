//NOTE: Do not change the email domain, it must be "@uhcir094.mailosaur.net"
export const clientRegistration = {
  companyName: "Konoha Enterprises",
  dbaName: "Konoha",
  numOfCurrentEmployee: "20",
  numOfCurrentContractors: "5",
  firstName: "Naruto",
  middleName: "Sage",
  lastName: "Uzumaki",
  email: "naruto.uzumaki@uhcir094.mailosaur.net",
  companyWebsite: "www.konohaenterprises.com",
  employeeNumber: "Between 25 and 50",
  phoneExtension: "+1",
  phoneNumber: "1333567890",
};

//These are the details that are used for client registration after a niural partner logs in.
//Need to Change as we cannot onboard same client again and again.
//need to change when running "cypress/e2e/3clientManagement.cy.js" everytime

export const registeredClient = {
  companyName: clientRegistration.companyName,
  firstName: clientRegistration.firstName,
  lastName: clientRegistration.lastName,
  email: clientRegistration.email,
};
//These are the details of added client, Asserting these details will allow to further onboard the client details
//Change details in accordance with "clientRegistration"
//Above data should be same as "clientRegistration" regardless of if any script is executed or not.
