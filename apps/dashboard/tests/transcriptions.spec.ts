import { test, expect } from '@playwright/test';

test('transcription page exists', async ({ page }) => {
    await page.goto('/dashboard/transcription');
    await expect(page).toBeDefined();
});

test('transcription page has upload button', async ({ page }) => {
    await page.goto('/dashboard/transcription');
    await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
});

test('transcription page has upload file input', async ({ page }) => {
    await page.goto('/dashboard/transcription');
    await expect(page.getByLabel('Upload file')).toBeVisible();
});

test('transcriptions page has sign out button', async ({ page }) => {
    await page.goto('/dashboard/transcription');
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
}
);

test('transcriptions page hase transcription text output area', async ({ page }) => {
    await page.goto('/dashboard/transcription');
    await expect(page.getByPlaceholder('Your transcription will be')).toBeVisible();
}
);