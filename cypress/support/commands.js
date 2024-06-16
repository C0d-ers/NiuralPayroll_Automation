//These commands are used for better code redability and usability
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import RegistrationPage from "../pageObjects/NiuralPartnerRegistration/registration-page.spec";

Cypress.Commands.add("Login", (email, password, role) => {
  //On using the session the site redirects to the employer account rather than the Accountant.
  if (role) {
    cy.session([email, password], () => {
      cy.visit("/");
      RoleSelectionPage.selectRole(role);
      performLogin(email, password);
      //cy.location("pathname").should("eq", "/");
      cy.contains("Welcome Michael").should("be.visible");
    });
  } else {
    performLogin(email, password);
  }
});

function performLogin(email, password) {
  SignInPage.enterEmail(email);
  SignInPage.enterPassword(password);
  SignInPage.clickLoginButton();
}

Cypress.Commands.add("Signup_NiuralPartner_CreateAccount", (userData) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    companyName,
    companyWebsite,
    businessClientsOption,
    password,
    confirmPassword,
    phoneNumber,
  } = userData;

  RegistrationPage.enterFirstName(firstName);
  RegistrationPage.enterMiddleName(middleName);
  RegistrationPage.enterLastName(lastName);
  RegistrationPage.enterEmail(email);
  RegistrationPage.enterCompanyName(companyName);
  RegistrationPage.enterCompanyWebsite(companyWebsite);
  RegistrationPage.selectBusinessClientsOption(businessClientsOption);
  RegistrationPage.enterPassword(password);
  RegistrationPage.enterConfirmPassword(confirmPassword);
  RegistrationPage.enterPhoneNumber(phoneNumber);

  RegistrationPage.clickNextButton();
});

import "cypress-mailosaur";
Cypress.Commands.add("getOtp", (emailAddress) => {
  const serverId = Cypress.env("MAILOSAUR_SERVER_ID");
  cy.mailosaurGetMessage(serverId, {
    sentTo: emailAddress,
  }).then((email) => {
    const otp = email.html.body.match(/(\d{6})/)[0];
    return otp;
  });
});
