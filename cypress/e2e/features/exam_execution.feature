Feature: ISTQB Exam Grading

  As a registered user on the ISTQB exam platform,
  I want to see my exam graded accurately,
  So that I can know if I passed or failed the exam.

Background:
    Given the user visits the ISTQB exam homepage
    And the user fills the first name field with "Janira"
    And the user fills the last name field with "Huesca"
    And the user clicks on the Sign Up button

Scenario: Exam Passed
    When the user answers questions
    | questionNumber | answerType |
    | 1              | correct    |
    | 2              | correct    |
    | 3              | correct    |
    | 4              | correct    |
    | 5              | correct    |
    | 6              | correct    |
    | 7              | correct    |
    | 8              | incorrect  |
    | 9              | incorrect  |
    | 10             | empty      |
    And the user clicks on the Finish Exam button
    Then the user should see scores
    | questionNumber | score |
    | 1              | 2     |
    | 2              | 2     |
    | 3              | 2     |
    | 4              | 2     |
    | 5              | 2     |
    | 6              | 2     |
    | 7              | 2     |
    | 8              | -1    |
    | 9              | -1    |
    | 10             | 0     |
    And the user should see a final score of "12"
    And the final score should appear in "green"

Scenario: Exam Failed
    When the user answers questions
    | questionNumber | answerType |
    | 1              | correct    |
    | 2              | incorrect  |
    | 3              | incorrect  |
    | 4              | incorrect  |
    | 5              | incorrect  |
    | 6              | incorrect  |
    | 7              | incorrect  |
    | 8              | incorrect  |
    | 9              | incorrect  |
    | 10             | empty      |
    And the user clicks on the Finish Exam button
    Then the user should see scores
    | questionNumber | score |
    | 1              | 2     |
    | 2              | -1    |
    | 3              | -1    |
    | 4              | -1    |
    | 5              | -1    |
    | 6              | -1    |
    | 7              | -1    |
    | 8              | -1    |
    | 9              | -1    |
    | 10             | 0     |
    And the user should see a final score of "0"
    And the final score should appear in "red"