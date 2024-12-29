Feature: ISTQB Exam Grading

  As a registered user on the ISTQB exam platform,
  I want to see my exam graded accurately,
  So that I can know if I passed or failed the exam.

Background:
    Given the user visits the ISTQB exam homepage
    And the user fills the first name with "Janira"
    And the user fills the last name field with "Huesca"
    And the user clicks on the Sign Up button

Scenario: Exam Passed
    When the user answers 7 questions correctly
    And the user answers 2 questions incorrectly
    And the user leaves 1 question unanswered
    And the user clicks on the Finish Exam button
    Then the user should see the corrected questions
    And the user should see a final score of "12"
    And the final score should appear in green

Scenario: Exam Failed
    When the user answers 1 question correctly
    And the user answers 8 questions incorrectly
    And the user leaves 1 question unanswered
    And the user clicks on the Finish Exam button
    Then the user should see the questions correction
    And the user should see a final score of "0"
    And the final score should appear in red
