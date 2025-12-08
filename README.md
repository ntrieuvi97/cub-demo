# Cucumber + Playwright (TypeScript) Automation Tests

## Project Setup

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Install browsers:
   ```powershell
   npx playwright install chromium firefox webkit
   ```
3. Run tests:
   ```powershell
   npm test
   ```

## Configuration

### Multi-Browser Testing
The framework supports running tests on multiple browsers (Chromium, Firefox, WebKit) and device types (Desktop, Mobile, Tablet).

See [Multi-Browser Testing Guide](docs/MULTI-BROWSER-TESTING.md) for detailed documentation.

#### Quick Examples:
```powershell
# Run on specific browser
$env:BROWSER="firefox"; npm test

# Run in headed mode
$env:HEADLESS="false"; npm test

# Run with parallel workers
npm test -- --parallel 4

# Run specific tags
npm test -- --tags "@browser=chromium"
```

#### Feature File Tags:
- `@browser=chromium` - Run on Chromium
- `@browser=firefox` - Run on Firefox  
- `@browser=webkit` - Run on WebKit (Safari)
- `@device=desktop` - Desktop viewport
- `@device=mobile` - Mobile viewport  
- `@device=tablet` - Tablet viewport
- `@web-ui` - Desktop web UI tests
- `@android` - Android device tests
- `@user=<username>` - Auto-login with credentials

### Timeout Settings
Timeout configurations are centralized in `src/configs.ts`:
- `navigation`: 30 seconds for page navigation
- `pageInteraction`: 15 seconds for clicking, scrolling, etc.
- `verification`: 10 seconds for assertions and verifications
- `elementLoad`: 15 seconds for element loading/finding

You can adjust these values based on your testing environment and network conditions.

### Environment Variables
- `HEADLESS`: Set to 'false' to run tests in headed mode (default: true)
- `BROWSER`: Set browser type: 'chromium', 'firefox', or 'webkit' (default: chromium)

## Architecture

### Factories
- **BrowserFactory** (`src/core/browser.factory.ts`) - Manages browser instances across different browser types
- **ContextFactory** (`src/core/context.factory.ts`) - Manages browser contexts with different configurations
- **PageFactory** (`src/pages/page.factory.ts`) - Creates page objects on demand

### Test Scenario
- Go to https://belivi.wordpress.com/
- Scroll to bottom
- Verify that there are 10 displayed posts

## Structure
- `tests/` - Cucumber feature files
- `tests/data/` - Test data and credentials
- `tests/examples/` - Example feature files
- `src/steps/` - Step definitions (TypeScript)
- `src/pages/` - Page Object Model classes
- `src/core/` - Core factories (Browser, Context)
- `src/configs.ts` - Configuration settings including timeouts
- `src/support/` - Test framework setup and world configuration
- `src/utils/` - Utility functions
- `src/apis/` - API endpoints and models
- `docs/` - Documentation
