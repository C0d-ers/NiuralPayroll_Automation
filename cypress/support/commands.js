Cypress.Commands.add("signInAndGetOTP", () => {
  cy.request({
    method: "POST",
    url: "https://mailosaur.com/api/identity/v1/accounts:signInWithPassword?key=AIzaSyD4Bwhfg41ZMf06jAcxJ44lSRjXfimpIgU",
    body: {
      returnSecureToken: true,
      email: "johndoe1@mailsac.com",
      password: "Password@123",
      clientType: "CLIENT_TYPE_WEB",
      tenantId: "production-rfav6",
    },
  }).then((response) => {
    const idToken = response.body.idToken;
    Cypress.env("bearerToken", idToken);

    cy.request({
      method: "GET",
      url: "https://mailosaur.com/api/messages?server=uhcir094&page=0&itemsPerPage=50&dir=Received",
      headers: {
        Authorization: `Bearer ${Cypress.env("bearerToken")}`,
      },
    }).then((response) => {
      if (response.body.items && response.body.items.length > 0) {
        for (let i = 0; i < response.body.items.length; i++) {
          const email = response.body.items[i];
          if (email.from[0].email === "admin@niural.com") {
            Cypress.env("mailId", email.id);
            break;
          }
        }
      }

      cy.request({
        method: "GET",
        url: `https://mailosaur.com/api/messages/${Cypress.env("mailId")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("bearerToken")}`,
        },
      }).then((response) => {
        const codes = response.body.html.codes;
        for (let i = 0; i < codes.length; i++) {
          if (codes[i].value) {
            const code = codes[i].value;
            cy.wrap(code).as("code");
            break;
          }
        }

        cy.request({
          method: "DELETE",
          url: "https://mailosaur.com/api/messages?server=uhcir094",
          headers: {
            Authorization: `Bearer ${Cypress.env("bearerToken")}`,
          },
        });
      });
    });
  });
});
