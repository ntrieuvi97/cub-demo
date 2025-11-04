import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';
import { BffListingApi } from '../apis/endpoints/bff-listing.api';

let bffListingApi: BffListingApi;
let listingResponse: any;

/**
 * Example step: Create listing via BFF API
 */
When('I create a listing via BFF API with:', async function (this: CustomWorld, dataTable: any) {
    bffListingApi = new BffListingApi(this.page!);
    const data = dataTable.rowsHash();

    const response = await bffListingApi.createListing({
        title: data['Title'],
        description: data['Description'],
        productType: parseInt(data['Product Type']),
        categoryId: parseInt(data['Category ID']),
        price: parseInt(data['Price']),
        cityCode: data['City Code'],
        districtId: parseInt(data['District ID']),
        wardId: parseInt(data['Ward ID']),
        address: data['Address'],
        contactMobile: data['Contact Mobile'],
        contactName: data['Contact Name'],
        contactEmail: data['Contact Email'],
        acreage: parseInt(data['Acreage']),
        fileIds: data['File IDs'],
        viptype: data['VIP Type'] || '3',
        bedroomCount: data['Bedroom Count'] ? parseInt(data['Bedroom Count']) : undefined,
        toiletCount: data['Toilet Count'] ? parseInt(data['Toilet Count']) : undefined,
        floorCount: data['Floor Count'] ? parseInt(data['Floor Count']) : undefined,
    });

    listingResponse = await response.json();
    console.log('Listing created via BFF API:', JSON.stringify(listingResponse, null, 2));
});

Then('the BFF API should return success', async function (this: CustomWorld) {
    assert.ok(listingResponse, 'Response should exist');
    // Add your assertions based on actual response structure
    console.log('BFF API Response validated successfully');
});
