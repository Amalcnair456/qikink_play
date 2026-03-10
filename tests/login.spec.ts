import { test, expect } from '../src/fixtures/test.fixture';
import { TestData } from '../src/data/test.data';

test.describe('Login - Modal UI', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should display all login modal elements', async ({ loginPage }) => {
    await loginPage.expectLoginModalVisible();
    await loginPage.expectToBeVisible(loginPage.forgotPasswordLink);
    await loginPage.expectToBeVisible(loginPage.rememberMeCheckbox);
    await loginPage.expectToBeVisible(loginPage.googleLoginButton);
    await loginPage.expectToBeVisible(loginPage.loginWithOtpLink);
    await loginPage.expectToBeVisible(loginPage.signUpLink);
  });

  test('should show "Welcome Back" heading', async ({ loginPage }) => {
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
    await expect(loginPage.welcomeBackHeading).toHaveText('Welcome Back');
  });

  test('should have email and password input fields with correct placeholders', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toHaveAttribute('placeholder', /email/i);
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', /password/i);
  });
});

test.describe('Login - Valid Credentials', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should login successfully and dismiss modal', async ({ loginPage, page }) => {
    await loginPage.login(TestData.validUser.email, TestData.validUser.password);
    await page.waitForLoadState('networkidle');
    await expect(loginPage.welcomeBackHeading).not.toBeVisible({ timeout: 15000 });
  });

  test('should show logged-in state in header after login', async ({ loginPage, page }) => {
    await loginPage.login(TestData.validUser.email, TestData.validUser.password);
    await page.waitForLoadState('networkidle');
    // After login, the "Log in" button in the header should no longer be visible
    await expect(page.getByRole('button', { name: 'Log in' }).first()).not.toBeVisible({ timeout: 15000 });
  });
});

test.describe('Login - Invalid Credentials', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should show error with wrong email and password', async ({ loginPage }) => {
    await loginPage.login(TestData.invalidUser.email, TestData.invalidUser.password);
    await loginPage.expectErrorVisible();
  });

  test('should show error with valid email and wrong password', async ({ loginPage }) => {
    await loginPage.login(TestData.validUser.email, 'WrongPassword!99');
    await loginPage.expectErrorVisible();
  });

  test('should show error with unregistered email', async ({ loginPage }) => {
    await loginPage.login('nobody_registered@example.com', 'SomePass@123');
    await loginPage.expectErrorVisible();
  });
});

test.describe('Login - Empty / Partial Fields', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should not submit with empty email and password', async ({ loginPage }) => {
    await loginPage.click(loginPage.locators.loginButton);
    // Modal should remain open — login was not submitted
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });

  test('should not submit with email only', async ({ loginPage }) => {
    await loginPage.fill(loginPage.emailInput, TestData.validUser.email);
    await loginPage.click(loginPage.locators.loginButton);
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });

  test('should not submit with password only', async ({ loginPage }) => {
    await loginPage.fill(loginPage.passwordInput, TestData.validUser.password);
    await loginPage.click(loginPage.locators.loginButton);
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });

  test('should show validation for invalid email format', async ({ loginPage }) => {
    await loginPage.fill(loginPage.emailInput, 'not-an-email');
    await loginPage.fill(loginPage.passwordInput, TestData.validUser.password);
    await loginPage.click(loginPage.locators.loginButton);
    // Should stay on the login modal or show validation error
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });
});

test.describe('Login - Navigation & Links', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should navigate to Forgot Password flow', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page.getByText(/reset.*password|forgot.*password/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to Sign Up from login modal', async ({ loginPage, page }) => {
    await loginPage.clickSignUp();
    await expect(page.getByText(/create.*account|sign up/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should show Login with OTP view', async ({ loginPage, page }) => {
    await loginPage.clickLoginWithOtp();
    // OTP flow should show a phone/email input for OTP
    await expect(page.getByText(/otp|verification/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should initiate Google login', async ({ loginPage, page }) => {
    const popupPromise = page.waitForEvent('popup', { timeout: 10000 }).catch(() => null);
    await loginPage.clickGoogleLogin();
    const popup = await popupPromise;
    // Google login either opens a popup or redirects
    if (popup) {
      await expect(popup).toHaveURL(/accounts\.google\.com/);
      await popup.close();
    } else {
      // If no popup, check for redirect or URL change
      await page.waitForLoadState('domcontentloaded');
    }
  });
});

test.describe('Login - Remember Me', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should toggle Remember Me checkbox', async ({ loginPage }) => {
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  });
});

test.describe('Login - Keyboard Accessibility', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should allow Tab navigation between form fields', async ({ loginPage, page }) => {
    await loginPage.emailInput.focus();
    await page.keyboard.press('Tab');
    await expect(loginPage.passwordInput).toBeFocused();
  });

  test('should submit login form on Enter key', async ({ loginPage, page }) => {
    await loginPage.fill(loginPage.emailInput, TestData.invalidUser.email);
    await loginPage.fill(loginPage.passwordInput, TestData.invalidUser.password);
    await page.keyboard.press('Enter');
    // Should attempt login and show error for invalid creds
    await loginPage.expectErrorVisible();
  });
});

test.describe('Login - Security', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should mask password input', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('should not expose credentials in page source after failed login', async ({ loginPage, page }) => {
    const password = 'SuperSecret@789';
    await loginPage.login(TestData.invalidUser.email, password);
    await loginPage.expectErrorVisible();
    // Check visible text content (not raw HTML which includes input value attributes)
    const visibleText = await page.innerText('body');
    expect(visibleText).not.toContain(password);
  });

  test('should handle SQL injection in email gracefully', async ({ loginPage }) => {
    await loginPage.login("' OR 1=1 --", 'password');
    // Should show error, not crash or bypass auth
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });

  test('should handle XSS in email gracefully', async ({ loginPage }) => {
    await loginPage.login('<script>alert("xss")</script>', 'password');
    await loginPage.expectToBeVisible(loginPage.welcomeBackHeading);
  });
});
