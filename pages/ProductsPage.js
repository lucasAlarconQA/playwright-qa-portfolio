const { BasePage } = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('h2.title', { hasText: 'Searched Products' });
    this.productItems = page.locator('.product-image-wrapper');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  productByName(name) {
    return this.productItems.filter({ hasText: name });
  }

  async addToCartByName(name) {
    const product = this.productByName(name).first();
    await product.locator('.productinfo .add-to-cart').click();
  }
}

module.exports = { ProductsPage };
