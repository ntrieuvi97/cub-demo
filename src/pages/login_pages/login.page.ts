import { BasePage } from '../base.page';
import { Page } from '@playwright/test';
export class LoginPage extends BasePage {
    static USERNAME_INPUT_SELECTOR = '//input[@name="username"]';
    static PASSWORD_INPUT_SELECTOR = '//input[@name="password"]';
    static LOGIN_BUTTON_SELECTOR = '//button[@id="signin-button"]';

    constructor(page: Page) {
        super(page);
    };


    async inputUsername(username: string) {
        await this.page.fill(LoginPage.USERNAME_INPUT_SELECTOR, username);
    };

    async inputPassword(password: string) {
        await this.page.fill(LoginPage.PASSWORD_INPUT_SELECTOR, password);
    };

    async clickLoginButton() {
        await this.page.click(LoginPage.LOGIN_BUTTON_SELECTOR);
    };
}