Cypress - Automation Exercise Tests
This repository contains automation test cases for the Automation Exercise website https://automationexercise.com/, including:

1. Test Case 24: Download Invoice after Purchase Order
2. Test Case 26: Verify Scroll Up without 'Arrow' Button and Scroll Down Functionality & Delete Account
3. Search Product Functionality
4. Contact Form Submission
Prerequisites
Before running the tests, ensure that the following are installed on your machine:

Node.js (version 12 or higher) – Download Node.js
npm (Node package manager) – This comes installed with Node.js.
You also need Cypress installed to run the tests.

Getting Started
1. Clone the repository
git clone https://github.com/ShivamChinmali2110/cypress-project.git
cd cypress-project

2. Install dependencies
Install the necessary dependencies for Cypress and other packages by running:
npm install
##This will install Cypress and other required packages as specified in the package.json file.

3. Running the Tests
You can run the Cypress tests using the following commands:
Run Cypress in the Browser (Interactive Mode):
##This will open the Cypress Test Runner and allow you to select and run the test cases interactively.
npx cypress open
Run Cypress in Headless Mode:
To run all tests in headless mode (without opening the browser):
npx cypress run

4. Directory Structure
cypress/e2e: This folder contains the Cypress test case files:
testCase24.spec.cy.js: Test Case 24 – Download Invoice after Purchase Order
testCase26.spec.cy.js: Test Case 26 – Scroll Up/Down and Delete Account
testCaseSearch.cy.js: Search Product Functionality Test Case
testCaseCustom.cy.js: Contact Form Submission Test Case
cypress/fixtures: This folder contains the test data (JSON files) used in the tests.
user-credentials.json: Contains user credentials and test data.
cypress/support: This folder contains helper files such as custom commands.
commands.js: Custom Cypress commands for login, signup, etc.
