const { allure } = require('allure-playwright');
const { test, expect } = require('../../fixtures/pages.fixture');

test.describe('Product search', () => {
  test('finds products by keyword', async ({ productsPage }) => {
    allure.epic('Product Catalog');
    allure.feature('Search');
    allure.severity('normal');

    await allure.step('Go to the products page', async () => {
      await productsPage.goto();
    });

    await allure.step('Search for "Top"', async () => {
      await productsPage.searchProduct('Top');
    });

    await allure.step('Verify search results are shown', async () => {
      await expect(productsPage.searchedProductsTitle).toBeVisible();
      await expect(productsPage.productItems.first()).toBeVisible();
    });
  });
});
