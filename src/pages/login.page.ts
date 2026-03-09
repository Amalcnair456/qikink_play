import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // --- Login Modal Elements ---
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
    super(page);
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

  // --- Actions ---

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }

  async clickSignUp(): Promise<void> {
    await this.click(this.signUpLink);
  }

  async clickGoogleLogin(): Promise<void> {
    await this.click(this.googleLoginButton);
  }

  async clickLoginWithOtp(): Promise<void> {
    await this.click(this.loginWithOtpLink);
  }

  async toggleRememberMe(): Promise<void> {
    await this.click(this.rememberMeCheckbox);
  }

  // --- Assertions ---

  async expectLoginModalVisible(): Promise<void> {
    await this.expectToBeVisible(this.welcomeBackHeading);
    await this.expectToBeVisible(this.emailInput);
    await this.expectToBeVisible(this.passwordInput);
    await this.expectToBeVisible(this.loginButton);
  }

  async expectErrorVisible(): Promise<void> {
    await this.expectToBeVisible(this.errorMessage);
  }
}
