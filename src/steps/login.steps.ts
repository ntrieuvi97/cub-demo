

import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import assert from 'assert';
import { timeouts } from '../configs';
import { LoginPage } from '../pages/login_pages/login.page';
import { CustomWorld } from '../support/world';
import { DataLoader } from '../utils/data-loader';
import { UsersData } from '../types';
import { UMSApi } from '../apis/endpoints/ums.api';

let loginPage: LoginPage;
let contactData: any;


Given('I launch the login page', { timeout: timeouts.navigation }, async function (this: CustomWorld) {
    await this.initBrowser();
    await this.page?.goto(`https://staging.propertyguru.vn/sellernet/trang-dang-nhap`);
    loginPage = new LoginPage(this.page!);
});



When('I input {string} credentials and submit', { timeout: timeouts.pageInteraction }, async function (this: CustomWorld, userType: string) {
    const allCredentials = DataLoader.loadJson<UsersData>('tests/data/credentials.json');
    const credentials = allCredentials[userType];

    if (!credentials) {
        throw new Error(`User type "${userType}" not found in credentials.json`);
    }

    await loginPage.inputUsername(credentials.username);
    await loginPage.inputPassword(credentials.password);
    await loginPage.clickLoginButton();
});

Then('I will see the dashboard page after login', { timeout: timeouts.verification }, async function (this: CustomWorld) {
    await this.page?.getByText('Tổng quan tài khoản').waitFor({ timeout: timeouts.verification });
});


Then('I will see an error message {string} on login page', { timeout: timeouts.verification }, async function (this: CustomWorld, expectedErrorMessage: string) {
    await this.page?.getByText(expectedErrorMessage).waitFor({ timeout: timeouts.verification });
});

/**
 * Fetch user contact information via API
 */
When('I fetch my contact information', async function (this: CustomWorld) {
    const umsApi = new UMSApi(this.page!);
    const response = await umsApi.fetchContact();
    contactData = await response.json();
    console.log('📞 Contact information fetched:', JSON.stringify(contactData, null, 2));
});

Then('I should receive contact details', async function (this: CustomWorld) {
    assert.ok(contactData, 'Contact data should exist');
    console.log('✅ Contact details validated');
    // Add specific assertions based on actual response structure
    // Example: assert.ok(contactData.name, 'Contact name should exist');
});