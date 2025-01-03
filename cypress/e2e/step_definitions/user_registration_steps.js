import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

// SELECTORS (constants)
// Define selectors for DOM elements used in the tests
const SELECTORS = {
  firstNameField: '[data-testid="firstname"]',
  lastNameField: '[data-testid="lastname"]',
  signUpButton: '[data-testid="signupstudentbutton"]',
  errorMessage: '[data-testid="signuperrormessage"]',
  welcomeMessage: '[data-testid="signupwelcomemessage"]',
  examSection: '[data-testid="examsection"]',
  signUpForm: '[data-testid="signupform"]',
};

// HELPER FUNCTIONS
// Fill an input field by selector and value
const fillInputField = (selector, value) => {
  cy.get(selector)
    .clear()
    .type(value);
};

// Validate an element's visibility and text content
const validateElementContent = (selector, expectedText) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain', expectedText);
};

// Validate element visibility
const validateVisibility = (selector, shouldBeVisible) => {
  const visibilityCheck = shouldBeVisible ? 'be.visible' : 'not.be.visible';
  cy.get(selector)
    .should(visibilityCheck);
};

/*// Constants

const FIRST_NAME_FIELD = '[data-testid="firstname"]';
const LAST_NAME_FIELD = '[data-testid="lastname"]';
const SIGNUP_BUTTON = '[data-testid="signupstudentbutton"]';
const ERROR_MESSAGE = '[data-testid="signuperrormessage"]';
const WELCOME_MESSAGE = '[data-testid="signupwelcomemessage"]';
const EXAM_SECTION = '[data-testid="examsection"]';
const SIGNUP_FORM = '[data-testid="signupform"]';
*/


// SCENARIO 1: Empty First Name and Last Name

When("the user fills the first name field with {string}", (firstname) => {
  // Get the first name element, clear the content and fill the first name
  fillInputField(SELECTORS.firstNameField, firstname);
});

When("the user fills the last name field with {string}", (lastname) => {
  // Get the last name element, clear the content and fill the last name
  fillInputField(SELECTORS.lastNameField, lastname);
});

When("the user clicks on the Sign Up button", () => {
  // Get the sign up button and click on it
  cy.get(SELECTORS.signUpButton)
    .click();
});

Then("the user should see an error message containing {string}", (errormessage) => {
  // Get the error message element and validate that is visible and contains the expected text
  validateElementContent(SELECTORS.errorMessage, errormessage);
});

Then("the ISTQB exam section should not appear", () => {
  // Get the exam section and validate that does not appear
  validateVisibility(SELECTORS.examSection, false);
});

Then("the registration form should remain visible", () => {
  // Get the registration form and validate that is visible
  validateVisibility(SELECTORS.signUpForm, true);
});


// SCENARIO 2: Valid First Name and Last Name

// When conditions are being reutilized from Scenario 1

Then("the registration form should disappear", () => {
  // Get the registration form and validate that does not appear
  validateVisibility(SELECTORS.signUpForm, false);
});

Then("the user should see the following welcome message {string}", (welcomemessage) => {
  // Get the welcome message element and validate that is visible and contains the expected text
  validateElementContent(SELECTORS.welcomeMessage, welcomemessage);
});

Then("the ISTQB exam section should be displayed", () => {
  // Get the exam section and validate that appears
  validateVisibility(SELECTORS.examSection, true);
});