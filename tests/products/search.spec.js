const { test, expect } = require('../../fixtures/pages.fixture');

test.describe('Product search', () => {
  test('finds products by keyword', async ({ productsPage }) => {
    await productsPage.goto();

    await productsPage.searchProduct('Top');

    await expect(productsPage.searchedProductsTitle).toBeVisible();
    await expect(productsPage.productItems.first()).toBeVisible();
  });
});
