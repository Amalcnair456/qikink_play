import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {
  readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  // --- Convenience accessors (preserve existing public API) ---

  get welcomeBackHeading() { return this.locators.welcomeBackHeading; }
  get emailInput() { return this.locators.emailInput; }
  get passwordInput() { return this.locators.passwordInput; }
  get rememberMeCheckbox() { return this.locators.rememberMeCheckbox; }
  get forgotPasswordLink() { return this.locators.forgotPasswordLink; }
  get loginButton() { return this.locators.loginButton; }
  get signUpLink() { return this.locators.signUpLink; }
  get googleLoginButton() { return this.locators.googleLoginButton; }
  get loginWithOtpLink() { return this.locators.loginWithOtpLink; }
  get errorMessage() { return this.locators.errorMessage; }

  // --- Actions ---

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.locators.emailInput, email);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.locators.forgotPasswordLink);
  }

  async clickSignUp(): Promise<void> {
    await this.click(this.locators.signUpLink);
  }

  async clickGoogleLogin(): Promise<void> {
    await this.click(this.locators.googleLoginButton);
  }

  async clickLoginWithOtp(): Promise<void> {
    await this.click(this.locators.loginWithOtpLink);
  }

  async toggleRememberMe(): Promise<void> {
    // The Remember Me checkbox uses a custom component with a hidden input;
    // click the visible label wrapper instead of using BasePage.click()
    await this.page.locator('[role="dialog"]').getByText('Remember Me').click();
  }

  // --- Assertions ---

  async expectLoginModalVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.welcomeBackHeading);
    await this.expectToBeVisible(this.locators.emailInput);
    await this.expectToBeVisible(this.locators.passwordInput);
    await this.expectToBeVisible(this.locators.loginButton);
  }

  async expectErrorVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.errorMessage);
  }
}
