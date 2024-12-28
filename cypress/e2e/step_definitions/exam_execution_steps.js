import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

// Constants

const CORRECT_ANSWER_QUESTION_1 = '[data-testid="q1-c"]';
const CORRECT_ANSWER_QUESTION_2 = '[data-testid="q2-a"]';
const CORRECT_ANSWER_QUESTION_3 = '[data-testid="q3-a"]';
const CORRECT_ANSWER_QUESTION_4 = '[data-testid="q4-b"]';
const CORRECT_ANSWER_QUESTION_5 = '[data-testid="q5-c"]';
const CORRECT_ANSWER_QUESTION_6 = '[data-testid="q6-c"]';
const CORRECT_ANSWER_QUESTION_7 = '[data-testid="q7-a"]';
const INCORRECT_ANSWER_QUESTION_8 = '[data-testid="q8-b"]';
const INCORRECT_ANSWER_QUESTION_9 = '[data-testid="q9-b"]';
const FINISH_EXAM_BUTTON = '[data-testid="finish-exam-button"]';
const GRADE_MESSAGE_QUESTION_1 = '[data-testid="grade-message1"]';
const GRADE_MESSAGE_QUESTION_2 = '[data-testid="grade-message2"]';
const GRADE_MESSAGE_QUESTION_3 = '[data-testid="grade-message3"]';
const GRADE_MESSAGE_QUESTION_4 = '[data-testid="grade-message4"]';
const GRADE_MESSAGE_QUESTION_5 = '[data-testid="grade-message5"]';
const GRADE_MESSAGE_QUESTION_6 = '[data-testid="grade-message6"]';
const GRADE_MESSAGE_QUESTION_7 = '[data-testid="grade-message7"]';
const GRADE_MESSAGE_QUESTION_8 = '[data-testid="grade-message8"]';
const GRADE_MESSAGE_QUESTION_9 = '[data-testid="grade-message9"]';
const GRADE_MESSAGE_QUESTION_10 = '[data-testid="grade-message10"]';
const GRADE_EXAM_MESSAGE = '[data-testid="grade-exam-message"]';



// SCENARIO 1

When("the user answers 7 questions correctly", () => {
    // Get the correct answer for questions 1 to 7 and select them
    cy.get(CORRECT_ANSWER_QUESTION_1)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_2)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_3)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_4)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_5)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_6)
      .check();
    cy.get(CORRECT_ANSWER_QUESTION_7)
      .check();
});

When("the user answers 2 questions incorrectly", () => {
    // Get an incorrect answer for questions 8 to 9 and select them
    cy.get(INCORRECT_ANSWER_QUESTION_8)
      .check();
    cy.get(INCORRECT_ANSWER_QUESTION_9)
      .check();
});

When("the user leaves 1 question unanswered", () => {
    // Without action, because the question 10 is left without answering
});

When("the user clicks on the Finish Exam button", () => {
  // Get the finish exam button and click on it
  cy.get(FINISH_EXAM_BUTTON)
    .click();
});

Then("the user should see the corrected questions", () => {
    // Get the grade message element and validate that is visible and contains the expected text
    cy.get(GRADE_MESSAGE_QUESTION_1)
      .should('be.visible')
      .and('contain', "Score for question 1: 2");
    cy.get(GRADE_MESSAGE_QUESTION_2)
      .should('be.visible')
      .and('contain', "Score for question 2: 2");
    cy.get(GRADE_MESSAGE_QUESTION_3)
      .should('be.visible')
      .and('contain', "Score for question 3: 2");
    cy.get(GRADE_MESSAGE_QUESTION_4)
      .should('be.visible')
      .and('contain', "Score for question 4: 2");
    cy.get(GRADE_MESSAGE_QUESTION_5)
      .should('be.visible')
      .and('contain', "Score for question 5: 2");
    cy.get(GRADE_MESSAGE_QUESTION_6)
      .should('be.visible')
      .and('contain', "Score for question 6: 2");
    cy.get(GRADE_MESSAGE_QUESTION_7)
      .should('be.visible')
      .and('contain', "Score for question 7: 2");
    cy.get(GRADE_MESSAGE_QUESTION_8)
      .should('be.visible')
      .and('contain', "Score for question 8: -1");
    cy.get(GRADE_MESSAGE_QUESTION_9)
      .should('be.visible')
      .and('contain', "Score for question 9: -1");
    cy.get(GRADE_MESSAGE_QUESTION_10)
      .should('be.visible')
      .and('contain', "Score for question 10: 0");
  });

  Then("the user should see a final score of {string}", (grade) => {
    // Get the grade message element and validate that is visible and contains the expected text
    cy.get(GRADE_EXAM_MESSAGE)
      .should('be.visible')
      .and('contain', grade);
  });

  Then("the final score should appear in green", () => {
    // Get the grade message element and validate that its color is green
    cy.get(GRADE_EXAM_MESSAGE)
      .should('have.css', 'color', 'rgb(0, 128, 0)');
  });

  /*
      Scenario: Exam Passed
    When the user answers 7 questions correctly
    And the user answers 2 questions incorrectly
    And the user leaves 1 question unanswered
    And the user clicks on the Finish Exam button
    Then the user should see the corrected questions
    And the user should see a final score of "14"
    And the final score should appear in green
    And the user should see a message "Exam score: 14. PASS"

Scenario: Exam Failed
    When the user answers 1 question correctly
    And the user answers 8 questions incorrectly
    And the user leaves 2 questions unanswered
    And the user clicks on the Finish Exam button
    Then the user should see the corrected questions
    And the user should see a final score of "0"
    And the final score should appear in red
    And the user should see a message "Exam score: 0. FAIL"
  */