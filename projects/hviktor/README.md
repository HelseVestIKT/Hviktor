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

## Tilgjengelige komponenter

| Komponent    | Beskrivelse                                               |
| ------------ | --------------------------------------------------------- |
| Alert        | Varselmeldinger for å informere brukeren                  |
| Avatar       | Profilbilde eller initialer                               |
| AvatarStack  | AvatarStack                                               |
| Badge        | Små indikatorer og tellere                                |
| Breadcrumbs  | Navigasjonssti                                            |
| Button       | Knapper for handlinger                                    |
| Card         | Kort for gruppering av innhold                            |
| Checkbox     | Avkrysningsbokser for ett eller flere valg                |
| Chip         | Kompakte elementer for valg og filtrering                 |
| Details      | Utvidbart innhold                                         |
| Dialog       | Modale dialogbokser                                       |
| Divider      | Skillelinjer mellom innhold                               |
| ErrorSummary | ErrorSummary er en oppsummering av feil i et skjema.      |
| Field        | Field komponent                                           |
| Fieldset     | Fieldset komponent                                        |
| Forms        | Skjemakomponenter og validering                           |
| Heading      | Overskrifter                                              |
| Icon         | Ikoner                                                    |
| Input        | Input komponent                                           |
| Label        | Etiketter                                                 |
| Link         | Lenker                                                    |
| List         | Lister                                                    |
| Logo         | Logo komponent                                            |
| Pagination   | Pagination komponent                                      |
| Paragraph    | Avsnitt                                                   |
| Popover      | Popup-innhold                                             |
| Radio        | Radio komponent                                           |
| RequiredTag  | RequiredTag komponent                                     |
| Search       | Search komponent                                          |
| Select       | Nedtrekksliste for valg fra en liste                      |
| Skeleton     | Placeholder mens innhold lastes                           |
| SkipLink     | SkipLink komponent                                        |
| Spinner      | Spinner komponent                                         |
| Suggestion   | Søkbar select med mulighet for å velge flere alternativer |
| Switch       | Switch komponent                                          |
| Table        | Table komponent                                           |
| Tag          | Merkelapper for kategorisering                            |
| Textarea     | Textarea komponent                                        |
| Textfield    | Textfield komponent                                       |
| ToggleGroup  | ToggleGroup komponent                                     |
| Tooltip      | Tooltip komponent                                         |

## Dokumentasjon

Se [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/) for tilgjengelige komponenter, eksempler og API-dokumentasjon.

## Krav

- Angular 17–21
- Node.js 20+

## Endringslogg

Se [CHANGELOG.md](https://github.com/HelseVestIKT/hviktor/blob/main/hviktor/projects/hviktor/CHANGELOG.md) for alle versjonsendringer.

## Bidra

Se [CONTRIBUTING.md](https://github.com/HelseVestIKT/hviktor/blob/main/hviktor/CONTRIBUTING.md) for utviklingsprosess og retningslinjer.

## Lisens

[MIT](./LICENSE)
