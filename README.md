Getting Started
Follow these steps to download and set up the project on your local machine, install dependencies, and run the Cypress test cases.

Prerequisites
Before you can run the test cases, you need to ensure that the following are installed on your machine:

Node.js (Version 12.x or higher)
Download Node.js

npm (Comes with Node.js)
npm is the package manager for JavaScript. It will be used to install Cypress and other dependencies.

Step 1: Clone the Repository
First, clone the project repository to your local machine using Git.

git clone https://github.com/ShivamChinmali2110/cypress-project.git
Step 2: Navigate to the Project Directory
Change into the project directory where the repository was cloned.

cd cypress-project
Step 3: Install Dependencies
After cloning the repository, you need to install all the project dependencies. These are specified in the package.json file.

Run the following command to install all required dependencies, including Cypress:

npm install
This will install all the necessary packages, including Cypress, into the node_modules folder.

Step 4: Open Cypress
Once the dependencies are installed, you can open the Cypress Test Runner.

To open Cypress, run the following command:

npx cypress open
This will launch the Cypress Test Runner interface, where you can see the list of available test cases.

Step 5: Run the Test Case
From the Cypress Test Runner interface, select the test case you want to run. For example, to run the "Scroll Up without Arrow Button and Delete Account" test, select the corresponding spec file (e.g., testCase26.spec.js) from the test list.

Cypress will automatically open a browser and start executing the test.

Step 6: Run Tests in Headless Mode (Optional)
If you prefer to run the tests in headless mode (without opening the Cypress Test Runner), you can run the following command:

npx cypress run
This will run all the test cases in the background, and you will see the results in the terminal.

Step 7: (Optional) View Test Results
After running the tests, if you want to see detailed test reports or screenshots of any failures, you can check the following directories:

Test Results: Results of the tests will be output in the terminal or saved in a specified results directory if configured.
Screenshots (On Failure): If any test case fails, screenshots will be stored in the cypress/screenshots folder.
Additional Information
Project Structure
Here’s a breakdown of the key directories and files in this project:

cypress/: This directory contains all the Cypress-related files and test scripts.
cypress/integration/: This folder contains the test cases (spec files).
cypress/fixtures/: Contains the test data in JSON format (e.g., user credentials).
cypress/support/: Contains support files like custom Cypress commands (e.g., commands.js).
package.json: This file contains the project dependencies and scripts.

Common Commands
Install dependencies: npm install
Open Cypress Test Runner: npx cypress open
Run tests in headless mode: npx cypress run
