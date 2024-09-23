// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json');

describe('Test Case 26: Verify Scroll Up without "Arrow" Button, Scroll Down Functionality & Delete Account', () => {

    beforeEach(() => {
        // Visiting the base URL before each test
        cy.visit(userCredentials.baseUrl);
    });

    it("should scroll to the bottom and back up without the 'Arrow' button", () => {
        
        // Step 1: Capture the initial position of the header element (e.g., carousel)
        cy.get("#slider-carousel").then(($el) => {
            const positionBeforeScroll = $el.position();

            // Step 2: Scroll down to the bottom of the page
            cy.scrollTo('bottom');

            // Assert that the footer becomes visible after scrolling to the bottom
            cy.get("#footer").should("be.visible");

            // Step 3: Scroll back up to the top without clicking the "Arrow" button
            cy.scrollTo('top');

            // Step 4: Verify that important content (e.g., headers, nav links) is visible again
            cy.get("#slider-carousel").should("be.visible");

            // Verify the position after scrolling matches the position before scrolling
            cy.get("#slider-carousel").then(($elAfter) => {
                const positionAfterScroll = $elAfter.position();
                expect(positionBeforeScroll.top).to.equal(positionAfterScroll.top);
            });
        });
    });

    it("should delete the account after logging in", () => {
        // Step 1: Log in or sign up a user using valid credentials from JSON
        cy.signupUser(userCredentials);

        // Verify the user is successfully logged in and continue to the homepage
        cy.get('[data-qa="continue-button"]').should('be.visible').click();

        // Step 2: Delete the account
        cy.contains("Delete Account").click();

        // Step 3: Verify 'ACCOUNT DELETED!' confirmation and continue
        cy.getElementAndAssertText('[data-qa="account-deleted"]', "Account Deleted!");
        cy.get('[data-qa="continue-button"]').should("be.visible").click();
    });

});
