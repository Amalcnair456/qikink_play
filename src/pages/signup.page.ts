import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SignUpLocators } from '../locators/signup.locators';

export class SignUpPage extends BasePage {
  readonly locators: SignUpLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new SignUpLocators(page);
  }

  // --- Convenience accessors ---

  get createAccountHeading() { return this.locators.createAccountHeading; }
  get nameInput() { return this.locators.nameInput; }
  get emailInput() { return this.locators.emailInput; }
  get phoneInput() { return this.locators.phoneInput; }
  get passwordInput() { return this.locators.passwordInput; }
  get confirmPasswordInput() { return this.locators.confirmPasswordInput; }
  get termsCheckbox() { return this.locators.termsCheckbox; }
  get signUpButton() { return this.locators.signUpButton; }
  get loginLink() { return this.locators.loginLink; }
  get googleSignUpButton() { return this.locators.googleSignUpButton; }
  get errorMessage() { return this.locators.errorMessage; }

  // --- Actions ---

  async signUp(name: string, email: string, password: string, phone?: string): Promise<void> {
    await this.fill(this.locators.nameInput, name);
    await this.fill(this.locators.emailInput, email);
    if (phone && await this.locators.phoneInput.isVisible()) {
      await this.fill(this.locators.phoneInput, phone);
    }
    await this.fill(this.locators.passwordInput, password);
    if (await this.locators.confirmPasswordInput.isVisible()) {
      await this.fill(this.locators.confirmPasswordInput, password);
    }
    // Accept terms if checkbox is unchecked (Sign Up button is disabled without it)
    if (await this.locators.termsCheckbox.isVisible()) {
      const isChecked = await this.locators.termsCheckbox.isChecked();
      if (!isChecked) {
        await this.toggleTerms();
      }
    }
    await this.click(this.locators.signUpButton);
  }

  async clickLogin(): Promise<void> {
    await this.click(this.locators.loginLink);
  }

  async clickGoogleSignUp(): Promise<void> {
    await this.click(this.locators.googleSignUpButton);
  }

  async toggleTerms(): Promise<void> {
    // Custom checkbox component with hidden accessible + visible interactive checkbox
    // Click the visible checkbox (last one, has cursor=pointer)
    await this.page.locator('[role="dialog"]').getByRole('checkbox').last().click();
  }

  // --- Assertions ---

  async expectSignUpModalVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.createAccountHeading);
    await this.expectToBeVisible(this.locators.emailInput);
    await this.expectToBeVisible(this.locators.passwordInput);
    await this.expectToBeVisible(this.locators.signUpButton);
  }

  async expectErrorVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.errorMessage);
  }
}
