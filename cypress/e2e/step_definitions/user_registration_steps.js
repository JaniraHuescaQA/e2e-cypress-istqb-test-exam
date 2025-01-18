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
const MESSAGE_SELECTORS = {
  "error": SELECTORS.errorMessage,
  "welcome": SELECTORS.welcomeMessage,
}
const validateElementContent = (selector, expectedText) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain', expectedText);
};

// Validate element visibility based on the provided visibility text ("be visible" or "not be visible")
const ELEMENT_SELECTORS = {
  "ISTQB exam section": SELECTORS.examSection,
  "registration form": SELECTORS.signUpForm,
};
const validateVisibility = (element, visibilityText) => {
  const selector = ELEMENT_SELECTORS[element]
  const visibilityCheck = visibilityText === "be visible" ? 'be.visible' : 'not.be.visible';
  cy.get(selector)
    .should(visibilityCheck);
};


// SCENARIO 1 and SCENARIO 2: Empty first name and last name and Valid first name and last name

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

Then("the user should see the following {string} message containing {string}", (messageType, expectedText) => {
  // Get the message type and validate that is visible and contains the expected text
  const selector = MESSAGE_SELECTORS[messageType];
  validateElementContent(selector, expectedText);
});

Then("the {string} should {string}", (element, visibilityText) => {
  // Get the section (element) and check its visibility
  validateVisibility(element, visibilityText);
});