import { expect, test } from '@playwright/test';

test('page has expected heading', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.getByRole('heading', {
			name: 'Rapidly Enhance and Name Assignments for Maximum Efficiency',
		}),
	).toBeVisible();
});

test('produces expected output', async ({ page }) => {
	await page.goto('/');

	const today = new Date().toISOString().split('T')[0];

	await page.getByText('First Name').click();
	await page.getByLabel('First Name').fill('playwright');
	await page.getByLabel('Last Name').fill('test');
	await page.getByLabel('Course').fill('course 1');
	await page.getByLabel('Assignment Shortcode').fill('ABC');
	await page.getByLabel('File Type').fill('TYPE');
	const output = await page.getByTestId('output-text').textContent();

	const expectedText = `${today}_course-1_abc_playwright-test_type`;
	expect(output).toBe(expectedText);
	await page.getByTestId('output-field').click();

	const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
	expect(clipboardText).toBe(expectedText);
});
