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

## Test Scenario
- Go to https://belivi.wordpress.com/
- Scroll to bottom
- Verify that there are 10 displayed posts

## Structure
- `features/` - Cucumber feature files
- `tests/` - Step definitions (TypeScript)
- `src/` - (Reserved for shared code/utilities)
