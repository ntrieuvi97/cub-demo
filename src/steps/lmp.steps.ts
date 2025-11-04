import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';
import { UMSApi } from '../apis/endpoints/ums.api';
import { BffListingApi } from '../apis/endpoints/bff-listing.api';
import { CommonApi } from '../apis/endpoints/common.api';
import { getPropertyType, getCategoryCode, getVipType } from '../types/listing-constants';

// Shared state for the scenario
let createdListingId: string;
let contactInfo: any;
let cityList: any[];
let districtList: any[];
let wardList: any[];

/**
 * Step 1: Create a listing via API with parameterized attributes
 * This step performs:
 * 1. Login (handled by @authorized hook)
 * 2. Fetch contact info
 * 3. Fetch random location (city -> district -> ward)
 * 4. Create listing via BFF API
 * 
 * @param propertyType - "sell", "rent", "bán", "thuê"
 * @param category - "apartment", "house", "villa", "shophouse", etc.
 * @param vipType - "normal", "vip bac", "vip vang", "vip diamond"
 */
Given('I have a listing that {string} a {string} with {string} type', async function (this: CustomWorld, propertyType: string, category: string, vipType: string) {
    console.log('🏠 Starting listing creation process...');
    console.log(`📝 Listing type: ${propertyType} - ${category} - ${vipType}`);

    // Convert friendly names to enum values
    const propertyTypeCode = getPropertyType(propertyType);
    const categoryCode = getCategoryCode(propertyType, category);
    const vipTypeCode = getVipType(vipType);

    console.log(`� Codes: PropertyType=${propertyTypeCode}, Category=${categoryCode}, VipType=${vipTypeCode}`);

    // Step 1: Fetch contact information
    console.log('📞 Step 1: Fetching contact information...');
    const umsApi = new UMSApi(this.page!);
    const contactResponse = await umsApi.fetchContact();
    const contactData = await contactResponse.json();
    contactInfo = contactData.Result || contactData;
    console.log('✅ Contact info fetched:', {
        name: contactInfo.ContactName,
        phone: contactInfo.ContactPhone,
        mobile: contactInfo.ContactMobile,
        address: contactInfo.ContactAddress,
        email: contactInfo.ContactEmail
    });

    // Step 2: Fetch random location
    console.log('📍 Step 2: Fetching random location...');
    const commonApi = new CommonApi(this.page!);

    // Fetch cities
    const cityResponse = await commonApi.fetchCityList();
    const cityData = await cityResponse.json();
    cityList = cityData.Result || cityData;
    const randomCity = cityList[Math.floor(Math.random() * cityList.length)];
    console.log(`  🏙️ Selected city: ${randomCity.name} (${randomCity.id})`);

    // Fetch districts for selected city
    const districtResponse = await commonApi.fetchDistrictList(randomCity.id);
    const districtData = await districtResponse.json();
    districtList = districtData.Result || districtData;
    const randomDistrict = districtList[Math.floor(Math.random() * districtList.length)];
    console.log(`  🗺️ Selected district: ${randomDistrict.name} (ID: ${randomDistrict.id})`);

    // Fetch wards for selected district
    const wardResponse = await commonApi.fetchWardList(randomDistrict.id);
    const wardData = await wardResponse.json();
    wardList = wardData.Result || wardData;
    const randomWard = wardList[Math.floor(Math.random() * wardList.length)];
    console.log(`  📌 Selected ward: ${randomWard.name} (ID: ${randomWard.id})`);

    // Step 3: Create listing via BFF API
    console.log('🏗️ Step 3: Creating listing via BFF API...');
    const bffListingApi = new BffListingApi(this.page!);

    const listingData = {
        title: `[Auto Test] ${propertyType} ${category} ${Date.now()}`,
        description: 'This is an automated test listing created via Cucumber BDD framework',
        productType: propertyTypeCode,
        categoryId: categoryCode,
        price: 5000000000, // 5 billion VND
        cityCode: randomCity.id,
        districtId: randomDistrict.id,
        wardId: randomWard.id,
        address: `${randomWard.name}, ${randomDistrict.name}, ${randomCity.name}`,
        contactMobile: contactInfo.ContactMobile || contactInfo.ContactPhone,
        contactName: contactInfo.ContactName || 'Auto Test User',
        contactEmail: contactInfo.ContactEmail || 'test@example.com',
        acreage: 100,
        bedroomCount: 3,
        toiletCount: 2,
        floorCount: 5,
        fileIds: '3temp.20251104145558-127e.jpg##image&&||3temp.20251104145606-0b37.jpg##image&&||3temp.20251104145610-413d.jpg##image&&||3temp.20251104145614-4d25.jpg##image&&',
        viptype: vipTypeCode.toString()
    };

    const response = await bffListingApi.createListing(listingData);
    const responseData = await response.json();

    // Extract listing ID from response
    createdListingId = responseData.Result?.SavedProduct?.ProductId || undefined;

    if (!createdListingId) {
        console.error('❌ Failed to create listing. Response:', JSON.stringify(responseData, null, 2));
        throw new Error(`Listing creation failed: ${responseData.Error?.Message || 'Unknown error'}`);
    }

    console.log(`✅ Listing created successfully! ID: ${createdListingId}`);
    console.log('📋 Listing details:', {
        id: createdListingId,
        title: listingData.title,
        location: `${randomCity.name} > ${randomDistrict.name} > ${randomWard.name}`,
        price: listingData.price,
        contact: listingData.contactName
    });
});

/**
 * Step 2: Navigate to LMP with the created listing
 */
When('I navigate to LMP', async function (this: CustomWorld) {
    console.log(`🔍 Navigating to Listing Management Page with listing ID: ${createdListingId}`);

    const lmpPage = this.pages.listingManagement();
    await lmpPage.goto(createdListingId);

    console.log('✅ Navigation to LMP completed');
});

/**
 * Step 3: Verify the listing is visible on LMP
 */
Then('I see the listing on LMP', async function (this: CustomWorld) {
    console.log(`👀 Verifying listing ${createdListingId} is visible on LMP...`);

    const lmpPage = this.pages.listingManagement();

    // Wait for the listing to appear
    await lmpPage.waitForListing(createdListingId, 10000);

    // Verify listing is visible
    const isVisible = await lmpPage.isListingVisible(createdListingId);
    assert.strictEqual(isVisible, true, `Listing ${createdListingId} should be visible on LMP`);

    console.log(`✅ Listing ${createdListingId} is successfully displayed on LMP!`);
});
