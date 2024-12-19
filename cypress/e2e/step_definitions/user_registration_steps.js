import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  

  When("the user fills the first name with {string}", (firstname) => {
    // Get the first name element and clear the content
    cy.get('[data-testid="firstname"]')
      .clear();
    // Fill the first name with an empty value
    cy.get('[data-testid="firstname"]')
      .type(firstname);
  });

  When("the user fills the last name field with {string}", (lastname) => {
    // Get the last name element and clear the content
    cy.get('[data-testid="lastname"]')
      .clear();
    // Fill the last name with an empty value
    cy.get('[data-testid="lastname"]')
      .type(lastname);
  });

  When("the user clicks on the Sign Up button", () => {
    // Get the sign up button and click on it
    cy.get('[data-testid="signupstudentbutton"]')
      .click();
  });

  Then("the user should see an error message indicating all fields are mandatory", () => {
    // Get the error message element and validate that is visible and contains the expected text
    cy.get('[data-testid="signuperrormessage"]')
      .should('be.visible')
      .and('contain', 'All fields are mandatory');
  });

  Then("the ISTQB exam section should not appear", () => {
    // Get the exam section and validate that does not appear
    cy.get('[data-testid="examsection"]')
      .should('not.be.visible')
  });

  Then("the registration form should remain visible", () => {
    // Get the registration form and validate that is visible
    cy.get('[data-testid="signupform"]')
      .should('be.visible')
  });