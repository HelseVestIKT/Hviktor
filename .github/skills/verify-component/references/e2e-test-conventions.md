# E2E Test Conventions

## Setup

Tests use Playwright with two fixtures:

- `ComponentPage` — Page Object for navigating to `/komponenter/{id}`
- `checkAccessibility` — axe-core accessibility scan

```typescript
import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';
```

## Structure

```typescript
test.describe('ComponentName', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('component-id');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('ComponentName');
  });

  // One test per demo section...

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
```

## Critical: Section Locators

Use **exact CSS attribute selectors** when section titles could be substrings of each other:

```typescript
// ✅ Correct — exact match
const section = page.locator('app-demo-section[title="Variant"]');

// ❌ Risky — "Variant" matches both "Variant" and "Varianter"
const section = componentPage.getSection('Variant');
```

`getSection()` uses `filter({ hasText })` which does substring matching. Prefer the exact `[title="..."]` selector.

## Critical: Wait Before Counting

Always wait for at least one element to be visible before calling `.count()`:

```typescript
// ✅ Correct
const buttons = page.locator('article button.ds-button');
await expect(buttons.first()).toBeVisible();
const count = await buttons.count();

// ❌ Flaky — count may be 0 if page hasn't rendered yet
const count = await buttons.count();
```

## Critical: Text Locators in Code Example Sections

Demo sections show both the rendered component and a "Vis kode" code toggle. Text locators can match inside the code example. Use class-scoped locators:

```typescript
// ✅ Correct — targets only the validation message element
const msg = section.locator('.ds-validation-message', {
  hasText: 'Du må velge minst to alternativ',
});

// ❌ Matches both the message AND the code example text
const msg = section.locator('text=Du må velge minst to alternativ');
```

## Accessibility

Always include an accessibility test as the last test case:

```typescript
test('accessibility check', async ({ page }) => {
  await checkAccessibility(page, ['color-contrast'], 'article');
});
```

- Always pass `'article'` as the include scope
- Always disable `'color-contrast'` — the demo app dark theme causes false positives that are not component bugs
- The helper automatically waits for the `article` element to be visible

## Quality over Quantity

E2E tests must verify the **component contract** against a real browser, not document the demo page's current layout.

### Anti-pattern: Heading / page-load tests

Do not write a test that only checks the demo page heading. It tests routing, not the component.

```typescript
// ❌ WRONG — tests the nav link and router, not the component
test('page loads and renders heading', async () => {
  await expect(componentPage.heading).toHaveText('Button');
});
```

Remove these unless the component itself renders the heading.

### Anti-pattern: Counting elements in a loop

Looping over every element on the page to assert the same class is fragile (breaks when demo changes) and slow.

```typescript
// ❌ WRONG — breaks if one demo example is added or removed
for (let i = 0; i < count; i++) {
  await expect(buttons.nth(i)).toHaveClass(/ds-button/);
}
```

Instead, spot-check one representative element per section, or assert an attribute on the specific instance you care about.

### Anti-pattern: Exact count assertions tied to demo content

Asserting `toHaveCount(3)` or `toBeGreaterThanOrEqual(10)` makes the test break every time the demo page is updated — even when nothing in the component changed.

```typescript
// ❌ WRONG — will fail when a new example is added to the demo
await expect(buttons).toHaveCount(3);
```

Use `toHaveCount` only when count is a defined part of the component contract (e.g. a group that must always render exactly N items).

### What to test instead

Focus on **behavior that a user or consumer can observe**:

- An input sets the right `data-*` attribute in the browser
- An interactive element changes state after a click (toggle, dialog open/close)
- An ARIA attribute is present and correct
- A conditional element appears/disappears based on state
- The accessibility check passes

## What to Test Per Section

For each `<app-demo-section>` in the demo page:

1. Section is visible
2. A representative component instance has the expected attribute/class
3. Interactive behavior works if applicable (click, toggle, open/close)
4. Accessibility check (once per page, at the end)

## Running

```bash
# All browsers
npm run test:e2e

# Chromium only (faster, matches CI)
npx playwright test --project=chromium

# Interactive UI mode
npm run test:e2e:ui
```
