import { Browser, Page, BrowserContext } from '@playwright/test';
import { IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { PageFactory } from '../core/page.factory';
import { BrowserFactory, BrowserName } from '../core/browser.factory';
import { ContextFactory, DeviceType } from '../core/context.factory';

export class CustomWorld {
  public browser: Browser | undefined;
  public page?: Page;
  public context?: BrowserContext;
  private _pageFactory?: PageFactory;
  createdListingId?: number;  // Store created listing ID
  userId?: number;            // Store user ID
  browserName?: BrowserName;  // Store browser type being used
  deviceType?: DeviceType;    // Store device type being tested

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

  /**
   * Initialize browser with specified type and device
   * @param browserName - Browser type (chromium, firefox, webkit)
   * @param deviceType - Device type (desktop, mobile, tablet)
   * @param reuseBrowser - Reuse existing browser instance if available
   */
  async initBrowser(
    browserName: BrowserName = 'chromium',
    deviceType: DeviceType = 'desktop',
    reuseBrowser: boolean = false
  ): Promise<Page> {
    this.browserName = browserName;
    this.deviceType = deviceType;

    // Launch browser using factory
    this.browser = await BrowserFactory.launch(browserName, undefined, reuseBrowser);

    // Create context using factory
    this.context = await ContextFactory.createForDevice(
      this.browser,
      deviceType,
      { name: `${browserName}-${deviceType}-${Date.now()}` }
    );

    // Create page
    this.page = await ContextFactory.createPage(this.context);

    console.log(`✅ Initialized ${browserName} browser with ${deviceType} context`);
    return this.page;
  }

  /**
   * Close browser and context
   */
  async closeBrowser(): Promise<void> {
    if (this.context) {
      await ContextFactory.close(this.context);
    }
    if (this.browser) {
      await BrowserFactory.close(this.browser);
    }
  }
}

setWorldConstructor(CustomWorld);
