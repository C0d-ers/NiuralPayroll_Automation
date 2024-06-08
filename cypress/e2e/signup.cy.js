import RegistrationPage from "../pageObjects/registration-page.spec";
import VerificationPage from "../pageObjects/verification-page.spec";
import RoleSelectionPage from "../pageObjects/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/signIn-page.spec";

import { registerUser } from "../testdata";
import "../support/commands";
import verificationPageSpec from "../pageObjects/verification-page.spec";

describe("Registration", () => {
  it.skip("Verify Registration with valid user details", () => {
    // Visit the URL
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    //Click Signup button for registration
    SignInPage.clickSignUpButton();

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
    VerificationPage.checkEmailInputLabel(registerUser.email);
    VerificationPage.checkInstructionsText();

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
});
