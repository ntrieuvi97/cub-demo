import { devices } from '@playwright/test';

/**
 * Android Device Configurations
 *
 * Prerequisites:
 * 1. Install Android SDK
 * 2. Enable USB Debugging on your Android device
 * 3. Connect device via USB or WiFi
 * 4. Run: adb devices (to verify device is connected)
 *
 * Playwright will automatically:
 * - Install Playwright Android browser
 * - Connect to your device via ADB
 */

export const AndroidConfig = {
    // Common Android device configurations
    devices: {
        // Generic Android device
        android: {
            ...devices['Pixel 5'],
            defaultBrowserType: 'chromium',
        },

        // High-end Android device
        androidHighEnd: {
            ...devices['Pixel 7'],
            defaultBrowserType: 'chromium',
        },

        // Mid-range Android device
        androidMidRange: {
            ...devices['Pixel 5'],
            defaultBrowserType: 'chromium',
        },

        // Tablet
        androidTablet: {
            ...devices['Pixel 7 landscape'],
            defaultBrowserType: 'chromium',
        },
    },

    // ADB connection settings
    adb: {
        // Default ADB port
        port: 5037,

        // Device serial (use 'adb devices' to find your device serial)
        // Leave empty to use the first available device
        deviceSerial: process.env.ANDROID_DEVICE_SERIAL || '',
    },

    // Browser app configuration
    browser: {
        // Use Chrome browser on Android device
        // Alternatives: 'com.android.chrome', 'org.chromium.webview_shell'
        packageName: 'com.android.chrome',
    },
};

/**
 * Check if Android mode is enabled
 */
export function isAndroidMode(): boolean {
    return process.env.ANDROID === 'true' || process.env.PLATFORM === 'android';
}

/**
 * Get Android device configuration
 */
export function getAndroidDevice(): string {
    return process.env.ANDROID_DEVICE || 'android';
}

