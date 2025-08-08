import { BasePage } from './base.page';

export class PostDetailPage extends BasePage {
  static TITLE_SELECTOR = 'h1, h2, .entry-title, .wp-block-post-title';

  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    const titleElement = await this.page.$(PostDetailPage.TITLE_SELECTOR);
    return titleElement ? (await titleElement.textContent())?.trim() || '' : '';
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
