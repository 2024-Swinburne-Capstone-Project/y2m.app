import { test, expect } from '@playwright/test';
import { getRandomString, getRandomNumber } from '../src/utils/randomData';

test('My Development Areas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testMentee@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('xpu-xya7erp9PQX*pnj');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Development Hub' }).click();
  const randomDevelopmentArea = getRandomString();
  await page.getByPlaceholder('Enter a new development area').fill(randomDevelopmentArea);
  await page.getByRole('button', { name: 'Add' }).first().click();
  await expect(page.getByText(randomDevelopmentArea)).toBeVisible();
  await page.locator(`div:has-text("${randomDevelopmentArea}") div:has-text('×')`).first().click();
  });

  test('Add Milestone', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('testMentee@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('xpu-xya7erp9PQX*pnj');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('link', { name: 'Development Hub' }).click();
    await page.getByRole('button', { name: 'Add Milestone' }).click();
    await page.getByLabel('Title').fill(getRandomString());
    await page.getByRole('combobox').click();
    await page.getByLabel('In Progress').click();
    await page.getByLabel('End Date').fill('2025-10-25');
    await page.getByRole('button', { name: 'Add Milestone' }).click();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    });