# API Models

This directory contains **request payload models** for API calls in E2E tests.

> **Note**: This is an E2E test repository, so we only maintain request models. Response validation is done through UI verification.

## Structure

```
apis/
├── models/
│   ├── index.ts                      # Export all models
│   ├── login.request.ts              # Login request model
│   ├── create-listing.request.ts     # Create listing request model
│   └── README.md                     # This file
├── endpoints/
│   ├── ums.api.ts                    # UMS API endpoints (login, fetchContact)
│   ├── bff-listing.api.ts            # BFF Listing API endpoints
│   └── common.api.ts                 # Common API endpoints (fetchCityList)
├── common-headers.ts                 # Common header configurations
└── urls.ts                            # API URLs
```

## Naming Conventions

- **File**: `<action>.request.ts` (kebab-case)
- **Interface**: `<Action>Request` (PascalCase)
- **Factory**: `create<Action>Request()` (camelCase)

## Usage Example

### UMS API - Login

```typescript
// src/apis/endpoints/ums.api.ts
import { createLoginRequest } from '../models/login.request';

async login(userName: string, password: string): Promise<APIResponse> {
    const loginPayload = createLoginRequest(userName, password);
    
    const response = await this.page.request.post(url, {
        data: loginPayload,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    return response;
}
```

### UMS API - Fetch Contact

```typescript
import { UMSApi } from '../apis/endpoints/ums.api';

const umsApi = new UMSApi(this.page!);
const response = await umsApi.fetchContact();
const contactData = await response.json();
console.log('Contact:', contactData);
```

### BFF Listing API - Create Listing

```typescript
import { BffListingApi } from '../apis/endpoints/bff-listing.api';

const bffApi = new BffListingApi(this.page!);
const response = await bffApi.createListing({
    title: "Property Title",
    description: "Property Description",
    productType: 49,
    categoryId: 41,
    price: 40000000,
    cityCode: "HN",
    districtId: 1,
    wardId: 10,
    address: "123 Street",
    contactMobile: "0123456789",
    contactName: "John Doe",
    contactEmail: "john@example.com",
    acreage: 100,
    fileIds: "image1.jpg##image&&||image2.jpg##image&&",
});
```

### Common API - Fetch City List

```typescript
import { CommonApi } from '../apis/endpoints/common.api';

const commonApi = new CommonApi(this.page!);
const response = await commonApi.fetchCityList();
const cities = await response.json();
console.log('Cities:', cities);
```

## Adding New Models

1. Create new request model file:

```typescript
// src/apis/models/create-listing.request.ts
export interface CreateListingRequest {
    title: string;
    description: string;
    price: number;
    area: number;
    propertyType: string;
}

export function createListingRequest(
    title: string,
    description: string,
    price: number,
    area: number,
    propertyType: string
): CreateListingRequest {
    return { title, description, price, area, propertyType };
}
```

2. Export from index:

```typescript
// src/apis/models/index.ts
export * from './login.request';
export * from './create-listing.request';
```

3. Use in API endpoint:

```typescript
import { createListingRequest } from '../models';

const payload = createListingRequest(title, desc, price, area, type);
await this.page.request.post(url, { data: payload });
```

## Benefits

✅ **Type Safety** - Catch payload errors at compile time  
✅ **Reusability** - Use same models across multiple tests  
✅ **IntelliSense** - Auto-completion in IDE  
✅ **Documentation** - JSDoc comments describe fields  
✅ **Maintainability** - Single source of truth for API contracts  
✅ **Focused** - Only request models, responses validated via UI
