---
name: verify-component
description: 'Verify an hviktor-angular component against its Designsystemet original. Use when: reviewing component parity, adding JSDoc, writing unit tests, writing E2E tests, updating demo codeTested badge. Triggers: verify component, component audit, test component, review component.'
argument-hint: 'Component name (kebab-case) and optionally a URL or paste of the Designsystemet docs'
---

# Verify Component

End-to-end workflow for verifying an hviktor-angular component matches its Designsystemet original, has complete JSDoc, passing tests, and updated demo status.

## When to Use

- Auditing a component for feature parity with designsystemet.no
- Adding or fixing JSDoc documentation on library components
- Writing unit tests and E2E tests for a component
- Updating the `codeTested` badge in the demo app

## Input

The user provides:

1. **Component name** (kebab-case, e.g. `button`, `chip`, `alert`)
2. **Designsystemet reference** (optional) — pasted docs content or a URL

## Gathering the Designsystemet Reference

Use these sources in priority order — gather from **all available** to build the complete picture:

### Source 1: CSS data-attribute API (always available, most reliable)

Extract supported `data-*` attributes directly from the CSS file:

```bash
grep -oP 'data-[a-z-]+' node_modules/@digdir/designsystemet-css/dist/src/<component>.css | sort -u
```

This is the **definitive** source for which `data-*` attributes the CSS responds to (size, variant, color, etc.). Every attribute listed here MUST have a corresponding `@Input()` in the hviktor wrapper.

### Source 2: Web component manifest (when a web component exists)

Check the custom elements manifest for component attributes and fields:

```bash
node -e "
const d = require('./node_modules/@digdir/designsystemet-web/dist/custom-elements.json');
d.modules.forEach(m => {
  (m.declarations || []).forEach(decl => {
    if (decl.tagName?.includes('<component>')) {
      console.log(decl.name, '| Tag:', decl.tagName);
      (decl.attributes || []).forEach(a => console.log('  attr:', a.name, '|', a.type?.text));
      (decl.members || []).filter(x => x.kind === 'field' && x.privacy !== 'private')
        .forEach(f => console.log('  field:', f.name, '|', f.type?.text));
    }
  });
});
"
```

Not all components have web component equivalents — this is supplementary.

### Source 3: Designsystemet.no docs (for prose, examples, accessibility guidance)

Fetch the code page for HTML/CSS usage and the overview for component behavior:

- `https://designsystemet.no/no/components/docs/<slug>/code`
- `https://designsystemet.no/no/components/docs/<slug>/overview`
- `https://designsystemet.no/no/components/docs/<slug>/accessibility`

The code page shows HTML structure, `data-*` attributes, and CSS variables. The accessibility page documents ARIA requirements.

Note: The fetched content includes cookie banners and navigation — focus on the component-specific sections.

### Source 4: User-provided content

If the user pastes docs or provides a URL not matching the patterns above, use that directly.

## Procedure

Use the todo list tool to track progress through these steps. Mark each step in-progress/completed as you go.

### Step 1 — Read the original

Gather the component's API from the sources described above. Start with the CSS `data-*` extraction (Source 1) since it's always available and authoritative. Then supplement with the docs pages and/or web component manifest.

Build a summary of:

- **CSS class**: `ds-*` class name
- **data-\* attributes**: From CSS grep — each one needs an `@Input()`
- **ARIA attributes**: From accessibility docs
- **Sub-components**: From overview/code docs
- **Composition patterns**: What native elements are used, nesting rules

### Step 2 — Read the hviktor implementation

Read ALL files in `projects/hviktor/src/<component>/`:

- Every `.ts` file (directives, components)
- The `index.ts` barrel file
- The demo page at `src/app/demo/pages/components/<component>/`

Also check the component entry in `src/app/demo/demo-components.ts`.

### Step 3 — Compare and fix implementation gaps

Compare the Designsystemet original with the hviktor implementation. List all differences:

- **Missing inputs**: Props that exist in the original but not in hviktor
- **Missing variants**: Sub-components/directives that don't exist yet
- **Host binding gaps**: `ds-*` classes or `data-*` attributes not mapped
- **Boolean/number transforms**: Missing `booleanAttribute` or `numberAttribute` transforms

Present the gap list to the user and **ask before implementing**. Some props may be intentionally omitted. Once confirmed, add the missing inputs/variants following the patterns in [component conventions](./references/component-conventions.md).

### Step 4 — Update JSDoc

Every component/directive file MUST have a JSDoc block at the top of the class with:

````typescript
/**
 * @summary One-line English description of what the component does.
 *
 * @example Descriptive label for the example
 * ```html
 * <element hviDirective prop="value">Content</element>
 * ```
 *
 * @example Another variant
 * ```html
 * <element hviDirective otherProp>Content</element>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/<component-slug>}
 */
````

Rules:

- All text in **English**
- Every `@Input()` must have a JSDoc comment
- `@example` tags must have a descriptive label (not just "Example")
- `@see` must use `{@link URL}` syntax
- Include examples for each major variant/use-case

### Step 5 — Fix index.ts barrel

Ensure `index.ts` uses **named exports**, not `export *`:

```typescript
// ✅ Correct
export { HviButton } from './button.directive';

// ❌ Wrong
export * from './button.directive';
```

### Step 6 — Update demo page (if needed)

If implementation changes were made, update the demo page:

1. Edit `src/app/demo/pages/components/<component>/<component>-demo.ts`
2. Run `npm run generate:examples -- <component>` to regenerate code examples

### Step 7 — Write unit tests

Create `projects/hviktor/src/<component>/<component>.component.spec.ts` (or `.directive.spec.ts`).

Follow the patterns in [unit test conventions](./references/unit-test-conventions.md).

**Run tests:**

```bash
npm test
```

All tests must pass before proceeding.

### Step 8 — Write E2E tests

Create `e2e/components/<component>.spec.ts`.

Follow the patterns in [E2E test conventions](./references/e2e-test-conventions.md).

**Run tests:**

```bash
npm run test:e2e
```

### Step 9 — Update demo status

In `src/app/demo/demo-components.ts`, set `codeTested: true` on the component entry.

### Step 10 — Lint and final check

```bash
npm run lint
npm test
```

### Step 11 — Suggest commit

Suggest a conventional commit command:

```bash
git commit -am "test(<component>): add JSDoc, unit tests, and E2E tests"
```

## Checklist

Before marking complete, verify:

- [ ] All Designsystemet props/variants are implemented
- [ ] JSDoc on every exported class with `@summary`, `@example`, `@see`
- [ ] JSDoc on every `@Input()`
- [ ] `index.ts` uses named exports
- [ ] Unit tests cover real logic: default null-state, representative passthrough values, custom mapping rules, boolean toggles, events, and interactive behavior — NOT one test per enum value, NOT trivial `should create`
- [ ] E2E tests cover component behavior in browser: attribute presence, interactive state changes, accessibility — NOT heading/page-load, NOT exact element counts tied to demo layout
- [ ] `codeTested: true` set in demo-components.ts
- [ ] `npm test` passes
- [ ] `npm run lint` passes
