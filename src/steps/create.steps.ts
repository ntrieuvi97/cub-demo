import {DataTable, Then, When} from '@cucumber/cucumber';
import assert from 'assert';
import {CustomWorld} from '../support/world';
import {WebUrls} from '../apis/urls';

let listingIdGlobal: string;

/**
 * Consolidated step for creating a property listing using DataTable
 * Supports fields: Listing Type, Address Search, Property Type, Area, Price, Title, Description, Images
 */
When('I create a property listing with the following details:', async function (this: CustomWorld, dataTable: DataTable) {
    const propertyPostingPage = this.pages.propertyPosting();
    const data = dataTable.rowsHash(); // Convert DataTable to key-value object

    // Step 1: Select listing type (Sell/Rent)
    if (data['Listing Type']) {
        console.log(`📝 Selecting listing type: ${data['Listing Type']}`);
        await propertyPostingPage.selectListingType(data['Listing Type']);
    }

    // Step 2: Search for address
    if (data['Address Search']) {
        console.log(`📍 Searching for address: ${data['Address Search']}`);
        await propertyPostingPage.clickAddressSearchBox();
        await propertyPostingPage.searchAddress(data['Address Search']);
        await propertyPostingPage.selectFirstSearchResult();
        await propertyPostingPage.clickOnButtonByText('Xác nhận');
    }

    // Step 3: Select property type
    if (data['Property Type']) {
        console.log(`🏠 Selecting property type: ${data['Property Type']}`);
        await propertyPostingPage.selectPropertyType(data['Property Type']);
    }

    // Step 4: Input area
    if (data['Area']) {
        console.log(`📏 Inputting area: ${data['Area']}`);
        await propertyPostingPage.inputArea(data['Area']);
    }

    // Step 5: Input price
    if (data['Price']) {
        console.log(`💰 Inputting price: ${data['Price']}`);
        await propertyPostingPage.inputPrice(data['Price']);
    }

    // Step 6: Input title
    if (data['Title']) {
        console.log(`📰 Inputting title: ${data['Title']}`);
        await propertyPostingPage.inputTitle(data['Title']);
    }

    // Step 7: Input description
    if (data['Description']) {
        console.log(`📝 Inputting description: ${data['Description']}`);
        await propertyPostingPage.inputDescription(data['Description']);
    }

    // Step 8: Click continue to go to next step
    console.log('➡️ Proceeding to next step');
    await propertyPostingPage.clickOnButtonByText('Tiếp tục');
    await this.page!.waitForTimeout(2000);
    await propertyPostingPage.clickOnButtonByText('Tiếp tục');

    // Step 9: Upload images
    if (data['Images']) {
        const imagePaths = data['Images'].split(',').map((path: string) => path.trim());
        console.log(`📸 Uploading ${imagePaths.length} images`);
        for (const imagePath of imagePaths) {
            await propertyPostingPage.uploadImage(imagePath);
        }
    }

    // Step 10: Continue through final steps
    console.log('✅ Completing listing submission');
    await propertyPostingPage.clickOnButtonByText('Tiếp tục');
    await this.page!.waitForTimeout(10000);

    if (data['Vip Type']) {
        await propertyPostingPage.selectVipTypeOption(data['Vip Type']);
        console.log(`🌟 Selected VIP type: ${data['Vip Type']}`);
    }

    if (data['Duration']) {
        await propertyPostingPage.selectDurationOption(data['Duration']);
        console.log(`⏳ Selected duration: ${data['Duration']}`);
    }

    await propertyPostingPage.clickOnButtonByText('Tiếp tục');
    let byPassButtonExists = await propertyPostingPage.isButtonWithTextVisible('Không, tiếp tục');
    if (byPassButtonExists) {
        await propertyPostingPage.clickOnButtonByText('Không, tiếp tục');
    }
    await propertyPostingPage.clickOnButtonByText('Thanh toán');

});

When('I select {string} as listing type', async function (this: CustomWorld, listingType: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.selectListingType(listingType);
});

When('I click on the address search box', async function (this: CustomWorld) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.clickAddressSearchBox();
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.searchAddress(searchTerm);
});

When('I select the first search result', async function (this: CustomWorld) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.selectFirstSearchResult();
});

When('I click {string} button', async function (this: CustomWorld, buttonText: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.clickOnButtonByText(buttonText);
});

When('I select {string} as property type', async function (this: CustomWorld, propertyType: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.selectPropertyType(propertyType);
});

When('I input for price {string}', async function (this: CustomWorld, price: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.inputPrice(price);
});

When('I input for area {string}', async function (this: CustomWorld, area: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.inputArea(area);
});

When('I input for title {string}', async function (this: CustomWorld, title: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.inputTitle(title);
});

When('I input for description {string}', async function (this: CustomWorld, description: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.inputDescription(description);
});

When('I upload image {string}', async function (this: CustomWorld, imagePath: string) {
    const propertyPostingPage = this.pages.propertyPosting();
    await propertyPostingPage.uploadImage(imagePath);
});

Then('I should see the listing confirmation message {string}', async function (this: CustomWorld, message: string) {
    const messageLocator = this.page!.locator(`text="${message}"`);
    await messageLocator.waitFor({ state: 'visible', timeout: 15000 });
    const isVisible = await messageLocator.isVisible();
    assert.ok(isVisible, `Confirmation message "${message}" should be visible`);
});

Then('I got the listing ID', async function (this: CustomWorld) {
    const propertyPostingPage = this.pages.propertyPosting();
    listingIdGlobal = await propertyPostingPage.getListingId();
    console.log(`📋 Listing ID captured: ${listingIdGlobal}`);
    assert.ok(listingIdGlobal && listingIdGlobal.length > 0, 'Listing ID should not be empty');
});

Then('I should find the listing in LMP', async function (this: CustomWorld) {
    console.log(`🔍 Navigating to LMP to verify listing: ${listingIdGlobal}`);
    await this.page!.goto(`${WebUrls.listingManagementPage}?search=${listingIdGlobal}`);
    await this.page!.waitForLoadState('domcontentloaded');
    
    const listingLocator = this.page!.locator(`.listingInfo-${listingIdGlobal}`);
    await listingLocator.waitFor({ state: 'visible', timeout: 15000 });
    const isVisible = await listingLocator.isVisible();
    assert.strictEqual(isVisible, true, `Listing with ID ${listingIdGlobal} should be visible in LMP`);
    console.log(`✅ Listing ${listingIdGlobal} found in LMP`);
});