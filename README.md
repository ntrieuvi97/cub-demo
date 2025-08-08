# Cucumber + Playwright (TypeScript) Automation Tests

## Project Setup

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run tests:
   ```powershell
   npm test
   ```

## Configuration

### Timeout Settings
Timeout configurations are centralized in `src/configs.ts`:
- `navigation`: 30 seconds for page navigation
- `pageInteraction`: 15 seconds for clicking, scrolling, etc.
- `verification`: 10 seconds for assertions and verifications
- `elementLoad`: 15 seconds for element loading/finding

You can adjust these values based on your testing environment and network conditions.

### Environment Variables
- `HEADLESS`: Set to 'false' to run tests in headed mode (default: true)

## Test Scenario
- Go to https://belivi.wordpress.com/
- Scroll to bottom
- Verify that there are 10 displayed posts

## Structure
- `tests/` - Cucumber feature files
- `src/steps/` - Step definitions (TypeScript)
- `src/pages/` - Page Object Model classes
- `src/configs.ts` - Configuration settings including timeouts
- `src/support/` - Test framework setup and world configuration
