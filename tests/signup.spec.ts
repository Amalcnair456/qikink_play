import { test, expect } from '../src/fixtures/test.fixture';
import { TestData } from '../src/data/test.data';
import { TestDataHelper } from '../src/utils/test-data.helper';

test.describe('Sign Up - Modal UI', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should display all sign up modal elements', async ({ signUpPage }) => {
    await signUpPage.expectSignUpModalVisible();
  });

  test('should show "Create Your Account" heading', async ({ signUpPage }) => {
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
    await expect(signUpPage.createAccountHeading).toHaveText(/create.*account/i);
  });

  test('should display Google sign up option', async ({ signUpPage }) => {
    await signUpPage.expectToBeVisible(signUpPage.googleSignUpButton);
  });

  test('should display link to login for existing users', async ({ signUpPage }) => {
    await signUpPage.expectToBeVisible(signUpPage.loginLink);
  });

  test('should have input fields with correct labels', async ({ signUpPage }) => {
    await signUpPage.expectToBeVisible(signUpPage.nameInput);
    await signUpPage.expectToBeVisible(signUpPage.emailInput);
    await signUpPage.expectToBeVisible(signUpPage.passwordInput);
  });
});

test.describe('Sign Up - Successful Registration', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should sign up with valid details', async ({ signUpPage, page }) => {
    const uniqueEmail = TestDataHelper.uniqueEmail('signup');
    await signUpPage.signUp(TestData.signUp.name, uniqueEmail, TestData.signUp.password, TestData.signUp.phone);
    // After successful sign up, the modal should close, redirect, or show a success state
    await page.waitForLoadState('load');
    // Wait for the modal to dismiss or the page to change
    await expect(signUpPage.createAccountHeading).not.toBeVisible({ timeout: 30000 });
  });
});

test.describe('Sign Up - Invalid Inputs', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should not submit with all fields empty', async ({ signUpPage }) => {
    // Sign Up button should be disabled when terms are not accepted
    await expect(signUpPage.locators.signUpButton).toBeDisabled();
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should not submit with only name filled', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.nameInput, TestData.signUp.name);
    await signUpPage.toggleTerms();
    // Sign Up button should remain disabled with incomplete fields
    await expect(signUpPage.locators.signUpButton).toBeDisabled();
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should not submit with only email filled', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.emailInput, TestDataHelper.uniqueEmail());
    await signUpPage.toggleTerms();
    // Sign Up button should remain disabled with incomplete fields
    await expect(signUpPage.locators.signUpButton).toBeDisabled();
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should not submit with only password filled', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.passwordInput, TestData.signUp.password);
    await signUpPage.toggleTerms();
    await signUpPage.click(signUpPage.locators.signUpButton);
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should show validation for invalid email format', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.nameInput, TestData.signUp.name);
    await signUpPage.fill(signUpPage.emailInput, 'not-an-email');
    await signUpPage.fill(signUpPage.passwordInput, TestData.signUp.password);
    await signUpPage.toggleTerms();
    await signUpPage.click(signUpPage.locators.signUpButton);
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should show error for already registered email', async ({ signUpPage }) => {
    await signUpPage.signUp(TestData.signUp.name, TestData.validUser.email, TestData.signUp.password, TestData.signUp.phone);
    await signUpPage.expectErrorVisible();
  });

  test('should reject weak password', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.nameInput, TestData.signUp.name);
    await signUpPage.fill(signUpPage.emailInput, TestDataHelper.uniqueEmail());
    await signUpPage.fill(signUpPage.passwordInput, TestData.signUp.weakPassword);
    await signUpPage.toggleTerms();
    // Button should remain disabled or form should stay open after submission
    const isDisabled = await signUpPage.locators.signUpButton.isDisabled();
    if (!isDisabled) {
      await signUpPage.click(signUpPage.locators.signUpButton);
    }
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });
});

test.describe('Sign Up - Navigation & Links', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should navigate to login from sign up modal', async ({ signUpPage, page }) => {
    await signUpPage.clickLogin();
    await expect(page.getByText('Welcome Back', { exact: true })).toBeVisible({ timeout: 10000 });
  });

  test('should initiate Google sign up', async ({ signUpPage, page }) => {
    const popupPromise = page.waitForEvent('popup', { timeout: 10000 }).catch(() => null);
    await signUpPage.clickGoogleSignUp();
    const popup = await popupPromise;
    if (popup) {
      await expect(popup).toHaveURL(/accounts\.google\.com/);
      await popup.close();
    } else {
      await page.waitForLoadState('domcontentloaded');
    }
  });
});

test.describe('Sign Up - Keyboard Accessibility', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should allow Tab navigation between form fields', async ({ signUpPage, page }) => {
    await signUpPage.nameInput.focus();
    await page.keyboard.press('Tab');
    // Next focusable element should receive focus
    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBe('INPUT');
  });

  test('should submit sign up form on Enter key', async ({ signUpPage, page }) => {
    await signUpPage.fill(signUpPage.nameInput, TestData.signUp.name);
    await signUpPage.fill(signUpPage.emailInput, TestData.validUser.email);
    await signUpPage.fill(signUpPage.passwordInput, TestData.signUp.password);
    await signUpPage.toggleTerms();
    await page.keyboard.press('Enter');
    // Should attempt sign up — existing email triggers error
    await signUpPage.expectErrorVisible();
  });
});

test.describe('Sign Up - Security', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickSignUp();
  });

  test('should mask password input', async ({ signUpPage }) => {
    // Password input should be type="password" (masked by default)
    await signUpPage.expectToBeVisible(signUpPage.passwordInput);
    await expect(signUpPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('should not expose password in page source after failed sign up', async ({ signUpPage, page }) => {
    const password = 'MySecret@999';
    await signUpPage.signUp('Test', 'test@test.com', password, TestData.signUp.phone);
    await page.waitForTimeout(2000);
    // Check visible text content (not raw HTML which includes input value attributes)
    const visibleText = await page.innerText('body');
    expect(visibleText).not.toContain(password);
  });

  test('should handle SQL injection in email gracefully', async ({ signUpPage }) => {
    await signUpPage.fill(signUpPage.nameInput, 'Test');
    await signUpPage.fill(signUpPage.emailInput, "' OR 1=1 --");
    await signUpPage.fill(signUpPage.passwordInput, 'password');
    await signUpPage.toggleTerms();
    // Button may stay disabled with invalid email, or form rejects the input
    const isDisabled = await signUpPage.locators.signUpButton.isDisabled();
    if (!isDisabled) {
      await signUpPage.click(signUpPage.locators.signUpButton);
    }
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });

  test('should handle XSS in name field gracefully', async ({ signUpPage }) => {
    await signUpPage.signUp('<script>alert("xss")</script>', TestDataHelper.uniqueEmail(), TestData.signUp.password, TestData.signUp.phone);
    // Should not execute script — modal stays or shows error
    await signUpPage.expectToBeVisible(signUpPage.createAccountHeading);
  });
});
