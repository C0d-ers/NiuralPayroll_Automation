import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import { loginUser } from "../testdata";

import { Login } from "../support/commands";

describe("Login", () => {
  beforeEach(() => {
    // Visit the URL
    cy.visit("/");

    //Select Role for further process
    //Since we are testing login, so going throught the very start selecting the role covers better login functionality
    RoleSelectionPage.selectRole("Niural Partners");
  });

  afterEach(() => {
    // Code to run after all tests in the suite
  });
  it("Verify login with valid credentials", () => {
    //login test steps
    SignInPage.enterEmail(loginUser.email);
    SignInPage.enterPassword(loginUser.password);
    SignInPage.clickLoginButton();

    // Verify successful registration
    AccountantDashboardPage.verifyLogin(
      loginUser.firstName,
      loginUser.companyName
    );
  });
  it("Verify login with invalid credentials (valid email)", () => {
    cy.Login(loginUser.email, "paSsword@098123");

    //Verification of message during first invalid passowrd attempt
    SignInPage.verifyInvalidCredentialPrompt();

    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    //Verification of message after three consecutive invalid password attempt
    SignInPage.verifyInvalidCredentialPromptAfterThreeFailedAttempt();
  });

  it("Verify login with invalid credentials", () => {
    cy.Login("test@mail.np", "paSsword@098123");
    //Verification of message with both invalid email and password
    SignInPage.verifyInvalidCredentialPrompt();
  });

  it("Verify Login Attempt exceed", () => {
    cy.Login(loginUser.email, "paSsword@098123");
    for (let i = 0; i < 4; i++) {
      SignInPage.clickLoginButton();
    }
    //Verification of message when exceeding maximum invalid login attempt.
    SignInPage.verifyNoAttemptRemainingPrompt();
    SignInPage.verifyLoginButtonBeingDisabled();
    SignInPage.verifyLoginAttemExceedPrompt();
  });
});
