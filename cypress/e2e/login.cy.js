import RoleSelectionPage from "../pageObjects/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/signIn-page.spec";
import { registerUser } from "../testdata";

describe("Login", () => {
  it("Verify login with valid credentials", () => {
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail(registerUser.email);
    SignInPage.enterPassword(registerUser.password);
    SignInPage.clickLoginButton();

    // Verify successful registration
    AccountantDashboardPage.verifyLogin(
      registerUser.firstName,
      registerUser.companyName
    );
  });
  it("Verify login with invalid credentials (valid email)", () => {
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail(registerUser.email);
    SignInPage.enterPassword("paSsword@098123");
    SignInPage.clickLoginButton();

    SignInPage.verifyInvalidCredentialPrompt();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    SignInPage.verifyInvalidCredentialPromptAfterThreeFailedAttempt();
  });

  it("Verify login with invalid credentials", () => {
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail("test@mail.np");
    SignInPage.enterPassword("passwd098123");
    SignInPage.clickLoginButton();

    SignInPage.verifyInvalidCredentialPrompt();
  });

  it("Verify Login Attempt exceed", () => {
    cy.visit("https://qa.niural.com/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail("bijay.chaudhary.01@mail7.io");
    SignInPage.enterPassword("Bijay@123456");
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();

    SignInPage.verifyNoAttemptRemainingPrompt();
    SignInPage.verifyLoginButtonBeingDisabled();
    SignInPage.verifyLoginAttemExceedPrompt();
  });
});
