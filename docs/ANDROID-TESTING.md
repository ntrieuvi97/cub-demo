
### Automatic Detection
The framework automatically detects Android mode via environment variables:
- `ANDROID=true` or `PLATFORM=android`

### Browser Initialization
When Android mode is enabled:
1. Connects to Android device via ADB
2. Launches Chrome browser on device
3. Creates browser context
4. Runs tests in the mobile browser

### Cleanup
After each scenario:
1. Takes screenshot (if enabled)
2. Closes browser
3. Disconnects from Android device

## Device Profiles

Available in `android.config.ts`:

| Profile | Description | Use Case |
|---------|-------------|----------|
| `android` | Generic Android (Pixel 5) | Default testing |
| `androidHighEnd` | Pixel 7 | High-end device testing |
| `androidMidRange` | Pixel 5 | Mid-range device testing |
| `androidTablet` | Pixel 7 Landscape | Tablet testing |

## Supported Features

✅ **All existing features work on Android:**
- Navigate to pages
- Fill forms
- Click elements
- Take screenshots
- API testing (publish, suspend, mark review)
- Authentication (@user tag)
- Scroll, wait, pause

✅ **Android-specific benefits:**
- Real device testing
- Mobile browser rendering
- Touch interactions
- Mobile viewport
- Device-specific issues detection

## Troubleshooting

### Device Not Found
```
Error: No Android device found
```

**Solution:**
1. Run `adb devices` to check connection
2. Reconnect device
3. Accept USB debugging prompt
4. Restart ADB: `adb kill-server && adb start-server`

### Browser Launch Failed
```
Error: Failed to launch browser
```

**Solution:**
1. Ensure Chrome is installed on device
2. Update Chrome to latest version
3. Try different browser package:
   ```typescript
   // In android.config.ts
   packageName: 'org.chromium.webview_shell'
   ```

### Permission Denied
```
Error: Permission denied
```

**Solution:**
1. Enable USB debugging again
2. Revoke USB debugging authorizations in Developer Options
3. Reconnect and reauthorize

### Slow Performance
**Solution:**
1. Close other apps on device
2. Use USB connection instead of WiFi
3. Disable animations:
   ```cmd
   adb shell settings put global window_animation_scale 0
   adb shell settings put global transition_animation_scale 0
   adb shell settings put global animator_duration_scale 0
   ```

## Limitations

❌ **Not Supported on Android:**
- Native Android app testing (use Appium instead)
- Browser maximize (not applicable on mobile)
- Desktop-specific features

## Switching Between Desktop and Android

### Quick Switch Script
Create `run-android.cmd`:
```cmd
@echo off
set ANDROID=true
npm test %*
set ANDROID=
```

Create `run-desktop.cmd`:
```cmd
@echo off
set ANDROID=
npm test %*
```

Usage:
```cmd
# Run on Android
run-android.cmd tests/lmp.feature

# Run on Desktop
run-desktop.cmd tests/lmp.feature
```

## Best Practices

1. **Keep device awake** - Adjust screen timeout settings
2. **Stable connection** - Use USB for reliable testing
3. **Clean state** - Close other apps before testing
4. **Battery level** - Keep device charged (>50%)
5. **WiFi connection** - Ensure device has internet access

## Example: Complete Android Test Run

```cmd
# 1. Check device connection
adb devices

# 2. Enable Android mode
set ANDROID=true

# 3. Run tests
npm test -- tests/lmp.feature --tags "@lmp"

# 4. View results
# Screenshots: test-results/screenshots/
# Reports: test-reports/cucumber-report.html

# 5. Disable Android mode (optional)
set ANDROID=
```

## Summary

✅ **Android testing is now fully integrated!**
- Same feature files work on both desktop and Android
- Automatic device detection
- No code changes needed in steps
- Full Playwright features available
- Easy switching between platforms

Just set `ANDROID=true` and run your tests! 🚀📱
# Android Testing with Playwright + Cucumber

## Overview
This framework supports running tests on both **Desktop Browser** and **Android Devices** using platform tags.

