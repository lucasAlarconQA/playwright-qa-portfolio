const { allure } = require('allure-playwright');
const { test, expect } = require('../../fixtures/pages.fixture');
const { buildRandomUser } = require('../../data/users');

test.describe('Signup', () => {
  test('registers a new account and deletes it', async ({ homePage, loginPage, signupPage }) => {
    allure.epic('Authentication');
    allure.feature('Signup');
    allure.severity('critical');

    const user = buildRandomUser();

    await allure.step('Start signup with name and email', async () => {
      await homePage.goto();
      await homePage.goToLogin();
      await loginPage.startSignup(user.name, user.email);
    });

    await allure.step('Fill in the account information form', async () => {
      await signupPage.fillAccountInfo(user);
      await signupPage.submit();
    });

    await allure.step('Verify the account was created and continue', async () => {
      await expect(signupPage.accountCreatedHeading).toBeVisible();
      await signupPage.continueAfterAccountAction();
      await expect(homePage.loggedInAsText).toBeVisible();
    });

    await allure.step('Delete the account and verify it was removed', async () => {
      await homePage.deleteAccountLink.click();
      await expect(signupPage.accountDeletedHeading).toBeVisible();
    });
  });
});
