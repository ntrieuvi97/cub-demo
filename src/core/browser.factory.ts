import { Browser, chromium, firefox, webkit, LaunchOptions } from '@playwright/test';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

/**
 * BrowserFactory - manages browser instances across different browser types
 * Supports singleton pattern for reusing browser instances
 *
 * Usage:
 *   const browser = await BrowserFactory.launch('chromium');
 *   const browser = await BrowserFactory.launch('firefox', { headless: false });
 */
export class BrowserFactory {
    private static instances: Map<string, Browser> = new Map();

    /**
     * Launch a browser instance
     * @param browserName - Browser type to launch
     * @param options - Launch options
     * @param reuse - Reuse existing browser instance if available (default: false)
     * @returns Browser instance
     */
    static async launch(
        browserName: BrowserName = 'chromium',
        options?: LaunchOptions,
        reuse: boolean = false
    ): Promise<Browser> {
        const cacheKey = `${browserName}-${JSON.stringify(options || {})}`;

        // Return existing instance if reuse is enabled
        if (reuse && this.instances.has(cacheKey)) {
            const existingBrowser = this.instances.get(cacheKey)!;
            if (existingBrowser.isConnected()) {
                console.log(`♻️ Reusing existing ${browserName} browser instance`);
                return existingBrowser;
            } else {
                // Remove disconnected browser from cache
                this.instances.delete(cacheKey);
            }
        }

        // Launch new browser instance
        console.log(`🚀 Launching new ${browserName} browser`);
        const browserType = this.getBrowserType(browserName);
        const browser = await browserType.launch({
            headless: process.env.HEADLESS !== 'false',
            args: browserName === 'chromium' ? ['--start-maximized'] : [],
            ...options,
        });

        if (reuse) {
            this.instances.set(cacheKey, browser);
        }

        return browser;
    }

    /**
     * Get browser type instance
     */
    private static getBrowserType(browserName: BrowserName) {
        switch (browserName) {
            case 'chromium':
                return chromium;
            case 'firefox':
                return firefox;
            case 'webkit':
                return webkit;
            default:
                throw new Error(`Unsupported browser: ${browserName}`);
        }
    }

    /**
     * Close a specific browser instance
     */
    static async close(browser: Browser): Promise<void> {
        if (browser && browser.isConnected()) {
            await browser.close();
            console.log('✅ Browser closed');
        }
    }

    /**
     * Close all cached browser instances
     */
    static async closeAll(): Promise<void> {
        console.log(`🧹 Closing ${this.instances.size} browser instance(s)`);
        const closePromises = Array.from(this.instances.values())
            .filter(browser => browser.isConnected())
            .map(browser => browser.close());

        await Promise.all(closePromises);
        this.instances.clear();
        console.log('✅ All browsers closed');
    }

    /**
     * Get browser name from environment variable or use default
     */
    static getBrowserFromEnv(): BrowserName {
        const browserEnv = process.env.BROWSER?.toLowerCase();
        if (browserEnv === 'firefox' || browserEnv === 'webkit' || browserEnv === 'chromium') {
            return browserEnv;
        }
        return 'chromium'; // default
    }

    /**
     * Clean up disconnected browser instances from cache
     */
    static cleanup(): void {
        for (const [key, browser] of this.instances.entries()) {
            if (!browser.isConnected()) {
                this.instances.delete(key);
            }
        }
    }
}

