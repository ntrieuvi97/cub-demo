# Common API Headers

Centralized header management for PropertyGuru API requests.

## Structure

```
src/apis/
└── common-headers.ts     # Common header configurations
```

## Available Header Groups

### `CommonHeaders.base`
Standard headers for all API requests:
- `Accept`
- `Cache-Control`
- Browser fingerprinting headers (`sec-ch-ua`, `User-Agent`, etc.)

### `CommonHeaders.propertyGuru`
PropertyGuru-specific headers:
- `APIVersion`: API version identifier
- `UniqueId`: Device identifier
- `Sellernet-Origin`: Platform identifier
- `Auth`: Authentication flag

### `CommonHeaders.cors`
CORS-related headers:
- `Access-Control-Allow-*` headers

### `CommonHeaders.security`
Security headers:
- `sec-fetch-*` headers

## Header Presets

Pre-configured header sets for different API types:

### `HeaderPresets.ums()`
Headers for User Management Service (UMS) API:
```typescript
import { HeaderPresets } from '../common-headers';

const response = await this.page.request.post(url, {
    data: payload,
    headers: HeaderPresets.ums()
});
```

### `HeaderPresets.bffListing()`
Headers for BFF Listing API (includes auto-generated request ID):
```typescript
import { HeaderPresets } from '../common-headers';

const response = await this.page.request.post(url, {
    data: payload,
    headers: HeaderPresets.bffListing()
});
```

### `HeaderPresets.sellernet()`
Headers for Sellernet API:
```typescript
import { HeaderPresets } from '../common-headers';

const response = await this.page.request.get(url, {
    headers: HeaderPresets.sellernet()
});
```

## Utility Functions

### `mergeHeaders(...headerGroups)`
Merge multiple header objects:
```typescript
import { mergeHeaders, CommonHeaders } from '../common-headers';

const customHeaders = mergeHeaders(
    CommonHeaders.base,
    CommonHeaders.propertyGuru,
    {
        'Custom-Header': 'custom-value'
    }
);
```

### `generateRequestId()`
Generate a unique UUID v4 request ID:
```typescript
import { generateRequestId } from '../common-headers';

const requestId = generateRequestId();
// Returns: "7d4a92e7-7aeb-4a5d-97c1-b05e5bd2beb5"
```

## Custom Header Configuration

If you need custom headers for a specific API:

```typescript
import { mergeHeaders, CommonHeaders } from '../common-headers';

const myCustomHeaders = mergeHeaders(
    CommonHeaders.base,
    CommonHeaders.propertyGuru,
    {
        'X-Custom-Header': 'my-value',
        'X-API-Key': 'api-key-here'
    }
);

const response = await this.page.request.post(url, {
    data: payload,
    headers: myCustomHeaders
});
```

## Benefits

✅ **DRY Principle** - No header duplication across API files  
✅ **Centralized Management** - Update headers in one place  
✅ **Consistency** - Same headers across all APIs  
✅ **Type Safety** - TypeScript ensures correct usage  
✅ **Easy Maintenance** - Add/remove headers globally  
✅ **Flexibility** - Merge headers for custom needs

## Example Usage in API Endpoints

### Before ❌
```typescript
const response = await this.page.request.post(url, {
    data: payload,
    headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'uniqueid': 'deviceidfromweb',
        'sellernet-origin': 'desktop',
        'sec-ch-ua-platform': '"Windows"',
        'apiversion': '2020-02-28 18:30',
        'sec-ch-ua-mobile': '?0',
        'auth': '1',
        'accept': 'application/json, text/plain, */*',
        // ... 20 more lines of headers
    }
});
```

### After ✅
```typescript
import { HeaderPresets } from '../common-headers';

const response = await this.page.request.post(url, {
    data: payload,
    headers: HeaderPresets.bffListing()
});
```

Much cleaner! 🚀
