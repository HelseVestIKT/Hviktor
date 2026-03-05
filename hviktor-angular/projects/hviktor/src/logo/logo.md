# HviLogo

Inline SVG logo component for Helse Vest and its subsidiaries.

## Quick start

```html
<hvi-logo company="hve" /> <hvi-logo company="hve" size="lg" />
```

## Inputs

| Input     | Type          | Default | Description                              |
| --------- | ------------- | ------- | ---------------------------------------- |
| company   | `LogoCompany` | —       | **Required.** Which logo to display.     |
| size      | `LogoSize`    | `'md'`  | Height: sm 40 px, md 65 px, lg 82 px.    |
| ariaLabel | `string`      | —       | Overrides the built-in accessible label. |

### Available companies

| Key     | Organisation                                     |
| ------- | ------------------------------------------------ |
| dots    | Just the five dots (no text)                     |
| hve     | Helse Vest                                       |
| hvikt   | Helse Vest IKT                                   |
| hbe     | Helse Bergen                                     |
| hbe-hus | Helse Bergen – Haukeland universitetssjukehus    |
| hfd     | Helse Førde                                      |
| hfo     | Helse Fonna                                      |
| hst     | Helse Stavanger                                  |
| hst-sus | Helse Stavanger – Stavanger universitetssjukehus |
| sav     | Sjukehusapoteka Vest                             |

## Dark / light mode

The component responds automatically to `data-color-scheme` on a parent element
(typically `<html>`). No manual switching is needed.

- **Light mode** — text and themed dot render in dark blue (`#003087`)
- **Dark mode** — text and themed dot render in white

The four accent dots always stay blue (`#6CACE4`).

## File structure

```
logo/
├── logo.component.ts   ← The Angular component (HviLogo)
├── logo-types.ts       ← Shared types (LogoPath, LogoDefinition, LogoSize)
├── logo-shared.ts      ← Shared SVG constants (dots, HELSE text) + buildLogo()
├── logo-paths.ts       ← Registry that assembles all logos into LOGOS map
├── index.ts            ← Public barrel exports
└── logos/              ← One file per logo
    ├── logo-dots.ts
    ├── logo-hve.ts
    ├── logo-hvikt.ts
    ├── logo-hbe.ts
    ├── logo-hbe-hus.ts
    ├── logo-hfd.ts
    ├── logo-hfo.ts
    ├── logo-hst.ts
    ├── logo-hst-sus.ts
    └── logo-sav.ts
```

## How logos are defined

Every logo is a `LogoDefinition`:

```ts
interface LogoDefinition {
  viewBox: string; // SVG viewBox
  width: number;
  height: number;
  label: string; // Accessible aria-label
  paths: LogoPath[]; // Array of SVG <path> elements
}

interface LogoPath {
  d: string; // SVG path data
  fill: 'themed' | 'accent'; // themed = currentColor, accent = #6CACE4
}
```

### Standard layout — `buildLogo()`

Most logos follow the **dots-first** layout:

```
[5 dots] [HELSE] [COMPANY NAME]
```

These use the `buildLogo()` helper from `logo-shared.ts`, which prepends the
shared dot paths and "HELSE" text automatically. You only supply the unique
company-name paths:

```ts
import { buildLogo } from '../logo-shared';
import { LogoPath } from '../logo-types';

const COMPANY: LogoPath[] = [
  { d: '...', fill: 'themed' },
  // one path per letter
];

export const LOGO_MY_ORG = buildLogo(
  'Helse MyOrg logo', // accessible label
  COMPANY, // unique letter paths
  '0 0 320 65', // viewBox
  320, // width
  65, // height
);
```

### Special layouts

Some logos don't follow the standard layout and define their paths directly:

- **hve** — dots appear in the middle (`HELSE [dots] VEST`)
- **hbe-hus / hst-sus** — two-line layout with a subtitle
- **sav** — no "HELSE" prefix (`SJUKEHUSAPOTEKA VEST`)
- **dots** — only the five dots, square viewBox

## Adding a new logo

1. Create `logos/logo-<key>.ts` with a `LogoDefinition`.
   - Use `buildLogo()` if the layout is standard, or define paths manually.
2. Import and add it to the `LOGOS` map in `logo-paths.ts`.
3. Done — `LogoCompany` updates automatically from the map keys.
