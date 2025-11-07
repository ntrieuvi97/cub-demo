import {APIResponse, Page} from '@playwright/test';
import {AMEEndpoint, WebUrls} from '../urls';
import {generateRequestId, HeaderPresets} from '../common-headers';

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
     * @param params - Publish listing parameters
     * @returns API Response
     */
    async publishListing(params: {
        productId: number;
        actorId: number;
        ownerId: number;
        note?: string;
        correlationId?: string;
    }): Promise<APIResponse> {
        try {
            const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.publish}`;

            const payload = {
                productId: params.productId,
                actorId: params.actorId,
                correlationId: params.correlationId || generateRequestId(),
                note: params.note || '[Automation] Published listing by Automation Tester',
                ownerId: params.ownerId,
            };

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
        } catch (error) {
            throw new Error(`AME API publish listing failed: ${error}`);
        }
    }

    /**
     * Suspend a listing via AME API
     * @param params - Suspend listing parameters
     * @returns API Response
     */
    async suspendListing(params: {
        productId: number;
        actorId: number;
        ownerId: number;
        note?: string;
        correlationId?: string;
        explanations?: Array<{
            description: string;
            reason: string;
            reasonCode: string;
            title: string;
        }>;
    }): Promise<APIResponse> {
        try {
            const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.suspend}`;

            const payload = {
                productId: params.productId,
                actorId: params.actorId,
                correlationId: params.correlationId || generateRequestId(),
                note: params.note || '[Automation] Suspend listing',
                ownerId: params.ownerId,
                explanations: params.explanations || [
                    {
                        description: '[Automation] Set up listing state',
                        reason: 'Category',
                        reasonCode: '0',
                        title: '[Automation] Set up listing state'
                    }
                ]
            };

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
        } catch (error) {
            throw new Error(`AME API suspend listing failed: ${error}`);
        }
    }

    /**
     * Mark a listing for review via AME API
     * @param params - Mark review listing parameters
     * @returns API Response
     */
    async markReviewListing(params: {
        productId: number;
        actorId: number;
        ownerId: number;
        note?: string;
        correlationId?: string;
    }): Promise<APIResponse> {
        try {
            const url = `${WebUrls.internalApiBaseUrl}${AMEEndpoint.markReview}`;

            const payload = {
                productId: params.productId,
                actorId: params.actorId,
                correlationId: params.correlationId || generateRequestId(),
                note: params.note || '[Automation] Mark review listing',
                ownerId: params.ownerId,
            };

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
        } catch (error) {
            throw new Error(`AME API mark review listing failed: ${error}`);
        }
    }
}

