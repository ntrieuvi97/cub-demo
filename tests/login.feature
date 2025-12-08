@login @web-ui
Feature: Login

  Scenario Outline: Successful login with valid credentials
    Given I launch the login page
    When I input "<validUserInfo>" credentials and submit
    Then I will see the dashboard page after login
    Examples:
      | validUserInfo      |
      | validUser          |
      | emailAccount1      |
      | usernameAccount1   |
      | enterpriseAccount1 |

  Scenario Outline: Unsuccessful login with invalid credentials
    Given I launch the login page
    When I input "<User>" credentials and submit
    Then I will see an error message "<Message>" on login page
    Examples:
      | User                | Message                               |
      | invalidUser         | Tên hoặc mật khẩu của bạn không đúng  |
      | lockedLoginAccount1 | Tài khoản đã bị khoá vì lí do an toàn |


  Scenario Outline: Login with multiple role personal account - select personal role
    Given I launch the login page
    When I input "<UserCredential>" credentials and submit
    And I select to login as "<Role>"
    Then I will see the dashboard page after login
    Examples:
      | UserCredential       | Role                |
      | multipleRolePersonal | Tài khoản cá nhân   |
      | multipleRoleEmployee | Tài khoản nhân viên |

