# 🎭 Playwright Quick Reference Cheat Sheet

## 🚀 Common Commands

```bash
# Installation
npm install                          # Install dependencies
npm run install:browsers             # Install browsers

# Running Tests
npm test                            # Run all tests
npm run test:headed                 # Run with browser visible
npm run test:debug                  # Debug mode
npm run test:ui                     # Interactive UI mode
npm run test:chromium               # Chromium only
npm run test:firefox                # Firefox only
npm run test:webkit                 # WebKit only

# Specific Tests
npx playwright test tests/login.spec.js                    # Run specific file
npx playwright test tests/login.spec.js:10                 # Run test at line 10
npx playwright test --grep "should login"                  # Run tests matching pattern
npx playwright test --grep @smoke                          # Run tagged tests

# Reports
npm run test:report                 # View HTML report
npx playwright show-report          # Show last report

# Tools
npm run codegen                     # Record tests
npx playwright codegen https://example.com                 # Record from URL
```

---

## 📝 Test Structure Template

```javascript
const { test, expect } = require('@playwright/test');
const PageObject = require('../pages/page.page');

test.describe('Feature Name', () => {
  let pageObject;

  test.beforeEach(async ({ page }) => {
    pageObject = new PageObject(page);
    await pageObject.goto();
  });

  test('should do something', async () => {
    // Arrange
    const testData = 'test';
    
    // Act
    await pageObject.performAction(testData);
    
    // Assert
    expect(await pageObject.getResult()).toBe('expected');
  });
});
```

---

## 🎯 Locator Strategies (Best to Worst)

```javascript
// 1. Role-based (BEST)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })

// 2. Label-based
page.getByLabel('Email address')

// 3. Placeholder
page.getByPlaceholder('Enter email')

// 4. Text content
page.getByText('Welcome back')

// 5. Test ID
page.getByTestId('submit-button')

// 6. CSS Selectors
page.locator('#id')
page.locator('.class')
page.locator('button[type="submit"]')

// 7. XPath (LAST RESORT)
page.locator('xpath=//button[@type="submit"]')
```

---

## 🔧 Common Page Methods (BasePage)

```javascript
// Navigation
await page.navigate(url)
await page.goto(url)

// Interactions
await page.click(locator)
await page.fill(locator, text)
await page.check(locator)
await page.uncheck(locator)
await page.selectOption(locator, value)
await page.hover(locator)
await page.pressKey(key)

// Getters
await page.getText(locator)
await page.getTitle()
await page.getCurrentUrl()

// Wait/Verify
await page.waitForElement(locator)
await page.isVisible(locator)

// Utilities
await page.takeScreenshot(name)
await page.waitForNavigation()
```

---

## ✅ Common Assertions

```javascript
// Page Assertions
await expect(page).toHaveURL(/dashboard/)
await expect(page).toHaveTitle('Dashboard')

// Element Visibility
await expect(page.locator('.message')).toBeVisible()
await expect(page.locator('.error')).toBeHidden()

// Element State
await expect(page.locator('#submit')).toBeEnabled()
await expect(page.locator('#submit')).toBeDisabled()
await expect(page.locator('#checkbox')).toBeChecked()

// Text Content
await expect(page.locator('.message')).toHaveText('Success')
await expect(page.locator('.message')).toContainText('Success')

// Attributes
await expect(page.locator('button')).toHaveAttribute('disabled', '')
await expect(page.locator('input')).toHaveValue('test@example.com')

// Count
await expect(page.locator('.item')).toHaveCount(5)

// JavaScript Assertions
expect(result).toBe('expected')
expect(result).toBeTruthy()
expect(result).toContain('substring')
expect(array).toHaveLength(3)
```

---

## 🎨 Page Object Pattern

### 1. Locators File
```javascript
// locators/login.locators.js
module.exports = {
  emailInput: '#email',
  passwordInput: '#password',
  loginButton: 'button[type="submit"]',
  errorMessage: '.error',
};
```

### 2. Page Object
```javascript
// pages/login.page.js
const BasePage = require('./base.page');
const locators = require('../locators/login.locators');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async login(email, password) {
    await this.fill(this.locators.emailInput, email);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.locators.errorMessage);
  }
}

module.exports = LoginPage;
```

### 3. Test File
```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test('should show error with invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/login');
  await loginPage.login('wrong@email.com', 'wrongpass');
  
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});
```

---

## 🔍 Debugging Techniques

```javascript
// 1. Pause test execution
await page.pause()

// 2. Console log
console.log('Element text:', await page.textContent('.element'))

// 3. Take screenshot
await page.screenshot({ path: 'debug.png' })

// 4. Get page content
console.log(await page.content())

// 5. Wait for specific time
await page.waitForTimeout(3000)

// 6. Debug in VS Code
// Add breakpoint and run: npm run test:debug
```

---

## 📊 Test Hooks

```javascript
test.describe('Test Suite', () => {
  // Runs once before all tests
  test.beforeAll(async () => {
    console.log('Setup before all tests');
  });

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    console.log('Setup before each test');
  });

  // Runs after each test
  test.afterEach(async ({ page }) => {
    console.log('Cleanup after each test');
  });

  // Runs once after all tests
  test.afterAll(async () => {
    console.log('Cleanup after all tests');
  });

  test('test 1', async () => {});
  test('test 2', async () => {});
});
```

---

## 🏷️ Test Tags & Organization

```javascript
// Tag tests for filtering
test('critical login flow @smoke', async ({ page }) => {});
test('detailed validation @regression', async ({ page }) => {});

// Skip tests
test.skip('not ready yet', async ({ page }) => {});

// Only run specific test
test.only('focus on this', async ({ page }) => {});

// Conditional skip
test('mobile only', async ({ page }) => {
  test.skip(process.env.BROWSER !== 'mobile', 'Mobile only');
  // test code
});

// Run tagged tests
// npm run test:tag @smoke
```

---

## 🛠️ Helper Functions

```javascript
const helpers = require('../utils/helpers');

// Generate test data
const email = helpers.generateRandomEmail('user');
const phone = helpers.generateRandomPhone();
const str = helpers.generateRandomString(10);

// Date handling
const date = helpers.formatDate(new Date());
const timestamp = helpers.getTimestamp();

// Validation
const isValid = helpers.isValidEmail('test@example.com');

// Wait utility
await helpers.wait(2000); // Wait 2 seconds

// Retry with backoff
await helpers.retryWithBackoff(async () => {
  // Your async operation
}, 3, 1000);
```

---

## 🎭 Playwright Inspector

```bash
# Open inspector
npm run test:debug

# In Inspector:
# - Step through test
# - Pick locator
# - Record at cursor
# - Resume/Pause
# - Step over
```

---

## 📱 Mobile Testing

```javascript
// In playwright.config.js - already configured
// Run mobile tests:
npm run test:mobile

// Or specific mobile browser:
npx playwright test --project="mobile-chrome"
npx playwright test --project="mobile-safari"
```

---

## 🔐 Environment Variables

```javascript
// Access in tests
const baseUrl = process.env.BASE_URL;
const email = process.env.TEST_USER_EMAIL;

// In playwright.config.js
use: {
  baseURL: process.env.BASE_URL || 'https://default.com',
}

// In test
await page.goto('/login'); // Uses baseURL
```

---

## ⚡ Performance Tips

```javascript
// 1. Use waitForLoadState
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');

// 2. Wait for specific elements instead of timeouts
await page.waitForSelector('.content');
// NOT: await page.waitForTimeout(3000);

// 3. Use parallel execution
// Already configured in playwright.config.js
// workers: process.env.CI ? 1 : undefined,

// 4. Use fixtures for reusable setup
// See fixtures/test.fixture.js
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Element not found | Use `waitForSelector()` or check locator |
| Test timeout | Increase timeout or check for slower operations |
| Flaky tests | Add proper waits, avoid `waitForTimeout()` |
| Browser not starting | Run `npm run install:browsers` |
| Test fails in CI | Check headless mode, add retries |

---

## 📚 Quick Links

- [Playwright Docs](https://playwright.dev/)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## 💡 Pro Tips

1. **Always use Page Objects** - Never use selectors directly in tests
2. **Write independent tests** - Each test should work in isolation
3. **Use meaningful names** - Test names should describe what they test
4. **Add proper waits** - Never use `waitForTimeout` unless absolutely necessary
5. **Tag your tests** - Use tags for better organization
6. **Debug efficiently** - Use `page.pause()` and Inspector
7. **Keep locators DRY** - Store in separate locator files
8. **Use fixtures** - For common setup and teardown
9. **Review test results** - Check HTML reports regularly
10. **Follow the guidelines** - Read CONTRIBUTING.md

---

**Print this cheat sheet and keep it handy! 📝**
