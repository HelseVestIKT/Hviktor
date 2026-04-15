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

**Kvalitet foran kvantitet** — én test skal verifisere én ting som faktisk kan gå galt.

| Test                           | Sjekk                                                                   |
| ------------------------------ | ----------------------------------------------------------------------- |
| Defaults er null               | `element.getAttribute('data-*')` er `null` for alle valgfrie inputs     |
| Én representativ verdi         | Bekrefter at `[attr.x]='x'`-bindingen fungerer — ikke én per enum-verdi |
| Mapping-regler (custom logikk) | Hver regel som transformerer eller betinget setter en attributt         |
| Boolean true / false           | `getAttribute('data-flag')` er `''` / `null`                            |
| ARIA-attributter               | Korrekt verdi eller `null`                                              |
| Content projection             | Testvert med innhold → `textContent`                                    |
| Event-emisjon                  | Output emitter korrekt verdi ved forventet handling                     |
| Interaktivitet / vaktlogikk    | Tilstand endres riktig; blokkeres når det skal blokkeres                |

**Unngå:**

- `should create` — TypeScript-kompilering garanterer allerede dette
- Statisk host-class-test — kan ikke feile uten at komponenten slutter å kompilere
- Én `it()` per enum-verdi for samme `@Input()` — hvis `'danger'` fungerer, fungerer `'info'` også

Se [unit-test-conventions.md](../.github/skills/verify-component/references/unit-test-conventions.md) for detaljer og mønstre.

Se `dialog.directive.spec.ts` og `table.directive.spec.ts` som referanser på tester med reell logikk.

## 4. Kjør unit-test

```bash
npm test -- --project hviktor --watch=false
```

## 5. Skriv E2E-test

Opprett `e2e/components/<komponent>.spec.ts` med `ComponentPage` og `checkAccessibility`.

Fokuser på **komponentens atferd i nettleseren**, ikke demo-sidens layout:

- Sjekk at forventede `data-*`-attributter er satt på riktig element
- Test interaktivitet: klikk, toggle, åpne/lukke dialog
- Verifiser ARIA-attributter der det er relevant
- Unngå: heading/page-load-test, element-telling i løkke, `toHaveCount` knyttet til antall demo-eksempler

Se [e2e-test-conventions.md](../.github/skills/verify-component/references/e2e-test-conventions.md) for detaljer.

Se `e2e/components/dialog.spec.ts` som referanse.

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
