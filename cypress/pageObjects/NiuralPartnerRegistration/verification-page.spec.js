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
  interceptOTPVerificationRequest() {
    cy.intercept("POST", "https://cognito-idp.us-east-1.amazonaws.com/").as(
      "otpRequest"
    );
  }
  validateInvalidOTPVerificationRequest() {
    //verification of the first API called during the login
    cy.wait("@otpRequest").then((interception) => {
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
        "CodeMismatchException"
      );
      expect(interception.response.body).to.have.property(
        "message",
        "Invalid verification code provided, please try again."
      );
    });
  }
  validateValidOTPVerificationRequest() {
    //First one is to skip the API that comes right after submitting Signup details.
    cy.wait("@otpRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      // Assert the response status
      expect(interception.response.statusCode).to.eq(200);
      // Assert the response body
      //expect(interception.response.body).to.deep.equal({});
    });
    //First API that yields empty response after submitting OTP
    cy.wait("@otpRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      // Assert the response status
      expect(interception.response.statusCode).to.eq(200);
      // Assert the response body
      expect(interception.response.body).to.deep.equal({});
    });

    //API check from here are further process for user to login page.
    cy.wait("@otpRequest").then((interception) => {
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
    cy.wait("@otpRequest").then((interception) => {
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
    cy.wait("@otpRequest").then((interception) => {
      // Assert the HTTP method used for login
      expect(interception.request.method).to.eq("POST");
      expect(interception.response.body)
        .to.have.property("UserAttributes")
        .that.is.an("array");
      expect(interception.response.body).to.have.property("Username");
    });
  }
}

export default new VerificationPage();
