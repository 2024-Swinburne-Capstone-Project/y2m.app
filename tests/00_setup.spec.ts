import { test, expect } from '@playwright/test';

test('login with mentor', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').fill('testMentor@gmail.com');
  await page.getByLabel('Password').fill('bef*TPU_kqa5ufe8cen');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('div').filter({ hasText: /^Toggle theme$/ }).locator('img').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});

test('login with mentee', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').fill('testMentee@gmail.com');
  await page.getByLabel('Password').fill('xpu-xya7erp9PQX*pnj');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('div').filter({ hasText: /^Toggle theme$/ }).locator('img').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});