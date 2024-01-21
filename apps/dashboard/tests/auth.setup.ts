import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Continue with Google');

    await page.getByLabel('Email or phone').fill('email');
    await page.click('text=Next');
    await page.getByLabel('Enter your password').fill('password');
    await page.click('text=Next');

    await page.waitForURL('/dashboard');

    await expect(page).toHaveURL('/dashboard');

    await page.context().storageState({ path: authFile });
});