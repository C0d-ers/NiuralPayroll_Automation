import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import { loginUser } from "../fixtures/NiuralPartnerUser_TestData";

describe("Login", () => {
  beforeEach(() => {
    // Visit the URL
    cy.visit("/");
    SignInPage.interceptLoginRequest();
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

    //Verification of Response for successful Login
    SignInPage.validateValidLoginRequest();

    // Verify successful login redirection
    AccountantDashboardPage.verifyLogin(
      loginUser.firstName,
      loginUser.companyName
    );
  });

  it("Verify login with invalid credentials (valid email)", () => {
    cy.Login(loginUser.email, loginUser.invalidPassword);

    //Verification of Message after first invalid login attempt
    SignInPage.verifyInvalidCredentialPrompt();
    SignInPage.clickLoginButton();
    SignInPage.clickLoginButton();

    //Verification of API response during invalid Login
    SignInPage.validateInvalidLoginRequest();

    //Verification of message after three consecutive invalid password attempt
    SignInPage.verifyInvalidCredentialPromptAfterThreeFailedAttempt();
  });

  it("Verify login with invalid credentials", () => {
    cy.Login(loginUser.invalidEmail, loginUser.invalidPassword);

    //Verification of API response during invalid Login
    SignInPage.validateInvalidLoginRequest();

    //Verification of message with both invalid email and password
    SignInPage.verifyInvalidCredentialPrompt();
  });

  it("Verify Login Attempt exceed", () => {
    cy.Login(loginUser.email, loginUser.invalidPassword);
    for (let i = 0; i < 4; i++) {
      SignInPage.clickLoginButton();
    }
    //Verification of API response during invalid Login
    SignInPage.validateInvalidLoginRequest();

    //Verification of message when exceeding maximum invalid login attempt.
    SignInPage.verifyNoAttemptRemainingPrompt();
    SignInPage.verifyLoginButtonBeingDisabled();

    //Verification of message when user reloads after exeecding maximum invalid login attempt.
    SignInPage.verifyLoginAttemExceedPrompt();
  });
});
