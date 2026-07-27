const { test, expect } = require('../../fixtures/pages.fixture');

test.describe('Cart', () => {
  test('adds a product to the cart', async ({ productsPage, cartPage }) => {
    const productName = 'Blue Top';

    await productsPage.goto();
    await productsPage.addToCartByName(productName);
    await productsPage.continueShoppingButton.click();

    await cartPage.goto();

    await expect(cartPage.rowByProductName(productName)).toBeVisible();
  });
});
