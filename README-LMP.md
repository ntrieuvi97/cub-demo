# LMP Feature Test - Quick Start Guide

## 📋 What Was Created

### 1. Feature File
**File:** `tests/lmp.feature`
- **Scenario:** Verify created listing appears on LMP
- **Tags:** `@lmp`, `@web-ui`, `@authorized`, `@user=validUser`

### 2. Step Definitions
**File:** `src/steps/lmp.steps.ts`
- ✅ `Given I have a listing` - Creates listing via API (login → fetchContact → random location → createListing)
- ✅ `When I navigate to LMP` - Navigates to Listing Management Page
- ✅ `Then I see the listing on LMP` - Verifies listing visibility

### 3. Page Object
**File:** `src/pages/listing-management.page.ts`
- New page object for LMP with methods:
  - `goto(searchQuery?)` - Navigate to LMP
  - `isListingVisible(listingId)` - Check visibility
  - `waitForListing(listingId, timeout)` - Wait for listing
  - `searchListing(listingId)` - Search functionality

### 4. Page Factory Update
**File:** `src/pages/page.factory.ts`
- Added `listingManagement()` method to PageFactory
- Now accessible via `this.pages.listingManagement()` in steps

### 5. Documentation
**File:** `tests/md/lmp-testing.md`
- Complete documentation with examples and troubleshooting

## 🚀 Running the Test

```powershell
# Run the LMP test
npm test -- tests/lmp.feature

# Or using tags
npm test -- --tags "@lmp"
```

## 🔍 Test Flow Diagram

```
START
  ↓
[@web-ui hook] Initialize browser
  ↓
[@authorized hook] Login with validUser
  ↓
[Given] I have a listing
  ├─ Fetch contact info (name, phone, email)
  ├─ Fetch random city from API
  ├─ Fetch random district for city
  ├─ Fetch random ward for district
  └─ Create listing with BFF API → Get listing ID
  ↓
[When] I navigate to LMP
  └─ Open LMP with listing ID search parameter
  ↓
[Then] I see the listing on LMP
  ├─ Wait for listing to appear
  └─ Assert listing is visible
  ↓
[@After hook] Take screenshot, close browser
  ↓
END
```

## 📊 Key Features

### ✅ Automated Listing Creation
- No manual UI interaction needed
- Uses real APIs for data:
  - UMS API for contact info
  - Common API for location data
  - BFF API for listing creation

### ✅ Random Data Generation
- Selects random city/district/ward for variety
- Generates unique listing titles with timestamps
- Reduces test data conflicts

### ✅ Comprehensive Logging
- Each step logs detailed information
- Easy to debug failures
- Clear console output showing data flow

### ✅ Reusable Components
- Page Object pattern for LMP
- Integrated with PageFactory
- Can be used in other tests

## 🎯 API Usage in Test

| API Class | Method | Purpose |
|-----------|--------|---------|
| `UMSApi` | `login()` | Authenticate user (@authorized hook) |
| `UMSApi` | `fetchContact()` | Get user contact details |
| `CommonApi` | `fetchCityList()` | Get all cities |
| `CommonApi` | `fetchDistrictList(cityCode)` | Get districts for city |
| `CommonApi` | `fetchWardList(districtId)` | Get wards for district |
| `BffListingApi` | `createListing(data)` | Create new listing |

## 📝 Sample Console Output

```
🔐 @authorized hook triggered
✅ Login successful
🏠 Starting listing creation process...
📞 Step 1: Fetching contact information...
✅ Contact info fetched: {
  name: 'Vitest User',
  phone: '0123456789',
  mobile: '0987654321',
  address: 'Hanoi, Vietnam'
}
📍 Step 2: Fetching random location...
  🏙️ Selected city: Hà Nội (HN)
  🗺️ Selected district: Ba Đình (ID: 1)
  📌 Selected ward: Phúc Xá (ID: 1)
🏗️ Step 3: Creating listing via BFF API...
✅ Listing created successfully! ID: 87654321
📋 Listing details: {
  id: '87654321',
  title: '[Auto Test] Property 1730745600000',
  location: 'Hà Nội > Ba Đình > Phúc Xá',
  price: 5000000000,
  contact: 'Vitest User'
}
🔍 Navigating to Listing Management Page with listing ID: 87654321
✅ Navigation to LMP completed
👀 Verifying listing 87654321 is visible on LMP...
✅ Listing 87654321 is successfully displayed on LMP!
```

## 🔧 Customization Options

### Change Listing Type
In `src/steps/lmp.steps.ts`, modify:
```typescript
productType: 1, // 1=Sale, 2=Rent
categoryId: 1,  // 1=Apartment, 2=House, 3=Villa, etc.
```

### Use Specific Location
Replace random selection with specific location:
```typescript
const hanoiCity = cityList.find(c => c.cityCode === 'HN');
const targetDistrict = districtList.find(d => d.districtName.includes('Ba Đình'));
```

### Add More Verification
In the "Then" step, add additional checks:
```typescript
Then('I see the listing on LMP', async function (this: CustomWorld) {
    const lmpPage = this.pages.listingManagement();
    await lmpPage.waitForListing(createdListingId);
    
    // Existing verification
    const isVisible = await lmpPage.isListingVisible(createdListingId);
    assert.strictEqual(isVisible, true);
    
    // Additional checks
    const row = await lmpPage.getListingRow(createdListingId);
    const status = await row.locator('.status').textContent();
    assert.ok(status, 'Status should be present');
});
```

## ❓ Troubleshooting

### Issue: "Listing not found on LMP"
**Solutions:**
1. Check console logs for listing ID
2. Verify listing creation was successful
3. Check if listing needs approval before appearing
4. Increase timeout in `waitForListing()`

### Issue: "Failed to fetch cities/districts/wards"
**Solutions:**
1. Verify Common API endpoints are accessible
2. Check network connectivity
3. Verify headers in `HeaderPresets.sellernet()`

### Issue: "Contact fetch failed"
**Solutions:**
1. Verify user is logged in (@authorized hook)
2. Check UMS API accessibility
3. Verify user credentials in `tests/data/credentials.json`

## 📚 Related Documentation

- [Common API Usage](../src/apis/endpoints/COMMON_API_USAGE.md)
- [BFF Listing Usage](../src/apis/models/BFF_LISTING_USAGE.md)
- [LMP Testing Guide](lmp-testing.md)
