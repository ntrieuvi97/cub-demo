Feature: Listing Management Page (LMP)

  @lmp @web-ui @user=validUser
  Scenario: Verify sell apartment listing appears on LMP
    Given I have a listing that "sell" a "apartment" with "vip bac" type
    When I navigate to LMP
    Then I see the listing on LMP

  @lmp @web-ui @user=validUser
  Scenario: Verify rent apartment listing appears on LMP
    Given I have a listing that "rent" a "apartment" with "vip Bac" type
    When I navigate to LMP
    Then I see the listing on LMP

  @lmp @web-ui @user=validUser
  Scenario: Verify published apartment listing appears on LMP
    Given I have a listing that "rent" a "apartment" with "vip vang" type
    And I wait for 5 seconds
    And I publish the listing
    When I navigate to LMP
    Then I see the listing on LMP

  @lmp @web-ui @user=validUser
  Scenario: Verify mark reviewd apartment listing appears on LMP
    Given I have a listing that "rent" a "apartment" with "vip kim cuong" type
    And I wait for 5 seconds
    And I mark review the listing
    When I navigate to LMP
    Then I see the listing on LMP

  @lmp @web-ui @user=validUser
  Scenario: Verify suspended apartment listing appears on LMP
    Given I have a listing that "rent" a "apartment" with "tin thuong" type
    And I wait for 5 seconds
    And I suspend the listing
    When I navigate to LMP
    Then I see the listing on LMP