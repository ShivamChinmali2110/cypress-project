// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json');

describe('Automation Exercise Web Application Testing', () => {  

  beforeEach(() => {
    // To ensure the page is loaded before every test
    cy.visit(userCredentials.baseUrl);
  });

  it("Test Case 24: Download Invoice after Purchase Order", () => {
    // Step 1: To navigate to the Home Page and ensure it's loaded
    cy.url().should('include', userCredentials.baseUrl);

    // Step 2: To create an Account or Log In
    // Incorrect Scenario: Attempt to Log In with Incorrect Credentials
    cy.contains("Signup / Login").click();
    cy.fillLoginForm({
      email: "invalidEmail@gmail.com",
      password: "invalidPassword",
    });
    // To ensure that validation messages are displayed
    cy.contains("Your email or password is incorrect!").should('be.visible');

    // Correct Scenario: Log in with valid credentials
    cy.signupUser(userCredentials);  // Using valid credentials from userCredentials JSON
    cy.get('[data-qa="continue-button"]').should('be.visible').click();

    // Step 3: To add Products to Cart
    // Add the first product to the cart
    cy.get(".product-image-wrapper").first().within(() => {
      cy.contains("Add to cart").click();
    });
    // Proceed to Cart
    cy.contains("View Cart").click();
    cy.get("body").should("be.visible");

    // Step 4: Proceed to Checkout
    cy.contains("Proceed To Checkout").click();
    cy.contains("Place Order").click();

    // Incorrect Scenario - Use invalid payment details (missing name_on_card)
    cy.fillPaymentDetails(userCredentials.paymentDetails.invalidPaymentDetails);
    // Verify validation message - built-in browser validation
    cy.get('input[data-qa="name-on-card"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.');
    });

    // Correct the missing field and place the order
    cy.get('input[data-qa="name-on-card"]').type(userCredentials.paymentDetails.validPaymentDetails.name_on_card);
    cy.get('button[data-qa="pay-button"]').click();

    // Verify order confirmation
    cy.get('.title').should('contain.text', 'Order Placed!');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

    // Step 5: To download the Invoice
    cy.contains("Download Invoice").invoke('attr', 'href').then((href) => {
      cy.downloadFile(href, userCredentials.downloadsFolder, "invoice.txt");
    });
    
    // Ensure the invoice is downloaded correctly
    cy.readFile(`${userCredentials.downloadsFolder}/invoice.txt`).should('exist');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();

    // Delete Account to avoid changing JSON credentials
    cy.contains("Delete Account").click();
    cy.getElementAndAssertText('[data-qa="account-deleted"]', "Account Deleted!");
  });
});
