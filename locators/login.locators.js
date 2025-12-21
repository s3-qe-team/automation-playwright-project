/**
 * Login page locators
 * Contains all element selectors for the Login page
 */
module.exports = {
  // Input fields
  emailInput: '#email',
  passwordInput: '#password',
  
  // Buttons
  loginButton: 'button[type="submit"]',
  forgotPasswordLink: 'a[href*="forgot-password"]',
  signUpLink: 'a[href*="signup"]',
  
  // Messages
  errorMessage: '.error-message',
  successMessage: '.success-message',
  
  // Other elements
  rememberMeCheckbox: '#remember-me',
  loginForm: 'form#login-form',
  logo: '.logo',
  
  // Social login buttons (if applicable)
  googleLoginButton: 'button[data-provider="google"]',
  facebookLoginButton: 'button[data-provider="facebook"]',
};
