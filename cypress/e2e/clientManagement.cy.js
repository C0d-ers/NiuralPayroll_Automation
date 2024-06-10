// Importing page objects
import RoleSelectionPage from "../pageObjects/roleSelection-page.spec";
import WelcomePage from "../pageObjects/welcome-page.spec";
import SignInPage from "../pageObjects/signIn-page.spec";
import ClientDetailsPage from "../pageObjects/clientDetails-page.spec";
import ClientListPage from "../pageObjects/clientList-page.spec";
import AccountantDashboardPage from "../pageObjects/accountantDashboard-page.spec";

// Importing test data
import { registerUser, clientRegistration } from "../testdata";

describe("Client Management", () => {
  beforeEach(() => {
    cy.visit("https://qa.niural.com/");

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
    ClientDetailsPage.fillCompanyName(clientRegistration.companyName);
    ClientDetailsPage.fillDBAName(clientRegistration.dbaName);
    ClientDetailsPage.fillNumberOfCurrentEmployees(
      clientRegistration.numOfCurrentEmployee
    );
    ClientDetailsPage.fillNumberOfCurrentContractors(
      clientRegistration.numOfCurrentContractors
    );
    ClientDetailsPage.fillFirstName(clientRegistration.firstName);
    ClientDetailsPage.fillLastName(clientRegistration.lastName);
    ClientDetailsPage.fillEmail(clientRegistration.email);
    ClientDetailsPage.fillCompanyWebsite(clientRegistration.companyWebsite);
    ClientDetailsPage.selectEmployeeNumber(clientRegistration.employeeNumber);
    ClientDetailsPage.fillPhoneNumber(
      clientRegistration.phoneExtension,
      clientRegistration.phoneNumber
    );
    ClientDetailsPage.clickNextButton();
    ClientDetailsPage.verifySuccessfulToast();
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
