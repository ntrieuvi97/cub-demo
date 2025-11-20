import {BasePage} from '../../core/base.page';
import {Page} from '@playwright/test';
import {baseUrl} from "../../configs";

export class HomePage extends BasePage {
  static POST_LINK_SELECTOR = 'ul.wp-block-post-template li.wp-block-post h2.wp-block-post-title a';

    constructor(page: Page) {
    super(page);
  }

    async open() {
        await this.page.goto(baseUrl);
  }

  async getDisplayedPosts() {
    return await this.page.$$(HomePage.POST_LINK_SELECTOR);
  }
}
