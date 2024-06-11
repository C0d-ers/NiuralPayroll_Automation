import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/LandingPage/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import { registerUser } from "../testdata";

describe("Login", () => {
  beforeEach(() => {
    // Visit the URL
    cy.visit("/");

    //Select Role for further process
    RoleSelectionPage.selectRole("Niural Partners");
  });

  afterEach(() => {
    // Code to run after all tests in the suite
  });
  it("Verify login with valid credentials", () => {
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
    SignInPage.enterEmail(registerUser.email);
    SignInPage.enterPassword("paSsword@098123");
    SignInPage.clickLoginButton();

    SignInPage.verifyInvalidCredentialPrompt();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();
    SignInPage.verifyInvalidCredentialPromptAfterThreeFailedAttempt();
  });

  it("Verify login with invalid credentials", () => {
    SignInPage.enterEmail("test@mail.np");
    SignInPage.enterPassword("passwd!A098123");
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
