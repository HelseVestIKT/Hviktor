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

**Kvalitet foran kvantitet:** Test logikk som faktisk kan feile — ikke én test per enum-verdi, og ikke trivielle smoke-tester (`should create`, statisk host-class). Se [unit-test-conventions.md](../.github/skills/verify-component/references/unit-test-conventions.md).

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

  // ✅ Tester null-state for alle valgfrie inputs i én test
  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-color')).toBeNull();
  });

  // ✅ Én representativ verdi bekrefter at bindingen fungerer
  it('should reflect color input as data-color attribute', () => {
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

For **direktiver** (f.eks. `HviButton`): lag dedikerte host-komponenter per variant, sett verdier i template eller _før_ første `detectChanges()`.

For **logikk** (events, interaktivitet, mapping-regler): se `dialog.directive.spec.ts` og `table.directive.spec.ts` som referanser.

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

  // ✅ Tester komponentens attributter i nettleseren
  test('renders color variants with correct data-color attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-alert').first()).toHaveAttribute('data-color', 'info');
  });

  // ✅ Alltid sist
  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
```

**Unngå:** heading/page-load-tester, element-telling i løkke, `toHaveCount` knyttet til antall demo-eksempler. Se [e2e-test-conventions.md](../.github/skills/verify-component/references/e2e-test-conventions.md).

## Demo-status

Oppdater `unitTested` og `e2eTested` i `demo-components.ts` når tester er beståtte — viser ✓ i sidemenyen.
