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

| Komponent   | Beskrivelse                                          |
| ----------- | ---------------------------------------------------- |
| Alert       | Varselmeldinger                                      |
| Avatar      | Brukeravatar                                         |
| Badge       | Merkelapper og tellere                               |
| Breadcrumbs | Navigasjonsstifinne                                  |
| Button      | Knapper                                              |
| Card        | Kort-layout                                          |
| Chip        | Filterbrikker                                        |
| Details     | Sammenleggbart innhold                               |
| Dialog      | Modaldialog                                          |
| Divider     | Skillelinje                                          |
| Forms       | Skjemaelementer (field, fieldset, input, validering) |
| Heading     | Overskrifter                                         |
| Icon        | Ikoner                                               |
| Label       | Etiketter                                            |
| Link        | Lenker                                               |
| Paragraph   | Avsnitt                                              |
| Tag         | Kategorimerker                                       |

## Krav

- Angular 17–21
- Node.js 20+
