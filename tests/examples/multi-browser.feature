@web-ui
Feature: Multi-Browser Testing Examples

  # Test on default browser (chromium)
  Scenario: Test on default browser
    Given I am on the homepage
    Then I should see the page title

  # Test on specific browsers
  @browser=chromium
  Scenario: Test on Chromium browser
    Given I am on the homepage
    Then I should see the page title

  @browser=firefox
  Scenario: Test on Firefox browser
    Given I am on the homepage
    Then I should see the page title

  @browser=webkit
  Scenario: Test on WebKit (Safari) browser
    Given I am on the homepage
    Then I should see the page title

  # Test on different device types
  @device=desktop
  Scenario: Test on Desktop viewport
    Given I am on the homepage
    Then I should see the desktop layout

  @device=mobile
  Scenario: Test on Mobile viewport
    Given I am on the homepage
    Then I should see the mobile layout

  @device=tablet
  Scenario: Test on Tablet viewport
    Given I am on the homepage
    Then I should see the tablet layout

  # Combined browser and device tests
  @browser=firefox @device=mobile
  Scenario: Test Firefox on Mobile
    Given I am on the homepage
    Then I should see the mobile layout in Firefox

  @browser=webkit @device=tablet
  Scenario: Test WebKit on Tablet
    Given I am on the homepage
    Then I should see the tablet layout in WebKit

  # Cross-browser scenario outline
  Scenario Outline: Cross-browser compatibility test
    Given I am on the homepage
    When I perform a search for "<query>"
    Then I should see search results

    @browser=<browser>
    Examples:
      | browser  | query      |
      | chromium | automation |
      | firefox  | testing    |
      | webkit   | playwright |

