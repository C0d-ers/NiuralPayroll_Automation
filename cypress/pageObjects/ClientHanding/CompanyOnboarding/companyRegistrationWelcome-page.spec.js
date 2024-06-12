class CompanyRegistrationWelcomePage {
  locators = {
    welcomeMessage: ".text-primary-subtle",
    excitementMessage: "h3",
    personalizedMessage: "#appContentLayout",
    startButton: '[data-cy="button-next"]',
  };

  // Define the texts to verify
  texts = {
    welcome: "Welcome to Niural",
    excitement: "We’re excited to start working with you",
    personalized:
      "But first, let's get to know you better to personalize your account.",
    startButton: "Let’s start",
  };

  // Verify the welcome message
  verifyWelcomeMessage() {
    cy.get(this.locators.welcomeMessage)
      .should("contain.text", this.texts.welcome)
      .should("be.visible");
  }

  // Verify the excitement message
  verifyExcitementMessage() {
    cy.contains(this.texts.excitement).should("be.visible");
    cy.get(this.locators.excitementMessage).should(
      "contain.text",
      this.texts.excitement
    );
  }

  // Verify the personalized message
  verifyPersonalizedMessage() {
    cy.contains("But first, let's get to know").should("be.visible");
    cy.get(this.locators.personalizedMessage).should(
      "contain.text",
      this.texts.personalized
    );
  }

  // Click the start button
  clickStartButton() {
    cy.contains(this.texts.startButton).should("be.visible");
    cy.get(this.locators.startButton)
      .should("contain.text", this.texts.startButton)
      .click();
  }
  verifyMessages() {
    this.verifyWelcomeMessage();
    this.verifyExcitementMessage();
    this.verifyPersonalizedMessage();
  }
}

export default new CompanyRegistrationWelcomePage();
