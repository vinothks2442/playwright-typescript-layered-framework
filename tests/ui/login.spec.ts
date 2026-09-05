import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Login', () => {
  test('should login successfully with valid credentials', async ({
    loginWorkflow,
    page,
    testContext,
  }) => {
    await loginWorkflow.loginAsStandardUser();

    testContext.set('loggedIn', true);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    expect(testContext.get<boolean>('loggedIn')).toBe(true);
  });

  test('should prevent login for a locked out user', async ({
    loginWorkflow,
    page,
    testContext,
  }) => {
    await loginWorkflow.loginAsLockedOutUser();

    testContext.set('loggedIn', false);

    await expect(
      page.locator('[data-test="error"]')
    ).toContainText('locked out');

    expect(testContext.get<boolean>('loggedIn')).toBe(false);
  });
});