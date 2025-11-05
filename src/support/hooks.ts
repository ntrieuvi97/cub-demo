import {After, Before, Status} from '@cucumber/cucumber';
import {chromium} from '@playwright/test';
import {CustomWorld} from './world';
import {UMSApi} from '../apis/endpoints/ums.api';
import {DataLoader} from '../utils/data-loader';
import {UsersData} from '../types';
import playwrightConfig from '../../playwright.config';
import * as fs from 'fs';
import * as path from 'path';

console.log('✅ hooks.ts file loaded');

// Utility to scan tests/data for all credential files
function getAllCredentialFiles(): string[] {
    const dir = path.resolve('tests/data');
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.startsWith('credentials.') && f.endsWith('.json'))
        .map(f => path.join('tests/data', f));
}

// Utility to load and merge all credentials from all files
function loadAllCredentials(): UsersData {
    const files = getAllCredentialFiles();
    let merged: UsersData = {};
    for (const file of files) {
        try {
            const data = DataLoader.loadJson<UsersData>(file);
            merged = {...merged, ...data};
        } catch (e) {
            console.warn(`⚠️ Failed to load credentials from ${file}:`, e);
        }
    }
    return merged;
}

// Hook for scenarios tagged with @web-ui - initialize browser
Before({ tags: '@web-ui' }, async function (this: CustomWorld) {
    console.log('🌐 @web-ui hook triggered - Initializing browser');

    if (!this.browser) {
        const headless = playwrightConfig.use?.headless ?? false;
        this.browser = await chromium.launch({ headless });
        console.log('✅ Browser instance created');
    }

    if (!this.context) {
        // Use Playwright config settings for context
        this.context = await this.browser.newContext({
            viewport: playwrightConfig.use?.viewport,
            ignoreHTTPSErrors: playwrightConfig.use?.ignoreHTTPSErrors,
            // Enable screenshots and video based on config
            recordVideo: playwrightConfig.use?.video ? {
                dir: 'test-results/videos'
            } : undefined,
        });
        console.log('✅ Browser context created');

        // Start tracing if enabled in config
        if (playwrightConfig.use?.trace) {
            await this.context.tracing.start({ screenshots: true, snapshots: true });
            console.log('✅ Tracing started');
        }
    }

    if (!this.page) {
        this.page = await this.context.newPage();
        console.log('✅ Page instance created');
    }

    console.log(`✅ Browser initialized - Page is ${this.page ? 'defined' : 'undefined'}`);
});

// Hook for scenarios tagged with @authorized
Before({ tags: '@authorized' }, async function (this: CustomWorld, scenario) {
    let userType = '';
    console.log('🔐 @authorized hook triggered');
    const userTag = scenario.pickle.tags.find(tag => tag.name.startsWith('@user='));
    if (userTag) {
        const match = userTag.name.match(/@user=(.+)/);
        if (match) userType = match[1];
    }
    if (!userType) {
        console.warn('⚠️ No user type specified in @user tag');
        return;
    }

    // Load and merge all credentials
    const allCredentials = loadAllCredentials();
    const credentials = allCredentials[userType];
    if (!credentials) {
        throw new Error(`User "${userType}" not found in any credentials file in tests/data`);
    }

    const ums = new UMSApi(this.page!);
    let res = await ums.login(credentials.username, credentials.password);

    if (!res.ok()) {
        throw new Error(`Failed to authenticate. Status: ${res.status()}`);
    }
});

// Cleanup hook
After(async function (this: CustomWorld, { result, pickle }) {
    console.log(`🧹 Cleanup - Test result: ${result?.status || 'unknown'}`);

    const testName = pickle.name.replace(/[^a-z0-9]/gi, '_');
    const timestamp = Date.now();

    // Take screenshot based on config
    if (this.page && playwrightConfig.use?.screenshot) {
        const screenshotConfig = playwrightConfig.use.screenshot;
        const shouldTakeScreenshot =
            screenshotConfig === 'on' ||
            (screenshotConfig === 'only-on-failure' && result?.status === Status.FAILED);

        if (shouldTakeScreenshot) {
            const screenshotPath = `test-results/screenshots/${testName}-${timestamp}.png`;
            await this.page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
        }
    }

    // Stop tracing if enabled
    if (this.context && playwrightConfig.use?.trace) {
        const traceConfig = playwrightConfig.use.trace;
        const shouldSaveTrace =
            traceConfig === 'on' ||
            (traceConfig === 'retain-on-failure' && result?.status === Status.FAILED);

        if (shouldSaveTrace) {
            console.log('🛑 Stopping tracing');
            const tracePath = `test-results/tracing/${testName}-${timestamp}.zip`;
            await this.context.tracing.stop({ path: tracePath });
            console.log(`📊 Trace saved: ${tracePath}`);
        } else {
            await this.context.tracing.stop();
        }
    }

    if (this.browser) {
        await this.browser.close();
        console.log('✅ Browser closed');
    }
});
