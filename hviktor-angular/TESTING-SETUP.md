# Testing

**Vitest** for enhetstester, **Playwright** for E2E-tester.

## Kommandoer

| Kommando                                      | Beskrivelse                          |
| --------------------------------------------- | ------------------------------------ |
| `npm test -- --project hviktor --watch=false` | Enhetstester for hviktor-biblioteket |
| `npm run test:e2e`                            | E2E-tester (Playwright)              |
| `npm run test:e2e:ui`                         | E2E-tester i interaktivt UI-modus    |
| `npm run test:all`                            | Enhetstester + E2E sekvensielt       |

## Enhetstester (Vitest)

Testfiler ligger ved siden av komponentene:

```
projects/hviktor/src/
  alert/
    alert.component.ts
    alert.component.spec.ts
  testing/
    test-utils.ts            ← setupTestBed helper
```

### Mønster

Bruk `setupTestBed()` fra `../testing/test-utils` — den konfigurerer `TestBed` med `provideZonelessChangeDetection()`.

Bruk `fixture.componentRef.setInput('name', value)` for å sette inputs (unngår `ExpressionChangedAfterItHasBeenCheckedError`).

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviAlert } from './alert.component';

describe('HviAlert', () => {
  let fixture: ComponentFixture<HviAlert>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviAlert] });
    fixture = TestBed.createComponent(HviAlert);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have ds-alert host class', () => {
    expect(element.classList.contains('ds-alert')).toBe(true);
  });

  it('should set data-color', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });
});
```

For **content projection**, bruk en testvertskomponent:

```typescript
@Component({
  standalone: true,
  imports: [HviAlert],
  template: '<hvi-alert>Innhold</hvi-alert>',
})
class TestHost {}
```

For **direktiver** (f.eks. `HviButton`): `<button hviButton variant="primary">Klikk</button>`.

## E2E-tester (Playwright)

```
e2e/
  fixtures/
    component-page.ts    ← Page Object for /komponenter/{id}
    axe-helper.ts        ← axe-core tilgjengelighetssjekk
  components/
    alert.spec.ts        ← E2E-test per komponent
```

```typescript
import { test, expect } from '@playwright/test';
import { ComponentPage } from '../fixtures/component-page';
import { checkAccessibility } from '../fixtures/axe-helper';

test.describe('Alert', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('alert');
  });

  test('page loads', async () => {
    await expect(componentPage.heading).toHaveText('Alert');
  });

  test('accessibility', async ({ page }) => {
    await checkAccessibility(page);
  });
});
```

## Demo-status

Oppdater `unitTested` og `e2eTested` i `demo-components.ts` når tester er beståtte — viser ✓ i sidemenyen.
