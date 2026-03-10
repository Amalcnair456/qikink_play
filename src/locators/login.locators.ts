import { Page, Locator } from '@playwright/test';

/**
 * Locators specific to the Login modal/page.
 */
export class LoginLocators {
  readonly welcomeBackHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggle: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginButton: Locator;
  readonly signUpLink: Locator;
  readonly googleLoginButton: Locator;
  readonly loginWithOtpLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    const dialog = page.locator('[role="dialog"]');
    this.welcomeBackHeading = dialog.getByText('Welcome Back', { exact: true });
    this.emailInput = dialog.getByPlaceholder('Enter your email');
    this.passwordInput = dialog.getByPlaceholder('Enter Password');
    this.passwordToggle = dialog.locator('button:near(:text("Password"))').first();
    this.rememberMeCheckbox = dialog.getByLabel('Remember Me');
    this.forgotPasswordLink = dialog.getByRole('button', { name: 'Forgot Password?' });
    this.loginButton = dialog.getByRole('button', { name: 'Login', exact: true });
    this.signUpLink = dialog.getByRole('button', { name: 'Sign Up' });
    this.googleLoginButton = dialog.getByRole('button', { name: /Google/i });
    this.loginWithOtpLink = dialog.getByRole('button', { name: /Login with OTP/i });
    this.errorMessage = page.locator('[role="alert"], .error-message, .toast-error').first();
  }
}
