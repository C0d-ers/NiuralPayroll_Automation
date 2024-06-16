class SignInPage {
  locators = {
    emailField: '[data-cy="input-email"]',
    passwordField: '[data-cy="input-password"]',
    loginButton: '[data-cy="button-login"]',
    signUpLink: '[data-cy="button-signUp"]',
    invalidCredentialMessage: ".py-5",
    forgotPasscode: '[data-cy="link-forgot-password"',
  };

  enterEmail(email) {
    cy.get(this.locators.emailField).type(email);
  }

  enterPassword(password) {
    cy.get(this.locators.passwordField).type(password);
  }

  clickLoginButton() {
    cy.get(this.locators.loginButton).click();
  }

  clickSignUpButton() {
    cy.get(this.locators.signUpLink).click();
  }

  verifyHeaderDuringRoleLogin(role) {
    cy.contains("Sign in as " + role).should("be.visible");
  }

  verifyInvalidCredentialPrompt() {
    cy.get(this.locators.invalidCredentialMessage)
      .contains("Sign in failed")
      .should("be.visible");
    cy.get(this.locators.invalidCredentialMessage)
      .contains("Incorrect username or password.")
      .should("be.visible");
  }
  verifyInvalidCredentialPromptAfterThreeFailedAttempt() {
    cy.get(this.locators.invalidCredentialMessage)
      .contains("Sign in failed")
      .should("be.visible");
    cy.get(this.locators.invalidCredentialMessage)
      .contains("Incorrect username or password. 2 attempts remaining.")
      .should("be.visible");
  }
  verifyNoAttemptRemainingPrompt() {
    cy.get(this.locators.invalidCredentialMessage)
      .contains("Incorrect username or password. 0 attempt remaining.")
      .should("be.visible");
  }
  verifyLoginButtonBeingDisabled() {
    cy.get(this.locators.loginButton).should("be.disabled");
  }
  verifyLoginAttemExceedPrompt() {
    cy.reload();
    cy.get(this.locators.invalidCredentialMessage).should(
      "contain.text",
      "Login attempts exceeded"
    );
  }
  interceptLoginRequest() {
    cy.intercept("POST", "https://cognito-idp.us-east-1.amazonaws.com/").as(
      "loginRequest"
    );
  }
  validateValidLoginRequest() {
    //verification of the first API called during the login
    cy.wait("@loginRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      // Assert the response status
      expect(interception.response.statusCode).to.eq(200);
      // Assert the response body
      expect(interception.response.body).to.have.property(
        "ChallengeName",
        "PASSWORD_VERIFIER"
      );
    });
    //verification of the second API called after success of first API
    cy.wait("@loginRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      expect(interception.response.body).to.have.property(
        "AuthenticationResult"
      );
      expect(interception.response.body.AuthenticationResult).to.have.property(
        "TokenType",
        "Bearer"
      );
    });
    //verification of the third API called after success of second API
    cy.wait("@loginRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      expect(interception.response.body)
        .to.have.property("UserAttributes")
        .that.is.an("array");
      expect(interception.response.body).to.have.property("Username");
    });
  }
  validateInvalidLoginRequest() {
    //verification of the first API called during the login
    cy.wait("@loginRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      // Assert the response status
      expect(interception.response.statusCode).to.eq(200);
      // Assert the response body
      expect(interception.response.body).to.have.property(
        "ChallengeName",
        "PASSWORD_VERIFIER"
      );
    });
    cy.wait("@loginRequest").then((interception) => {
      // Debugging: log the interception object to ensure it's as expected
      cy.log("Interception Object:", interception);
      console.log("Interception Object:", interception);

      // Ensure interception.response is defined
      expect(interception.response).to.not.be.undefined;
      // Ensure interception.response.body is defined
      expect(interception.response.body).to.not.be.undefined;

      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      // Assert the response status
      expect(interception.response.statusCode).to.eq(400);

      // Assert the response body contains the error message
      expect(interception.response.body).to.have.property(
        "__type",
        "NotAuthorizedException"
      );
      expect(interception.response.body).to.have.property(
        "message",
        "Incorrect username or password."
      );
    });
  }
}

export default new SignInPage();
