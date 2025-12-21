# Quick Setup Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (for version control)
- **VS Code** (recommended editor)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd automation-playwright-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npm run install:browsers
```

This will download Chromium, Firefox, and WebKit browsers.

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```env
BASE_URL=https://your-app-url.com
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=yourpassword
ENV=staging
HEADLESS=false
```

**Important**: Never commit the `.env` file to version control!

### 5. Verify Installation

Run a test to verify everything is set up correctly:

```bash
npm test
```

You should see tests executing in the browsers.

## IDE Setup (VS Code)

### Install Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions:

1. **Playwright Test for VSCode** - Test runner integration
2. **ESLint** - Code linting
3. **Prettier** - Code formatting
4. **Error Lens** - Inline error display
5. **Code Spell Checker** - Spell checking

Or install manually:
```bash
code --install-extension ms-playwright.playwright
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

### VS Code Playwright Extension

The Playwright extension provides:
- ▶️ Run tests from the editor
- 🐛 Debug tests with breakpoints
- 📹 Record tests
- 👁️ Show browser while testing

## Running Your First Test

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (see browser)

```bash
npm run test:headed
```

### Run Tests in UI Mode (interactive)

```bash
npm run test:ui
```

### Run Specific Browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run Single Test File

```bash
npx playwright test tests/login.spec.js
```

### Debug a Test

```bash
npm run test:debug
```

## Project Structure Overview

```
automation-playwright-project/
├── 📁 pages/              # Page Object Models
│   ├── base.page.js       # Common page methods
│   └── login.page.js      # Login page methods
├── 📁 locators/           # Element selectors
│   └── login.locators.js  # Login page locators
├── 📁 tests/              # Test files
│   ├── login.spec.js      # Login tests
│   └── example.spec.js    # Example tests
├── 📁 test-data/          # Test data
│   └── users.js           # User test data
├── 📁 utils/              # Helper functions
│   ├── helpers.js         # Utility functions
│   └── logger.js          # Logging utility
├── 📁 fixtures/           # Test fixtures
│   └── test.fixture.js    # Custom fixtures
├── 📁 reports/            # Test reports (generated)
├── 📁 screenshots/        # Screenshots (generated)
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies
└── .env                   # Environment variables
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode with Playwright Inspector |
| `npm run test:chromium` | Run in Chromium only |
| `npm run test:firefox` | Run in Firefox only |
| `npm run test:webkit` | Run in WebKit only |
| `npm run test:report` | View HTML report |
| `npm run test:tag @smoke` | Run tests with specific tag |
| `npm run codegen` | Record tests using Codegen |

## Creating Your First Test

### 1. Create Locators File

```javascript
// locators/mypage.locators.js
module.exports = {
  button: '#submit-btn',
  input: 'input[name="username"]',
};
```

### 2. Create Page Object

```javascript
// pages/mypage.page.js
const BasePage = require('./base.page');
const locators = require('../locators/mypage.locators');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async clickButton() {
    await this.click(this.locators.button);
  }
}

module.exports = MyPage;
```

### 3. Write Test

```javascript
// tests/mytest.spec.js
const { test, expect } = require('@playwright/test');
const MyPage = require('../pages/mypage.page');

test('my first test', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.goto('/path');
  await myPage.clickButton();
  expect(await myPage.isVisible('.success')).toBeTruthy();
});
```

### 4. Run Your Test

```bash
npx playwright test tests/mytest.spec.js --headed
```

## Troubleshooting

### Issue: Browsers not installed

**Solution:**
```bash
npm run install:browsers
```

### Issue: Tests timing out

**Solutions:**
- Check if application is accessible at BASE_URL
- Increase timeout in `playwright.config.js`
- Check network connection

### Issue: Element not found

**Solutions:**
- Verify locator is correct using debug mode
- Add wait conditions: `await page.waitForSelector()`
- Check if element is in iframe or shadow DOM

### Issue: Port already in use (for dev server)

**Solution:**
```bash
# Kill process on port (example: 3000)
lsof -ti:3000 | xargs kill -9
```

## Getting Help

- 📚 Check the [README.md](README.md) for detailed documentation
- 📖 Review [CONTRIBUTING.md](CONTRIBUTING.md) for coding guidelines
- 🎭 Visit [Playwright Documentation](https://playwright.dev/)
- 👥 Ask your team members
- 🐛 Check existing test examples in `/tests` folder

## Next Steps

1. ✅ Run existing tests to familiarize yourself
2. ✅ Review example tests in `tests/example.spec.js`
3. ✅ Read through Page Objects in `pages/` folder
4. ✅ Understand helper utilities in `utils/` folder
5. ✅ Review coding guidelines in `CONTRIBUTING.md`
6. ✅ Start writing your own tests!

---

**Ready to start testing! 🎭**

If you encounter any issues during setup, please reach out to the QE team.
