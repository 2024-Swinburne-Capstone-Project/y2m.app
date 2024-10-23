import { test, expect } from '@playwright/test';
import { getRandomString, getRandomNumber } from '../src/utils/randomData';

test('Search by skill', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('React');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Test Mentor');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by education - 01', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Monash');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by education - 02', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Computer Science');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by education - 03', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Software Development');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by experience - 01', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Atlassian');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});

test('Search by experience - 02', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testadmin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('bnv8ZMQ@kbd8tah2gta');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search...').fill('Software Engineer');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test Mentor')).toBeVisible();
});