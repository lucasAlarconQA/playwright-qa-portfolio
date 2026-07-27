const { test, expect } = require('../../fixtures/pages.fixture');
const { buildRandomUser } = require('../../data/users');

test.describe('Signup', () => {
  test('registers a new account and deletes it', async ({ homePage, loginPage, signupPage }) => {
    const user = buildRandomUser();

    await homePage.goto();
    await homePage.goToLogin();
    await loginPage.startSignup(user.name, user.email);

    await signupPage.fillAccountInfo(user);
    await signupPage.submit();

    await expect(signupPage.accountCreatedHeading).toBeVisible();
    await signupPage.continueAfterAccountAction();

    await expect(homePage.loggedInAsText).toBeVisible();

    await homePage.deleteAccountLink.click();

    await expect(signupPage.accountDeletedHeading).toBeVisible();
  });
});
