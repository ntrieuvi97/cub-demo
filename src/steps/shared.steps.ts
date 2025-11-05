import {After, defineStep} from '@cucumber/cucumber';
import {timeouts} from '../configs';
import {WebUrls} from '../apis/urls';
import {CustomWorld} from '../support/world';
import {Page} from 'playwright-core';

const scrollStep = 'I scroll to the bottom of the page';
const navigationStep = 'I navigate to the {string}';
const pauseStep = 'I pause for debuging';
const waitStep = 'I wait for {int} seconds';

async function getPageUrl(pageName: string): Promise<string> {
    const urlMap: Record<string, string> = {
        'LCP': WebUrls.listingCreationPage,
        'LoginPage': WebUrls.loginPage,
        'Home': WebUrls.baseUrl
        // Add more page mappings as needed
    };

    const url = urlMap[pageName];
    if (!url) {
        throw new Error(`Page "${pageName}" not found in URL mappings`);
    }
    return url;
}

async function goToPage(page: Page, pageName: string) {
    const pageUrl = await getPageUrl(pageName);
    console.log(`Navigating to ${pageName} at URL: ${pageUrl}`);
    console.log(`page instance: ${page}`);
    await page.goto(pageUrl);
    await page.waitForLoadState('domcontentloaded');
}

async function scrollToBottom(context: any) {
    if (!context.page) throw new Error('page is not initialized on World context');
    await context.page.evaluate(async () => {
        await new Promise<void>(resolve => {
            const scrollStep = 50;
            const scrollInterval = 10;
            const scroll = () => {
                if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
                    window.scrollBy(0, scrollStep);
                    setTimeout(scroll, scrollInterval);
                } else {
                    resolve();
                }
            };
            scroll();
        });
    });
}

defineStep(scrollStep, { timeout: timeouts.pageInteraction }, async function (this: CustomWorld) {
    await scrollToBottom(this);
});

defineStep(navigationStep, { timeout: timeouts.navigation }, async function (this: CustomWorld, pageName: string) {
    await goToPage(this.page!, pageName);
});

defineStep(pauseStep, { timeout: timeouts.pageInteraction }, async function (this: CustomWorld) {
    console.log('Pausing execution for debugging. Press Enter to continue...');
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.pause();
});

defineStep(waitStep, { timeout: timeouts.pageInteraction }, async function (this: CustomWorld, seconds: number) {
    const milliseconds = seconds * 1000;
    console.log(`Waiting for ${seconds} seconds...`);
    await new Promise(resolve => setTimeout(resolve, milliseconds));
    console.log(`Waited for ${seconds} seconds`);
});

After(async function (this: CustomWorld) {
    if (this.browser) {
        await this.closeBrowser()
    }
});
