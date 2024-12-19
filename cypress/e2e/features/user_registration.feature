Feature: ISTQB Exam Registration

  As a user accessing the ISTQB exam platform,
  I want to successfully register in the system,
  So that I can access the ISTQB exam section.

Background: 
    Given the user visits the ISTQB exam homepage

Scenario: Empty First Name and Last Name
    When the user fills the first name with " "
    And the user fills the last name field with " "
    And the user clicks on the Sign Up button
    Then the user should see an error message indicating all fields are mandatory
    And the ISTQB exam section should not appear
    And the registration form should remain visible