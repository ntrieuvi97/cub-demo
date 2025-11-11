@lcp @web-ui
Feature: Property Posting
  As a user
  I want to post a property for sale
  So that I can list my property on the platform

  @user=validUser
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
      | Vip Type       | VIP Kim Cương                                                                 |
      | Duration       | 15 ngày                                                                       |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP

  @user=validUser
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
      | Vip Type       | Tin thường                                                                                 |
      | Duration       | 30 ngày                                                                                    |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP

  @user=validUser
  Scenario: Create a new land property listing
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field          | Value                                                     |
      | Listing Type   | Sell                                                      |
      | Address Search | phu my hung                                               |
      | Property Type  | Đất                                                       |
      | Area           | 120                                                       |
      | Price          | 20000000                                                  |
      | Title          | Bán đất nền Phú Mỹ Hưng giá tốt                           |
      | Description    | Đất nền vị trí đẹp, sổ đỏ chính chủ, giá rẻ, liên hệ ngay |
      | Images         | tests\images\1.jpg,tests\images\2.jpg,tests\images\3.jpg  |
      | Vip Type       | VIP Vàng                                                  |
      | Duration       | 15 ngày                                                   |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP

  @user=validUser
  Scenario: Create a new office property listing
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field          | Value                                                       |
      | Listing Type   | Rent                                                        |
      | Address Search | district 1                                                  |
      | Property Type  | Văn phòng                                                   |
      | Area           | 200                                                         |
      | Price          | 30000000                                                    |
      | Title          | Cho thuê văn phòng Quận 1 [Auto test]                       |
      | Description    | Văn phòng rộng rãi, tiện nghi, giá tốt                      |
      | Images         | tests\images\3.jpg, tests\images\2.jpg  ,tests\images\4.jpg |
      | Vip Type       | VIP Vàng                                                    |
      | Duration       | 15 ngày                                                     |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP

  @user=validUser
  Scenario: Create a new villa property listing
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field          | Value                                                    |
      | Listing Type   | Sell                                                     |
      | Address Search | thao dien                                                |
      | Property Type  | Nhà biệt thự, liền kề                                    |
      | Area           | 500                                                      |
      | Price          | 100000000                                                |
      | Title          | Bán biệt thự Thảo Điền sang trọng, khong ngap nuoc :_)   |
      | Description    | Biệt thự cao cấp, hồ bơi, sân vườn rộng, an ninh tốt     |
      | Images         | tests\images\2.jpg,tests\images\4.jpg,tests\images\1.jpg |
      | Vip Type       | VIP Vàng                                                 |
      | Duration       | 15 ngày                                                  |
    Then I should see the listing confirmation message "Tin đăng đã được ghi nhận"
    And I got the listing ID
    And I should find the listing in LMP


  @user=notSufficientMoney
  Scenario: Create a new property listing by not sufficient balance
    Given I navigate to the "LCP"
    When I create a property listing with the following details:
      | Field          | Value                                                                         |
      | Listing Type   | Sell                                                                          |
      | Address Search | vinhome                                                                       |
      | Property Type  | Nhà riêng                                                                     |
      | Area           | 3333                                                                          |
      | Price          | 40000000                                                                      |
      | Title          | Bán nhà riêng tại Vinhomes giá rẻ diện tích lớn                               |
      | Description    | Nhà đẹp, mới xây, gần trường học và chợ giá rẻ, diện tích 100m2, liên hệ ngay |
      | Images         | tests\images\1.jpg,tests\images\2.jpg,tests\images\3.jpg                      |
      | Vip Type       | VIP Kim Cương                                                                 |
      | Duration       | 15 ngày                                                                       |
    Then I should see the listing confirmation message "Quét mã QR để nạp tiền & thanh toán"