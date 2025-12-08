# Multi-Browser and Multi-Context Testing

This framework supports running tests across different browsers and device types using the **BrowserFactory** and **ContextFactory**.

## Features

✅ **Multiple Browser Support**: Chromium, Firefox, WebKit  
✅ **Device Types**: Desktop, Mobile, Tablet  
✅ **Context Isolation**: Multiple contexts for parallel execution  
✅ **Browser Reuse**: Optimize performance by reusing browser instances  
✅ **Authentication State**: Save and restore login sessions  
✅ **Geolocation Testing**: Test location-based features  

---

## Usage in Feature Files

### 1. Browser Type Selection

Use the `@browser` tag to specify which browser to run tests on:

```gherkin
@web-ui @browser=chromium
Scenario: Test on Chromium
  Given I navigate to the homepage
  Then I should see the logo

@web-ui @browser=firefox
Scenario: Test on Firefox
  Given I navigate to the homepage
  Then I should see the logo

@web-ui @browser=webkit
Scenario: Test on WebKit (Safari)
  Given I navigate to the homepage
  Then I should see the logo
```

### 2. Device Type Selection

Use the `@device` tag to test different viewport sizes:

```gherkin
@web-ui @device=desktop
Scenario: Test on Desktop
  Given I navigate to the homepage
  Then I should see the full navigation menu

@web-ui @device=mobile
Scenario: Test on Mobile
  Given I navigate to the homepage
  Then I should see the hamburger menu

@web-ui @device=tablet
Scenario: Test on Tablet
  Given I navigate to the homepage
  Then I should see the tablet layout
```

### 3. Combined Browser and Device

```gherkin
@web-ui @browser=firefox @device=mobile
Scenario: Test Firefox on Mobile viewport
  Given I navigate to the homepage
  Then I should see the mobile layout
```

---

## Environment Variables

### Set Browser via Environment

```bash
# Windows PowerShell
$env:BROWSER="firefox"; npm test

# Linux/Mac
BROWSER=firefox npm test
```

### Set Headless Mode

```bash
# Windows PowerShell
$env:HEADLESS="false"; npm test

# Linux/Mac
HEADLESS=false npm test
```

---

## Running Tests on Multiple Browsers

### Run on all browsers sequentially

```bash
# Windows PowerShell
$env:BROWSER="chromium"; npm test
$env:BROWSER="firefox"; npm test
$env:BROWSER="webkit"; npm test
```

### Using npm scripts (add to package.json)

```json
{
  "scripts": {
    "test:chrome": "cross-env BROWSER=chromium npm test",
    "test:firefox": "cross-env BROWSER=firefox npm test",
    "test:webkit": "cross-env BROWSER=webkit npm test",
    "test:all-browsers": "npm run test:chrome && npm run test:firefox && npm run test:webkit"
  }
}
```

Then run:
```bash
npm run test:all-browsers
```

---

## BrowserFactory API

### Programmatic Usage

```typescript
import { BrowserFactory } from './core/browser.factory';

// Launch a browser
const browser = await BrowserFactory.launch('chromium');

// Launch with custom options
const browser = await BrowserFactory.launch('firefox', {
  headless: false,
  slowMo: 100
});

// Reuse existing browser instance
const browser = await BrowserFactory.launch('chromium', undefined, true);

// Get browser from environment
const browserName = BrowserFactory.getBrowserFromEnv();

// Close specific browser
await BrowserFactory.close(browser);

// Close all browsers
await BrowserFactory.closeAll();
```

---

## ContextFactory API

### Create Different Context Types

```typescript
import { ContextFactory } from './core/context.factory';

// Create default context
const context = await ContextFactory.create(browser);

// Create context for device type
const mobileContext = await ContextFactory.createForDevice(browser, 'mobile');
const desktopContext = await ContextFactory.createForDevice(browser, 'desktop');
const tabletContext = await ContextFactory.createForDevice(browser, 'tablet');

// Create context with saved auth state
const authContext = await ContextFactory.createWithAuth(
  browser,
  'tests/data/auth-state.json'
);

// Create context with geolocation
const geoContext = await ContextFactory.createWithGeolocation(
  browser,
  21.0285, // Hanoi latitude
  105.8542 // Hanoi longitude
);

// Create context with permissions
const permContext = await ContextFactory.createWithPermissions(
  browser,
  ['geolocation', 'notifications']
);

// Create a page
const page = await ContextFactory.createPage(context);

// Save auth state
await ContextFactory.saveAuthState(context, 'tests/data/my-auth.json');

// Stop tracing
await ContextFactory.stopTracing(context, 'trace.zip');

// Close context
await ContextFactory.close(context);
```

