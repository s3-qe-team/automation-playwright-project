# Playwright Automation Testing Project

A comprehensive test automation framework using Playwright with Page Object Model (POM) design pattern.

## 📁 Project Structure

```
automation-playwright-project/
├── pages/                  # Page Object Models
│   ├── base.page.js       # Base page with common methods
│   └── login.page.js      # Login page specific methods
├── locators/              # Element locators
│   └── login.locators.js  # Login page locators
├── tests/                 # Test specifications
│   └── login.spec.js      # Login test cases
├── test-data/             # Test data files
│   └── users.js          # User test data
├── utils/                 # Utility functions (to be added)
├── fixtures/              # Test fixtures (to be added)
├── reports/               # Test execution reports
├── screenshots/           # Screenshots on failure
├── playwright.config.js   # Playwright configuration
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore file
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd automation-playwright-project
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install:browsers
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Update `.env` file with your configuration:
```env
BASE_URL=https://your-application-url.com
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests with specific tag
```bash
npm run test:tag @smoke
```

### Run tests in parallel
```bash
npm run test:parallel
```

### View test report
```bash
npm run test:report
```

## 📝 Writing Tests

### Page Object Model Example

**1. Create locators file (locators/example.locators.js):**
```javascript
module.exports = {
  submitButton: '#submit',
  inputField: 'input[name="username"]',
};
```

**2. Create page object (pages/example.page.js):**
```javascript
const BasePage = require('./base.page');
const exampleLocators = require('../locators/example.locators');

class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = exampleLocators;
  }

  async submitForm(data) {
    await this.fill(this.locators.inputField, data);
    await this.click(this.locators.submitButton);
  }
}

module.exports = ExamplePage;
```

**3. Create test file (tests/example.spec.js):**
```javascript
const { test, expect } = require('@playwright/test');
const ExamplePage = require('../pages/example.page');

test('example test', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  await examplePage.goto('/example');
  await examplePage.submitForm('test data');
  // Add assertions
});
```

## 🎯 Best Practices

1. **Use Page Object Model**: Keep locators and actions separate from tests
2. **DRY Principle**: Reuse common functions from BasePage
3. **Meaningful Names**: Use descriptive names for tests and methods
4. **Independent Tests**: Each test should be independent and isolated
5. **Test Data Management**: Store test data separately in test-data folder
6. **Assertions**: Always include clear assertions
7. **Tags**: Use tags (@smoke, @regression) for test categorization
8. **Screenshots**: Captured automatically on failure
9. **Parallel Execution**: Utilize parallel execution for faster runs

## 📊 Reports

Test reports are generated in multiple formats:
- **HTML Report**: `reports/html-report/index.html`
- **JSON Report**: `reports/json-report/results.json`
- **JUnit Report**: `reports/junit-report/results.xml`

## 🔧 Configuration

### Playwright Configuration (playwright.config.js)

Key configurations:
- **Browsers**: Chromium, Firefox, WebKit, Mobile
- **Timeouts**: Navigation (30s), Action (10s), Test (30s)
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: On failure
- **Videos**: Retain on failure
- **Traces**: Retain on failure

### Environment Variables

Create a `.env` file based on `.env.example`:
- `BASE_URL`: Application URL
- `ENV`: Test environment (dev, staging, prod)
- `HEADLESS`: Run in headless mode (true/false)
- Additional credentials and configuration

## 🤝 Contributing

### For Team Members

1. Follow the existing project structure
2. Create feature branches: `feature/test-name`
3. Write clear test descriptions
4. Add appropriate tags to tests
5. Update documentation when needed
6. Run tests locally before committing

### Adding New Test Suites

1. Create locators file in `locators/`
2. Create page object in `pages/`
3. Create test file in `tests/`
4. Add test data in `test-data/`
5. Document any new patterns or utilities

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🐛 Troubleshooting

### Common Issues

**Issue: Browsers not installed**
```bash
npm run install:browsers
```

**Issue: Tests timing out**
- Check network connection
- Increase timeout in playwright.config.js
- Verify application is accessible

**Issue: Element not found**
- Verify locators are correct
- Check if element needs wait time
- Use debug mode to inspect

## 📧 Contact

For questions or issues, please contact the QE team.

---

**Happy Testing! 🎭**
