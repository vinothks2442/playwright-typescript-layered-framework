import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product.locator('button').click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}