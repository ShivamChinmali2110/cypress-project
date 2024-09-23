// Add this in cypress/support/commands.js
import 'cypress-downloadfile/lib/downloadFileCommand';

// Command to fill the login form
Cypress.Commands.add('fillLoginForm', ({ email, password }) => {
    cy.get('input[data-qa="login-email"]').clear().type(email);
    cy.get('input[data-qa="login-password"]').clear().type(password);
    cy.get('button[data-qa="login-button"]').click();
});

// Command to sign up a user
Cypress.Commands.add('signupUser', (userCredentials) => {
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="signup-name"]').type(userCredentials.name);
    cy.get('input[data-qa="signup-email"]').type(userCredentials.email);
    cy.get('button[data-qa="signup-button"]').click();
    
    // Fill the account details form
    cy.fillAccountDetailsForm(userCredentials);

    cy.get('button[data-qa="create-account"]').click();
});

// Command to fill account details form during signup
Cypress.Commands.add('fillAccountDetailsForm', (userCredentials) => {
    cy.get('input[data-qa="password"]').type(userCredentials.password);
    cy.get('select[data-qa="days"]').select(userCredentials.days);
    cy.get('select[data-qa="months"]').select(userCredentials.months);
    cy.get('select[data-qa="years"]').select(userCredentials.years);
    cy.get('input[data-qa="first_name"]').type(userCredentials.firstName);
    cy.get('input[data-qa="last_name"]').type(userCredentials.lastName);
    cy.get('input[data-qa="company"]').type(userCredentials.company);
    cy.get('input[data-qa="address"]').type(userCredentials.address);
    cy.get('select[data-qa="country"]').should('be.visible').select(userCredentials.country);
    cy.get('input[data-qa="state"]').type(userCredentials.state);
    cy.get('input[data-qa="city"]').type(userCredentials.city);
    cy.get('input[data-qa="zipcode"]').type(userCredentials.zipcode);
    cy.get('input[data-qa="mobile_number"]').type(userCredentials.mobile);
});

Cypress.Commands.add('fillPaymentDetails', (paymentDetails) => {
    // Specifically check if "Name on Card" is empty and handle accordingly
    if (paymentDetails.name_on_card !== "") {
        cy.get('input[data-qa="name-on-card"]').clear().type(paymentDetails.name_on_card);
    } else {
        // Clear the "Name on Card" field to trigger validation
        cy.get('input[data-qa="name-on-card"]').clear();
    }

    // Fill other payment details regardless of validation (as these fields don't trigger validation)
    cy.get('input[data-qa="card-number"]').clear().type(paymentDetails.card_number);
    cy.get('input[data-qa="cvc"]').clear().type(paymentDetails.cvc);
    cy.get('input[data-qa="expiry-month"]').clear().type(paymentDetails.expiry_month);
    cy.get('input[data-qa="expiry-year"]').clear().type(paymentDetails.expiry_year);
    
    // Click the pay button
    cy.get('button[data-qa="pay-button"]').click();
});

// Command to download file
Cypress.Commands.add('downloadFile', (url, directory, filename) => {
    cy.request(url).then((response) => {
        cy.writeFile(`${directory}/${filename}`, response.body);
    });
});

// Command to assert text within an element
Cypress.Commands.add('getElementAndAssertText', (selector, text) => {
    cy.get(selector).should('be.visible').and('contain.text', text);
});
