Feature: Platform Testing Examples

  # Desktop Browser Tests - use @web-ui tag
  @web-ui @user=validUser
  Scenario: Test on Desktop Browser
    Given I have a listing that "rent" a "apartment" with "vip Bac" type
    And I publish the listing
    When I navigate to LMP
    Then I see the listing on LMP

  # Android Device Tests - use @android tag
  @android @user=validUser
  Scenario: Test on Android Device
    Given I have a listing that "rent" a "apartment" with "vip Bac" type
    And I publish the listing
    When I navigate to LMP
    Then I see the listing on LMP

  # You can run specific platform tests using tags
  # Desktop only: npm test -- --tags "@web-ui"
  # Android only: npm test -- --tags "@android"
  # Both platforms: npm test -- tests/examples/platform-testing.feature

