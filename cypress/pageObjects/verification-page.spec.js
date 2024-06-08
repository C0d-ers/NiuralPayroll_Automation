class VerificationPage {
  locators = {
    emailInputLabel: ".text-neutral-light-800",
    submitButton: 'button[type="submit"]',
    instructionsText: ".mt-10 > .mt-5",
    otpPlaceHolder:
      "input[aria-label='Please enter verification code. Digit 1']",
  };

  enterOTP(otp) {
    cy.get(this.locators.otpPlaceHolder).type(otp);
  }
  clickSubmit() {
    cy.get(this.locators.submitButton).click();
  }

  checkEmailInputLabel(email) {
    cy.get(this.locators.emailInputLabel).should(
      "contain",
      "Thank you for registering with us.\nWe sent you a temporary code to verify your email address.\nPlease check your email inbox at " +
        email +
        " and enter the code below."
    );
  }

  checkInstructionsText() {
    cy.get(this.locators.instructionsText).should(
      "contain",
      "You might want to check your promotions and spam folder if you can’t find the email."
    );
  }
}

export default new VerificationPage();
