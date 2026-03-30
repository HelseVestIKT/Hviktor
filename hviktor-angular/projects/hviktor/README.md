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
- Spør om du vil installere og konfigurere **Tailwind CSS**. Valgritt, men anbefales for best mulig utvikleropplevelse.

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

| Komponent    | Beskrivelse                                          |
| ------------ | ---------------------------------------------------- |
| Alert        | Varselmeldinger for å informere brukeren             |
| Avatar       | Profilbilde eller initialer                          |
| AvatarStack  | AvatarStack                                          |
| Badge        | Små indikatorer og tellere                           |
| Breadcrumbs  | Navigasjonssti                                       |
| Button       | Knapper for handlinger                               |
| Card         | Kort for gruppering av innhold                       |
| Checkbox     | Avkrysningsbokser for ett eller flere valg           |
| Chip         | Kompakte elementer for valg og filtrering            |
| Details      | Utvidbart innhold                                    |
| Dialog       | Modale dialogbokser                                  |
| Divider      | Skillelinjer mellom innhold                          |
| ErrorSummary | ErrorSummary er en oppsummering av feil i et skjema. |
| Field        | Field komponent                                      |
| Fieldset     | Fieldset komponent                                   |
| Forms        | Skjemakomponenter og validering                      |
| Heading      | Overskrifter                                         |
| Icon         | Ikoner                                               |
| Input        | Input komponent                                      |
| Label        | Etiketter                                            |
| Link         | Lenker                                               |
| List         | Lister                                               |
| Logo         | Logo komponent                                       |
| Pagination   | Pagination komponent                                 |
| Paragraph    | Avsnitt                                              |
| Popover      | Popup-innhold                                        |
| Radio        | Radio komponent                                      |
| RequiredTag  | RequiredTag komponent                                |
| Search       | Search komponent                                     |
| Select       | Nedtrekksliste for valg fra en liste                 |
| Skeleton     | Placeholder mens innhold lastes                      |
| SkipLink     | SkipLink komponent                                   |
| Spinner      | Spinner komponent                                    |
| Switch       | Switch komponent                                     |
| Table        | Table komponent                                      |
| Tag          | Merkelapper for kategorisering                       |
| Textarea     | Textarea komponent                                   |
| Textfield    | Textfield komponent                                  |
| ToggleGroup  | ToggleGroup komponent                                |
| Tooltip      | Tooltip komponent                                    |

## Krav

- Angular 17–21
- Node.js 20+
