import { Page } from '@playwright/test';

export class PostDetailPage {
    private page: Page;
    static TITLE_SELECTOR = 'h1, h2, .entry-title, .wp-block-post-title';

    constructor(page: Page) {
        this.page = page;
    }

    async getTitle(): Promise<string> {
        const titleElement = await this.page.$(PostDetailPage.TITLE_SELECTOR);
        return titleElement ? (await titleElement.textContent())?.trim() || '' : '';
    }

    getUrl(): string {
        return this.page.url();
    }
}
