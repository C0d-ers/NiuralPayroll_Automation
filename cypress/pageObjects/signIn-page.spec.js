class SignInPage {
  locators = {
    signInTitle: "h1",
    emailField: "input[@name='email']",
    passwordField: 'input[name="password"]',
    loginButton: '[data-cy="login-button"]',
    signUpLink: '[data-cy="button-signUp"]',
  };

  enterEmail() {
    return cy.get(this.locators.emailField);
  }

  enterPassword() {
    return cy.get(this.locators.passwordField);
  }

  clickLoginButton() {
    cy.get(this.locators.loginButton).click();
  }

  clickSignUpButton() {
    cy.get(this.locators.signUpLink).click();
  }
}

export default new SignInPage();
