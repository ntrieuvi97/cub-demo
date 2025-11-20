import { Browser, BrowserContext, BrowserContextOptions, Page } from '@playwright/test';
import playwrightConfig from '../../playwright.config';

export interface ContextConfig extends BrowserContextOptions {
    name?: string;
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet';

/**
 * ContextFactory - manages browser contexts with different configurations
 * Supports multiple contexts for parallel execution and different test scenarios
 *
 * Usage:
 *   const context = await ContextFactory.create(browser);
 *   const context = await ContextFactory.createForDevice(browser, 'mobile');
 *   const context = await ContextFactory.createWithAuth(browser, storageState);
 */
export class ContextFactory {
    private static contexts: Map<string, BrowserContext> = new Map();

    /**
     * Default context options from playwright.config
     */
    private static getDefaultOptions(): BrowserContextOptions {
        return {
            viewport: playwrightConfig.use?.viewport ?? null,
            ignoreHTTPSErrors: playwrightConfig.use?.ignoreHTTPSErrors ?? true,
            recordVideo: playwrightConfig.use?.video ? {
                dir: 'test-results/videos',
                size: { width: 1920, height: 1080 }
            } : undefined,
        };
    }

    /**
     * Create a new browser context
     * @param browser - Browser instance
     * @param options - Context options
     * @param startTracing - Start tracing for debugging (default: true)
     * @returns BrowserContext instance
     */
    static async create(
        browser: Browser,
        options?: ContextConfig,
        startTracing: boolean = true
    ): Promise<BrowserContext> {
        const contextName = options?.name || `context-${Date.now()}`;

        console.log(`🔧 Creating browser context: ${contextName}`);

        const context = await browser.newContext({
            ...this.getDefaultOptions(),
            ...options,
        });

        // Start tracing if enabled
        if (startTracing && playwrightConfig.use?.trace) {
            await context.tracing.start({ screenshots: true, snapshots: true });
            console.log('📊 Tracing started');
        }

        if (options?.name) {
            this.contexts.set(options.name, context);
        }

        return context;
    }

    /**
     * Create context for specific device type
     * @param browser - Browser instance
     * @param deviceType - Type of device (desktop, mobile, tablet)
     * @param options - Additional context options
     */
    static async createForDevice(
        browser: Browser,
        deviceType: DeviceType = 'desktop',
        options?: ContextConfig
    ): Promise<BrowserContext> {
        const deviceConfigs: Record<DeviceType, BrowserContextOptions> = {
            desktop: {
                viewport: null, // Full screen
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
            },
            mobile: {
                viewport: { width: 375, height: 812 },
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
                isMobile: true,
                hasTouch: true,
            },
            tablet: {
                viewport: { width: 768, height: 1024 },
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
                isMobile: true,
                hasTouch: true,
            },
        };

        console.log(`📱 Creating ${deviceType} context`);

        return this.create(browser, {
            name: options?.name || `${deviceType}-context`,
            ...deviceConfigs[deviceType],
            ...options,
        });
    }

    /**
     * Create context with saved authentication state
     * @param browser - Browser instance
     * @param storageStatePath - Path to saved storage state JSON
     * @param options - Additional context options
     */
    static async createWithAuth(
        browser: Browser,
        storageStatePath: string,
        options?: ContextConfig
    ): Promise<BrowserContext> {
        console.log(`🔐 Creating authenticated context from: ${storageStatePath}`);

        return this.create(browser, {
            ...options,
            storageState: storageStatePath,
        });
    }

    /**
     * Create context with specific permissions
     * @param browser - Browser instance
     * @param permissions - Array of permissions to grant
     * @param options - Additional context options
     */
    static async createWithPermissions(
        browser: Browser,
        permissions: string[],
        options?: ContextConfig
    ): Promise<BrowserContext> {
        console.log(`🔓 Creating context with permissions: ${permissions.join(', ')}`);

        return this.create(browser, {
            ...options,
            permissions,
        });
    }

    /**
     * Create context for testing with specific geolocation
     * @param browser - Browser instance
     * @param latitude - Latitude coordinate
     * @param longitude - Longitude coordinate
     * @param options - Additional context options
     */
    static async createWithGeolocation(
        browser: Browser,
        latitude: number,
        longitude: number,
        options?: ContextConfig
    ): Promise<BrowserContext> {
        console.log(`🌍 Creating context with geolocation: ${latitude}, ${longitude}`);

        return this.create(browser, {
            ...options,
            geolocation: { latitude, longitude },
            permissions: ['geolocation'],
        });
    }

    /**
     * Create a new page in the context
     * @param context - Browser context
     * @returns Page instance
     */
    static async createPage(context: BrowserContext): Promise<Page> {
        const page = await context.newPage();
        console.log('📄 New page created in context');
        return page;
    }

    /**
     * Save authentication state from context
     * @param context - Browser context
     * @param path - Path to save storage state JSON
     */
    static async saveAuthState(context: BrowserContext, path: string): Promise<void> {
        await context.storageState({ path });
        console.log(`💾 Auth state saved to: ${path}`);
    }

    /**
     * Stop tracing and save trace file
     * @param context - Browser context
     * @param tracePath - Path to save trace file
     */
    static async stopTracing(context: BrowserContext, tracePath?: string): Promise<void> {
        if (tracePath) {
            await context.tracing.stop({ path: tracePath });
            console.log(`📊 Trace saved: ${tracePath}`);
        } else {
            await context.tracing.stop();
            console.log('🛑 Tracing stopped');
        }
    }

    /**
     * Close a specific context
     * @param context - Browser context to close
     */
    static async close(context: BrowserContext): Promise<void> {
        if (context) {
            await context.close();
            console.log('✅ Context closed');
        }
    }

    /**
     * Get cached context by name
     * @param name - Context name
     */
    static get(name: string): BrowserContext | undefined {
        return this.contexts.get(name);
    }

    /**
     * Close all cached contexts
     */
    static async closeAll(): Promise<void> {
        console.log(`🧹 Closing ${this.contexts.size} context(s)`);
        const closePromises = Array.from(this.contexts.values()).map(ctx => ctx.close());
        await Promise.all(closePromises);
        this.contexts.clear();
        console.log('✅ All contexts closed');
    }
}

