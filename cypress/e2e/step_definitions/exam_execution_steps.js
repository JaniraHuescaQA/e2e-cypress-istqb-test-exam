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

// SCENARIO 1 and Scenario 2: Exam Passed and Exam Failed

When("the user answers questions", (datatable) => {
  datatable.hashes().forEach((element) => {
    // Define an object (actions) that maps each answer type to its corresponding behavior
    const actions = {
      correct: () => {
        // Get the correct answer for the given question number from the ANSWERS object
        const answer = ANSWERS.correct[element.questionNumber];
        cy.get(`[data-testid="q${element.questionNumber}-${answer}"]`).check();
      },
      incorrect: () => {
        // Get the incorrect answer for the given question number from the ANSWERS object
        const answer = ANSWERS.incorrect[element.questionNumber];
        cy.get(`[data-testid="q${element.questionNumber}-${answer}"]`).check();
      },
      empty: () => {
        // Check that no input is selected for question 10
        cy.get(`[data-testid="question10-form"] input`).should('not.be.checked');
      },
    };

    // Execute the function corresponding to the given answerType. 
    // The actions object acts as a "decision-maker," where each answerType (e.g., correct, incorrect, empty) is associated with a specific function
    actions[element.answerType]();
  });
});

When("the user clicks on the Finish Exam button", () => {
  // Get the finish exam button and click on it
  cy.get(FINISH_EXAM_BUTTON)
    .click();
});

Then("the user should see scores", (datatable) => {
  // Get the grade message element and validate that is visible and contains the expected text
  datatable.hashes().forEach((element) => {
  cy.get(`[data-testid="grade-message${element.questionNumber}"]`)
    .should('be.visible')
    .and('contain', `Score for question ${element.questionNumber}: ${element.score}`);
  });
});

Then("the user should see a final score of {string}", (grade) => {
  // Get the grade message element and validate that is visible and contains the expected text
  cy.get(GRADE_EXAM_MESSAGE)
    .should('be.visible')
    .and('contain', grade);
});

Then("the final score should appear in {string}", (color) => {
  // Get the grade message element and validate that its color (green when the exam is passed and red when the exam is failed)
  const colorMapping = {
    green: 'rgb(0, 128, 0)',
    red: 'rgb(255, 0, 0)',
  };
  cy.get(GRADE_EXAM_MESSAGE)
    .should('have.css', 'color', colorMapping[color]);
});