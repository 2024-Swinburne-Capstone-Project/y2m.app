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
  await page.getByPlaceholder('Search...').fill('React');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('Test Mentor');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('Swinburne');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('Bachelor of Engineering');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('Software');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('NAB');
  await page.getByPlaceholder('Search...').press('Enter');
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
  await page.getByPlaceholder('Search...').fill('Software Engineer');
  await page.getByPlaceholder('Search...').press('Enter');
  await expect(page.getByText('Test Mentor')).toBeVisible();
});