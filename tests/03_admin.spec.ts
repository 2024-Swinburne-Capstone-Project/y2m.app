import { test, expect } from '@playwright/test';
import { getRandomString, getRandomNumber } from '../src/utils/randomData';

test('Admin media release', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Quick Links' }).hover();
  await page.getByRole('link', { name: 'Media Centre' }).click();
  await page.getByRole('button', { name: 'Add New Media Release' }).click();
  await page.getByLabel('Title').fill(getRandomString() + "test");
  await page.getByLabel('Description').fill(getRandomString() + "test");
  await page.getByLabel('Link').fill(getRandomString() + "test");
  await page.getByLabel('Image').setInputFiles('tests/testdata/testImage.png');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save changes' }).click();
});
