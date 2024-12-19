import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";


// Constants

const FIRST_NAME_FIELD = '[data-testid="firstname"]';
const LAST_NAME_FIELD = '[data-testid="lastname"]';
const SIGNUP_BUTTON = '[data-testid="signupstudentbutton"]';
const ERROR_MESSAGE = '[data-testid="signuperrormessage"]';
const WELCOME_MESSAGE = '[data-testid="signupwelcomemessage"]';
const EXAM_SECTION = '[data-testid="examsection"]';
const SIGNUP_FORM = '[data-testid="signupform"]';


// SCENARIO 1

When("the user fills the first name with {string}", (firstname) => {
  // Get the first name element and clear the content
  cy.get(FIRST_NAME_FIELD)
    .clear();
  // Fill the first name with an empty value
  cy.get(FIRST_NAME_FIELD)
    .type(firstname);
});

When("the user fills the last name field with {string}", (lastname) => {
  // Get the last name element and clear the content
  cy.get(LAST_NAME_FIELD)
    .clear();
  // Fill the last name with an empty value
  cy.get(LAST_NAME_FIELD)
    .type(lastname);
});

When("the user clicks on the Sign Up button", () => {
  // Get the sign up button and click on it
  cy.get(SIGNUP_BUTTON)
    .click();
});

Then("the user should see an error message containing {string}", (errormessage) => {
  // Get the error message element and validate that is visible and contains the expected text
  cy.get(ERROR_MESSAGE)
    .should('be.visible')
    .and('contain', errormessage);
});

Then("the ISTQB exam section should not appear", () => {
  // Get the exam section and validate that does not appear
  cy.get(EXAM_SECTION)
    .should('not.be.visible')
});

Then("the registration form should remain visible", () => {
  // Get the registration form and validate that is visible
  cy.get(SIGNUP_FORM)
    .should('be.visible')
});


// SCENARIO 2

// When conditions are being reutilized from Scenario 1

Then("the registration form should disappear", () => {
  // Get the registration form and validate that does not appear
  cy.get(SIGNUP_FORM)
    .should('not.be.visible')
});

Then("the user should see the following welcome message {string}", (welcomemessage) => {
  // Get the welcome message element and validate that is visible and contains the expected text
  cy.get(WELCOME_MESSAGE)
    .should('be.visible')
    .and('contain', welcomemessage);
});

Then("the ISTQB exam section should be displayed", () => {
  // Get the exam section and validate that appears
  cy.get(EXAM_SECTION)
    .should('be.visible')
});