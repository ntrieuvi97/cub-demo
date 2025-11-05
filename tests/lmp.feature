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
