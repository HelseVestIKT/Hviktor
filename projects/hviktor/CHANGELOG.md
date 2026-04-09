# Changelog

Alle vesentlige endringer i `@helsevestikt/hviktor-angular` dokumenteres her.

Formatet følger [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) og prosjektet bruker [Semantic Versioning](https://semver.org/).

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
