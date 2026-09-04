# @helsevestikt/hviktor-angular

[![npm version](https://img.shields.io/npm/v/@helsevestikt/hviktor-angular)](https://www.npmjs.com/package/@helsevestikt/hviktor-angular)
[![license](https://img.shields.io/npm/l/@helsevestikt/hviktor-angular)](https://github.com/HelseVestIKT/hviktor/blob/main/projects/hviktor/LICENSE)

> ⚠️ **Denne pakken er under aktiv utvikling.** API-et kan endres uten forvarsel. Bruk på egen risiko i produksjon.

Angular-komponenter basert på [Digdir Designsystemet](https://designsystemet.no/) for Helse Vest IKT.

## Installasjon

### Automatisk oppsett (anbefalt)

```bash
ng add @helsevestikt/hviktor-angular
```

Dette installerer pakken og setter opp prosjektet automatisk:

- Legger til `@import '@helsevestikt/hviktor-angular/styles.css'` i stylesheet
- Spør om du vil installere og konfigurere **Tailwind CSS**. (default: Yes). Anbefales for best mulig utvikleropplevelse. Alle demoene på [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/) bruker Tailwind, så det kan være lurt å ha det installert for å følge eksemplene.
- Spør om du vil installere **@helsevestikt/hviktor-icons** (default: Yes). Installerer ikonpakken og legger til global import i `main.ts`.

### Manuelt oppsett

```bash
npm install @helsevestikt/hviktor-angular
```

Importer stylesheet i `src/styles.css`:

```css
@import '@helsevestikt/hviktor-angular/styles.css';
```

## Tema

Pakken leveres med Helse Vest IKT sitt eget tema, bygget med [Designsystemets Temabygger](https://theme.designsystemet.no/). Temaet følger med `styles.css` — du trenger ikke gjøre noe ekstra.

Fonten **Albert Sans** følger også med pakken som webfont, så du trenger verken å installere den lokalt eller laste den fra et CDN.

### Farger og størrelser

Temaet definerer fargene `accent`, `brand1`, `brand2`, `brand3` og `neutral`, i tillegg til systemfargene `info`, `success`, `warning` og `danger`.

```html
<button hviButton color="brand1">Knapp i merkevarefarge</button>

<div data-color-scheme="dark">
  <!-- Mørk fargemodus. Verdier: light | dark | auto -->
</div>

<div data-size="sm">
  <!-- Størrelsesmodus for elementet og alle etterkommere. Verdier: sm | md | lg -->
</div>
```

Merk at `data-color` arves nedover, men må settes på nytt dersom du endrer `data-color-scheme`. Komponenter som `HviAlert`, `HviValidationMessage` og `HviErrorSummary` bruker alltid sine egne systemfarger.

### Bruke temaet uten resten av pakken

Temaets CSS-variabler er også tilgjengelig alene, for eksempel hvis du bruker `@digdir/designsystemet-css` direkte. Temaet må importeres **etter** Designsystemets CSS:

```css
@import '@digdir/designsystemet-css';
@import '@helsevestikt/hviktor-angular/theme.css';
```

## Bruk

Importer komponentene du trenger direkte i standalone-komponenter:

```typescript
import { HviButton } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviButton],
  template: `<button hviButton>Klikk meg</button>`,
})
export class MyComponent {}
```

## Dokumentasjon

Se [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/) for tilgjengelige komponenter, eksempler og API-dokumentasjon.

## Krav

- Angular 17–21
- Node.js 20+

## Endringslogg

Se [CHANGELOG.md](https://github.com/HelseVestIKT/hviktor/blob/main/projects/hviktor/CHANGELOG.md) for alle versjonsendringer.

## Bidra

Se [CONTRIBUTING.md](https://github.com/HelseVestIKT/hviktor/blob/main/CONTRIBUTING.md) for utviklingsprosess og retningslinjer.

## Lisens

[MIT](./LICENSE)
