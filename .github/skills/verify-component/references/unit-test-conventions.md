# Unit Test Conventions

## Setup

Use `setupTestBed()` from `../testing/test-utils`. It configures TestBed with `provideZonelessChangeDetection()`.

```typescript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
```

## Critical: Zoneless Change Detection

This app uses **zoneless** change detection. Direct mutation of `@Input` properties after initial `detectChanges()` causes `ExpressionChangedAfterItHasBeenCheckedError`.

### Pattern: Dedicated Host Components

Create a **separate host component per variant/configuration**. Set input values in the template, not programmatically:

```typescript
// ✅ Correct — value set in template before first CD
@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton variant="primary">Click</button>',
})
class PrimaryHost {}

// ✅ Correct — binding with host property set BEFORE first detectChanges()
@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [variant]="variant">Btn</button>',
})
class VariantHost {
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
}

// Then in test:
const f = TestBed.createComponent(VariantHost);
f.componentInstance.variant = 'secondary'; // set BEFORE first detectChanges
f.detectChanges();
```

```typescript
// ❌ WRONG — mutating after initial CD
fixture.detectChanges();
fixture.componentInstance.removable = false; // ExpressionChangedAfterItHasBeenCheckedError!
fixture.detectChanges();
```

### Pattern: Components (not directives)

For components that can be created directly:

```typescript
beforeEach(async () => {
  await setupTestBed({ imports: [HviAlert] });
  fixture = TestBed.createComponent(HviAlert);
  element = fixture.nativeElement;
  fixture.detectChanges();
});
```

Use `fixture.componentRef.setInput('name', value)` to change inputs safely:

```typescript
fixture.componentRef.setInput('color', 'danger');
fixture.detectChanges();
```

## Quality over Quantity

Tests must catch regressions in **actual logic**. More tests is not better if the extras can never fail independently.

### Anti-pattern: Enum exhaustion

Never write one `it()` per enum value for the same `@Input()`. Angular's `[attr.x]='y'` binding either works or it doesn't — proving it works for `'primary'` does not require proving it also works for `'secondary'` and `'tertiary'`.

```typescript
// ❌ WRONG — 6 tests that test the same one-liner binding
it('should set data-color to info', ...)
it('should set data-color to success', ...)
it('should set data-color to warning', ...)
it('should set data-color to danger', ...)
it('should set data-color to accent', ...)
it('should set data-color to neutral', ...)

// ✅ Correct — one representative value confirms the binding works
it('should reflect color input as data-color attribute', () => {
  fixture.componentRef.setInput('color', 'danger');
  fixture.detectChanges();
  expect(element.getAttribute('data-color')).toBe('danger');
});
```

If there is **custom mapping logic** (e.g. `'center'` input → attribute omitted, `'left'/'right'` → attribute set), each mapping rule deserves its own test. But if the rule is just "value passes through", one test is enough.

### Anti-pattern: Trivial smoke tests

Skip `'should create'` tests — TypeScript compilation already guarantees the class exists and can be instantiated. Skip standalone `'should have ds-xxx host class'` tests — a static `host: { class: 'ds-x' }` entry can only break if someone deletes the property, which would also break the component visually.

```typescript
// ❌ WRONG — can never fail in practice
it('should create', () => {
  expect(fixture.componentInstance).toBeTruthy();
});
it('should have ds-button host class', () => {
  expect(element.classList.contains('ds-button')).toBe(true);
});
```

The exception: if the host class is **computed** or conditional, it is worth testing.

### Anti-pattern: Combined-attribute mega-tests

A test that sets 5 inputs and checks 5 attributes simultaneously gives a useless stacktrace when it fails. Combine related attributes only when the interaction between them is what you're testing.

## What to Test

Focus on cases where **the component has logic** that could be wrong:

| Test Case                              | What to Assert                                                 |
| -------------------------------------- | -------------------------------------------------------------- |
| Default state (null/absent attributes) | `getAttribute('data-*')` is `null` for all optional inputs     |
| Representative value for passthrough   | One value confirms `[attr.x]='x'` binding works                |
| Custom mapping rule per value          | Each rule that transforms or conditionally sets an attribute   |
| Boolean true / false                   | `getAttribute('data-flag')` is `''` / `null`                   |
| ARIA attributes                        | `getAttribute('aria-*')` is correct string or `null`           |
| Content projection                     | Host with child content → `textContent` contains expected text |
| Role (if set statically)               | `getAttribute('role')`                                         |
| Event emission                         | Output emits correct value when action triggers it             |
| Idempotency / guard logic              | Calling open twice doesn't emit twice; etc.                    |
| Interactive behavior (click, toggle)   | State changes correctly; blocked when it should be blocked     |

## Naming

- One `describe()` block per concern (e.g. `HviButton variant`, `HviButton open/close`)
- `it()` descriptions should state _what the component does_, not just what attribute it sets: `should not emit openChange when already open` instead of `should set aria-busy to true`

## Running

```bash
npm test
```
