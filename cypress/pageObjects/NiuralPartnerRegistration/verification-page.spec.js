class VerificationPage {
  locators = {
    submitButton: '[data-cy="button-submit"]',
    otpPlaceHolder: '[data-cy="otp-verify-email-0"]',
  };

  enterOTP(otp) {
    cy.get(this.locators.otpPlaceHolder).type(otp);
  }
  clickSubmit() {
    cy.get(this.locators.submitButton).click();
  }

  checkEmailInputLabel(email) {
    cy.contains(
      "Thank you for registering with us.\nWe sent you a temporary code to verify your email address.\nPlease check your email inbox at " +
        email +
        " and enter the code below."
    );
  }

  checkInstructionsText() {
    cy.contains(
      "You might want to check your promotions and spam folder if you can’t find the email."
    );
  }
}

export default new VerificationPage();
