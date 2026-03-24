# 🎭 Playwright Automation Testing Project

A comprehensive test automation framework using **Playwright** with the **Page Object Model (POM)** design pattern — built for scalability, stability, and CI/CD readiness.

## 📁 Project Structure

```
automation-playwright-project/
├── .github/
│   ├── scripts/
│   │   └── ai-review.js          # AI code review script (Gemini API)
│   └── workflows/
│       ├── playwright.yml         # CI: Run tests on push/PR/schedule
│       └── copilot-review.yml     # CI: AI code review on PR
├── pages/                         # Page Object Models
│   ├── base.page.js               # Base page with shared actions
│   ├── home.page.js               # Home page
│   ├── login-signup.page.js       # Login & Signup page
│   ├── register.page.js           # Registration page
│   └── contact-us.page.js         # Contact Us page
├── tests/                         # Test specifications
│   ├── login.spec.js              # Login test cases
│   ├── register.spec.js           # Registration test cases
│   ├── contact-us.spec.js         # Contact Us form tests
│   ├── example.spec.js            # Example & reference tests
│   └── env-example.spec.js        # Environment config demo tests
├── fixtures/                      # Custom Playwright fixtures
│   └── test.fixture.js            # Page object fixtures
├── utils/                         # Utility modules
│   ├── config.js                  # Environment configuration
│   ├── helpers.js                 # Helper functions (random data, etc.)
│   └── logger.js                  # Logging utility
├── data/                          # Test data & assets
│   └── upload_files/              # Files for upload tests
├── playwright.config.js           # Playwright configuration
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── GEMINI.md                      # AI Agent rules & behavior config
└── package.json                   # Project dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm**

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd automation-playwright-project

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npm run install:browsers

# 4. Create environment file
cp .env.example .env
```

Update `.env` with your configuration:

```env
BASE_URL=https://automationexercise.com
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
ENV=qa
HEADLESS=false
```

## 🧪 Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:webkit` | Run on WebKit (Safari) only |
| `npm run test:debug` | Run in debug mode |
| `npm run test:ui` | Run with Playwright UI mode |
| `npm run test:tag @smoke` | Run tests filtered by tag |
| `npm run test:parallel` | Run with 4 parallel workers |
| `npm run test:report` | Open HTML test report |
| `npm run codegen` | Launch Playwright code generator |

## 📝 Writing Tests

### Page Object Example

**1. Create a Page Object (`pages/example.page.js`):**

```javascript
const BasePage = require('./base.page.js');

class ExamplePage {
  constructor(page) {
    this.page = page;
    this.basePage = new BasePage(page);

    // ===== LOCATORS =====
    this.submitButton = page.locator('button[data-qa="submit"]');
    this.usernameInput = page.locator('input[data-qa="username"]');
  }

  // ===== ACTIONS =====
  async submitForm(username) {
    await this.basePage.fillTextToElement(this.usernameInput, username);
    await this.basePage.clickToElement(this.submitButton);
  }
}

module.exports = ExamplePage;
```

**2. Create a Test File (`tests/example.spec.js`):**

```javascript
const { test, expect } = require('@playwright/test');
const ExamplePage = require('../pages/example.page.js');

test.describe('@smoke', () => {
  test('should submit form successfully', async ({ page }) => {
    const examplePage = new ExamplePage(page);
    await page.goto('/example');
    await examplePage.submitForm('testuser');
    // Add assertions
  });
});
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Page Files | `kebab-case.page.js` | `login-signup.page.js` |
| Test Files | `kebab-case.spec.js` | `contact-us.spec.js` |
| Page Classes | PascalCase + `Page` suffix | `LoginSignupPage` |
| Element Variables | camelCase + type suffix | `submitButton`, `emailInput` |
| Test Names | Descriptive string | `'Login User with correct email and password'` |

## 🏗️ Architecture

### Design Pattern: Page Object Model (POM)

```
BasePage (shared actions)
    ├── HomePage
    ├── LoginSignupPage
    ├── RegisterPage
    └── ContactUsPage
```

- **`BasePage`** — Common browser actions (click, fill, wait, scroll, upload, etc.)
- **Page Classes** — Locators + page-specific actions (no assertions)
- **Test Files** — Test logic + assertions
- **Utils** — Config, helpers, logger (decoupled from pages/tests)

### Module System

All files use **CommonJS** (`require` / `module.exports`) — consistent with `package.json` `"type": "commonjs"`.

## 🤖 CI/CD & Automation

### GitHub Actions Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `playwright.yml` | Push, PR, Daily schedule | Runs tests across Chromium, Firefox, WebKit |
| `copilot-review.yml` | PR opened/updated | AI code review via Gemini API |

### Test Tag Filtering

Tests are tagged using `test.describe('@smoke')`. The CI pipeline reads `test-tags.txt` to filter which tests to run:

```bash
# test-tags.txt — currently set to:
@smoke
```

### AI Code Review

Pull Requests are automatically reviewed by **Gemini AI**, which:
- Checks for bugs, logic errors, and security issues
- Validates POM compliance and locator quality
- Posts review comments directly on the PR

> **Setup:** Add `GEMINI_API_KEY` to **Repository Settings → Secrets → Actions**.

## 📊 Reports

Test reports are generated in multiple formats:

| Format | Path |
|--------|------|
| HTML Report | `reports/html-report/index.html` |
| JSON Report | `reports/json-report/results.json` |
| JUnit Report | `reports/junit-report/results.xml` |

## 🔧 Configuration

### Playwright Config Highlights

- **Browsers:** Chromium, Firefox, WebKit
- **Timeouts:** Test (30s), Action (10s), Navigation (30s)
- **Retries:** 2 in CI, 0 locally
- **Artifacts:** Screenshots on failure, video retain-on-failure, traces retain-on-failure
- **Headed/Headless:** Controlled via `.env` `HEADLESS` variable

### Environment Variables (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://automationexercise.com` | Application URL |
| `TEST_USER_EMAIL` | — | Test account email |
| `TEST_USER_PASSWORD` | — | Test account password |
| `ENV` | `qa` | Environment (dev/qa/staging/prod) |
| `HEADLESS` | `false` | Run headless mode |
| `TIMEOUT` | `30000` | Test timeout (ms) |

## 🎯 Best Practices

1. **Page Object Model** — Keep locators and actions in Page classes, assertions in Tests
2. **Stable Locators** — Prefer `data-qa`, `data-testid`, roles over CSS/XPath
3. **No Hard-coded Waits** — Use Playwright auto-wait and web-first assertions
4. **Dynamic Test Data** — Generate unique data with timestamps/UUIDs
5. **CommonJS Modules** — Use `require/module.exports` consistently
6. **Tag-based Execution** — Use `@smoke`, `@regression` tags for test filtering
7. **Environment Config** — Store credentials in `.env`, never hardcode

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Browsers not installed | `npm run install:browsers` |
| Tests timing out | Check network, increase timeout in config |
| Element not found | Verify locators in debug mode: `npm run test:debug` |
| ESM import errors | Ensure all files use `require()`, not `import` |

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

**Happy Testing! 🎭**
