import { APIResponse, Page } from '@playwright/test';
import { UMSEndpoint, WebUrls } from '../urls';
import { createLoginRequest } from '../models/login.request';
import { HeaderPresets } from '../common-headers';


export class UMSApi {
    constructor(private page: Page) {
        this.page = page;
    }

    async login(userName: string, password: string, rememberMe: boolean = false): Promise<APIResponse> {
        const url = `${WebUrls.baseUrl}${UMSEndpoint.signIn}`;

        // Use model to create request payload
        const loginPayload = createLoginRequest(userName, password, rememberMe);

        const response = await this.page.request.post(url, {
            data: loginPayload,
            headers: HeaderPresets.ums()
        });

        console.log(`Login response status: ${response.status()}`);
        console.log(`Login response body: ${await response.text()}`);

        if (!response.ok()) {
            throw new Error(`Login failed with status: ${response.status()}`);
        }

        return response;
    }

    /**
     * Fetch contact information for the authenticated user
     * @returns API Response with contact details
     */
    async fetchContact(): Promise<APIResponse> {
        const url = `${WebUrls.sellernetApiBaseUrl}${UMSEndpoint.fetchContact}`;

        const response = await this.page.request.get(url, {
            headers: HeaderPresets.sellernet()
        });

        console.log(`Fetch Contact response status: ${response.status()}`);
        const responseBody = await response.text();
        console.log(`Fetch Contact response body: ${responseBody}`);

        if (!response.ok()) {
            throw new Error(`Fetch contact failed with status: ${response.status()}, body: ${responseBody}`);
        }

        return response;
    }
}