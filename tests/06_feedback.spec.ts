import { test, expect } from '@playwright/test';
import { getRandomString, getRandomNumber } from '../src/utils/randomData';

// You will have to reset and reseed the local database for each test run
// Have to disable this test because you can only give feedback once, won't work on live server
// test('Give Feedback', async ({ page }) => {
//   await page.goto('/');
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByLabel('Email address').click();
//   await page.getByLabel('Email address').fill('testMentee@gmail.com');
//   await page.getByLabel('Password').click();
//   await page.getByLabel('Password').fill('xpu-xya7erp9PQX*pnj');
//   await page.getByRole('button', { name: 'Continue', exact: true }).click();
//   await page.getByRole('link', { name: 'View More Details' }).first().click();
//   await page.getByRole('link', { name: 'View Profile' }).click();
//   await page.getByRole('button', { name: 'Give Feedback' }).click();
//   const feedbackText = getRandomString();
//   await page.getByPlaceholder('Write your feedback here...').fill(feedbackText);
//   await page.getByRole('spinbutton').click();
//   await page.getByRole('spinbutton').fill('3');
//   await page.getByRole('combobox').click();
//   await page.getByLabel('React').click();
//   await page.getByRole('button', { name: 'Submit Feedback' }).click();
//   await page.reload();
//   await page.waitForTimeout(5000);
//   await expect(page.locator('body > div.flex.min-h-screen.flex-col > main > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mb-5.overflow-hidden > div.p-6.relative.px-6.pb-6.pt-0 > div.flex.flex-col.items-center.sm\\:flex-row.sm\\:items-end.sm\\:space-x-5 > div.mt-4.text-center.sm\\:mt-0.sm\\:pt-1.sm\\:text-left > div > div > div > div > svg:nth-child(3)')).toHaveAttribute('class', 'lucide lucide-star fill-[#e9be0f] text-[#e9be0f]');
//   await expect(page.locator('body > div.flex.min-h-screen.flex-col > main > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mb-5.overflow-hidden > div.p-6.relative.px-6.pb-6.pt-0 > div.flex.flex-col.items-center.sm\\:flex-row.sm\\:items-end.sm\\:space-x-5 > div.mt-4.text-center.sm\\:mt-0.sm\\:pt-1.sm\\:text-left > div > div > div > div > svg:nth-child(4)')).toHaveAttribute('class', 'lucide lucide-star text-gray-300');
//   await expect(page.locator('p.font-semibold')).toHaveText('Test Mentee');
//   await expect(page.locator('p.mb-4.text-muted-foreground')).toHaveText(feedbackText);
// });

test('Verify Feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('testMentee@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('xpu-xya7erp9PQX*pnj');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'View More Details' }).first().click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  await expect(page.locator('body > div.flex.min-h-screen.flex-col > main > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mb-5.overflow-hidden > div.p-6.relative.px-6.pb-6.pt-0 > div.flex.flex-col.items-center.sm\\:flex-row.sm\\:items-end.sm\\:space-x-5 > div.mt-4.text-center.sm\\:mt-0.sm\\:pt-1.sm\\:text-left > div > div > div > div > svg:nth-child(3)')).toHaveAttribute('class', 'lucide lucide-star fill-[#e9be0f] text-[#e9be0f]');
  await expect(page.locator('body > div.flex.min-h-screen.flex-col > main > div > div > div.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.mb-5.overflow-hidden > div.p-6.relative.px-6.pb-6.pt-0 > div.flex.flex-col.items-center.sm\\:flex-row.sm\\:items-end.sm\\:space-x-5 > div.mt-4.text-center.sm\\:mt-0.sm\\:pt-1.sm\\:text-left > div > div > div > div > svg:nth-child(4)')).toHaveAttribute('class', 'lucide lucide-star text-gray-300');
  await expect(page.locator('p.font-semibold')).toHaveText('Test Mentee');
  await expect(page.locator('p.mb-4.text-muted-foreground')).toHaveText("Great mentor for learning React");
});