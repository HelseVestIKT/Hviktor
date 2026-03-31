# Fremgangsmåte: Teste en komponent

## 1. Les komponenten

Åpne `projects/hviktor/src/<komponent>/<komponent>.component.ts` og noter:

- Selector, host class, host bindings (`role`, `aria-label`, `data-*`)
- Inputs og outputs
- Content projection (`<ng-content />`)

## 2. Les demo-siden

Åpne `src/app/demo/pages/components/<komponent>/<komponent>-demo.ts` — noter seksjoner og hva som er verdt å E2E-teste.

## 3. Skriv unit-test

Opprett `projects/hviktor/src/<komponent>/<komponent>.component.spec.ts`.

**Én `it()` per test-case:**

| Test                   | Sjekk                                            |
| ---------------------- | ------------------------------------------------ |
| Opprettes              | `expect(fixture.componentInstance).toBeTruthy()` |
| Host class             | `element.classList.contains('ds-komponent')`     |
| Role (hvis aktuelt)    | `element.getAttribute('role')`                   |
| Defaults er null       | `element.getAttribute('data-*')` er `null`       |
| Hver input → attributt | `setInput(...)` → `getAttribute(...)`            |
| Content projection     | Testvert med innhold → `textContent`             |

Se `alert.component.spec.ts` og `avatar.component.spec.ts` som referanser.

## 4. Kjør unit-test

```bash
npm test -- --project hviktor --watch=false
```

## 5. Skriv E2E-test

Opprett `e2e/components/<komponent>.spec.ts` med `ComponentPage` og `checkAccessibility`.

Se `e2e/components/alert.spec.ts` som referanse.

## 6. Kjør E2E-test

```bash
npm run test:e2e
```

## 7. Oppdater demo-status

Sett `unitTested: true` og `e2eTested: true` i `demo-components.ts`.

## 8. Kjør alt og commit

```bash
npm run test:all
git commit -m "test: add tests for <komponent>"
```

## Sjekkliste

- [ ] Unit-test opprettet og passerer
- [ ] E2E-test opprettet og passerer (inkl. tilgjengelighet)
- [ ] Demo-status oppdatert
- [ ] `npm run test:all` passerer
- [ ] Committet
