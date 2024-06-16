import RegistrationPage from "../pageObjects/NiuralPartnerRegistration/registration-page.spec";
import VerificationPage from "../pageObjects/NiuralPartnerRegistration/verification-page.spec";
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";

import { registerUser } from "../fixtures/NiuralPartnerUser_TestData";

const serverID = "";
const serverDomain = "uhcir094.mailosaur.net";
const emailAddress = "check01@" + serverDomain;
it("Verify Registration with valid user details", () => {
  // Visit the URL
  cy.visit("https://qa.niural.com/");

  //Select Role for further process
  RoleSelectionPage.selectRole("Niural Partners");

  //Click Signup button for registration
  SignInPage.clickSignUpButton();
  cy.Signup_NiuralPartner_CreateAccount({
    firstName: registerUser.firstName,
    middleName: registerUser.middleName,
    lastName: registerUser.lastName,
    email: registerUser.email,
    companyName: registerUser.companyName,
    companyWebsite: registerUser.companyWebsite,
    businessClientsOption: registerUser.businessClientsOption,
    password: registerUser.password,
    confirmPassword: registerUser.password,
    phoneNumber: registerUser.phoneNumber,
  });

  cy.getOtp(serverID, emailAddress).then((otp) => {
    expect(otp).to.not.be.empty; // Assert OTP is not empty
    VerificationPage.enterOTP(otp);
  });

  //Submit the otp
  VerificationPage.clickSubmit();
  // Verify successful registration
  AccountantDashboardPage.verifyLogin(
    registerUser.firstName,
    registerUser.companyName
  );
});
