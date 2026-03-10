import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignUpPage } from '../pages/signup.page';
import { SearchPage } from '../pages/search.page';
import { ProductPage } from '../pages/product.page';

/**
 * Custom test fixture that injects page objects into every test.
 * Usage: import { test, expect } from '@fixtures/test.fixture';
 */
type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  searchPage: SearchPage;
  productPage: ProductPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect } from '@playwright/test';
