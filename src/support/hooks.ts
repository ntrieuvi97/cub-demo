import {After, Before, Status} from '@cucumber/cucumber';
import {_android} from '@playwright/test';
import {CustomWorld} from './world';
import {UMSApi} from '../apis/endpoints/ums.api';
import {DataLoader} from '../utils/data-loader';
import {UsersData} from '../types';
import playwrightConfig from '../../playwright.config';
import {AndroidConfig} from '../configs/android.config';
import {BrowserFactory, BrowserName} from '../core/browser.factory';
import {ContextFactory, DeviceType} from '../core/context.factory';
import * as fs from 'fs';
import * as path from 'path';


function getAllCredentialFiles(): string[] {
    const dir = path.resolve('tests/data');
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.startsWith('credentials.') && f.endsWith('.json'))
        .map(f => path.join('tests/data', f));
}

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

// Hook for scenarios tagged with @web-ui - initialize desktop browser
Before({ tags: '@web-ui' }, async function (this: CustomWorld, scenario) {
    console.log('🌐 @web-ui hook triggered - Initializing desktop browser');

    // Determine browser type from tag or environment
    let browserName: BrowserName = BrowserFactory.getBrowserFromEnv();
    const browserTag = scenario.pickle.tags.find(tag => tag.name.startsWith('@browser='));
    if (browserTag) {
        const match = browserTag.name.match(/@browser=(.+)/);
        if (match && (match[1] === 'chromium' || match[1] === 'firefox' || match[1] === 'webkit')) {
            browserName = match[1] as BrowserName;
        }
    }

    // Determine device type from tag
    let deviceType: DeviceType = 'desktop';
    const deviceTag = scenario.pickle.tags.find(tag => tag.name.startsWith('@device='));
    if (deviceTag) {
        const match = deviceTag.name.match(/@device=(.+)/);
        if (match && (match[1] === 'desktop' || match[1] === 'mobile' || match[1] === 'tablet')) {
            deviceType = match[1] as DeviceType;
        }
    }

    console.log(`🔧 Browser: ${browserName}, Device: ${deviceType}`);

    if (!this.browser) {
        const headless = playwrightConfig.use?.headless;
        this.browser = await BrowserFactory.launch(browserName, { headless }, false);
        console.log(`✅ ${browserName} browser instance created`);
    }

    if (!this.context) {
        if (!this.browser) {
            throw new Error('Browser instance not initialized');
        }
        this.context = await ContextFactory.createForDevice(
            this.browser,
            deviceType,
            { name: `${browserName}-${deviceType}-${Date.now()}` }
        );
        console.log(`✅ Browser context created for ${deviceType}`);
    }

    if (!this.page) {
        this.page = await ContextFactory.createPage(this.context);
        console.log('✅ Page instance created');
    }

    console.log(`✅ Desktop browser initialized - Page is ${this.page ? 'defined' : 'undefined'}`);
});

// Hook for scenarios tagged with @android - initialize Android device
Before({ tags: '@android' }, async function (this: CustomWorld) {
    console.log('📱 @android hook triggered - Initializing Android device');

    try {
        // Connect to Android device
        const [device] = await _android.devices();
        if (!device) {
            throw new Error('No Android device found. Please connect an Android device via ADB and run: adb devices');
        }

        console.log(`✅ Connected to Android device: ${device.model()}`);

        // Launch browser on Android device
        this.context = await device.launchBrowser({
            pkg: AndroidConfig.browser.packageName,
        });
        console.log(`✅ Browser launched on Android device (${AndroidConfig.browser.packageName})`);

        // Create page
        this.page = await this.context.newPage();
        console.log('✅ Page instance created on Android device');

        // Store device reference for cleanup
        (this as any).androidDevice = device;

        console.log(`✅ Android device initialized - Page is ${this.page ? 'defined' : 'undefined'}`);
    } catch (error) {
        console.error('❌ Failed to initialize Android device:', error);
        throw new Error(`Android initialization failed: ${error}. Make sure your device is connected and ADB is running.`);
    }
});

// Hook for scenarios tagged with @user=xxx
Before(function (this: CustomWorld, scenario) {
    const userTag = scenario.pickle.tags.find(tag => tag.name.startsWith('@user='));
    if (!userTag) return;
    const match = userTag.name.match(/@user=(.+)/);
    if (!match) return;
    const userType = match[1];
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
    // Perform login and extract userId from response
    return (async () => {
        const ums = new UMSApi(this.page!);
        let res = await ums.login(credentials.username, credentials.password);
        if (!res.ok()) {
            throw new Error(`Failed to authenticate. Status: ${res.status()}`);
        }

        // Extract userId directly from login response
        const loginData = await res.json();
        this.userId = loginData.data?.userId || loginData.userId;

        if (this.userId) {
            console.log(`✅ User logged in successfully | UserId: ${this.userId} | User: ${userType}`);
        } else {
            console.warn('⚠️ Login successful but userId not found in response');
        }
    })();
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

    // Stop tracing if enabled (only for desktop browser)
    const isAndroid = (this as any).androidDevice !== undefined;
    if (this.context && playwrightConfig.use?.trace && !isAndroid) {
        const traceConfig = playwrightConfig.use.trace;
        const shouldSaveTrace =
            traceConfig === 'on' ||
            (traceConfig === 'retain-on-failure' && result?.status === Status.FAILED);

        if (shouldSaveTrace) {
            console.log('🛑 Stopping tracing');
            const tracePath = `test-results/tracing/${testName}-${timestamp}.zip`;
            await ContextFactory.stopTracing(this.context, tracePath);
        } else {
            await ContextFactory.stopTracing(this.context);
        }
    }

    // Cleanup Android device
    if ((this as any).androidDevice) {
        console.log('📱 Closing Android device connection');
        await (this as any).androidDevice.close();
        console.log('✅ Android device closed');
    }

    // Cleanup desktop browser
    if (this.browser) {
        await BrowserFactory.close(this.browser);
    }
});
