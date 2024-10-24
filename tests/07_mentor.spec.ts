import { test, expect } from '@playwright/test';
import { getRandomString, getRandomNumber } from '../src/utils/randomData';

test('Verify Mentee Connection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testMentor@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bef*TPU_kqa5ufe8cen');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('div').filter({ hasText: /^My MenteesFind Mentors1View More Details$/ }).getByRole('link').click();
  await page.getByRole('tab', { name: 'My Mentees' }).click();
  await expect(page.getByRole('heading', { name: 'Test Mentee' })).toBeVisible();
});
