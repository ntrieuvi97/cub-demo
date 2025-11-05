Feature: Login

    @login @web-ui
    Scenario: Successful login with valid credentials
        Given I launch the login page
        When I input "validUser" credentials and submit
        Then I will see the dashboard page after login

    @login @web-ui
    Scenario: Unsuccessful login with invalid credentials
        Given I launch the login page
        When I input "invalidUser" credentials and submit
        Then I will see an error message "Tên hoặc mật khẩu của bạn không đúng" on login page

    @login @web-ui
    Scenario: Login with enterprise account
        Given I launch the login page
        When I input "enterpriseAccount1" credentials and submit
        Then I will see the dashboard page after login

    @login @web-ui
    Scenario: Login with locked account
        Given I launch the login page
        When I input "lockedLoginAccount1" credentials and submit
        Then I will see an error message "Tài khoản đã bị khoá vì lí do an toàn" on login page

    @login @web-ui
    Scenario: Login with blocked account
        Given I launch the login page
        When I input "blockedAccount1" credentials and submit
        Then I will see an error message "Tài khoản của bạn đã bị khoá. Vui lòng liên hệ CSKH để được hỗ trợ!" on login page

    @login @web-ui
    Scenario: Login with blocked enterprise account
        Given I launch the login page
        When I input "blockedEnterpriseAccount1" credentials and submit
        Then I will see an error message "Tài khoản của bạn đã bị khoá. Vui lòng liên hệ CSKH để được hỗ trợ!" on login page

    @login @web-ui
    Scenario: Login with multiple role personal account - select personal role
        Given I launch the login page
        When I input "multipleRolePersonal" credentials and submit
        And I select to login as "Tài khoản cá nhân"
        Then I will see the dashboard page after login

    @login @web-ui
    Scenario: Login with multiple role employee account - select employee role
        Given I launch the login page
        When I input "multipleRoleEmployee" credentials and submit
        And I select to login as "Tài khoản nhân viên"
        Then I will see the dashboard page after login

    @login @web-ui
    Scenario: Login with email account
        Given I launch the login page
        When I input "emailAccount1" credentials and submit
        Then I will see the dashboard page after login

    @login @web-ui
    Scenario: Login with username account
        Given I launch the login page
        When I input "usernameAccount1" credentials and submit
        Then I will see the dashboard page after login