---

## Advanced Examples

### Example 1: Cross-Browser Test

```gherkin
Feature: Cross-browser compatibility

  @web-ui @browser=chromium
  Scenario: Create listing on Chromium
    Given I am logged in as "validUser"
    When I create a new listing
    Then the listing should be created successfully

  @web-ui @browser=firefox
  Scenario: Create listing on Firefox
    Given I am logged in as "validUser"
    When I create a new listing
    Then the listing should be created successfully

  @web-ui @browser=webkit
  Scenario: Create listing on WebKit
    Given I am logged in as "validUser"
    When I create a new listing
    Then the listing should be created successfully
```

### Example 2: Responsive Design Test

```gherkin
Feature: Responsive design

  Scenario Outline: Test layout on different devices
    Given I navigate to the homepage
    When I view on "<device>"
    Then I should see the "<layout>" layout

    @web-ui
    Examples:
      | device  | layout        |
      | desktop | full-navigation |
      | tablet  | compact-menu    |
      | mobile  | hamburger-menu  |
```

### Example 3: Custom Context in Steps

```typescript
import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { ContextFactory } from '../core/context.factory';

Given('I open a new incognito context', async function(this: CustomWorld) {
  // Create isolated context for incognito testing
  const incognitoContext = await ContextFactory.create(
    this.browser!,
    { name: 'incognito' }
  );
  
  this.page = await ContextFactory.createPage(incognitoContext);
});
```

---

## Device Configurations

### Desktop
- Viewport: Full screen (maximized)
- User Agent: Windows Chrome

### Mobile
- Viewport: 375x812 (iPhone X)
- User Agent: iPhone Safari
- Touch enabled
- Mobile flag set

### Tablet
- Viewport: 768x1024 (iPad)
- User Agent: iPad Safari
- Touch enabled
- Mobile flag set

---

## Parallel Execution

The framework supports parallel execution using Cucumber's `--parallel` flag. Each worker gets its own browser instance:

```bash
# Run with 4 parallel workers
npm test -- --parallel 4
```

Combined with browser tags:
```bash
# Run specific browser tests in parallel
npm test -- --parallel 4 --tags "@browser=chromium"
```

---

## Best Practices

1. **Browser Reuse**: Enable browser reuse for faster test execution in development
2. **Context Isolation**: Create separate contexts for tests that need isolation
3. **Auth State**: Save authentication state to avoid repeated logins
4. **Cleanup**: Always close contexts and browsers after tests
5. **Device Testing**: Test critical flows on all device types
6. **Cross-Browser**: Run regression tests on all supported browsers

---

## Troubleshooting

### Browser not found
```bash
# Install browsers
npx playwright install chromium firefox webkit
```

### Context timeout
- Increase timeout in `playwright.config.ts`
- Check if browser is properly launched

### Viewport issues
- Ensure viewport settings match your test requirements
- Use `null` viewport for full screen on desktop

---

## Configuration

All default settings are in `playwright.config.ts`:

```typescript
export default defineConfig({
    timeout: 30000,
    use: {
        headless: process.env.HEADLESS !== 'false',
        viewport: null, // null for full screen
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'on',
        trace: 'on',
    },
});
```

---

## Summary

- ✅ Use `@browser=` tags to specify browser type
- ✅ Use `@device=` tags to specify device viewport
- ✅ Use `BROWSER` environment variable for global setting
- ✅ BrowserFactory manages browser instances
- ✅ ContextFactory manages browser contexts
- ✅ Support for parallel execution
- ✅ Authentication state management
- ✅ Geolocation and permissions support

