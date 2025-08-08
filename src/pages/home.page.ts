import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;
    static POST_LINK_SELECTOR = 'ul.wp-block-post-template li.wp-block-post h2.wp-block-post-title a';

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    async scrollToBottom() {
        await this.page.evaluate(async () => {
            await new Promise<void>(resolve => {
                const scrollStep = 50;
                const scrollInterval = 10;
                const scroll = () => {
                    if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
                        window.scrollBy(0, scrollStep);
                        setTimeout(scroll, scrollInterval);
                    } else {
                        resolve();
                    }
                };
                scroll();
            });
        });
    }

    async getDisplayedPosts() {
        return await this.page.$$(HomePage.POST_LINK_SELECTOR);
    }
}
