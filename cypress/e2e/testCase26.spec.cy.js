// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json')

describe('Test Case 26: Verify Scroll Up without "Arrow" Button and Scroll Down Functionality & Delete Account', () => {
    it("Test Case 26: Verify Scroll Up without 'Arrow' Button and Scroll Down Functionality & Delete Account", () => {
        
        // Step 1: Scroll Down to the Bottom of the Page
        cy.visit(userCredentials.baseUrl)

        // Capture the position of the header before scrolling
        cy.get("#slider-carousel").then(($el) => {
            const positionBefore = $el.position()

            // Scroll to the bottom of the page
            cy.scrollTo('bottom')

            // Verify that the footer content is visible
            cy.get("#footer").should("be.visible")

            // Scroll up to the top of the page
            cy.scrollTo('top')

            // Step 3: Verify that important content (navigation links, headers) is visible again
            cy.get("#slider-carousel").should("be.visible")

            // Check that the position after scrolling matches the position before scrolling
            cy.get("#slider-carousel").then(($elAfter) => {
                const positionAfter = $elAfter.position()
                expect(positionBefore.top).to.equal(positionAfter.top)
            })
        })

        // Step 4: Delete Account
        // Assuming the user is already logged in or registered for this test
        cy.signupUser(userCredentials) // Using the existing signupUser utility function
        cy.get('[data-qa="continue-button"]').should('be.visible').click()

        // Click 'Delete Account' button
        cy.contains("Delete Account").click()
        
        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.getElementAndAssertText('[data-qa="account-deleted"]', "Account Deleted!")
        cy.get('[data-qa="continue-button"]').should("be.visible").click()
    })        
})
