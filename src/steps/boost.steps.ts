import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';

/**
 * Step: Buy boost for the listing with specific boost type
 * This step performs:
 * 1. Click on "Đẩy tin" button
 * 2. Select boost type from modal
 * 3. Click on "Tiếp tục" button
 * 4. Click on "Thanh toán" button
 *
 * @param boostType - "1 lần đẩy", "3 lần đẩy", or "6 lần đẩy"
 */
When('I buy boost for the listing with {string} boost type', { timeout: 60000 }, async function (this: CustomWorld, boostType: string) {
    console.log(`🚀 Starting boost purchase process with type: ${boostType}`);

    if (!this.createdListingId) {
        throw new Error('❌ No listing ID found. Please create a listing first.');
    }

    const lmpPage = this.pages.listingManagement();
    const listingIdStr = this.createdListingId.toString();

    // Step 1: Click on "Đẩy tin" button
    await lmpPage.clickBoostButton(listingIdStr);

    // Step 2: Select boost type in modal
    await lmpPage.selectBoostType(boostType);

    // Step 3: Click on "Tiếp tục" button
    await lmpPage.clickContinueButton();

    // Step 4: Click on "Thanh toán" button
    await lmpPage.clickPaymentButton();

    console.log(`✅ Boost purchase process completed for listing ${this.createdListingId}`);
});

/**
 * Step: Verify success message is displayed
 */
Then('I see the successful message', { timeout: 30000 }, async function (this: CustomWorld) {
    console.log('👀 Verifying successful message is displayed...');

    const lmpPage = this.pages.listingManagement();

    // Wait for success message to appear
    await lmpPage.waitForSuccessMessage(10000);

    // Verify success message is visible
    const isVisible = await lmpPage.isSuccessMessageVisible();
    assert.strictEqual(isVisible, true, 'Success message should be displayed after boost purchase');

    console.log('✅ Success message verified successfully!');
});

