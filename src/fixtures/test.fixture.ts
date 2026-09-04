import {test as base,APIRequestContext,request} from '@playwright/test';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ShoppingWorkflow } from '../workflows/shopping.workflow';

import { LoginPage } from '../pages/login.page';
import { LoginWorkflow } from '../workflows/login.workflow';
import { ApiService } from '../services/api.service';
import { TestContext } from '../context/test.context';

type TestFixtures = {
  loginPage: LoginPage;
  loginWorkflow: LoginWorkflow;
  apiContext: APIRequestContext;
  apiService: ApiService;
  testContext: TestContext;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  shoppingWorkflow: ShoppingWorkflow;
};

export const test = base.extend<TestFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  loginWorkflow: async ({ loginPage }, use) => {
    const loginWorkflow = new LoginWorkflow(loginPage);
    await use(loginWorkflow);
  },

  apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    await use(apiContext);

    await apiContext.dispose();
  },

  apiService: async ({ apiContext }, use) => {
    const apiService = new ApiService(apiContext);
    await use(apiService);
  },

  testContext: async ({}, use) => {
    const testContext = new TestContext();

    await use(testContext);

    testContext.clear();
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  
  shoppingWorkflow: async (
    { productsPage, cartPage, checkoutPage },
    use
  ) => {
    const shoppingWorkflow = new ShoppingWorkflow(
      productsPage,
      cartPage,
      checkoutPage
    );
  
    await use(shoppingWorkflow);
  }

});

export { expect } from '@playwright/test';