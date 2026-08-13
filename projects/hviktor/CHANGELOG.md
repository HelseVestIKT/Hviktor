# Changelog

Alle vesentlige endringer i `@helsevestikt/hviktor-angular` dokumenteres her.

Formatet følger [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) og prosjektet bruker [Semantic Versioning](https://semver.org/).

## [0.3.3] – 2026-08-13

### Added

- HviTextfieldType er eksportert fra pakken, så konsumenter kan typebinde variabler som holder en input-type
- [(value)] for toveisbinding direkte mot et signal, i tillegg til ngModel og formControlName
- Ny demoseksjon som viser toveisbinding og at feltet oppdateres når verdien settes programmatisk

### Changed

- hvi-textfield er skrevet om fra @Input-dekoratorer til signalbaserte inputs. Ingen endring i API-et — eksisterende bruk fungerer som før
- counterLimit, rows, size og maxLength konverteres nå til tall når de settes som attributter
- disabled fra input-et og disabled fra reactive forms kombineres nå med OR i stedet for å overskrive hverandre

### Fixed

- Verdien i feltet oppdaterte seg ikke når den ble satt utenfra i soneløse applikasjoner eller signalbaserte skjemaer. Komponenten skrev til vanlige felt, som ikke utløser change detection uten zone.js (#346)
- Required-taggen fulgte ikke med når requiredMode endret seg på `<form hviForm>`, fordi skjemaets signal ble lest fra en getter uten avhengighetssporing

## [0.3.2] – 2026-08-13

Suggestion: Breaking changes. Alle beskrevne endringer under gjelder Suggestion.

hvi-suggestion er skrevet om til én komponent med et API som ligner PrimeNG sin Autocomplete. hvi-suggestion-datalist og hvi-suggestion-option er fjernet.

Komponenten rendrer nå ds-field, label, input, tøm-knapp og forslagsliste selv. Alternativene sendes inn med suggestions, og verdien settes med ngModel, formControlName eller [(value)].

```html
<hvi-suggestion
  label="Velg en kommune"
  [(ngModel)]="kommune"
  [suggestions]="treff"
  (completeMethod)="sok($event)"
  optionLabel="navn"
/>
```

### Added

- Støtte for ngModel og formControlName via ControlValueAccessor
- Forhåndsvalgt verdi — verdien trenger ikke ligge i forslagslista
- completeMethod for å fylle lista fra backend, med filter og loading
- optionLabel og dataKey for objekter, og <ng-template #item> for egen visning. Verdien du får ut er hele objektet, ikke en streng
- maxVisible (standard 100) begrenser hvor mange alternativer som rendres samtidig. Filtreringen skjer nå i komponenten, så lange lister legger ikke tusenvis av noder i DOM. Er lista avkortet, vises en diskret melding nederst med hvor mange treff som gjenstår, overstyrbar med truncatedText
- label, description og error med automatisk kobling til inputfeltet
- Norske skjermlesertekster som standard, overstyrbart med srText

### Fixed

- Alternativene fikk aldri satt value og label, så ingen valg lot seg matche
- Tøm-knappen brukte <del>, som er faset ut i u-combobox

### Fortsatt kjente begrensinger

Forslagslista kan åpne over inputfeltet ved første åpning, og flytte seg når innholdet rundt endrer størrelse. Dette styres av Designsystemet og u-elements, og er meldt videre.

### Migrering

Erstatt hvi-suggestion-datalist og hvi-suggestion-option med [suggestions], og `<input hviInput>` med label-attributtet. Se demosiden for eksempler.

## [0.3.1] – 2026-07-02

### Changed

- Oppdatert ng-add schematic til å håndtere tailwind versjon samt riktig implementasjon av hviktor-icons

## [0.3.0] – 2026-06-29

### Added

- Lagt til aria-label på tabs.
- Lagt til støtte for custom sorting på tabell-kolonner.
- Lagt til støtte for single-mode i radutvidelse på Table.

### Changed

- Diverse UU-forbedringer i Table.
- Lagt til block-luft på Search-komponenten.
- Oppdatert `@digdir/designsystemet-css` og `@digdir/designsystemet-web` til 1.18.0.

## [0.2.2] – 2026-06-18

### Fixed

- Liten fiks i schematics etter oppdatering av Angular til 22.0.2

## [0.2.1] – 2026-06-18

### Added

- unit-tester for flere komponenter
- size-input for input-komponenten

### Changed

- u-details er tatt bort fra details-komponenten.
- forbedret a11y i field, fieldset og form.
- oppdatert `@digdir/designsystemet-css` og `@digdir/designsystemet-web` til 1.16.0.

### Fixed

- required-tag i all-required modus har nå tilstrekkelig margin

## [0.2.0] – 2026-06-04

### Added

- Size input for ToggleGroup.
- Outline variant for field (gjelder checkbox, radio og switch når de er i en hvi-field).

### Changed

- Forbedret aria-label på Pagination.
- Liten endring i alt tekst for logoer.
- Lenkekort er forbedret.
- Oppdatert `@digdir/designsystemet-css` og `@digdir/designsystemet-web` til 1.15.0.
- Pakken støtter angular 22.

### Fixed

- Weight på label er fikset
- Lagt til luft i skjemaelementer

## [0.1.8] – 2026-05-08

### Added

- Unit- og e2e-tester samt forbedret jsdocs for divider, dropdown, error summary label
- Card som knapp
- Dialog: Lagt til title input som oppretter et h2-element og setter aria-label på dialogen for bedre tilgjengelighet. Kan overstyres ved å sette `aria-label` direkte på dialog-komponenten i HTML. Dialog uten title får aria-label "Dialogboks" som default.
- Alert: På samme måte som dialog er det lagt til title-input som hvis den brukes oppretter en h2 i alerten og setter aria-label til det samme som title. En alert uten title får default-verdier på aria-label basert på color (error får "Feilmelding", info/success/warning får "Melding"). Aria-label kan overstyres ved å sette `aria-label` direkte på Alert-komponenten i HTML. Alert har også fått en max-width.

### Changed

- AvatarStack: UU forbedringer og oppdatering av tester
- Button: Ikon-knapp får default aria-label "Knapp med ikon". fullWidth-inputen er fjernet.
- Lenkekort: Forbedringer.
- Oppdatert `@digdir/designsystemet-css` og `@digdir/designsystemet-web` til 1.14.0.

### Fixed

- Label har nå støtte for tre font-weights

## [0.1.7] – 2026-04-30

### Added

- Dialog: skrevet om som komponent for å få på plass all funksjonalitet. Lagt til støtte for alle varianter i Designsystemet.

### Changed

- Tvinger normal font-weight på MultiSelect
- Selected items i MultiSelect vises i kommaseparert liste så lenge det er plass, og ellers som X elementer valgt
- A11y forbedringer på MultiSelect
- Table demo oppdatert til å bruke MultiSelect for kolonnefiltrering
- A11y forbedringer på table
- Default role på Alert utifra color (error får role="alert", info/success/warning får role="status"). Kan overstyres ved å sette `role`-attributt direkte på Alert-komponenten.

### Fixed

- Dobbel scrollbar i MultiSelect
- Card: Lenkekort er fikset og vises korekt

## [0.1.6] – 2026-04-21

### Changed

- Updates @digdir/designsystemet-css and @digdir/designsystemet-web to 1.13.2.

## [0.1.5] – 2026-04-21

### Changed

- Fjernet ariaLabel som input fra flere komponenter. Aria-attributter brukes som vanlig ved å sette `aria-label` direkte på komponenten i HTML, for mer fleksibilitet og enklere tilpasning.

## [0.1.4] – 2026-04-16

### Added

- Added js docs, unit test and e2e test for details- and dialog component
- Added drawer to dialog component
- Added HVIKTOR logo

### Changed

- Enhanced tests

## [0.1.3] – 2026-04-13

### Added

- Unit and E2E tests for table
- Column filtering and row expansion added to table component
- Size attribute added to select component for small/medium/large options

### Changed

- Table now uses Tanstack Table under the hood for improved performance and features. API is mostly unchanged, but some internal logic and rendering has been refactored.

## [0.1.2] – 2026-04-10

### Added

- Unit and E2E tests for button, breadcrumbs, checkbox and chip.

### Changed

- Breadcrumbs rewritten to use digir web package
- Improved JS docs for above components.

### Fixed

- Alert: Fixed layout issues by setting display: block, height: fit-content, and align-self: flex-start on the host element. Prevents the component from overlapping siblings, stops the icon from overflowing, and ensures the alert height is determined by its content rather than stretched by surrounding elements.

## [0.1.1] – 2026-03-31

### Changed

- Oppdatert README

## [0.1.0] – 2026-03-31

### Added

- Første offisielle versjon publisert til npm

## [0.0.27] – 2026-03-30

### Changed

- Demo-badge lagt til i repo-README
- CHANGELOG flytta til `projects/hviktor/` (publiseres med npm-pakken)
- Oppdatert publiseringsrutine i README til å bruke `npm run release`

## [0.0.26] – 2026-03-30

### Fixed

- Lagt til `repository`-felt i package.json for npm provenance

## [0.0.25] – 2026-03-30

### Fixed

- Publish-workflow bruker nå `--allow-same-version` for å unngå feil ved re-publisering

## [0.0.24] – 2026-03-30

### Added

- Release-script (`npm run release`) for automatisk versjonering og tagging
- `--provenance`-flagg i publish-workflow for pakkeintegritet
- CHANGELOG, CONTRIBUTING, RELEASE og USAGE_EXAMPLE dokumentasjon
- E2E-tester (Playwright) i PR-sjekk workflow
- Badges i README (npm, CI, Angular, lisens, demo)

## [0.0.23] – 2026-03-30

### Added

- Installasjonsinstruksjoner for `@helsevestikt/hviktor-icons` i README

## [0.0.22] – 2026-03-28

### Added

- Valg for å installere `@helsevestikt/hviktor-icons` via ng-add schematic
- Import av hviktor-icons til `main.ts` via ng-add
- Tailwind CSS er nå valgfri i ng-add (default: No)

## [0.0.21] – 2026-03-27

### Fixed

- `getStylesPath` ekskluderer nå styles fra `node_modules`

## [0.0.20] – 2026-03-27

### Changed

- README oppdatert til å anbefale `ng add` for automatisk oppsett

## [0.0.19] – 2026-03-27

### Fixed

- Postbuild-script inkluderer nå `package.json` og oppretter `.npmignore`
- Lagt til schematics `package.json` for korrekt publisering

## [0.0.18] – 2026-03-26

### Added

- `ng add @helsevestikt/hviktor-angular` schematic med automatisk oppsett:
  - Legger til styles.css-import
  - Valgfri Tailwind CSS-installasjon og -konfigurasjon
  - Forhindrer duplikate avhengigheter

### Changed

- Publiserings-workflow bygger nå schematics som eget steg

## [0.0.17] – 2026-03-20

### Added

- **required-tag** komponent
- **logo** komponent med støtte for alle Helse Vest-foretak (HVikt, HST, HST-SUS, HFD, HFO, SAV)
- **textfield** komponent med label, description, prefix/suffix, error og counter
- **avatar-stack** komponent
- **table** direktiv med sortering, paginering og hover/zebra/border
- **pagination** komponent
- Scaffold-demo-script for raskere oppsett av demo-sider
- Markering av komponenter som `ds` (designsystemet) eller `hvi` (Hviktor-spesifikk)
- Blazor-støtte for ikoner

### Changed

- Alle demosider får nå navn og beskrivelse fra sentral komponentliste
- Prestart-script for 90 % raskere bygg under utvikling
- Oppgradert `@digdir/designsystemet-css` til 1.13.1 og floating-ui

## [0.0.16] – 2026-03-15

### Added

- Code examples for breadcrumbs og button i demo-appen
- Issue templates for bug, feature og ny komponent
- `highlight.js` for syntax highlighting i demo

### Changed

- README konsolidert — all script/workflow-info flyttet til rot-README

## [0.0.15] – 2026-03-12

### Added

- **tabs** komponent
- **spinner** komponent
- **skip-link** direktiv
- **tooltip** direktiv
- **toggle-group** komponent
- **textarea** demo
- **switch** demo
- **search** komponent med demo
- **radio** demo
- **input** demo
- **fieldset** demo med validering
- **field** komponent med counter
- **error-summary** demo
- **checkbox** demo

## [0.0.14] – 2026-03-08

### Added

- **skeleton** komponent
- **select** direktiv med demo
- Dark mode-støtte i demo-appen

### Changed

- Ny layout for demo-appen med sidemeny
- Scaffold-demo-script for raskere oppretting av demo-sider
- Forbedret forms-demo

## [0.0.13] – 2026-03-05

### Added

- **popover** komponent med floating-ui

## [0.0.12] – 2026-03-03

### Added

- Validatorer for forms
- Versjon-check-script (`npm run version:check`)

### Changed

- Forbedret input-dokumentasjon

## [0.0.11] – 2026-03-01

### Changed

- Oppgradert `@digdir/designsystemet-css` og relaterte pakker
- Fjernet unødvendig charset-regel

### Added

- PR quality gate workflow (lint, test, build)
- Publish-to-npm workflow med tag-basert utgivelse
- Verifisering at tag er på main-branch
- Status badges i README
- GitHub Pages deploy-workflow for demo-appen

## [0.0.10] – 2026-02-28

### Fixed

- Fjernet provenance-flag (intern repo)

## [0.0.9] – 2026-02-28

### Fixed

- Bruk npm token for publisering

## [0.0.8] – 2026-02-28

### Fixed

- OIDC-konfigurasjon for npm publish

## [0.0.7] – 2026-02-25

### Added

- Første publiserbare versjon
- GitHub Actions workflows
- **list** direktiv
- Oppsett for npm-publisering
- **error-summary** komponent
- **tag** komponent
- **forms**-system: form, fieldset, field, input, control-invalid, validation-message
- Angular 17–21 støtte
