const { allure } = require('allure-playwright');
const { test, expect } = require('../../fixtures/pages.fixture');
const { invalidCredentials } = require('../../data/users');

test.describe('Login', () => {
  test('shows an error message with invalid credentials', async ({ homePage, loginPage }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    allure.severity('critical');

    await allure.step('Go to the login page', async () => {
      await homePage.goto();
      await homePage.goToLogin();
    });

    await allure.step('Submit invalid credentials', async () => {
      await loginPage.login(invalidCredentials.email, invalidCredentials.password);
    });

    await allure.step('Verify the error message is shown', async () => {
      await expect(loginPage.loginErrorMessage).toBeVisible();
    });
  });
});
