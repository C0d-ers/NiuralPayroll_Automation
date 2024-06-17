// Importing page objects
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import ClientWelcomePage from "../pageObjects/ClientHanding/clientWelcome-page.spec";
import ClientListPage from "../pageObjects/NiuralPartnerLogin/clientList-page.spec";
import ClientOnboardingPage from "../pageObjects/ClientHanding/clientOnboarding-page.spec";
import "../support/commands";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";

// Importing test data
import { adminUser } from "../fixtures/NiuralPartnerUser_TestData";
import { clientRegistration } from "../fixtures/ClientDetails_TestData";

describe("Client Management", () => {
  beforeEach(() => {
    cy.visit("/");

    RoleSelectionPage.selectRole("Niural Partners");

    cy.Login(adminUser.email, adminUser.password);
    // Verify successful login
    AccountantDashboardPage.verifyLogin(
      adminUser.firstName,
      adminUser.companyName
    );
  });

  it.only("Addition of new client", () => {
    // Verify text on client welcome page
    ClientWelcomePage.verifyAddClientTexts();
    // Click on 'Add Client' button
    ClientWelcomePage.clickAddClient();

    // Verify text on revenue sharing page
    ClientWelcomePage.verifyRevenueSharingTexts();
    // Click on revenue sharing checkbox
    ClientWelcomePage.clickRevenueSharingCheckBox();
    // Click on final 'Add Client' button
    ClientWelcomePage.clickFinalAddClient();

    // Fill client details
    ClientOnboardingPage.interceptProfilePostRequest();
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
    ClientOnboardingPage.validateProfilePostRequest(
      clientRegistration.companyName,
      clientRegistration.dbaName,
      clientRegistration.firstName,
      clientRegistration.lastName,
      clientRegistration.email,
      clientRegistration.companyWebsite,
      clientRegistration.phoneExtension + clientRegistration.phoneNumber
    );
    ClientOnboardingPage.verifySuccessfulToast();
  });

  it("Verification of newly added client", () => {
    //Navigate to client list pages
    ClientWelcomePage.clickSideMenuClient();

    // Verify newly added client details on the client list page
    ClientListPage.verifyCompanyDisplayed(clientRegistration.companyName);
    ClientListPage.verifyClientNameDisplayed(
      clientRegistration.firstName + " " + clientRegistration.lastName
    );
    ClientListPage.verifyClientEmailDisplayed(clientRegistration.email);
  });
});
