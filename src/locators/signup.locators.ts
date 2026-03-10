import { Page, Locator } from '@playwright/test';

/**
 * Locators specific to the Sign Up modal/page.
 */
export class SignUpLocators {
  readonly createAccountHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly signUpButton: Locator;
  readonly loginLink: Locator;
  readonly googleSignUpButton: Locator;
  readonly errorMessage: Locator;
  readonly passwordToggle: Locator;

  constructor(page: Page) {
    const dialog = page.locator('[role="dialog"]');
    this.createAccountHeading = dialog.getByText('Create Your Account');
    this.nameInput = dialog.getByRole('textbox', { name: 'Full Name' });
    this.emailInput = dialog.getByRole('textbox', { name: 'Email ID' });
    this.phoneInput = dialog.getByRole('textbox', { name: 'Mobile Number' });
    this.passwordInput = dialog.getByRole('textbox', { name: 'Password' });
    this.confirmPasswordInput = dialog.getByPlaceholder(/confirm password/i).first();
    this.termsCheckbox = dialog.getByRole('checkbox').first();
    this.signUpButton = dialog.getByRole('button', { name: /sign up/i, exact: false });
    this.loginLink = dialog.getByRole('button', { name: 'Login', exact: true });
    this.googleSignUpButton = dialog.getByRole('button', { name: /google/i });
    this.errorMessage = page.locator('[role="alert"], .error-message, .toast-error').first();
    this.passwordToggle = dialog.getByRole('button', { name: 'Show password' });
  }
}
