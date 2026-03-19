# Testing

Hviktor Angular bruker to testrammeverk: **Vitest** for enhetstester og **Playwright** for E2E-tester.

## Kommandoer

| Kommando                                      | Beskrivelse                                                |
| --------------------------------------------- | ---------------------------------------------------------- |
| `npm test`                                    | Kjør enhetstester for standard Angular-prosjektet (Vitest) |
| `npm test -- --project hviktor --watch=false` | Kjør enhetstester for hviktor-biblioteket (Vitest)         |
| `npm run test:e2e`                            | Kjør E2E-tester (Playwright)                               |
| `npm run test:e2e:ui`                         | Kjør E2E-tester i interaktivt UI-modus                     |
| `npm run test:all`                            | Kjør enhetstester (standardprosjekt + hviktor) og E2E      |

## Enhetstester (Vitest)

Enhetstester bruker [Vitest](https://vitest.dev/) med Angular sitt `TestBed` og kjøres i jsdom.

### Filstruktur

Testfiler er co-lokaliserte med komponentene de tester:

```
projects/hviktor/src/
  alert/
    alert.component.ts
    alert.component.spec.ts    ← enhetstest
  button/
    button.directive.ts
    button.directive.spec.ts   ← enhetstest
  ...
```

### Testmønster

Alle tester bruker `provideZonelessChangeDetection()` for å matche bibliotekets zoneless-oppsett.

**Enkel komponent (content projection):**

```typescript
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HviAlert } from './alert.component';

// Testvertskomponent for å teste content projection og inputs i template
@Component({
  standalone: true,
  imports: [HviAlert],
  template: '<hvi-alert color="warning">Advarsel!</hvi-alert>',
})
class TestHostComponent {}

describe('HviAlert', () => {
  let fixture: ComponentFixture<HviAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HviAlert, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(HviAlert);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-alert host class', () => {
    expect(fixture.nativeElement.classList.contains('ds-alert')).toBe(true);
  });

  // Bruk setInput() for å unngå ExpressionChangedAfterItHasBeenCheckedError
  it('should set data-color attribute', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-color')).toBe('danger');
  });

  it('should match snapshot', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const el = hostFixture.nativeElement.querySelector('hvi-alert');
    expect(el.outerHTML).toMatchSnapshot();
  });
});
```

### Viktige detaljer

- **Sette inputs**: Bruk `fixture.componentRef.setInput('name', value)` i stedet for `fixture.componentInstance.name = value` for å unngå `ExpressionChangedAfterItHasBeenCheckedError` med zoneless change detection.
- **Content projection**: Krever en testvertskomponent (`@Component`) med template som bruker komponenten.
- **Snapshot-tester**: Brukes for enkle komponenter med stabil HTML-output. Oppdater snapshots med `npm test -- --project hviktor --watch=false --update` ved tilsiktede endringer.
- **Direktiver** (f.eks. `HviButton`): Testvertskomponenten må bruke direktivet på et host-element: `<button hviButton variant="primary">`.

## E2E-tester (Playwright)

E2E-tester bruker [Playwright](https://playwright.dev/) mot demo-applikasjonen og inkluderer tilgjengelighetstesting med [axe-core](https://github.com/dequelabs/axe-core).

### Filstruktur

```
e2e/
  fixtures/
    component-page.ts    ← Page Object for /komponenter/{id}
    axe-helper.ts        ← Gjenbrukbar axe-core tilgjengelighetssjekk
  components/
    alert.spec.ts        ← E2E-test per komponent
    button.spec.ts
    ...
```

### Page Object: `ComponentPage`

Gjenbrukbar klasse for å navigere til komponentdemo-sider:

```typescript
import { ComponentPage } from '../fixtures/component-page';

test.beforeEach(async ({ page }) => {
  const componentPage = new ComponentPage(page);
  await componentPage.goto('alert'); // Navigerer til /komponenter/alert
});

// componentPage.heading      → h1 i artikkel-headeren
// componentPage.getSection() → finn demo-seksjon etter tittel
```

### Tilgjengelighetssjekk

Hver komponent bør ha en axe-core test:

```typescript
import { checkAccessibility } from '../fixtures/axe-helper';

test('accessibility check', async ({ page }) => {
  // Andre parameter: regler som ekskluderes (kjente demo-app issues)
  await checkAccessibility(page, ['list', 'scrollable-region-focusable']);
});
```

### Playwright-konfigurasjon

- **Browser**: Chromium (kan utvides til Firefox/WebKit)
- **Dev server**: Startes automatisk via `webServer`-blokken i `playwright.config.ts`
- **CI-modus**: 2 retries, 1 worker, github-reporter, ny server per kjøring
- **Lokalt**: Gjenbruker eksisterende dev server om den allerede kjører

## Teststatus i demo-appen

Komponenter som har beståtte tester vises med status-indikatorer i demo-applikasjonen:

- **Sidebar**: Grønn ✓ ved siden av komponentnavnet
- **Demo-side**: «Unit ✓» og «E2E ✓» tags i headeren

Oppdater `unitTested` og `e2eTested` i `src/app/demo/demo-components.ts` når tester er skrevet:

```typescript
{
  id: 'alert',
  name: 'Alert',
  description: '...',
  ds: true,
  unitTested: true,   // ← sett til true når enhetstester er beståtte
  e2eTested: true,     // ← sett til true når E2E-tester er beståtte
},
```

## Legge til tester for en ny komponent

1. **Enhetstest**: Opprett `projects/hviktor/src/{komponent}/{komponent}.component.spec.ts`
2. **E2E-test**: Opprett `e2e/components/{komponent}.spec.ts`
3. **Kjør testene**:
   ```bash
   npm test -- --project hviktor --watch=false
   npm run test:e2e
   ```
4. **Oppdater demo-status**: Sett `unitTested: true` / `e2eTested: true` i `demo-components.ts`

## CI/CD

Tester kjøres automatisk i GitHub Actions:

- **PR-sjekker** (`pr-checks.yml`): Lint + enhetstester + build
- **Publish** (`publish-npm.yml`): Bør inkludere enhetstester før publisering (TODO)
- **E2E i CI**: Legg til Playwright-steg med `npx playwright install --with-deps chromium`
