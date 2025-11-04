# Listing Management Page (LMP) Testing

## Overview
This test suite verifies that listings created via API appear correctly on the Listing Management Page (LMP).

## Test Scenario

### Feature: `tests/lmp.feature`
**Scenario:** Verify created listing appears on LMP

This scenario tests the complete flow:
1. **Given I have a listing** - Creates a listing via BFF API
2. **When I navigate to LMP** - Navigates to the Listing Management Page with the listing ID
3. **Then I see the listing on LMP** - Verifies the listing is visible on the page

## Implementation Details

### Step Definitions (`src/steps/lmp.steps.ts`)

#### Given I have a listing
This step performs a complete listing creation flow:

1. **Fetch Contact Info**: Retrieves user contact information (name, phone, email, address)
   - Uses `UMSApi.fetchContact()`
   
2. **Fetch Random Location**: Gets a random location hierarchy
   - Fetches all cities via `CommonApi.fetchCityList()`
   - Selects a random city
   - Fetches districts for that city via `CommonApi.fetchDistrictList(cityCode)`
   - Selects a random district
   - Fetches wards for that district via `CommonApi.fetchWardList(districtId)`
   - Selects a random ward

3. **Create Listing**: Creates a listing with the gathered data
   - Uses `BffListingApi.createListing()`
   - Stores the created listing ID for verification

#### When I navigate to LMP
- Uses `ListingManagementPage.goto(listingId)` to navigate with search query
- Waits for page to load

#### Then I see the listing on LMP
- Waits for the listing to appear using `ListingManagementPage.waitForListing()`
- Verifies visibility using `ListingManagementPage.isListingVisible()`
- Asserts that the listing is visible

### Page Object (`src/pages/listing-management.page.ts`)

The `ListingManagementPage` class provides:
- `goto(searchQuery?)` - Navigate to LMP with optional search
- `isListingVisible(listingId)` - Check if listing is visible
- `waitForListing(listingId, timeout)` - Wait for listing to appear
- `getListingRow(listingId)` - Get the listing row element
- `searchListing(listingId)` - Search for a listing by ID
- `getVisibleListingIds()` - Get all visible listing IDs

## Tags

- `@lmp` - Marks this as an LMP test
- `@web-ui` - Requires browser initialization
- `@authorized` - Requires authentication
- `@user=validUser` - Uses valid user credentials from `tests/data/credentials.json`

## Running the Test

```bash
# Run all LMP tests
npm test -- --tags "@lmp"

# Run specific scenario
npm test -- tests/lmp.feature
```

## Expected Output

```
🏠 Starting listing creation process...
📞 Step 1: Fetching contact information...
✅ Contact info fetched: { name: 'Test User', phone: '0123456789', ... }
📍 Step 2: Fetching random location...
  🏙️ Selected city: Hà Nội (HN)
  🗺️ Selected district: Ba Đình (ID: 1)
  📌 Selected ward: Phúc Xá (ID: 1)
🏗️ Step 3: Creating listing via BFF API...
✅ Listing created successfully! ID: 12345678
📋 Listing details: { id: '12345678', title: '[Auto Test] Property ...', ... }
🔍 Navigating to Listing Management Page with listing ID: 12345678
✅ Navigation to LMP completed
👀 Verifying listing 12345678 is visible on LMP...
✅ Listing 12345678 is successfully displayed on LMP!
```

## Data Flow

```
@authorized hook
    ↓
Login via UMSApi.login()
    ↓
Given I have a listing
    ↓
├─ UMSApi.fetchContact() → contactInfo
├─ CommonApi.fetchCityList() → randomCity
├─ CommonApi.fetchDistrictList(cityCode) → randomDistrict
├─ CommonApi.fetchWardList(districtId) → randomWard
└─ BffListingApi.createListing(data) → createdListingId
    ↓
When I navigate to LMP
    ↓
ListingManagementPage.goto(createdListingId)
    ↓
Then I see the listing on LMP
    ↓
ListingManagementPage.waitForListing()
    ↓
ListingManagementPage.isListingVisible() → assert true
```

## API Dependencies

1. **UMS API** (`src/apis/endpoints/ums.api.ts`)
   - `login()` - Handled by @authorized hook
   - `fetchContact()` - Get user contact information

2. **Common API** (`src/apis/endpoints/common.api.ts`)
   - `fetchCityList()` - Get all cities
   - `fetchDistrictList(cityCode)` - Get districts for a city
   - `fetchWardList(districtId)` - Get wards for a district

3. **BFF Listing API** (`src/apis/endpoints/bff-listing.api.ts`)
   - `createListing(data)` - Create a new listing

## Customization

### Custom Listing Data
To create a listing with specific data, modify the `listingData` object in `lmp.steps.ts`:

```typescript
const listingData = {
    title: 'Custom Title',
    productType: 2, // 1=Sale, 2=Rent
    categoryId: 2, // 1=Apartment, 2=House, etc.
    price: 10000000000, // Custom price
    bedroomCount: 4,
    toiletCount: 3,
    // ... other fields
};
```

### Location Selection Strategy
Currently uses random selection. To use specific locations:

```typescript
// Instead of random selection
const hanoiCity = cityList.find(c => c.cityCode === 'HN');
const baDinhDistrict = districtList.find(d => d.districtId === 1);
const phucXaWard = wardList.find(w => w.wardId === 1);
```

## Troubleshooting

### Listing not appearing on LMP
- Check if listing creation was successful (check console logs for listing ID)
- Verify the listing ID in the URL search parameter
- Check if there are any network errors in the browser console
- Increase timeout in `waitForListing()` if needed

### Random location selection fails
- Verify Common API endpoints are working
- Check if the API responses have the expected structure
- Ensure the city/district/ward lists are not empty

### Contact fetch fails
- Verify user is logged in (check @authorized hook)
- Check UMS API endpoint is accessible
- Verify user has contact information in the system
