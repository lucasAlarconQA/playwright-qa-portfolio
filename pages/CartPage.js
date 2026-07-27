const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartRows = page.locator('#cart_info_table tbody tr');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  rowByProductName(name) {
    return this.cartRows.filter({ hasText: name });
  }
}

module.exports = { CartPage };
