import { CustomWorld } from '../support/world';
import { Page } from 'playwright-core';
import { WebUrls } from '../apis/urls';

/**
 * Validation helper functions for step definitions
 */

export function validatePage(context: CustomWorld): void {
    if (!context.page) {
        throw new Error('Page is not initialized');
    }
}

export function validateUserId(context: CustomWorld): void {
    if (!context.userId) {
        throw new Error('UserId not found. Please use @user tag to authenticate before using this step');
    }
}

export function validateCreatedListing(context: CustomWorld): number {
    if (!context.createdListingId) {
        throw new Error('No listing has been created yet. Please create a listing first using "I have a listing..." step');
    }
    return context.createdListingId;
}

export function validatePageAndUserId(context: CustomWorld): void {
    validatePage(context);
    validateUserId(context);
}

/**
 * Navigation helper functions
 */

export async function getPageUrl(pageName: string): Promise<string> {
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

export async function goToPage(page: Page, pageName: string): Promise<void> {
    const pageUrl = await getPageUrl(pageName);
    console.log(`Navigating to ${pageName} at URL: ${pageUrl}`);
    console.log(`page instance: ${page}`);
    await page.goto(pageUrl);
    await page.waitForLoadState('domcontentloaded');
}

/**
 * Page interaction helper functions
 */

export async function scrollToBottom(context: CustomWorld): Promise<void> {
    if (!context.page) {
        throw new Error('page is not initialized on World context');
    }

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

