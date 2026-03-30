# @helsevestikt/hviktor-angular

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
- Spør om du vil installere **@helsevestikt/hviktor-icons** (default: Yes). Pakke med ikoner som

### Manuelt oppsett

```bash
npm install @helsevestikt/hviktor-angular
```

Importer stylesheet i `src/styles.css`:

```css
@import '@helsevestikt/hviktor-angular/styles.css';
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
