import AxeBuilder from '@axe-core/playwright';
import { type Page, expect } from '@playwright/test';

/**
 * Runs an axe accessibility scan on the current page.
 * Asserts that there are no violations.
 */
export async function checkAccessibility(
  page: Page,
  disableRules: string[] = [],
  include?: string,
) {
  if (include) {
    await expect(page.locator(include).first()).toBeVisible();
  }
  let builder = new AxeBuilder({ page }).disableRules(disableRules);
  if (include) {
    builder = builder.include(include);
  }
  const results = await builder.analyze();

  expect(
    results.violations,
    results.violations
      .map((v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`)
      .join('\n'),
  ).toHaveLength(0);
}
