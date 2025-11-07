import { Browser, Page, BrowserContext, chromium } from '@playwright/test';
import { HomePage } from '../pages/belivi/home.page';
import { IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

export class CustomWorld {
  browser?: Browser;
  page?: Page;
  context?: BrowserContext;
  private _pageFactory?: PageFactory;
  createdListingId?: number;  // Store created listing ID
  userId?: number;            // Store user ID

  constructor(options: IWorldOptions) {
    // Optionally initialize values here

  }

  /**
   * Get PageFactory instance - creates page objects on demand
   */
  get pages(): PageFactory {
    if (!this._pageFactory && this.page) {
      this._pageFactory = new PageFactory(this.page);
    }
    if (!this._pageFactory) {
      throw new Error('Page is not initialized. Cannot create PageFactory.');
    }
    return this._pageFactory;
  }

  async initBrowser() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page;
  };

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  };


}

setWorldConstructor(CustomWorld);
