import {After, Given, When} from '@cucumber/cucumber';
import {timeouts} from '../configs';
import {CustomWorld} from '../support/world';
import {AmeApi} from '../apis/endpoints/ame.api';
import {goToPage, scrollToBottom, validateCreatedListing, validatePageAndUserId} from '../utils/step-helpers';

// Navigation steps
When('I scroll to the bottom of the page', {timeout: timeouts.pageInteraction}, async function (this: CustomWorld) {
    await scrollToBottom(this);
});

Given('I navigate to the {string}', {timeout: timeouts.navigation}, async function (this: CustomWorld, pageName: string) {
    await goToPage(this.page!, pageName);
});

// Utility steps
Given('I pause for debuging', {timeout: timeouts.pageInteraction}, async function (this: CustomWorld) {
    console.log('Pausing execution for debugging. Press Enter to continue...');
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.pause();
});

Given('I wait for {int} seconds', {timeout: timeouts.pageInteraction}, async function (this: CustomWorld, seconds: number) {
    const milliseconds = seconds * 1000;
    console.log(`Waiting for ${seconds} seconds...`);
    await new Promise(resolve => setTimeout(resolve, milliseconds));
    console.log(`Waited for ${seconds} seconds`);
});

// AME API - Publish listing steps
Given('I publish listing {int}', {timeout: timeouts.api}, async function (this: CustomWorld, listingId: number) {
    console.log(`📢 Publishing listing ${listingId}...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.publishListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Publish listing by api'
    });

    console.log(`✅ Listing ${listingId} published successfully`);
});

Given('I publish the listing', {timeout: timeouts.api}, async function (this: CustomWorld) {
    const listingId = validateCreatedListing(this);
    console.log(`📢 Publishing created listing ${listingId}...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.publishListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Publish listing by api'
    });

    console.log(`✅ Listing ${listingId} published successfully`);
});

// AME API - Suspend listing steps
Given('I suspend listing {int}', {timeout: timeouts.api}, async function (this: CustomWorld, listingId: number) {
    console.log(`🚫 Suspending listing ${listingId}...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.suspendListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Suspend listing by api'
    });

    console.log(`✅ Listing ${listingId} suspended successfully`);
});

Given('I suspend the listing', {timeout: timeouts.api}, async function (this: CustomWorld) {
    const listingId = validateCreatedListing(this);
    console.log(`🚫 Suspending created listing ${listingId}...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.suspendListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Suspend listing by api'
    });

    console.log(`✅ Listing ${listingId} suspended successfully`);
});

// AME API - Mark review listing steps
Given('I mark review listing {int}', {timeout: timeouts.api}, async function (this: CustomWorld, listingId: number) {
    console.log(`🔍 Marking listing ${listingId} for review...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.markReviewListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Mark review listing by api'
    });

    console.log(`✅ Listing ${listingId} marked for review successfully`);
});

Given('I mark review the listing', {timeout: timeouts.api}, async function (this: CustomWorld) {
    const listingId = validateCreatedListing(this);
    console.log(`🔍 Marking created listing ${listingId} for review...`);
    validatePageAndUserId(this);

    const ameApi = new AmeApi(this.page!);
    await ameApi.markReviewListing({
        productId: listingId,
        actorId: this.userId!,
        ownerId: this.userId!,
        note: '[Automation] Mark review listing by api'
    });

    console.log(`✅ Listing ${listingId} marked for review successfully`);
});

After(async function (this: CustomWorld) {
    if (this.browser) {
        await this.closeBrowser()
    }
});
