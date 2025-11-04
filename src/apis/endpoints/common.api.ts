import { APIResponse, Page } from '@playwright/test';
import { CommonEndpoint, WebUrls } from '../urls';
import { HeaderPresets } from '../common-headers';

/**
 * Common API
 * Handles common resources like cities, districts, wards, etc.
 */
export class CommonApi {
    constructor(private page: Page) {
        this.page = page;
    }

    /**
     * Fetch list of cities
     * @returns API Response with city list
     */
    async fetchCityList(): Promise<APIResponse> {
        try {
            const url = `${WebUrls.sellernetApiBaseUrl}${CommonEndpoint.fetchCityList}`;

            const response = await this.page.request.get(url, {
                headers: HeaderPresets.sellernet()
            });

            console.log(`Fetch City List response status: ${response.status()}`);
            const responseBody = await response.text();
            console.log(`Fetch City List response body: ${responseBody}`);

            if (!response.ok()) {
                throw new Error(`Fetch city list failed with status: ${response.status()}, body: ${responseBody}`);
            }

            return response;
        } catch (error) {
            throw new Error(`API fetch city list failed: ${error}`);
        }
    }

    /**
     * Fetch list of districts for a given city
     * @param cityCode - City code (e.g., "HN", "SG", "LCA")
     * @returns API Response with district list
     */
    async fetchDistrictList(cityCode: string): Promise<APIResponse> {
        try {
            const url = `${WebUrls.sellernetApiBaseUrl}${CommonEndpoint.fetchDistrictList}?cityCode=${cityCode}`;

            const response = await this.page.request.get(url, {
                headers: HeaderPresets.sellernet()
            });

            console.log(`Fetch District List response status: ${response.status()}`);
            const responseBody = await response.text();
            console.log(`Fetch District List response body: ${responseBody}`);

            if (!response.ok()) {
                throw new Error(`Fetch district list failed with status: ${response.status()}, body: ${responseBody}`);
            }

            return response;
        } catch (error) {
            throw new Error(`API fetch district list failed: ${error}`);
        }
    }

    /**
     * Fetch list of wards for a given district
     * @param districtId - District ID (e.g., 404)
     * @returns API Response with ward list
     */
    async fetchWardList(districtId: number): Promise<APIResponse> {
        try {
            const url = `${WebUrls.sellernetApiBaseUrl}${CommonEndpoint.fetchWardList}?districtId=${districtId}`;

            const response = await this.page.request.get(url, {
                headers: HeaderPresets.sellernet()
            });

            console.log(`Fetch Ward List response status: ${response.status()}`);
            const responseBody = await response.text();
            console.log(`Fetch Ward List response body: ${responseBody}`);

            if (!response.ok()) {
                throw new Error(`Fetch ward list failed with status: ${response.status()}, body: ${responseBody}`);
            }

            return response;
        } catch (error) {
            throw new Error(`API fetch ward list failed: ${error}`);
        }
    }
}
