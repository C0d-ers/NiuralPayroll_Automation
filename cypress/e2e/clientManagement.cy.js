// Importing page objects
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import WelcomePage from "../pageObjects/ClientHanding/clientWelcome-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import ClientOnboardingPage from "../pageObjects/ClientHanding/clientDetails-page.spec";
import ClientListPage from "../pageObjects/ClientHanding/clientList-page.spec";
import AccountantDashboardPage from "../pageObjects/LandingPage/accountantDashboard-page.spec";

// Importing test data
import { registerUser, clientRegistration } from "../testdata";

describe("Client Management", () => {
  beforeEach(() => {
    cy.visit("");

    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail(registerUser.email);
    SignInPage.enterPassword(registerUser.password);
    SignInPage.clickLoginButton();

    // Verify successful login
    AccountantDashboardPage.verifyLogin(
      registerUser.firstName,
      registerUser.companyName
    );
  });

  it("Addition of new client", () => {
    // Verify text on client welcome page
    WelcomePage.verifyAddClientTexts();
    // Click on 'Add Client' button
    WelcomePage.clickAddClient();

    // Verify text on revenue sharing page
    WelcomePage.verifyRevenueSharingTexts();
    // Click on revenue sharing checkbox
    WelcomePage.clickRevenueSharingCheckBox();
    // Click on final 'Add Client' button
    WelcomePage.clickFinalAddClient();

    // Fill client details
    ClientOnboardingPage.fillCompanyName(clientRegistration.companyName);
    ClientOnboardingPage.fillDBAName(clientRegistration.dbaName);
    ClientOnboardingPage.fillNumberOfCurrentEmployees(
      clientRegistration.numOfCurrentEmployee
    );
    ClientOnboardingPage.fillNumberOfCurrentContractors(
      clientRegistration.numOfCurrentContractors
    );
    ClientOnboardingPage.fillFirstName(clientRegistration.firstName);
    ClientOnboardingPage.fillLastName(clientRegistration.lastName);
    ClientOnboardingPage.fillEmail(clientRegistration.email);
    ClientOnboardingPage.fillCompanyWebsite(clientRegistration.companyWebsite);
    ClientOnboardingPage.selectEmployeeNumber(
      clientRegistration.employeeNumber
    );
    ClientOnboardingPage.fillPhoneNumber(
      clientRegistration.phoneExtension,
      clientRegistration.phoneNumber
    );
    ClientOnboardingPage.clickNextButton();
    ClientOnboardingPage.verifySuccessfulToast();
  });

  it("Verification of newly added client", () => {
    //Navigate to client list pages
    WelcomePage.clickSideMenuClient();

    // Verify newly added client details on the client list page
    ClientListPage.verifyCompanyDisplayed(clientRegistration.companyName);
    ClientListPage.verifyClientNameDisplayed(
      clientRegistration.firstName + " " + clientRegistration.lastName
    );
    ClientListPage.verifyClientEmailDisplayed(clientRegistration.email);
  });
});
