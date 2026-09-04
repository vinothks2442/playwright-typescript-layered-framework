import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  product(productName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({ hasText: productName });
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}