import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { WebUrls } from '../apis/urls';

/**
 * Page Object for Listing Management Page (LMP)
 * URL: Configured in WebUrls.listingManagementPage
 */
export class ListingManagementPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to LMP with optional search query
     */
    async goto(searchQuery?: string) {
        const url = searchQuery ? `${WebUrls.listingManagementPage}?search=${searchQuery}` : WebUrls.listingManagementPage;
        await this.page.goto(url);
        await this.waitForDomContentLoaded();
    }

    /**
     * Check if a listing is visible on the page by listing ID
     */
    async isListingVisible(listingId: string): Promise<boolean> {
        const listingSelector = `text="${listingId}"`;
        return await this.page.locator(listingSelector).isVisible({ timeout: 5000 })
            .catch(() => false);
    }

    /**
     * Get listing row by listing ID
     */
    async getListingRow(listingId: string) {
        return this.page.locator(`tr:has-text("${listingId}")`);
    }

    /**
     * Wait for listing to appear on the page
     */
    async waitForListing(listingId: string, timeout: number = 10000) {
        await this.page.locator(`text="${listingId}"`).waitFor({ timeout });
    }

    /**
     * Get all visible listing IDs on the current page
     */
    async getVisibleListingIds(): Promise<string[]> {
        const listingRows = await this.page.locator('tr[data-listing-id]').all();
        const ids: string[] = [];
        
        for (const row of listingRows) {
            const id = await row.getAttribute('data-listing-id');
            if (id) ids.push(id);
        }
        
        return ids;
    }

    /**
     * Search for a listing by ID
     */
    async searchListing(listingId: string) {
        const searchInput = this.page.locator('input[type="search"], input[placeholder*="Tìm"]').first();
        await searchInput.fill(listingId);
        await searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }
}
