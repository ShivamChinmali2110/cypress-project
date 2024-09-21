// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json')

describe('Verify Contact Us Form Submission with File Upload', () => {  

    it('Test Case: Verify Contact Us Form Submission with Validation Checks', () => {
        // Step 1: Navigate to the Contact Us page
        cy.visit(`${userCredentials.baseUrl}/contact_us`)
    
        // Step 2: Attempt to submit the form with missing required fields
        cy.get('input[data-qa="submit-button"]').click()
    
        // Step 3: Validation messages are displayed for email field so only check email field for validation
        cy.get('input[data-qa="email"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    
        // Step 4: Fill out the form with an invalid email
        cy.get('input[data-qa="name"]').type(userCredentials.firstName)
        cy.get('input[data-qa="email"]').type('invalid-email')
        cy.get('textarea[data-qa="message"]').type('This is a test message for contact us form.')
    
        // Submit the form
        cy.get('input[data-qa="submit-button"]').click()
    
        // Step 5: Verify the validation message for an invalid email
        cy.get('input[data-qa="email"]').then(($input) => {
            expect($input[0].validationMessage).to.contain("Please include an '@' in the email address.")
        })
    
        // Step 6: Fill out the form with valid data but without choosing a file (if the file is required)
        cy.get('input[data-qa="email"]').clear().type(userCredentials.email)
    
        // Check if the file upload is required (Optional step depending on requirement)
        // If the file is required, submitting without it should show a validation message.
        cy.get('input[type="file"]').then(($input) => {
            if ($input[0].required) {
                // Try to submit without a file and check for validation
                cy.get('input[data-qa="submit-button"]').click()
                expect($input[0].validationMessage).to.eq('Please select a file.')
            }
        })
    
        // Step 7: Finally, fill out the form completely and submit with valid data and a file
        const filePath = 'cypress/fixtures/sample-file.txt'
        cy.get('input[type="file"]').selectFile(filePath)
        cy.get('input[data-qa="submit-button"]').click()
    
        // Verify success message
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
    })    
})
