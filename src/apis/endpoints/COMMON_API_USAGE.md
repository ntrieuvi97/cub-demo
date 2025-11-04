# Common API Usage

The Common API provides access to shared resources like cities, districts, wards, and other reference data.

## Available Endpoints

### `fetchCityList()`

Retrieves the complete list of cities/provinces.

**Endpoint**: `GET https://sellernetapi.staging.propertyguru.vn/api/common/fetchCityList`

**Usage**:
```typescript
import { CommonApi } from '../apis/endpoints/common.api';

const commonApi = new CommonApi(this.page!);
const response = await commonApi.fetchCityList();
const cities = await response.json();

console.log(`Total cities: ${cities.length}`);
cities.forEach(city => {
    console.log(`${city.cityCode}: ${city.cityName}`);
});
```

### `fetchDistrictList(cityCode)`

Retrieves districts for a specific city.

**Endpoint**: `GET https://sellernetapi.staging.propertyguru.vn/api/common/fetchDistrictList?cityCode={cityCode}`

**Parameters**:
- `cityCode` (string) - City code (e.g., "HN", "SG", "LCA")

**Usage**:
```typescript
const commonApi = new CommonApi(this.page!);
const response = await commonApi.fetchDistrictList('HN');
const districts = await response.json();

console.log(`Districts in Hanoi: ${districts.length}`);
districts.forEach(district => {
    console.log(`${district.districtId}: ${district.districtName}`);
});
```

### `fetchWardList(districtId)`

Retrieves wards for a specific district.

**Endpoint**: `GET https://sellernetapi.staging.propertyguru.vn/api/common/fetchWardList?districtId={districtId}`

**Parameters**:
- `districtId` (number) - District ID (e.g., 404)

**Usage**:
```typescript
const commonApi = new CommonApi(this.page!);
const response = await commonApi.fetchWardList(404);
const wards = await response.json();

console.log(`Wards in district 404: ${wards.length}`);
wards.forEach(ward => {
    console.log(`${ward.wardId}: ${ward.wardName}`);
});
```

## Example: Using in Step Definitions

### Feature File
```gherkin
Scenario: Verify location hierarchy is available
  Given I navigate to the "LoginPage"
  When I login with valid credentials
  
  # Fetch cities
  And I fetch the city list
  Then I should receive a list of cities
  And the city list should contain "Hà Nội"
  
  # Fetch districts for a city
  And I fetch the district list for city code "HN"
  Then I should receive a list of districts
  And the district list should contain "Ba Đình"
  
  # Fetch wards for a district
  And I fetch the ward list for district ID 1
  Then I should receive a list of wards
  And the ward list should contain "Phúc Xá"
```

### Step Definitions
```typescript
import { CommonApi } from '../apis/endpoints/common.api';

When('I fetch the city list', async function (this: CustomWorld) {
    const commonApi = new CommonApi(this.page!);
    const response = await commonApi.fetchCityList();
    this.cityList = await response.json();
});

When('I fetch the district list for city code {string}', async function (cityCode: string) {
    const commonApi = new CommonApi(this.page!);
    const response = await commonApi.fetchDistrictList(cityCode);
    this.districtList = await response.json();
});

When('I fetch the ward list for district ID {int}', async function (districtId: number) {
    const commonApi = new CommonApi(this.page!);
    const response = await commonApi.fetchWardList(districtId);
    this.wardList = await response.json();
});
```

## Example: Finding a City by Code

```typescript
const commonApi = new CommonApi(this.page!);
const response = await commonApi.fetchCityList();
const cities = await response.json();

// Find Hanoi
const hanoi = cities.find(city => city.cityCode === 'HN');
console.log('Hanoi:', hanoi);

// Find Ho Chi Minh City
const hcm = cities.find(city => city.cityCode === 'SG');
console.log('HCMC:', hcm);
```

## Example: Using City Data in Tests

```typescript
// Fetch cities
const commonApi = new CommonApi(this.page!);
const cityResponse = await commonApi.fetchCityList();
const cities = await cityResponse.json();

// Get first city for testing
const testCity = cities[0];

// Use in listing creation
const bffApi = new BffListingApi(this.page!);
await bffApi.createListing({
    title: "Test Property",
    description: "Test Description",
    cityCode: testCity.cityCode,  // Use dynamic city
    districtId: 1,
    wardId: 1,
    // ... other fields
});
```

## Expected Response Format

```json
[
    {
        "cityId": 1,
        "cityCode": "HN",
        "cityName": "Hà Nội",
        "displayOrder": 1
    },
    {
        "cityId": 2,
        "cityCode": "SG",
        "cityName": "Hồ Chí Minh",
        "displayOrder": 2
    }
]
```

## Common City Codes

| City Code | City Name | Vietnamese |
|-----------|-----------|------------|
| `HN` | Hanoi | Hà Nội |
| `SG` | Ho Chi Minh City | Hồ Chí Minh |
| `DN` | Da Nang | Đà Nẵng |
| `HP` | Hai Phong | Hải Phòng |
| `CT` | Can Tho | Cần Thơ |

## Adding More Common Endpoints

To add more common endpoints (districts, wards, etc.):

```typescript
// In src/apis/urls.ts
export const CommonEndpoint = {
    fetchCityList: 'api/common/fetchCityList',
    fetchDistrictList: 'api/common/fetchDistrictList',  // New
    fetchWardList: 'api/common/fetchWardList',           // New
};

// In src/apis/endpoints/common.api.ts
async fetchDistrictList(cityCode: string): Promise<APIResponse> {
    const url = `${WebUrls.sellernetApiBaseUrl}${CommonEndpoint.fetchDistrictList}?cityCode=${cityCode}`;
    
    const response = await this.page.request.get(url, {
        headers: HeaderPresets.sellernet()
    });
    
    return response;
}
```

## Benefits

✅ **Centralized** - All common resources in one place  
✅ **Reusable** - Use across multiple tests  
✅ **Type-safe** - TypeScript ensures correct usage  
✅ **Consistent** - Uses common headers configuration  
✅ **Easy to extend** - Add more common endpoints easily
