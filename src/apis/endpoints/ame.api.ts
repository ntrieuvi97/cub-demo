import {APIResponse, Page} from '@playwright/test';
import {AMEEndpoint, WebUrls} from '../urls';
import {HeaderPresets} from '../common-headers';
import {
    PayloadFactory,
    PublishListingRequest,
    SuspendListingRequest,
    MarkReviewListingRequest
} from '../models';

/**
 * AME API (Listing Orchestrator)
 * Handles listing operations via internal AME API
 */
export class AmeApi {
    constructor(private page: Page) {
        this.page = page;
    }

    /**
     * Publish a listing via AME API
     * @param params - Publish listing parameters (defaults will be applied)
     * @returns API Response
     */
    async publishListing(params: Partial<PublishListingRequest>): Promise<APIResponse> {
        const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.publish}`;

        const payload = PayloadFactory.createPublishListing(params);

        const response = await this.page.request.put(url, {
            data: payload,
            headers: HeaderPresets.ame()
        });

        const responseBody = await response.text();

        // Log response details
        if (!response.ok()) {
            console.error(`[AME API] Publish Listing Failed - Status: ${response.status()} | URL: ${url} | Response: ${responseBody}`);
            throw new Error(`Publish listing failed with status: ${response.status()}, body: ${responseBody}`);
        }

        console.log(`[AME API] Publish Listing Success | ProductId: ${params.productId} | Response: ${responseBody}`);
        return response;
    }

    /**
     * Suspend a listing via AME API
     * @param params - Suspend listing parameters (defaults will be applied)
     * @returns API Response
     */
    async suspendListing(params: Partial<SuspendListingRequest>): Promise<APIResponse> {
        const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.suspend}`;

        const payload = PayloadFactory.createSuspendListing(params);

        const response = await this.page.request.put(url, {
            data: payload,
            headers: HeaderPresets.ame()
        });

        const responseBody = await response.text();

        // Log response details
        if (!response.ok()) {
            console.error(`[AME API] Suspend Listing Failed - Status: ${response.status()} | URL: ${url} | Response: ${responseBody}`);
            throw new Error(`Suspend listing failed with status: ${response.status()}, body: ${responseBody}`);
        }

        console.log(`[AME API] Suspend Listing Success | ProductId: ${params.productId} | Response: ${responseBody}`);
        return response;
    }

    /**
     * Mark a listing for review via AME API
     * @param params - Mark review listing parameters (defaults will be applied)
     * @returns API Response
     */
    async markReviewListing(params: Partial<MarkReviewListingRequest>): Promise<APIResponse> {
        const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.markReview}`;

        const payload = PayloadFactory.createMarkReviewListing(params);

        const response = await this.page.request.put(url, {
            data: payload,
            headers: HeaderPresets.ame()
        });

        const responseBody = await response.text();

        // Log response details
        if (!response.ok()) {
            console.error(`[AME API] Mark Review Listing Failed - Status: ${response.status()} | URL: ${url} | Response: ${responseBody}`);
            throw new Error(`Mark review listing failed with status: ${response.status()}, body: ${responseBody}`);
        }

        console.log(`[AME API] Mark Review Listing Success | ProductId: ${params.productId} | Response: ${responseBody}`);
        return response;
    }
}
