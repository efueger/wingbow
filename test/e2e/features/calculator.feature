Feature: Use the calculator
    In order to perform simple math
    Customers should be able to use a calculator
    So that they can get on with their day

    Scenario: Addition
        Given I am on "http://juliemr.github.io/protractor-demo/"
        And I fill in "[ng-model='first']" with "3"
        And I fill in "[ng-model='second']" with "5"
        When I press equals
        Then I should see "8"

    Scenario Outline: Subtraction
        Given I am on "http://juliemr.github.io/protractor-demo/"
        And I fill in "[ng-model='first']" with "<first>"
        And I fill in "[ng-model='second']" with "<second>"
        And I select "-" from "[ng-model='operator']"
        When I press "#gobutton"
        Then I should see "<result>" in the "h2" element

        Examples:
            | first | second | result |
            |   32  |   14   |   18   |
            |   85  |   38   |   47   |
