class SignInPage {
  locators = {
    signInTitle: "h1",
    emailField: "input[name='email']",
    passwordField: 'input[name="password"]',
    loginButton: "button[type='submit']",
    signUpLink: '[data-cy="button-signUp"]',
    invalidCredentialMessage: "#root",
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
  performLogin(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }
}

export default new SignInPage();
