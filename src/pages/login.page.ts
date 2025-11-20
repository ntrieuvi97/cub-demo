import {BasePage} from '../core/base.page';
import {Page} from '@playwright/test';

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

    async clickIgnoreButtonIfPresent() {
        const ignoreButton = this.page.getByRole('button', { name: 'Bỏ qua' });

        try {
            await ignoreButton.waitFor({ state: 'visible', timeout: 10000 });
            await ignoreButton.click();
        } catch (error) {
            console.log('Ignore button not present, continuing without clicking it.');
        }}

    async selectLoginType(userType: string) {
        const loginTypeButton = this.page.getByText(userType);
        await loginTypeButton.click();
    }
}