import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

export class ShoppingWorkflow {
  constructor(
    private readonly productsPage: ProductsPage,
    private readonly cartPage: CartPage,
    private readonly checkoutPage: CheckoutPage
  ) {}

  async purchaseProduct(
    productName: string,
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.productsPage.addProductToCart(productName);

    await this.productsPage.openCart();

    await this.cartPage.checkout();

    await this.checkoutPage.enterCustomerDetails(
      firstName,
      lastName,
      postalCode
    );

    await this.checkoutPage.continueToOverview();

    await this.checkoutPage.finishOrder();
  }
}