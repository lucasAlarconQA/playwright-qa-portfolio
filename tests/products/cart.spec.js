const { allure } = require('allure-playwright');
const { test, expect } = require('../../fixtures/pages.fixture');

test.describe('Cart', () => {
  test('adds a product to the cart', async ({ productsPage, cartPage }) => {
    allure.epic('Product Catalog');
    allure.feature('Cart');
    allure.severity('critical');

    const productName = 'Blue Top';

    await allure.step(`Add "${productName}" to the cart from the products page`, async () => {
      await productsPage.goto();
      await productsPage.addToCartByName(productName);
      await productsPage.continueShoppingButton.click();
    });

    await allure.step('Verify the product is in the cart', async () => {
      await cartPage.goto();
      await expect(cartPage.rowByProductName(productName)).toBeVisible();
    });
  });
});
