# Fremgangsmåte: Teste en komponent

Denne guiden beskriver steg-for-steg hvordan du tester en ny komponent i hviktor-angular. Bruk Alert som referanseimplementasjon.

## 1. Les komponenten

Åpne komponentfilen (`projects/hviktor/src/<komponent>/<komponent>.component.ts`) og noter:

- **Selector** (f.eks. `hvi-avatar`)
- **Host class** (f.eks. `ds-avatar`)
- **Host bindings** (`role`, `aria-label`, `data-*`-attributter)
- **Inputs** (alle `@Input()` / `input()`)
- **Outputs/Events** (alle `@Output()` / `output()`)
- **Spesielt** (tilgjengelighetsrelatert, content projection, etc.)

## 2. Les demo-siden

Åpne `src/app/demo/pages/components/<komponent>/<komponent>-demo.ts` og noter:

- **Seksjoner** som vises (varianter, størrelser, etc.)
- **Interaktivitet** (statisk visning vs. dynamisk oppførsel)
- **Hva er verdt å E2E-teste?** (at varianter rendres, at komponenten fungerer i kontekst)

## 3. Skriv unit-test

Opprett `projects/hviktor/src/<komponent>/<komponent>.component.spec.ts`.

### Hva skal testes?

| Hva                    | Hvordan                                                      |
| ---------------------- | ------------------------------------------------------------ |
| Opprettes              | `TestBed.createComponent(Komponent)`                         |
| Host class             | `element.classList.contains('ds-komponent')`                 |
| Role (hvis relevant)   | `element.getAttribute('role') === 'img'`                     |
| Hver input → attributt | `setInput('color', 'brand1')` → `getAttribute('data-color')` |
| Null som default       | Input ikke satt → attributt er `null`                        |
| Content projection     | Testvert med innhold inni `<hvi-komponent>`                  |
| Snapshot               | Testvert med typisk bruk → `toMatchSnapshot()`               |

### Tommelregler

- Én `it()` per input-binding
- Én for defaults
- Én for host class/role
- Én for content projection (hvis relevant)
- Én snapshot-test

### Maler

**Enkel komponent (uten content projection):**

```typescript
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { MinKomponent } from './min-komponent.component';

describe('MinKomponent', () => {
  beforeEach(() => setupTestBed({ imports: [MinKomponent] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MinKomponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have host class', () => {
    const fixture = TestBed.createComponent(MinKomponent);
    expect(fixture.nativeElement.classList.contains('ds-komponent')).toBe(true);
  });

  it('should map input to attribute', () => {
    const fixture = TestBed.createComponent(MinKomponent);
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('primary');
  });
});
```

**Komponent med content projection (krever testvert):**

```typescript
@Component({
  template: `<hvi-komponent>Innhold</hvi-komponent>`,
  imports: [MinKomponent],
})
class TestHost {}

// ...
beforeEach(() => setupTestBed({ imports: [MinKomponent, TestHost] }));

it('should project content', () => {
  const fixture = TestBed.createComponent(TestHost);
  fixture.detectChanges();
  const el = fixture.nativeElement.querySelector('hvi-komponent');
  expect(el.textContent).toContain('Innhold');
});
```

**Direktiver (f.eks. `HviButton`):**

```typescript
@Component({
  template: `<button hviButton variant="primary">Klikk</button>`,
  imports: [HviButton],
})
class TestHost {}
```

### Tips

- Bruk `fixture.componentRef.setInput('name', value)` i stedet for `fixture.componentInstance.name = value` for å unngå `ExpressionChangedAfterItHasBeenCheckedError` med zoneless change detection.
- Oppdater snapshots med `npm test -- --project hviktor --watch=false --update` ved tilsiktede endringer.

## 4. Kjør unit-test

```bash
npm test -- --project hviktor --watch=false
```

Verifiser at alle tester passerer før du går videre.

## 5. Skriv E2E-test

Opprett `e2e/components/<komponent>.spec.ts`. Bruk `ComponentPage`:

| Hva               | Hvordan                                         |
| ----------------- | ----------------------------------------------- |
| Siden laster      | `heading.toHaveText('Komponent')`               |
| Varianter rendres | Finn elementer, sjekk antall                    |
| Seksjoner         | Bruk `componentPage.getSection('Seksjonsnavn')` |
| I kontekst        | Verifiser at komponenten fungerer i komposisjon |
| Tilgjengelighet   | `checkAccessibility(page)`                      |

### Mal

```typescript
import { test, expect } from '@playwright/test';
import { ComponentPage } from '../fixtures/component-page';
import { checkAccessibility } from '../fixtures/axe-helper';

test.describe('Komponent', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('komponent');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Komponent');
  });

  test('renders all variants', async ({ page }) => {
    const items = page.locator('hvi-komponent');
    await expect(items).toHaveCount(4);
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page);
  });
});
```

## 6. Kjør E2E-test

```bash
npm run test:e2e
```

## 7. Oppdater demo-status

I `src/app/demo/demo-components.ts`, sett `unitTested: true` og `e2eTested: true` på komponentens innslag. Dette viser ✓ i sidemenyen.

## 8. Kjør alt og commit

```bash
npm run test:all
git add -A
git commit -m "test: add unit and E2E tests for <komponent>"
```

## Sjekkliste per komponent

- [ ] Lest komponentfilen og notert inputs/outputs/bindings
- [ ] Lest demo-siden og notert seksjoner
- [ ] Unit-test opprettet (`*.spec.ts` ved siden av komponenten)
- [ ] Unit-tester passerer
- [ ] E2E-test opprettet (`e2e/components/*.spec.ts`)
- [ ] E2E-tester passerer (inkl. tilgjengelighet)
- [ ] Demo-status oppdatert i `demo-components.ts`
- [ ] Alle tester passerer (`npm run test:all`)
- [ ] Committet
