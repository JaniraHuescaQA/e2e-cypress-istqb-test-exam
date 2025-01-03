import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

// CONSTANTS
const ANSWERS = {
  correct: {
    1: 'c',
    2: 'a',
    3: 'a',
    4: 'b',
    5: 'c',
    6: 'c',
    7: 'a',
    8: 'c',
    9: 'a',
    10: 'a',
  },
  incorrect: {
    1: 'b',
    2: 'b',
    3: 'b',
    4: 'c',
    5: 'a',
    6: 'a',
    7: 'b',
    8: 'b',
    9: 'b',
    10: 'b',
  },
};

const FINISH_EXAM_BUTTON = '[data-testid="finish-exam-button"]';
const GRADE_EXAM_MESSAGE = '[data-testid="grade-exam-message"]';


// HELPER FUNCTIONS

// Answer a question (correctly, incorrectly, or leave unanswered)
const answerQuestion = (index, answerType) => {
  const answer = ANSWERS[answerType][index];
  if (answer) {
    cy.get(`[data-testid="q${index}-${answer}"]`).check();
  }
};

// Validate corrected questions
const validateQuestionScore = (index, expectedScore) => {
  cy.get(`[data-testid="grade-message${index}"]`)
    .should('be.visible')
    .and('contain', `Score for question ${index}: ${expectedScore}`);
};

// Validate the color of the final score
const validateFinalScoreColor = (color) => {
  const colorMapping = {
    green: 'rgb(0, 128, 0)',
    red: 'rgb(255, 0, 0)',
  };
  cy.get(GRADE_EXAM_MESSAGE)
    .should('have.css', 'color', colorMapping[color]);
};


// SCENARIO 1: Exam Passed

When("the user answers 7 questions correctly", () => {
  // Get the correct answer for questions 1 to 7 and select them
  for (let i = 1; i <= 7; i++) {
    answerQuestion(i, 'correct');
  }
});

When("the user answers 2 questions incorrectly", () => {
  // Get an incorrect answer for questions 8 to 9 and select them
  for (let i = 8; i <= 9; i++) {
    answerQuestion(i, 'incorrect');
  }
});

When("the user leaves 1 question unanswered", () => {
  // No action required, as the question is left unanswered by default
});

When("the user clicks on the Finish Exam button", () => {
  // Get the finish exam button and click on it
  cy.get(FINISH_EXAM_BUTTON)
    .click();
});

Then("the user should see the corrected questions", () => {
  // Get the grade message element and validate that is visible and contains the expected text
  for (let i = 1; i <= 7; i++) {
    validateQuestionScore(i, 2);
  }

  for (let i = 8; i <= 9; i++) {
    validateQuestionScore(i, -1);
  }

  validateQuestionScore(10, 0);
});

Then("the user should see a final score of {string}", (grade) => {
  // Get the grade message element and validate that is visible and contains the expected text
  cy.get(GRADE_EXAM_MESSAGE)
    .should('be.visible')
    .and('contain', grade);
});

Then("the final score should appear in green", () => {
  // Get the grade message element and validate that its color is green
  validateFinalScoreColor('green');
});


// SCENARIO 2: Exam Failed

When("the user answers 1 question correctly", () => {
  // Get the correct answer for question 1 and select it
  answerQuestion(1, 'correct');
});

When("the user answers 8 questions incorrectly", () => {
  // Get an incorrect answer for questions 2 to 9 and select them
  for (let i = 2; i <= 9; i++) {
    answerQuestion(i, 'incorrect');
  }
});

Then("the user should see the questions correction", () => {
  // Get the grade message element and validate that is visible and contains the expected text
  validateQuestionScore(1, 2);

  for (let i = 2; i <= 9; i++) {
    validateQuestionScore(i, -1);
  }

  validateQuestionScore(10, 0);
});

Then("the final score should appear in red", () => {
  // Get the grade message element and validate that its color is green
  validateFinalScoreColor('red');
});