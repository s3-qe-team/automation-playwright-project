/**
 * Locators for Agent Login page
 */
module.exports = {
  // Menu bar
  agentsButton: (page) =>
    page.getByRole('button', { name: 'Agents' }),
  
  loginLink: (page) =>
    page.getByRole('link', { name: 'Login' }),
  
  // Login form
  agentsLoginForm: (page) =>    // find the container form in the login page
    page.locator('form#login'),

  emailInput: (form) =>        // find the email input field within the form 
    form.getByPlaceholder('name@example.com'),

  passwordInput: (form) =>
    form.getByPlaceholder('Enter your password'),
  
  // Buttons
  loginButton: (page) =>
    page.getByRole('button', { name: 'Login'}),
};
