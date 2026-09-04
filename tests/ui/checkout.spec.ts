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

});