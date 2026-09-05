import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Checkout Workflow', () => {
  test('should successfully purchase a product', async ({
    loginWorkflow,
    shoppingWorkflow,
    checkoutPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await expect(checkoutPage.page).toHaveURL(/inventory.html/);

    await shoppingWorkflow.purchaseProduct(
      'Sauce Labs Backpack',
      'Vinoth',
      'Kumar',
      '600001'
    );

    await expect(checkoutPage.confirmationMessage).toHaveText(
      'Thank you for your order!'
    );
  });

  test('should verify the selected product is present in the cart', async ({
    loginWorkflow,
    productsPage,
    cartPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await expect(cartPage.product('Sauce Labs Backpack')).toBeVisible();
  });

  test('should support adding multiple products to the cart', async ({
    loginWorkflow,
    productsPage,
    cartPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.openCart();

    await expect(cartPage.product('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.product('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('should remove a product from the cart', async ({
    loginWorkflow,
    productsPage,
    cartPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.openCart();

    await cartPage.removeProduct('Sauce Labs Backpack');

    await expect(cartPage.product('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.product('Sauce Labs Bike Light')).toBeVisible();
  });

  test('should validate required checkout information', async ({
    loginWorkflow,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.checkout();
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('should verify the product on the checkout overview', async ({
    loginWorkflow,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.checkout();
    await checkoutPage.enterCustomerDetails('Vinoth', 'Kumar', '600001');
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.overviewItems).toHaveCount(1);
    await expect(checkoutPage.overviewItems).toContainText('Sauce Labs Backpack');
  });

  test('should logout successfully', async ({
    loginWorkflow,
    productsPage,
    loginPage,
  }) => {
    await loginWorkflow.loginAsStandardUser();
    await productsPage.logout();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
