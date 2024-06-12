import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import { loginUser } from "../testdata";

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
    SignInPage.enterEmail(loginUser.email);
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

    SignInPage.enterEmail(loginUser.email);
    SignInPage.enterPassword("Pass@Word9867");
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
