module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://qa.niural.com/",
    defaultCommandTimeout: 15000,
  },
  reporter: "mocha-json-reporter", // Change the reporter to mocha-json-reporter
  reporterOptions: {
    reportDir: "report",
  },
  video: true,
};
