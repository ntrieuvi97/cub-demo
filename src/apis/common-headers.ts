/**
 * Common API Headers Configuration
 * Centralized header management for API requests
 */

/**
 * Standard headers for PropertyGuru API requests
 */
export const CommonHeaders = {
    /**
     * Basic headers for all API requests
     */
    base: {
        'Accept': 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
    },

    /**
     * PropertyGuru API specific headers
     */
    propertyGuru: {
        'APIVersion': '2020-02-28 18:30',
        'UniqueId': 'deviceidfromweb',
        'Sellernet-Origin': 'desktop',
        'Auth': '1',
    },

    /**
     * CORS headers
     */
    cors: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Origin': '*',
    },

    /**
     * Security headers
     */
    security: {
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
    },
};

/**
 * Merge multiple header objects
 */
export function mergeHeaders(...headerGroups: Record<string, string>[]): Record<string, string> {
    return Object.assign({}, ...headerGroups);
}

/**
 * Generate a unique request ID (UUID v4)
 */
export function generateRequestId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Pre-configured header sets for different API types
 */
export const HeaderPresets = {
    /**
     * Headers for UMS API (User Management Service)
     */
    ums: (): Record<string, string> => mergeHeaders(
        CommonHeaders.base,
        CommonHeaders.propertyGuru,
        CommonHeaders.cors,
        {
            'Content-Type': 'application/json',
        }
    ),

    /**
     * Headers for BFF Listing API
     */
    bffListing: (): Record<string, string> => mergeHeaders(
        CommonHeaders.base,
        CommonHeaders.propertyGuru,
        CommonHeaders.cors,
        CommonHeaders.security,
        {
            'content-type': 'application/json; charset=UTF-8',
            'X-requestId': generateRequestId(),
        }
    ),

    /**
     * Headers for Sellernet API
     */
    sellernet: (): Record<string, string> => mergeHeaders(
        CommonHeaders.base,
        CommonHeaders.propertyGuru,
        CommonHeaders.cors,
        {
            'Content-Type': 'application/json',
        }
    ),
};
