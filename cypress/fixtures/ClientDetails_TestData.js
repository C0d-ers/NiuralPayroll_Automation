//NOTE: Do not change the email domain, it must be "@uhcir094.mailosaur.net"
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
