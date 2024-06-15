class SignInPage {
  locators = {
    emailField: '[data-cy="input-email"]',
    passwordField: '[data-cy="input-password"]',
    loginButton: '[data-cy="button-login"]',
    signUpLink: '[data-cy="button-signUp"]',
    invalidCredentialMessage: '[data-slot="icon"]',
    forgotPasscode: '[data-cy="link-forgot-password"]',
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
}

export default new SignInPage();
