@web-ui @boost @user=validUser
Feature: Boost Listing

  Scenario Outline: Boost listing with boost types
    Given I have a listing that "<ListingType>" a "<PropertyType>" with "<VIPType>" type
    And I wait for 5 seconds
    And I publish the listing
    When I navigate to LMP
    And I buy boost for the listing with "<BoostType>" boost type
    Then I see the successful message
    Examples:
      | ListingType | PropertyType | VIPType       | BoostType |
      | rent        | apartment    | vip vang      | 1 lần đẩy |
      | rent        | apartment    | vip bac       | 3 lần đẩy |
      | sell        | đất          | vip kim cuong | 6 lần đẩy |
