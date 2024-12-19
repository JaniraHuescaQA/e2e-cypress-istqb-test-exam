import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  

  Given("the user visits the ISTQB exam homepage", () => {
    // Visit the homepage
    cy.visit("/");
  });
