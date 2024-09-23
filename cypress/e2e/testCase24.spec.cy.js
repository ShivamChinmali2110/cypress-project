// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json')

describe('Automation Exercise Web Application Testing', () => {  
  
  it("Test Case 24: Download Invoice after Purchase Order", () => {
      // Step 1: Navigate to the Home Page 
      cy.visit(userCredentials.baseUrl)
      
      // Step 2: Create an Account or Log In
      // Incorrect Scenario: Attempt to Log In with Incorrect Credentials
      cy.contains("Signup / Login").click()
      cy.fillLoginForm({
          email: "invalidEmail@gmail.com",
          password: "invalidPassword",
      })
      // Ensure that validation messages are displayed
      cy.contains("Your email or password is incorrect!").should('be.visible')

      // Correct Scenario: Log in with valid credentials
      cy.signupUser(userCredentials)  // Assuming this uses valid credentials from userCredentials JSON
      cy.get('[data-qa="continue-button"]').should('be.visible').click()

      // Step 3: Add Products to Cart
      // Add the first product to the cart
      cy.get(".product-image-wrapper").first().within(() => {
          cy.contains("Add to cart").click()
      })
      // Proceed to Cart
      cy.contains("View Cart").click()
      cy.get("body").should("be.visible")

      // Step 4: Proceed to Checkout
      cy.contains("Proceed To Checkout").click()

      cy.contains("Place Order").click()

        //Incorrect Scenario - Use the invalidPaymentDetails (missing name_on_card)
        cy.get('input[data-qa="name-on-card"]').clear()  // Name on Card is missing in this case
        cy.get('input[data-qa="card-number"]').type(userCredentials.paymentDetails.invalidPaymentDetails.card_number)
        cy.get('input[data-qa="cvc"]').type(userCredentials.paymentDetails.invalidPaymentDetails.cvc)
        cy.get('input[data-qa="expiry-month"]').type(userCredentials.paymentDetails.invalidPaymentDetails.expiry_month)
        cy.get('input[data-qa="expiry-year"]').type(userCredentials.paymentDetails.invalidPaymentDetails.expiry_year)

        // Try to place the order without the Name on Card
        cy.get('button[data-qa="pay-button"]').click()

        // Verify validation message - the browser's built-in validation is triggered
        cy.get('input[data-qa="name-on-card"]').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })

        // Now, use valid payment details from JSON to fill the missing field
        cy.get('input[data-qa="name-on-card"]').type(userCredentials.paymentDetails.validPaymentDetails.name_on_card)

        // Place the order again with valid data
        cy.get('button[data-qa="pay-button"]').click()

        // Verify order confirmation
        cy.get('.title').should('contain.text', 'Order Placed!')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

      // Step 5: Download the Invoice
      cy.contains("Download Invoice").invoke('attr', 'href').then((href) => {
          cy.downloadFile(
              href,  // Direct link to the invoice
              "cypress/downloads",
              "invoice.txt"
          )
      })
      
      // To ensure the invoice is downloaded correctly
      cy.readFile("cypress/downloads/invoice.txt").should('exist')
      cy.get('[data-qa="continue-button"]').should('be.visible').click()

      // Delete Account to login again with same credentials, without need to change in json file 
      cy.contains("Delete Account").click()
      cy.getElementAndAssertText(
          '[data-qa="account-deleted"]',
          "Account Deleted!",
      )
  })
})