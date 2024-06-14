import RegistrationPage from "../pageObjects/NiuralPartnerRegistration/registration-page.spec";
import VerificationPage from "../pageObjects/NiuralPartnerRegistration/verification-page.spec";
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";

import { registerUser } from "../fixtures/NiuralPartnerUser_TestData";

import "../support/commands";

describe("Registration", () => {
  beforeEach(() => {
    // Visit the URL
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    //Click Signup button for registration
    SignInPage.clickSignUpButton();
  });

  afterEach(() => {
    // Code to run after all tests in the suite
  });

  it("Verify Registration with valid user details", () => {
    //Enter the user's details
    RegistrationPage.enterFirstName(registerUser.firstName);
    RegistrationPage.enterMiddleName(registerUser.middleName);
    RegistrationPage.enterLastName(registerUser.lastName);
    RegistrationPage.enterEmail(registerUser.email);
    RegistrationPage.enterCompanyName(registerUser.companyName);
    RegistrationPage.enterCompanyWebsite(registerUser.companyWebsite);
    RegistrationPage.selectBusinessClientsOption(
      registerUser.businessClientsOption
    );
    RegistrationPage.enterPassword(registerUser.password);
    RegistrationPage.enterConfirmPassword(registerUser.password);
    RegistrationPage.enterPhoneNumber(registerUser.phoneNumber);
    RegistrationPage.clickNextButton();

    //Wait, since api loads faster than the mail
    cy.wait(5000);

    //Get OTP by using the commands, located in support folder.
    cy.signInAndGetOTP();

    // Assert OTP is fetched
    cy.get("@code").then((otp) => {
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

  it("Verify Registration with existing user details", () => {
    //Enter the user's details
    RegistrationPage.enterFirstName(registerUser.firstName);
    RegistrationPage.enterMiddleName(registerUser.middleName);
    RegistrationPage.enterLastName(registerUser.lastName);
    RegistrationPage.enterEmail(registerUser.email);
    RegistrationPage.enterCompanyName(registerUser.companyName);
    RegistrationPage.enterCompanyWebsite(registerUser.companyWebsite);
    RegistrationPage.selectBusinessClientsOption(
      registerUser.businessClientsOption
    );
    RegistrationPage.enterPassword(registerUser.password);
    RegistrationPage.enterConfirmPassword(registerUser.password);
    RegistrationPage.enterPhoneNumber(registerUser.phoneNumber);

    RegistrationPage.clickNextButton();
    RegistrationPage.verifyAccountAlreadyExistsPopup(registerUser.email);
  });

  it("Verify Terms of Service link", () => {
    RegistrationPage.verifyTermsOfServiceHyperLink();
  });

  it("Verify Terms of Privacy Policy link", () => {
    RegistrationPage.verifyPrivacyPolicyLink();
  });
});
