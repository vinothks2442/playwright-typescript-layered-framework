import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  product(productName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({ hasText: productName });
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.product(productName);
    await product.locator('button').click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}