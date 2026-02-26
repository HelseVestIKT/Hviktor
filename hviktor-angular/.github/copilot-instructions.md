# Hviktor Angular AI Guide

## Architecture

- Angular 21 workspace wrapping Norway's [Designsystemet](https://designsystemet.no/) as Angular components/directives. All visual styling comes from `@digdir/designsystemet-css` via `ds-*` CSS classes applied through `host` metadata — there are **no per-component CSS files**.
- **Library** lives in `projects/hviktor/src/`, built to `dist/hviktor` via `npm run build:lib`.
- **Demo app** in `src/` consumes the library as a `file:` dependency from `dist/hviktor`. Rebuild the library first or changes won't appear.
- Exports flow through `projects/hviktor/src/public-api.ts`; each component folder has an `index.ts` with **named** re-exports (not `export *`).

## Naming & scaffolding

- **Always scaffold** new components: `npm run scaffold -- <component|directive> <kebab-name>` — this creates the folder, TypeScript file with JSDoc linking to designsystemet.no, `index.ts` barrel, and auto-updates `public-api.ts`.
- Class prefix: `Hvi` (e.g., `HviButton`, `HviAlert`). Selectors: `hvi-foo` for components, `[hviFoo]` for directives. Directive selectors target native elements: `button[hviButton]`, `input[hviInput]`.
- **Demo pages**: `npm run scaffold:demo -- <name> "<description>"` wires up route, sidebar entry, and README table row.
- **Code examples**: `npm run generate:examples -- <name>` extracts `<app-demo-section>` blocks into standalone example files with source strings for "Vis kode" toggles.

## Component conventions

- **Directive vs component**: use directives when augmenting a native HTML element (button, input, dialog); use components when a template is needed (even if just `<ng-content />`).
- All components/directives are `standalone: true`. No NgModules.
- Use the `host` metadata block for CSS classes, `data-*` attributes, and event listeners — **never** `@HostBinding`/`@HostListener`. Pattern:
  ```ts
  host: {
    class: 'ds-button',
    '[attr.data-size]': 'size',
    '[attr.data-variant]': 'variant',
    '[attr.data-fullwidth]': 'fullWidth ? "" : null',
  }
  ```
- Use `@Input()` decorators with `booleanAttribute`/`numberAttribute` transforms (see `button.directive.ts`, `pagination.component.ts`). The `input()` signal function may appear in newer additions but `@Input` is the dominant pattern.
- Use `inject()` for DI — not constructor parameters. Use `DestroyRef` with `inject()` for cleanup.
- Templates are minimal: most components are thin wrappers using `<ng-content />`. **Always** use the built-in control-flow syntax (`@if`, `@for`, `@switch`, `@defer`) — never the legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). Do not import `CommonModule` or `NgIf`/`NgFor`/`NgSwitch`.
- Each file starts with a JSDoc comment containing `@summary`, `@example`, and `@see` linking to the relevant designsystemet.no page.

## Forms system

The forms layer is the most complex subsystem — understand it before modifying:

- **Field** (`hvi-field`): auto-wires `<label>`, descriptions, and validation messages to inputs via `field-observer.ts` (MutationObserver-based). Generates IDs and `aria-describedby` associations.
- **Validation**: `HviValidation` sets `aria-invalid`, `HviValidationMessage` resolves error messages from reactive form controls by priority.
- **ValidatorBundle**: pairs a `ValidatorFn`, error `key`, and `message` string — eliminates the separation between validator setup and error display. Factory functions: `required()`, `minLength()`, `maxLength()`, `min()`, `max()`, `pattern()`, `email()`.
- **Kits**: convenience import bundles — `HVI_FIELD_KIT`, `HVI_FORMS_KIT`, `HVI_ALL_KIT` for spreading into `imports` arrays.

## Styling rules

- Library styles in `projects/hviktor/src/styles.css` import `@digdir/designsystemet-css` with the "Albert Sans" font. Custom overrides go in scoped `@layer` blocks.
- Demo app uses Tailwind v4 alongside the library stylesheet.
- Components **only** apply `ds-*` classes and `data-*` attributes — the Digdir CSS does all visual rendering.

## Build & test workflow

- `npm run build:lib` → `npm start` (always rebuild library before serving demo).
- Tests: Vitest via Angular CLI builders (`npm test`). App is **zoneless** — use `provideZonelessChangeDetection()` in test setups.
- Lint: `npm run lint` (ESLint flat config). Note: only `projects/hviktor/` is linted — `src/` demo app is excluded.
- Husky pre-commit hooks run lint + format (Prettier) on staged files in `projects/hviktor/`.
- ESLint enforces `inject()` over constructor DI (`@angular-eslint/prefer-inject`).

## Adding a new component end-to-end

1. `npm run scaffold -- component <name>` (or `directive`)
2. Implement in `projects/hviktor/src/<name>/` following existing patterns
3. `npm run build:lib` to verify it compiles
4. `npm run scaffold:demo -- <name> "<description>"` to create demo page
5. Edit the generated demo file to add examples using `<app-demo-section>`
6. `npm run generate:examples -- <name>` to generate code examples
7. `npm test` and `npm run lint` before committing

## Key integration details

- Tabs use `@u-elements/u-tabs` web components; Details uses `@u-elements/u-details`.
- Icons load SVGs at runtime via `HttpClient` with `ViewEncapsulation.None` for inline SVG styling.
- The dialog directive wraps native `<dialog>` — preserve the `(openChange)` event contract.
- Norwegian (Bokmål) is used for all UI text, default messages, and script output.

## Session wrap-up

End every coding session by suggesting a commit command with a descriptive message following [Conventional Commits](https://www.conventionalcommits.org/), e.g.:

```bash
git commit -am "feat(alert): add dismissible alert variant"
```
