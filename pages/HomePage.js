const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToLogin() {
    await this.signupLoginLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }
}

module.exports = { HomePage };
