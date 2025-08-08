import { BasePage } from './base.page';

export class HomePage extends BasePage {
  static POST_LINK_SELECTOR = 'ul.wp-block-post-template li.wp-block-post h2.wp-block-post-title a';

  constructor(page: import('@playwright/test').Page) {
    super(page);
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async getDisplayedPosts() {
    return await this.page.$$(HomePage.POST_LINK_SELECTOR);
  }
}
