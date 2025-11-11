@web-ui @boost @user=validUser
Feature: Boost Listing

  Scenario: Boost listing with 1 instant boost
    Given I have a listing that "rent" a "apartment" with "vip vang" type
    And I wait for 5 seconds
    And I publish the listing
    When I navigate to LMP
    And I buy boost for the listing with "1 lần đẩy" boost type
    Then I see the successful message


  Scenario: Boost listing with 3 instant boosts
    Given I have a listing that "rent" a "apartment" with "vip vang" type
    And I wait for 5 seconds
    And I publish the listing
    When I navigate to LMP
    And I buy boost for the listing with "3 lần đẩy" boost type
    Then I see the successful message


  Scenario: Boost listing with 6 instant boosts
    Given I have a listing that "rent" a "apartment" with "vip vang" type
    And I wait for 5 seconds
    And I publish the listing
    When I navigate to LMP
    And I buy boost for the listing with "6 lần đẩy" boost type
    Then I see the successful message