## Platform Tags

### `@web-ui` - Desktop Browser
Use this tag for desktop browser testing (Chrome/Chromium on your computer)

### `@android` - Android Device
Use this tag for Android device testing (Chrome browser on connected Android device)

## Quick Start

### Run Desktop Tests
```cmd
npm test -- --tags "@web-ui"
```

### Run Android Tests
```cmd
# 1. Connect Android device via USB
# 2. Enable USB debugging on device
# 3. Verify connection
adb devices

# 4. Run Android tests
npm test -- --tags "@android"
```

### Run Both Platforms
```cmd
npm test -- tests/examples/platform-testing.feature
```

## Prerequisites

### 1. Install Android SDK
Download and install Android SDK:
- **Option A**: Install [Android Studio](https://developer.android.com/studio) (includes SDK)
- **Option B**: Install [SDK Command-line tools only](https://developer.android.com/studio#command-tools)

### 2. Set up ADB (Android Debug Bridge)
Add ADB to your system PATH:

**Windows:**
```cmd
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools"
```

**Mac/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 3. Enable USB Debugging on Android Device
1. Go to **Settings** > **About Phone**
2. Tap **Build Number** 7 times to enable Developer Mode
3. Go to **Settings** > **Developer Options**
4. Enable **USB Debugging**

### 4. Connect Android Device
**Via USB:**
1. Connect device via USB cable
2. Accept "Allow USB Debugging" prompt on device
3. Verify connection: `adb devices`

**Via WiFi (Optional):**
1. Connect device and computer to same WiFi
2. Get device IP: **Settings** > **About** > **Status** > **IP Address**
3. Connect via ADB:
   ```cmd
   adb tcpip 5555
   adb connect <device-ip>:5555
   ```

## Installation

### Install Playwright Android Dependencies
```cmd
npm install
npx playwright install
```

Playwright will automatically install:
- Android browser APK
- Required drivers

## Configuration Files

### `src/configs/android.config.ts`
Android-specific configuration:
- Device profiles (Pixel 5, Pixel 7, Tablet)
- ADB connection settings
- Browser package configuration

### Environment Variables
Set these to enable Android mode:

**Windows (CMD):**
```cmd
set ANDROID=true
set ANDROID_DEVICE=android
set ANDROID_DEVICE_SERIAL=<your-device-serial>
```

**Windows (PowerShell):**
```powershell
$env:ANDROID="true"
$env:ANDROID_DEVICE="android"
$env:ANDROID_DEVICE_SERIAL="<your-device-serial>"
```

**Mac/Linux:**
```bash
export ANDROID=true
export ANDROID_DEVICE=android
export ANDROID_DEVICE_SERIAL=<your-device-serial>
```

## Running Tests

### Check Connected Devices
```cmd
adb devices
```

Output should show:
```
List of devices attached
XXXXXXXX    device
```

### Run Tests by Platform Tag

**Run Desktop Browser Tests:**
```cmd
npm test -- --tags "@web-ui"
```

**Run Android Device Tests:**
```cmd
npm test -- --tags "@android"
```

**Run Specific Feature on Desktop:**
```cmd
npm test -- tests/lmp.feature --tags "@web-ui"
```

**Run Specific Feature on Android:**
```cmd
npm test -- tests/lmp.feature --tags "@android"
```

**Run All Tests (Both Platforms):**
```cmd
npm test -- tests/examples/platform-testing.feature
```

## Example Feature File

Platform selection is done using tags in your feature files:

```gherkin
Feature: Listing Management

  # Desktop Browser Test
  @web-ui @user=validUser
  Scenario: Verify listing on Desktop
    Given I have a listing that "rent" a "apartment" with "vip Bac" type
    And I publish the listing
    When I navigate to LMP
    Then I see the listing on LMP

  # Android Device Test
  @android @user=validUser
  Scenario: Verify listing on Android
    Given I have a listing that "rent" a "apartment" with "vip Bac" type
    And I publish the listing
    When I navigate to LMP
    Then I see the listing on LMP
```

## How It Works

