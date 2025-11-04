

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