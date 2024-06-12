// Importing page objects
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import ClientWelcomePage from "../pageObjects/ClientHanding/clientWelcome-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import ClientListPage from "../pageObjects/NiuralPartnerLogin/clientList-page.spec";
import AccountantDashboardPage from "../pageObjects/NiuralPartnerLogin/accountantDashboard-page.spec";
import CompanyRegistrationWelcomePage from "../pageObjects/ClientHanding/CompanyOnboarding/companyRegistrationWelcome-page.spec";
import NiuralServiceOverviewPage from "../pageObjects/ClientHanding/CompanyOnboarding/niuralServiceOverview-page.spec";
import CompanyRegistrationDetailsPage from "../pageObjects/ClientHanding/CompanyOnboarding/companyRegistrationDetails-page.spec";
import CompanyRegistrationAddressPage from "../pageObjects/ClientHanding/CompanyOnboarding/companyRegistrationAddress-page.spec";
import { adminUser, registeredClient, registerCompany } from "../testdata";

describe("Client Company Onboarding", () => {
  it("Verify valid onboarding of client's company", () => {
    cy.visit("/");

    // Stub window.open method early in the test
    cy.window().then((win) => {
      cy.stub(win, "open")
        .as("windowOpen")
        .callsFake((url) => {
          // Redirect the current window to the new URL
          win.location.href = url;
        });
    });

    //selection of role, to login accordingly
    RoleSelectionPage.selectRole("Niural Partners");

    //login
    SignInPage.performLogin(adminUser.email, adminUser.password);

    // Verify successful login
    AccountantDashboardPage.verifyLogin(
      adminUser.firstName,
      adminUser.companyName
    );

    //Verification of Client Page
    ClientWelcomePage.clickSideMenuClient();
    ClientListPage.verifyCompanyDisplayed(registeredClient.companyName);
    ClientListPage.clickClientDisplayed(registeredClient.companyName);
    //redirects the current window to new URL instead of Opening new tab
    cy.get("@windowOpen").should("have.been.calledOnce");

    //Welcome page during company registration
    CompanyRegistrationWelcomePage.verifyMessages();
    CompanyRegistrationWelcomePage.clickStartButton();

    //Service available for Company Registration
    NiuralServiceOverviewPage.verifyAllAvailableNeuralService();
    NiuralServiceOverviewPage.clickFullAccessRadioButton();
    NiuralServiceOverviewPage.clickSubmitButton();

    //Comapny Details, basics info about business
    CompanyRegistrationDetailsPage.fillCompanyDetails(
      registerCompany.country,
      registerCompany.EIN,
      registerCompany.registeredDate,
      registerCompany.businessEntityType,
      registerCompany.natureOfBusiness
    );

    // Company Address secion.
    CompanyRegistrationAddressPage.fillAddressPage(
      registerCompany.country,
      registerCompany.addressLine1,
      registerCompany.addressLine2,
      registerCompany.city,
      registerCompany.state,
      registerCompany.zipCode
    );
  });
});
