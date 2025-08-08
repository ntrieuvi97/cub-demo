Feature: Displayed posts on Belivi Wordpress

  Scenario: Verify 10 posts are displayed at the bottom of the homepage
    Given I navigate to the homepage
    When I scroll to the bottom of the page
    Then I should see 10 displayed posts

  Scenario: Click a random post and verify post details
    Given I navigate to the homepage
    When I scroll to the bottom of the page
    And I click on a random post
    Then I should see the post details with correct url and title
