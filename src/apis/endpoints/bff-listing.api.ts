import {APIResponse, Page} from '@playwright/test';
import {BffListingEndpoint, WebUrls} from '../urls';
import {CreateListingRequest, PayloadFactory} from '../models';
import {HeaderPresets} from '../common-headers';

/**
 * BFF Listing API
 * Handles listing creation and management via BFF (Backend for Frontend) API
 */
export class BffListingApi {
    constructor(private page: Page) {
        this.page = page;
    }

    /**
     * Create a new property listing via BFF API
     * @param listingData - Listing creation parameters
     * @returns API Response
     */
    async createListing(listingData: Parameters<typeof PayloadFactory.createListing>[0]): Promise<APIResponse> {
        const url = `${WebUrls.bffApiBaseUrl}${BffListingEndpoint.createListing}`;

        // Use PayloadFactory to create request payload with defaults
        const payload = PayloadFactory.createListing(listingData);

        const response = await this.page.request.post(url, {
            data: payload,
            headers: HeaderPresets.bffListing()
        });

        console.log(`Create Listing response status: ${response.status()}`);
        const responseBody = await response.text();
        console.log(`Create Listing response body: ${responseBody}`);

        if (!response.ok()) {
            throw new Error(`Create listing failed with status: ${response.status()}, body: ${responseBody}`);
        }

        return response;
    }

    /**
     * Create listing with full control over all fields
     * @param payload - Complete CreateListingRequest object
     * @returns API Response
     */
    async createListingRaw(payload: CreateListingRequest): Promise<APIResponse> {
        const url = `${WebUrls.bffApiBaseUrl}${BffListingEndpoint.createListing}`;

        const response = await this.page.request.post(url, {
            data: payload,
            headers: HeaderPresets.bffListing()
        });

        console.log(`Create Listing (Raw) response status: ${response.status()}`);

        if (!response.ok()) {
            const responseBody = await response.text();
            throw new Error(`Create listing failed with status: ${response.status()}, body: ${responseBody}`);
        }

        return response;
    }
}
