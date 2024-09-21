// Add this in cypress/support/commands.js
import 'cypress-downloadfile/lib/downloadFileCommand'

// Command to fill the login form
Cypress.Commands.add('fillLoginForm', ({ email, password }) => {
    cy.get('input[data-qa="login-email"]').type(email)
    cy.get('input[data-qa="login-password"]').type(password)
    cy.get('button[data-qa="login-button"]').click()
})

// Command to sign up a user
Cypress.Commands.add('signupUser', (userCredentials) => {
    cy.contains('Signup / Login').click()
    cy.get('input[data-qa="signup-name"]').type(userCredentials.name)
    cy.get('input[data-qa="signup-email"]').type(userCredentials.email)
    cy.get('button[data-qa="signup-button"]').click()
    
    // Fill the account details form
    cy.get('input[data-qa="password"]').type(userCredentials.password)
    cy.get('select[data-qa="days"]').select(userCredentials.days)
    cy.get('select[data-qa="months"]').select(userCredentials.months)
    cy.get('select[data-qa="years"]').select(userCredentials.years)
    
    // Assuming there's a gender selection, and more details to fill
    cy.get('input[data-qa="first_name"]').type(userCredentials.firstName)
    cy.get('input[data-qa="last_name"]').type(userCredentials.lastName)
    cy.get('input[data-qa="company"]').type(userCredentials.company)
    cy.get('input[data-qa="address"]').type(userCredentials.address)
    // Assuming the correct selector and element type
    cy.get('select[data-qa="country"]').should('be.visible').select(userCredentials.country)

    cy.get('input[data-qa="state"]').type(userCredentials.state)
    cy.get('input[data-qa="city"]').type(userCredentials.city)
    cy.get('input[data-qa="zipcode"]').type(userCredentials.zipcode)
    cy.get('input[data-qa="mobile_number"]').type(userCredentials.mobile)
    
    cy.get('button[data-qa="create-account"]').click()
})

// Command to fill checkout details
/*Cypress.Commands.add('fillCheckoutDetails', (userCredentials) => {
    // Fill in checkout details
    cy.get('input[data-qa="first_name"]').type(userCredentials.firstName)
    cy.get('input[data-qa="last_name"]').type(userCredentials.lastName)
    cy.get('input[data-qa="company"]').type(userCredentials.company)
    cy.get('input[data-qa="address"]').type(userCredentials.address)
    cy.get('input[data-qa="country"]').select(userCredentials.country)
    cy.get('input[data-qa="state"]').type(userCredentials.state)
    cy.get('input[data-qa="city"]').type(userCredentials.city)
    cy.get('input[data-qa="zipcode"]').type(userCredentials.zipcode)
    cy.get('input[data-qa="mobile"]').type(userCredentials.mobile)
    
    // Assuming there's payment detail fields
    cy.get('input[data-qa="name-on-card"]').type('shivam chinmali')
    cy.get('input[data-qa="card-number"]').type('1234 5678 9123 4567')
    cy.get('input[data-qa="cvc"]').type('123')
    cy.get('input[data-qa="expiry-month"]').type('12')
    cy.get('input[data-qa="expiry-year"]').type('2025')
    
    cy.get('button[data-qa="pay-button"]').click()
})*/

// Command to download file
Cypress.Commands.add('downloadFile', (url, directory, filename) => {
    cy.request(url).then((response) => {
        cy.writeFile(`${directory}/${filename}`, response.body)
    })
})

// Command to assert text within an element
Cypress.Commands.add('getElementAndAssertText', (selector, text) => {
    cy.get(selector).should('be.visible').and('contain.text', text)
})
