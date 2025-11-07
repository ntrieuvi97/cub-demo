import {defineConfig} from '@playwright/test';

export default defineConfig({
    timeout: 30000,
    use: {
        headless: false,
        viewport: null, // null allows browser to use maximized window size
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'on', // Changed to 'on' to take screenshots for all tests
        trace: 'on', // Enable trace recording for all tests
    },
    // Output folders
    outputDir: 'test-results',
});