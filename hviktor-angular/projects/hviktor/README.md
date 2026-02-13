# @helsevestikt/hviktor-angular

> ⚠️ **Denne pakken er under aktiv utvikling.** API-et kan endres uten forvarsel. Bruk på egen risiko i produksjon.

Angular-komponenter basert på [Digdir Designsystemet](https://designsystemet.no/) for Helse Vest IKT.

## Installasjon

```bash
npm install @helsevestikt/hviktor-angular
```

## Oppsett

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
| Paragraph    | Avsnitt                                              |
| Popover      | Popup-innhold                                        |
| Select       | Nedtrekksliste for valg fra en liste                 |
| Skeleton     | Placeholder mens innhold lastes                      |
| Tag          | Merkelapper for kategorisering                       |

## Krav

- Angular 17–21
- Node.js 20+
