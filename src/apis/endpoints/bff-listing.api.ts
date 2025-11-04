import { APIResponse, Page } from '@playwright/test';
import { BffListingEndpoint, WebUrls } from '../urls';
import { createListingRequest, CreateListingRequest } from '../models/create-listing.request';
import { HeaderPresets } from '../common-headers';

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
    async createListing(listingData: {
        title: string;
        description: string;
        productType: number;
        categoryId: number;
        price: number;
        cityCode: string;
        districtId: number;
        wardId: number;
        address: string;
        contactMobile: string;
        contactName: string;
        contactEmail: string;
        acreage: number;
        fileIds: string;
        viptype?: string;
        streetId?: number;
        projectId?: number;
        bedroomCount?: number;
        toiletCount?: number;
        floorCount?: number;
        facadeWidth?: number;
        houseDirection?: number;
        balconyDirection?: number;
        unitPrice?: number;
    }): Promise<APIResponse> {
        try {
            const url = `${WebUrls.bffApiBaseUrl}${BffListingEndpoint.createListing}`;
            
            // Use model to create request payload with defaults
            const payload = createListingRequest(listingData);

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
        } catch (error) {
            throw new Error(`API create listing failed: ${error}`);
        }
    }

    /**
     * Create listing with full control over all fields
     * @param payload - Complete CreateListingRequest object
     * @returns API Response
     */
    async createListingRaw(payload: CreateListingRequest): Promise<APIResponse> {
        try {
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
        } catch (error) {
            throw new Error(`API create listing (raw) failed: ${error}`);
        }
    }
}
