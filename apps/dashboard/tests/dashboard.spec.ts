import { test, expect } from '@playwright/test';

test('has gmail sigin button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
});

test('dashboard exists', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toBeDefined();
});

test('dashboard has Transcriptions anchor', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('link', { name: 'Transcriptions' }).first()).toBeVisible();
});

test('dashboard has sign out button', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});