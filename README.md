# Niural Payroll Automation
This repository contains the automation test scripts for the Niural Payroll webpage. The test scripts are written in JavaScript using Cypress.

## Prerequisites
Ensure that Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Installation
1. **Install Cypress**:
   npm install cypress --save-dev

2. **Verify Cypress Installation**:
   npx cypress --version

Cloning the Repository
  1. Open Visual Studio Code (VS Code).
  2. Navigate to the directory where you want to clone this project.
  3. Open the terminal and execute the following command
     git clone <url_to_this_repository>

Setup
  1. Navigate to the cloned project directory.
  2. Install the required plugins and dependencies
     npm install

## Folder Structure
NIURALPAYROLL_AUTOMATION
├── cypress                                                                                                                                                                                                                                          
│ ├── e2e // Contains the test scripts for system verification                                                                                                                                                                                       
│ │ ├── 1signup.cy.js                                                                                                                                                                                                                                
│ │ ├── 2login.cy.js                                                                                                                                                                                                                                 
│ │ ├── 3clientManagement.cy.js                                                                                                                                                                                                                      
│ │ ├── 4clientCompanyOnboarding.cy.js                                                                                                                                                                                                               
│ ├── fixtures                                                                                                                                                                                                                                       
│ │ ├── pageObjects.json // Handles imports (work in progress)                                                                                                                                                                                       
│ ├── pageObjects // Structured for the Page Object Model (POM)                                                                                                                                                                                      
│ │ ├── ClientHandling                                                                                                                                                                                                                               
│ │ │ ├── CompanyOnboarding                                                                                                                                                                                                                          
│ │ │ │ ├── clientOnboarding-page.spec.js                                                                                                                                                                                                            
│ │ │ │ ├── clientWelcome-page.spec.js                                                                                                                                                                                                               
│ │ ├── NiuralPartnerLogin                                                                                                                                                                                                                           
│ │ │ ├── accountantDashboard-page.spec.js                                                                                                                                                                                                           
│ │ │ ├── clientList-page.spec.js                                                                                                                                                                                                                    
│ │ ├── NiuralPartnerRegistration                                                                                                                                                                                                                    
│ │ │ ├── registration-page.spec.js                                                                                                                                                                                                                  
│ │ │ ├── verification-page.spec.js                                                                                                                                                                                                                  
│ │ ├── Role                                                                                                                                                                                                                                         
│ │ │ ├── roleSelection-page.spec.js                                                                                                                                                                                                                 
│ │ ├── signIn-page.spec.js                                                                                                                                                                                                                          
│ ├── screenshots // Contains screenshots if any test scripts fail                                                                                                                                                                                   
│ ├── support // Useful for writing reusable code                                                                                                                                                                                                    
│ │ ├── commands.js // Contains reusable code like OTP fetching                                                                                                                                                                                      
│ │ ├── e2e.js // Handles imports (work in progress)                                                                                                                                                                                                 
│ ├── videos // Contains videos of the test runs                                                                                                                                                                                                     
│ ├── testdata.js // Contains test data used by the scripts                                                                                                                                                                                          
├── node_modules
├── report.json
├── result.json // Summary report of test execution in JSON format
├── .gitignore // Specifies files to ignore in git
├── cypress.config.js // Basic Cypress configuration like timeout and URL
├── package-lock.json
├── package.json

Running Tests
To run all test scripts, use the following command: 
    npm run test:e2e
This command is configured in the package.json file and executes:
    cypress run --spec 'cypress/e2e/**/*.cy.js'
This runs all .cy.js files in the cypress/e2e/ directory in headless mode, generating a video of the test run.

Running Individual Tests
To run an individual test, use:
  npx cypress run --spec cypress/e2e/<file_name>.cy.js

Happy Automation!
