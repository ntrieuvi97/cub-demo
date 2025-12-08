import {Page} from '@playwright/test';
import {BasePage} from '../core/base.page';
import {WebUrls} from '../apis/urls';

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
     * Wait for listing to appear on the page
     */
    async waitForListing(listingId: string, timeout: number = 10000) {
        await this.page.locator(`text="${listingId}"`).waitFor({ timeout });
    }

    /**
     * Dismiss onboarding modal if it appears
     */
    async dismissOnboardingModal() {
        console.log('🔍 Checking for onboarding modal...');

        // Wait a bit for modal to appear
        await this.page.waitForTimeout(2000);

        // Common selectors for close/dismiss buttons in modals
        // Prioritize the specific 'btn p-0' class button
        const closeSelectors = [
            'button.btn.p-0',
            '.btn.p-0',
            'button:has-text("Đóng")',
            'button:has-text("Close")',
            'button:has-text("Bỏ qua")',
            'button:has-text("Skip")',
            'button:has-text("×")',
            '[aria-label="Close"]',
            '[class*="close"]',
            '[class*="dismiss"]',
            '.modal button',
            '[role="dialog"] button'
        ];

        for (const selector of closeSelectors) {
            try {
                const closeButton = this.page.locator(selector).first();
                const isVisible = await closeButton.isVisible({timeout: 1000}).catch(() => false);

                if (isVisible) {
                    console.log(`  Found modal close button with selector: ${selector}`);
                    await closeButton.click({force: true});
                    console.log('✅ Onboarding modal dismissed');
                    await this.page.waitForTimeout(1000);
                    return;
                }
            } catch (e) {
                // Continue to next selector
            }
        }

        // Try pressing Escape key as fallback
        try {
            await this.page.keyboard.press('Escape');
            console.log('  Pressed Escape key to dismiss modal');
            await this.page.waitForTimeout(500);
        } catch (e) {
            console.log('  No modal found or already dismissed');
        }
    }

    /**
     * Click on "Đẩy tin" (Boost) button for a listing
     */
    async clickBoostButton(listingId: string) {
        console.log(`🚀 Clicking boost button for listing ${listingId}...`);
        // Wait for page to be fully loaded
        await this.page.waitForLoadState('domcontentloaded');
        // Dismiss onboarding modal if it appears
        await this.dismissOnboardingModal();
        console.log('  Looking for "Đẩy tin" button...');
        try {
            const boostText = this.page.getByText('Đẩy tin', {exact: true});
            await boostText.first().click();
        } catch (e) {
            console.log(`  Strategy 1 failed: ${e}`);
            throw new Error(`Could not find or click boost button for listing ${listingId}`);
        }
    }

    /**
     * Select boost type in the modal
     * @param boostType - "1 lần đẩy", "3 lần đẩy", or "6 lần đẩy"
     */
    async selectBoostType(boostType: string) {
        console.log(`📦 Selecting boost type: ${boostType}...`);
        // Strategy 4: Fallback - look for any element with the boost type text in modal
        try {
            console.log('  Strategy 4: Fallback - finding any element with boost type text...');
            const modal = this.page.locator('[role="dialog"], .modal, [class*="modal"]').first();
            await modal.getByText(boostType).first().click();
        } catch (e) {
            console.log(`  Strategy failed: ${e}`);
            throw new Error(`Could not find boost type option: ${boostType}`);
        }
    }

    /**
     * Click on "Tiếp tục" (Continue) button in boost modal
     */
    async clickContinueButton() {
        console.log('💳 Step 1: Clicking "Tiếp tục" button...');
        try {
            const button = this.page.getByRole('button', {name: /Tiếp tục/i});
            const isVisible = await button.isVisible({timeout: 10000}).catch(() => false);

            if (isVisible) {
                console.log(`  Found "Tiếp tục" button by role`);
                await button.scrollIntoViewIfNeeded();
                await button.click({force: true});
                console.log('✅ "Tiếp tục" button clicked (fallback)');
                await this.page.waitForTimeout(2000);
                return;
            }
        } catch (e) {
            console.log(`  Fallback failed: ${e}`);
        }
        throw new Error('Could not find "Tiếp tục" button');
    }

    /**
     * Click on "Thanh toán" (Payment) button in boost modal
     */
    async clickPaymentButton() {
        console.log('💳 Step 2: Clicking "Thanh toán" button...');
        // Fallback: Try by role and name
        try {
            const button = this.page.getByRole('button', {name: /Thanh toán/i});
            const isVisible = await button.isVisible({timeout: 10000}).catch(() => false);

            if (isVisible) {
                console.log(`  Found "Thanh toán" button by role`);
                await button.scrollIntoViewIfNeeded();
                await button.click({force: true});
                console.log('✅ "Thanh toán" button clicked (fallback)');
                return;
            }
        } catch (e) {
            console.log(` failed: ${e}`);
            throw new Error('Could not find "Thanh toán" button');
        }

    }

    /**
     * Check if success message is displayed
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        console.log('🔍 Checking for success message...');
        // Try multiple possible success message selectors, prioritizing "Thanh toán thành công"
        const successSelectors = [
            'text="Thanh toán thành công"',
            'text="thanh toán thành công"',
            'text="Đẩy tin thành công"',
            'text="Thành công"',
            'text="Success"',
            '.success-message',
            '.toast-success',
            '[class*="success"]',
            '[role="alert"]:has-text("thành công")'
        ];

        for (const selector of successSelectors) {
            try {
                const isVisible = await this.page.locator(selector).first().isVisible({timeout: 5000});
                if (isVisible) {
                    console.log(`✅ Success message found with selector: ${selector}`);
                    return true;
                }
            } catch (e) {
                // Continue to next selector
            }
        }

        console.log('❌ No success message found');
        return false;
    }

    /**
     * Wait for success message to appear
     */
    async waitForSuccessMessage(timeout: number = 10000) {
        console.log('⏳ Waiting for success message...');
        const successSelectors = [
            'text="Thanh toán thành công"',
            'text="thanh toán thành công"',
            'text="Đẩy tin thành công"',
            'text="Thành công"',
            'text="Success"',
            '.success-message',
            '.toast-success'
        ];

        for (const selector of successSelectors) {
            try {
                await this.page.locator(selector).first().waitFor({timeout: timeout / successSelectors.length});
                console.log(`✅ Success message appeared with selector: ${selector}`);
                return;
            } catch (e) {
                // Continue to next selector
            }
        }

        console.log('⚠️ Success message not found within timeout');
    }
}
