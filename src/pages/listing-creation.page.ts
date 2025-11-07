import {BasePage} from './base.page';
import {Page} from '@playwright/test';

export class ListingCreationPage extends BasePage {
    intentButton: string = 'div[data-tracking-id="click-choose-need"][data-tracking-label="type=${listingType}"]';
    searchAddressBox: string = "div[class ^='style_location-search-container']";
    addressConfirmButton: string = 'button[data-tracking-id="click-confirm-location"]';
    nextButton: string = 'button[data-tracking-id="click-lcp-next-step"]';
    addressInput: string = 'input[data-tracking-id="click-input-location"]';
    resultSelector: string = 'div[data-tracking-id="click-choose-suggested-location"]';
    propertyTypeDropdown: string = '.dropdown-center:has(#lcp-category-input)';
    propertyTypeOption: string = '.dropdown-menu.show .item';
    areaInput: string = '#lcp-acreage-input';
    priceInput: string = '#lcp-price-input';
    titleInput: string = '#lcp-title-input textarea';
    descriptionInput: string = '#lcp-description-input textarea';
    vipTypeOption: string = '//div[@data-tracking-id="click-choose-VIP"][not(contains(@class, "selected"))]//p[@class="pg-font-label-m"]';
    durationOption: string = '//div[@data-tracking-id="click-choose-duration"][not(contains(@class, "selected"))]//p[1]';
    constructor(page: Page) {
        super(page);
    }

    async selectListingType(type: string) {
        const button = this.page.locator(this.intentButton.replace('${listingType}', type));
        await button.waitFor({ state: 'visible', timeout: 10000 });
        await button.click();
        await this.page.waitForTimeout(1000);
    }

    async clickAddressSearchBox() {
        const addressInput = this.page.locator(this.searchAddressBox);
        await addressInput.scrollIntoViewIfNeeded();
        await addressInput.click();
    }

    async searchAddress(searchTerm: string) {
        const addressInput = this.page.locator(this.addressInput).first();
        await addressInput.fill(searchTerm);
        await addressInput.press('Enter');
        await this.page.waitForTimeout(1500);
    }

    async selectFirstSearchResult() {
        const results = this.page.locator(this.resultSelector);
        const count = await results.count();
        if (count > 0) {
            await results.nth(0).click();
            return;
        }
        await this.page.locator("button:has-text('Xác nhận')").click();
        throw new Error('Could not find any search results to select');
    }


    async selectPropertyType(propertyType: string) {
        const propertyTypeElement = this.page.locator(this.propertyTypeDropdown);
        await propertyTypeElement.click();

        const options = this.page.locator(this.propertyTypeOption);
        const count = await options.count();
        let found = false;

        for (let i = 0; i < count; i++) {
            const optionText = await options.nth(i).innerText();
            if (optionText.trim() === propertyType) {
                await options.nth(i).click();
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`Property type "${propertyType}" not found in the dropdown options`);
        }
    }

    async inputArea(area: string) {
        const areaInput = this.page.locator(this.areaInput);
        await areaInput.fill(area);
    }

    async inputPrice(price: string) {
        const priceInput = this.page.locator(this.priceInput);
        await priceInput.fill(price);
    }

    async inputTitle(title: string) {
        const titleInput = this.page.locator(this.titleInput);
        await titleInput.click();
        await titleInput.fill(title);
    }
    async inputDescription(description: string) {
        const descriptionInput = this.page.locator(this.descriptionInput);
        await descriptionInput.fill(description);
    }


    async uploadImage(imagePath: string) {
        // Wait for the file input to be present
        const uploadInput = this.page.locator('input[type="file"]').first();
        await uploadInput.waitFor({ state: 'attached', timeout: 10000 });

        // Set the file
        await uploadInput.setInputFiles(imagePath);

        // Wait for upload to process
        await this.page.waitForTimeout(3000);
    }

    async selectVipTypeOption(vipType: string) {
        const vipOption = this.page.locator(this.vipTypeOption).filter({hasText: vipType}).first();
        try {
            await vipOption.waitFor({state: 'visible', timeout: 10000});
            await vipOption.click();
            await this.page.waitForTimeout(1000);
        } catch {
            // If VIP option is not found, it might be because no VIP options are available.
            console.log(`⚠️  VIP type option "${vipType}" are selected or not available.`);
        }
    }

    async selectDurationOption(duration: string) {
        const durationOption = this.page.locator(this.durationOption).filter({hasText: duration}).first();
        try {
            await durationOption.waitFor({state: 'visible', timeout: 10000});
            await durationOption.click();
            await this.page.waitForTimeout(1000);
        } catch {
            // If duration option is not found, it might be because no duration options are available.
            console.log(`⚠️  Duration option "${duration}" are selected or not available.`);
        }

    }

    async clickOnButtonByText(buttonText: string, options?: { timeout?: number }) {
        try {
            const button = this.page.getByRole('button', { name: buttonText }).first();
            
            // Wait for button to be ready
            await button.waitFor({ state: 'attached', timeout: options?.timeout || 10000 });
            await this.page.waitForLoadState('domcontentloaded').catch(() => {});
            
            // Perform the click
            await button.click({ timeout: options?.timeout || 10000 });


        } catch (error: any) {
            // Log the error but check if it's expected
            const errorMsg = error.message || String(error);
            console.log(`⚠️  Error clicking "${buttonText}": ${errorMsg}`);
            
            // If page/browser closed, it might be intentional (redirect, etc.)
            if (errorMsg.includes('closed') || errorMsg.includes('detached')) {
                console.log(`   This might be expected behavior after clicking "${buttonText}"`);
                return; // Don't throw
            }
            throw error;
        }
    }

    async isButtonWithTextVisible(buttonText: string): Promise<boolean> {
        const button = this.page.getByRole('button', {name: buttonText}).first();
        try {
            await button.waitFor({state: 'visible', timeout: 5000});
            return true;
        } catch {
            return false;
        }
    }

    async getListingId(): Promise<string> {
        const listingIdElement = this.page.locator('//div[contains(@class,"content")]//p[text() = "Mã tin"]/../div/p').first();
        const listingId = await listingIdElement.innerText();
        return listingId.trim();
    }
}