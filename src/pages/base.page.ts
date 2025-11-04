import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
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

  async waitForDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCurrentPage(): Promise<Page> {
    return this.page;
  }

}
