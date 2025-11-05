import {defineConfig} from '@playwright/test';

export default defineConfig({
    timeout: 30000,
    use: {
        headless: false,
        viewport: { width: 1960, height: 800 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'on', // Changed to 'on' to take screenshots for all tests
        trace: 'on', // Enable trace recording for all tests
    },
    // Output folders
    outputDir: 'test-results',
});