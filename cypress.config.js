const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    MAILOSAUR_API_KEY: "BhKvuspttCfue2IUuaCUngbhtk0eQP7I",
    MAILOSAUR_SERVER_ID: "uhcir094",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: "https://qa.niural.com/",
    defaultCommandTimeout: 15000,
  },

  reporter: "mocha-json-reporter", // Change the reporter to mocha-json-reporter
  reporterOptions: {
    reportDir: "report",
  },

  video: true,
});
