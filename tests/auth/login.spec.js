const { test, expect } = require('../../fixtures/pages.fixture');
const { invalidCredentials } = require('../../data/users');

test.describe('Login', () => {
  test('shows an error message with invalid credentials', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.goToLogin();

    await loginPage.login(invalidCredentials.email, invalidCredentials.password);

    await expect(loginPage.loginErrorMessage).toBeVisible();
  });
});
