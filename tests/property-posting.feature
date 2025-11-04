Feature: Property Posting
  As a user
  I want to post a property for sale
  So that I can list my property on the platform

  @lcp @web-ui @authorized @user=validUser
  Scenario: Create a new property listing
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field           | Value                                                                      |
      | Listing Type    | Sell                                                                       |
      | Address Search  | vinhome                                                                    |
      | Property Type   | Nhà riêng                                                                  |
      | Area            | 3333                                                                       |
      | Price           | 40000000                                                                   |
      | Title           | Bán nhà riêng tại Vinhomes giá rẻ diện tích lớn                           |
      | Description     | Nhà đẹp, mới xây, gần trường học và chợ giá rẻ, diện tích 100m2, liên hệ ngay |
      | Images          | tests\images\1.jpg,tests\images\2.jpg,tests\images\3.jpg                   |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP

  @lcp @web-ui @authorized @user=validUser
  Scenario: Create a new rental property listing
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field           | Value                                                                               |
      | Listing Type    | Rent                                                                                |
      | Address Search  | vinhome                                                                             |
      | Property Type   | Căn hộ chung cư                                                                     |
      | Area            | 85                                                                                  |
      | Price           | 15000000                                                                            |
      | Title           | Cho thuê căn hộ Vinhomes 2 phòng ngủ full nội thất                                 |
      | Description     | Căn hộ 2PN, 2WC, đầy đủ nội thất cao cấp, view đẹp, an ninh 24/7, gần trung tâm thương mại |
      | Images          | tests\images\1.jpg,tests\images\2.jpg,tests\images\3.jpg                            |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP