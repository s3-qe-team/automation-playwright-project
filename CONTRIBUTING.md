# Contributing Guide

Thank you for contributing to our test automation project! This guide will help you get started.

## 🎯 Project Goals

- Maintain high-quality, maintainable test automation code
- Follow Page Object Model (POM) design pattern
- Write clear, independent, and reliable tests
- Document test cases and patterns

## 📋 Getting Started

### Setup Development Environment

1. Clone the repository and install dependencies:
```bash
npm install
npm run install:browsers
```

2. Create your `.env` file:
```bash
cp .env.example .env
# Update with your configuration
```

3. Verify setup by running tests:
```bash
npm test
```

## 🏗️ Project Structure

```
├── pages/          # Page Object Models
├── locators/       # Element selectors
├── tests/          # Test specifications
├── test-data/      # Test data and fixtures
├── utils/          # Helper utilities
├── fixtures/       # Custom Playwright fixtures
└── reports/        # Test execution reports
```

## ✍️ Writing Tests

### 1. Create Locators First

```javascript
// locators/mypage.locators.js
module.exports = {
  submitButton: '#submit',
  inputField: 'input[name="username"]',
  errorMessage: '.error',
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

  async performAction() {
    await this.click(this.locators.submitButton);
  }
}

module.exports = MyPage;
```

### 3. Write Test

```javascript
// tests/mypage.spec.js
const { test, expect } = require('@playwright/test');
const MyPage = require('../pages/mypage.page');

test.describe('My Feature', () => {
  test('should perform action', async ({ page }) => {
    const myPage = new MyPage(page);
    await myPage.goto('/path');
    await myPage.performAction();
    // Add assertions
  });
});
```

## 🎨 Code Style Guidelines

### Naming Conventions

- **Files**: Use kebab-case (e.g., `login.page.js`, `user-profile.spec.js`)
- **Classes**: Use PascalCase (e.g., `LoginPage`, `UserProfile`)
- **Functions/Variables**: Use camelCase (e.g., `clickButton`, `userName`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

### Test Writing Best Practices

1. **Test Independence**: Each test should be independent
```javascript
// ✅ Good - Independent
test('should login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);
});

// ❌ Bad - Depends on previous test
test('should show dashboard', async ({ page }) => {
  // Assumes user is already logged in
});
```

2. **Clear Test Names**: Use descriptive test names
```javascript
// ✅ Good
test('should display error message when email is invalid', async () => {});

// ❌ Bad
test('test1', async () => {});
```

3. **Arrange-Act-Assert Pattern**
```javascript
test('should update profile', async ({ page }) => {
  // Arrange
  const profilePage = new ProfilePage(page);
  await profilePage.goto();
  
  // Act
  await profilePage.updateName('John Doe');
  
  // Assert
  expect(await profilePage.getName()).toBe('John Doe');
});
```

4. **Use Page Objects**: Never use selectors directly in tests
```javascript
// ✅ Good
await loginPage.enterEmail(email);

// ❌ Bad
await page.fill('#email', email);
```

5. **Meaningful Assertions**: Always add clear assertions
```javascript
// ✅ Good
expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();

// ❌ Bad
// No assertion - test passes even if nothing works
```

### Locator Best Practices

1. **Priority Order** (from best to worst):
   - User-facing attributes: `getByRole`, `getByText`, `getByLabel`
   - Test IDs: `data-testid`
   - CSS Selectors: `id`, `class`
   - XPath (last resort)

2. **Stable Locators**:
```javascript
// ✅ Good - Stable
submitButton: 'button[type="submit"]'
emailInput: 'input[name="email"]'
heading: 'h1:has-text("Welcome")'

// ❌ Bad - Fragile
submitButton: 'body > div:nth-child(3) > button'
emailInput: 'input:nth-of-type(1)'
```

## 📝 Documentation

### JSDoc Comments

Add JSDoc comments for all functions:

```javascript
/**
 * Login with user credentials
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<void>}
 */
async login(email, password) {
  await this.enterEmail(email);
  await this.enterPassword(password);
  await this.clickLoginButton();
}
```

### Test Documentation

```javascript
test.describe('User Login', () => {
  /**
   * Test: Verify successful login with valid credentials
   * Given: User is on login page
   * When: User enters valid credentials and clicks login
   * Then: User should be redirected to dashboard
   */
  test('should login successfully with valid credentials', async ({ page }) => {
    // Test implementation
  });
});
```

## 🏷️ Test Tags

Use tags to categorize tests:

- `@smoke` - Critical path tests
- `@regression` - Full regression suite
- `@skip` - Temporarily disabled tests
- `@slow` - Tests that take longer to execute

```javascript
test('critical login flow @smoke', async ({ page }) => {
  // Critical test
});
```

Run tagged tests:
```bash
npm run test:tag @smoke
```

## 🔍 Code Review Checklist

Before submitting your PR, ensure:

- [ ] Tests are independent and can run in any order
- [ ] Locators are stored in locators files
- [ ] Page objects are used (no direct selectors in tests)
- [ ] Clear and descriptive test names
- [ ] JSDoc comments added for new functions
- [ ] Test data is stored in test-data folder
- [ ] Tests pass locally
- [ ] No hardcoded credentials or sensitive data
- [ ] Screenshots/videos are in .gitignore
- [ ] ESLint passes (if configured)

## 🐛 Debugging Tips

### Run Single Test
```bash
npx playwright test tests/login.spec.js
```

### Debug Mode
```bash
npm run test:debug
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

### Headed Mode (See Browser)
```bash
npm run test:headed
```

### Console Logs
```javascript
console.log('Debug info:', await page.textContent('.message'));
```

### Trace Viewer
When test fails, check trace in reports:
```bash
npx playwright show-trace reports/trace.zip
```

## 🚀 CI/CD Integration

Tests run automatically on:
- Push to main/develop branches
- Pull requests
- Scheduled daily runs

Ensure your tests:
- Run headlessly
- Don't depend on external state
- Have appropriate timeouts
- Clean up test data

## 📞 Getting Help

- Check existing tests for examples
- Review Playwright documentation: https://playwright.dev
- Ask the QE team
- Create an issue for bugs or suggestions

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)

---

Thank you for contributing! 🎭
