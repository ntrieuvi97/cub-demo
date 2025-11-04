import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Limit the number of workers on CI, use default locally
    workers: process.env.CI ? 2 : undefined,
    timeout: 30000,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'on', // Changed to 'on' to take screenshots for all tests
        trace: 'on', // Enable trace recording for all tests
    },
    // Output folders
    outputDir: 'test-results',
});