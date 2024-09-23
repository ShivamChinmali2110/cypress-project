// Import the user credentials from the JSON file
const userCredentials = require('../fixtures/user-credentials.json')

describe('Test Case: Verify Product Search Functionality', () => {
    
    // Function to navigate to the products page
    const navigateToProductsPage = () => {
        cy.contains('Products').click() // Assuming 'Products' link is available in the navbar
        cy.url().should('include', '/products') // Verify the URL includes '/products'
    }

    // Function to perform product search
    const searchProduct = (productName) => {
        cy.get('input[id="search_product"]').clear().type(productName) // Type product name
        cy.get('button[id="submit_search"]').click() // Click the search button
    }

    // Function to verify product search results
    const verifySearchResults = (expectedResultsExist) => {
        if (expectedResultsExist) {
            cy.contains('Searched Products').should('be.visible')
            cy.get('.product-image-wrapper').should('have.length.greaterThan', 0)
        } else {
            cy.get('.product-image-wrapper').should('have.length', 0)
        }
    }

    it('should navigate to products page and search for valid and invalid products', () => {
        // Step 1: Navigate to the homepage
        cy.visit(userCredentials.baseUrl)

        // Step 2: Navigate to the products page
        navigateToProductsPage()

        // Step 3: Search for a valid product
        searchProduct('Winter Top')

        // Step 4: Verify that relevant products are displayed
        verifySearchResults(true)

        // Step 5: Search for an invalid product
        searchProduct('InvalidProduct123')

        // Step 6: Verify no results are displayed
        verifySearchResults(false)
    })
})
