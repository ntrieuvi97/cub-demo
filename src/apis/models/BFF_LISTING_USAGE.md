# BFF Listing API Usage Examples

## Using the BFF Listing API in Tests

### Option 1: Simple API Call (Recommended for most cases)

```typescript
import { BffListingApi } from '../apis/endpoints/bff-listing.api';

// In your step definition or test
const bffListingApi = new BffListingApi(this.page!);

const response = await bffListingApi.createListing({
    title: "Bán nhà riêng tại Vinhomes giá rẻ diện tích lớn",
    description: "Nhà đẹp, mới xây, gần trường học và chợ",
    productType: 49,
    categoryId: 41,
    price: 40000000,
    cityCode: "LCA",
    districtId: 404,
    wardId: 2636,
    address: "Xã Bản Phố, Bắc Hà, Lào Cai",
    contactMobile: "0356677683",
    contactName: "KAPOK RENTAL",
    contactEmail: "n.trieuvi927@gmail.com",
    acreage: 100,
    fileIds: "3.20250619132938-59d0_wm.jpg##image&&||3.20250619132939-2e29_wm.jpg##image&&",
    bedroomCount: 3,
    toiletCount: 2,
    floorCount: 2,
});

const result = await response.json();
console.log('Listing ID:', result.listingId);
```

### Option 2: Using DataTable in Cucumber

```gherkin
Scenario: Create listing via BFF API
  Given I navigate to the "LoginPage"
  When I login with valid credentials
  And I create a listing via BFF API with:
    | Title           | Bán nhà riêng tại Vinhomes giá rẻ diện tích lớn                    |
    | Description     | Nhà đẹp, mới xây, gần trường học và chợ                           |
    | Product Type    | 49                                                                  |
    | Category ID     | 41                                                                  |
    | Price           | 40000000                                                            |
    | City Code       | LCA                                                                 |
    | District ID     | 404                                                                 |
    | Ward ID         | 2636                                                                |
    | Address         | Xã Bản Phố, Bắc Hà, Lào Cai                                        |
    | Contact Mobile  | 0356677683                                                          |
    | Contact Name    | KAPOK RENTAL                                                        |
    | Contact Email   | n.trieuvi927@gmail.com                                              |
    | Acreage         | 100                                                                 |
    | File IDs        | 3.20250619132938-59d0_wm.jpg##image&&||3.20250619132939-2e29_wm.jpg##image&& |
    | Bedroom Count   | 3                                                                   |
    | Toilet Count    | 2                                                                   |
  Then the BFF API should return success
```

### Option 3: Full Control with Raw Payload

```typescript
import { BffListingApi } from '../apis/endpoints/bff-listing.api';
import { createListingRequest } from '../models/create-listing.request';

const bffListingApi = new BffListingApi(this.page!);

// Create payload with custom overrides
const payload = createListingRequest({
    title: "Custom Title",
    description: "Custom Description",
    productType: 49,
    categoryId: 41,
    price: 50000000,
    cityCode: "HN",
    districtId: 1,
    wardId: 10,
    address: "Custom Address",
    contactMobile: "0123456789",
    contactName: "Test User",
    contactEmail: "test@example.com",
    acreage: 150,
    fileIds: "image1.jpg##image&&||image2.jpg##image&&",
});

// Manually override any field
payload.isVerified = true;
payload.discount = 10;
payload.period = 30;

const response = await bffListingApi.createListingRaw(payload);
```

## Default Values

The `createListingRequest()` factory provides sensible defaults:

| Field | Default Value | Description |
|-------|---------------|-------------|
| `viptype` | `"3"` | VIP listing type |
| `startDate` | Current date | Listing start date |
| `endDate` | Current date + 10 days | Listing end date |
| `streetId` | `0` | Street ID (0 = not specified) |
| `projectId` | `0` | Project ID (0 = not specified) |
| `bedroomCount` | `0` | Number of bedrooms |
| `toiletCount` | `0` | Number of toilets |
| `floorCount` | `0` | Number of floors |
| `unitPrice` | `2` | Unit price type |
| `houseDirection` | `0` | House direction |
| `balconyDirection` | `0` | Balcony direction |
| `isAddOn` | `false` | Is add-on listing |
| `isReceiEmail` | `false` | Receive email notifications |
| `discount` | `0` | Discount amount |
| `period` | `-1` | Listing period |

## Required Fields

These fields are **required** and must be provided:

- `title` - Listing title
- `description` - Listing description
- `productType` - Product type code
- `categoryId` - Category ID
- `price` - Listing price
- `cityCode` - City code
- `districtId` - District ID
- `wardId` - Ward ID
- `address` - Full address
- `contactMobile` - Contact phone number
- `contactName` - Contact person name
- `contactEmail` - Contact email
- `acreage` - Property area (m²)
- `fileIds` - Image file IDs (format: `filename##type&&||`)

## File IDs Format

Images should be formatted as: `filename##image&&||`

Example:
```
3.20250619132938-59d0_wm.jpg##image&&||3.20250619132939-2e29_wm.jpg##image&&||3.20250619132940-5838_wm.jpg##image&&
```

## API Endpoint

- **URL**: `https://api.staging.propertyguru.vn/bff-seller/listings`
- **Method**: `POST`
- **Content-Type**: `application/json; charset=UTF-8`

## Response Handling

```typescript
const response = await bffListingApi.createListing({...});

if (response.ok()) {
    const data = await response.json();
    console.log('Listing created:', data.listingId);
} else {
    console.error('Failed:', response.status());
}
```
