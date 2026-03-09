import { test, expect } from '../src/fixtures/test.fixture';
import { TestData } from '../src/data/test.data';

test.describe('Qikink Login', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.clickLogin();
  });

  test('should display login modal with all elements', async ({ loginPage }) => {
    await loginPage.expectLoginModalVisible();
    await loginPage.expectToBeVisible(loginPage.forgotPasswordLink);
    await loginPage.expectToBeVisible(loginPage.rememberMeCheckbox);
    await loginPage.expectToBeVisible(loginPage.googleLoginButton);
    await loginPage.expectToBeVisible(loginPage.loginWithOtpLink);
    await loginPage.expectToBeVisible(loginPage.signUpLink);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(TestData.invalidUser.email, TestData.invalidUser.password);
    await loginPage.expectErrorVisible();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(TestData.validUser.email, TestData.validUser.password);
    // After successful login, user should be redirected away from the login state
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Welcome Back', { exact: true })).not.toBeVisible({ timeout: 10000 });
  });

  test('should navigate to Forgot Password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page.getByText('Reset Your Password')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to Sign Up from login modal', async ({ loginPage, page }) => {
    await loginPage.clickSignUp();
    await expect(page.getByText('Create Your Account')).toBeVisible({ timeout: 10000 });
  });

  test('should show Login with OTP option', async ({ loginPage }) => {
    await loginPage.expectToBeVisible(loginPage.loginWithOtpLink);
  });

  test('should show Google login option', async ({ loginPage }) => {
    await loginPage.expectToBeVisible(loginPage.googleLoginButton);
  });
});
