import { test, expect } from '@playwright/test';

test('Validate Header and Footer', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('banner').getByRole('link', { name: 'You2Mentor' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Knowledge Hub' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Enterprise Solutions' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Legal' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get in Touch' })).toBeVisible();
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'You2Mentor' })
  ).toBeVisible();
  await expect(page.getByText('© 2024 You2Mentor. All rights')).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({
        hasText: /^© 2024 You2Mentor\. All rights reserved\.Privacy PolicyTerms of Service$/,
      })
      .locator('div')
      .getByRole('link')
      .first()
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({
        hasText: /^© 2024 You2Mentor\. All rights reserved\.Privacy PolicyTerms of Service$/,
      })
      .locator('div')
      .getByRole('link')
      .nth(1)
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({
        hasText: /^© 2024 You2Mentor\. All rights reserved\.Privacy PolicyTerms of Service$/,
      })
      .locator('div')
      .getByRole('link')
      .nth(2)
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({
        hasText: /^© 2024 You2Mentor\. All rights reserved\.Privacy PolicyTerms of Service$/,
      })
      .locator('div')
      .getByRole('link')
      .nth(3)
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({
        hasText: /^© 2024 You2Mentor\. All rights reserved\.Privacy PolicyTerms of Service$/,
      })
      .locator('div')
      .getByRole('link')
      .nth(4)
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
});

test('Validate Home', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'What Do We Offer?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Who We Are' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What You Can Do' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why You Should Be a Mentor' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why You Should Have a Mentor' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Testimonials' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Acknowledgement of Country' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText(
    'You2Mentor acknowledges Aboriginal and Torres Strait Islander peoples as the traditional custodians of our land - Australia. We pay our respect to them and their cultures and to the elders past, present and emerging. Wurundjeri Woi Wurrung and Bunurong Boon Wurrung peoples of the Eastern Kulin are the traditional custodians of the land on which You2Mentor office stands.'
  );
});

test('validate About', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'At You2Mentor, we believe' }).nth(2)
  ).toBeVisible();
  await expect(page.getByText('According to Gallup, only 37')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our Core Values' })).toBeVisible();
});

test('Validate Knowleduge Hub', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Knowledge Hub' }).click();
  await expect(page.getByRole('heading', { name: 'Knowledge Hub' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Videos' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Blog' })).toBeVisible();
});

test('Validate Enterprise Solutions', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Enterprise Solutions' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'Enterprise SolutionsCreate' }).nth(2)
  ).toBeVisible();
  await expect(
    page.locator('section').filter({ hasText: 'With You2Mentor, running your' }).locator('div')
  ).toBeVisible();
  await expect(
    page.locator('div').filter({ hasText: 'Get in TouchFirst Name *Last' }).nth(2)
  ).toBeVisible();
});

test('Validate Legal', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Legal' }).click();
  await expect(page.getByRole('heading', { name: 'Privacy Policy', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Privacy Policy' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Privacy Policy' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'We Respect Your Privacy' })).toBeVisible();
  await expect(page.getByRole('button', { name: '2. Collection of personal' })).toBeVisible();
  await expect(page.getByRole('button', { name: '3. How we collect your' })).toBeVisible();
  await expect(page.getByRole('button', { name: '4. Use of your personal' })).toBeVisible();
  await expect(page.getByRole('button', { name: '5. Disclosure of your' })).toBeVisible();
  await expect(page.getByRole('button', { name: '6. Security of your personal' })).toBeVisible();
  await expect(page.getByRole('button', { name: '7. Access to your personal' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Complaints about privacy' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Changes to Privacy Policy' })).toBeVisible();
  await page.getByRole('tab', { name: 'Terms & Conditions' }).click();
  await expect(page.getByRole('tab', { name: 'Terms & Conditions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'User Conduct' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Use of Content' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Feedback' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Use and Copyright' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Personal Security Information' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confidentiality' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Disclaimer and limitation of' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Applicable Law' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Withdrawing access to Portal' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Modifications to these terms' })).toBeVisible();
});

test('Validate Get in Touch', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get in Touch' }).click();
  await expect(page.getByRole('img', { name: 'Get in Touch' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Most Popular Questions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'How to signup as a mentor?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Can mentors be mentees?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Why mentees can rate mentors?' })).toBeVisible();
  await expect(page.getByRole('button', { name: '4.When will video' })).toBeVisible();
  await expect(page.getByRole('button', { name: "5. Why can't I update my" })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Hero Section' })).toBeVisible();
  await expect(
    page.locator('div').filter({ hasText: 'Visit UsCollins Street Tower' }).nth(2)
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Get in Touch$/ })
      .nth(1)
  ).toBeVisible();
});
