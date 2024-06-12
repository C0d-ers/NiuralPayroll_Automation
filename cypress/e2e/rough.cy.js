// Importing page objects
import RoleSelectionPage from "../pageObjects/Role/roleSelection-page.spec";
import WelcomePage from "../pageObjects/ClientHanding/clientWelcome-page.spec";
import SignInPage from "../pageObjects/Role/signIn-page.spec";
import ClientDetailsPage from "../pageObjects/ClientHanding/clientDetails-page.spec";
import ClientListPage from "../pageObjects/ClientHanding/clientList-page.spec";
import AccountantDashboardPage from "../pageObjects/LandingPage/accountantDashboard-page.spec";
import { registerUser, clientRegistration } from "../testdata";

describe("Test", () => {
  it("should perform the test", () => {
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

    RoleSelectionPage.selectRole("Niural Partners");

    SignInPage.enterEmail(registerUser.email);
    SignInPage.enterPassword(registerUser.password);
    SignInPage.clickLoginButton();

    // Verify successful login
    AccountantDashboardPage.verifyLogin(
      registerUser.firstName,
      registerUser.companyName
    );

    WelcomePage.clickSideMenuClient();
    ClientListPage.verifyCompanyDisplayed(clientRegistration.companyName);
    ClientListPage.clickClientDisplayed(clientRegistration.companyName);
    cy.get("@windowOpen").should("have.been.calledOnce");

    //42-99
    cy.get(".text-primary-subtle").should("contain.text", "Welcome to Niural");
    cy.contains("Welcome to Niural").should("be.visible");

    cy.contains("We’re excited to start working with you").should("be.visible");
    cy.get("h3").should(
      "contain.text",
      "We’re excited to start working with you"
    );

    cy.contains("But first, let's get to know").should("be.visible");
    cy.get("#appContentLayout").should(
      "contain.text",
      "But first, let's get to know you better to personalize your account."
    );

    cy.contains("Let’s start").should("be.visible");
    cy.get('[data-cy="button-next"]').should("contain.text", "Let’s start");
    cy.get('[data-cy="button-next"]').click();

    cy.contains("What do you need Niural to help with?").should("be.visible");
    cy.get(".text-primary-subtle").should(
      "contain.text",
      "What do you need Niural to help with?"
    );

    cy.get("#appContentLayout").should(
      "contain.text",
      "Optimize your Niural experience by sharing your needs with us."
    );
    cy.contains(
      "Optimize your Niural experience by sharing your needs with us."
    ).should("be.visible");

    cy.contains("Full access to all Features").should("be.visible");
    cy.get("#appContentLayout").should(
      "contain.text",
      "Full access to all Features"
    );
    cy.get("#appContentLayout").should(
      "contain.text",
      "Get access to everything Niural offers, including Payroll, Contractor Hiring, EOR Hiring, and Niural Bill Pay module."
    );
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");

    cy.contains("Niural Bill Pay only").scrollIntoView().should("be.visible");
    cy.get("#appContentLayout").should("contain.text", "Niural Bill Pay only");
    cy.get("#appContentLayout").should(
      "contain.text",
      "Streamline your needs with Niural Bill Pay, concentrating solely on our robust bill payment module."
    );
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");

    cy.get('button[data-cy="button-next"]').should("be.disabled");

    cy.get('input[type="radio"]').eq(0).click();
    cy.get('button[data-cy="button-next"]').should("be.enabled");

    cy.get('button[data-cy="button-next"]').click();

    cy.contains("Company Details").should("be.visible");
    cy.get('h1[data-cy= "text-company-details"]').should(
      "contain.text",
      "Company Details"
    );

    //Comapny Details, basics info about business
    cy.get("form")
      .should("contain.text", "Company Details")
      .should("be.visible");

    cy.contains("Tell us some basics about").should("be.visible");
    cy.get("form").should(
      "contain.text",
      "Tell us some basics about your business."
    );

    cy.contains("Country of registration").should("be.visible");
    cy.get("form").should("contain.text", "Country of registration");
    cy.get(".css-1u6tjmp").first().click();
    cy.get("#react-select-2-input").type("United States{enter}");
    cy.get("#dropdown-country-of-registration div")
      .contains("United States")
      .should("be.visible");

    cy.contains("EIN/ Tax ID").should("be.visible");
    cy.get("form").should("contain.text", "EIN/ Tax ID");
    cy.get('input[name="EIN"]').type("123456120");

    cy.contains("Registered date").should("be.visible");
    cy.get("form").should("contain.text", "Registered date");
    cy.get("#date-registered-date").click().type("01-01-2022"); //MM-DD-YYYY
    // Assuming the calendar is open
    cy.get("body").click(0, 0); // Clicks at the top-left corner of the page

    //write a code to click something to collapse the calendar
    cy.contains("Date of company registration").should("be.visible");
    cy.get("form").should("contain.text", "Date of company registration");

    cy.contains("Business entity type").should("be.visible");
    cy.get("form").should("contain.text", "Business entity type");
    cy.get("#dropdown-business-entity-type")
      .click()
      .type("Limited liability company{enter}");

    cy.contains("Nature of business").should("be.visible");
    cy.get("form").should("contain.text", "Nature of business");
    cy.get("#dropdown-nature-of-business").click().type("Not Known{enter}");

    cy.contains("Next").should("be.visible");
    cy.get("form").should("contain.text", "Next");
    cy.get("button[type='submit']").click();

    //Address section

    cy.get("h1[data-cy='text-company-details']")
      .scrollIntoView()
      .should("contain.text", "Add address")
      .should("be.visible");
    cy.contains("Let us know where your").should("be.visible");
    cy.get("#appContentLayout").should(
      "contain.text",
      "Let us know where your business is located."
    );

    cy.contains("Registered Address").should("be.visible");
    cy.get("form").should("contain.text", "Registered Address");
    cy.contains("div", "CountryUnited States").should("be.visible");
    cy.get("form").should("contain.text", "Country");
    cy.contains(".mt-1", "United States").should("be.visible");

    cy.contains("Address line 1").first().should("be.visible");
    cy.get("form").should("contain.text", "Address line 1");
    cy.get("input[name='registeredAddress.address1']").type("Address Line 1");

    cy.contains("Address line 2").first().should("be.visible");
    cy.get("form").should("contain.text", "Address line 2");
    cy.get("input[name='registeredAddress.address2']").type("Address Line 1");
    cy.contains("Optional").first().should("be.visible");
    cy.get("form").should("contain.text", "Optional");

    cy.contains("City").should("be.visible");
    cy.get("form").should("contain.text", "City");
    cy.get("input[name='registeredAddress.city']").type("City of Kansas");

    cy.contains("State").should("be.visible");
    cy.get("form").should("contain.text", "State");
    cy.get(".css-ww1uop").first().click().type("Alabama{enter}");

    cy.contains("Zip code").should("be.visible");
    cy.get("form").should("contain.text", "Zip code");
    cy.get("input[name='registeredAddress.zipCode']").click().type("10001");

    cy.contains("Is the mailing address same as above ?").should("be.visible");
    cy.get("form").should(
      "contain.text",
      "Is the mailing address same as above ?"
    );
    //radio button that makes registered and mailing address same
    cy.get(".w-12").should("be.enabled");

    cy.get('button[data-cy="button-back"]').should("be.visible");
    cy.get("button[type='submit']").click();
  });
});
