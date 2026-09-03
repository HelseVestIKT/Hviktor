# Bidra til Hviktor

Takk for at du vil bidra til Hviktor! Denne guiden beskriver hvordan du kommer i gang.

## Forutsetninger

- Node.js 20+
- npm 10+
- Angular CLI (`npm install -g @angular/cli`)

## Oppsett

```bash
git clone https://github.com/HelseVestIKT/hviktor.git
npm install
```

## Utviklingsprosess

### 1. Opprett branch

All utvikling skjer i feature-branches fra `main`:

```bash
git checkout main
git pull
git checkout -b feature/<kort-beskrivelse>
```

Branch-navngivning:

- `feature/<beskrivelse>` — Ny funksjonalitet
- `fix/<beskrivelse>` — Bugfiks
- `chore/<beskrivelse>` — Vedlikehold, oppdateringer
- `test/<beskrivelse>` — Tester

### 2. Lag komponent

Bruk scaffold-scriptet for å opprette ny komponent:

```bash
npm run scaffold
```

Eller manuelt: opprett mappe under `projects/hviktor/src/<komponent-navn>/` med:

- `<komponent>.component.ts` eller `<komponent>.directive.ts`
- `index.ts` (barrel export)

Eksporter fra `projects/hviktor/src/public-api.ts`.

### 3. Lag demo-side

```bash
npm run scaffold:demo
```

Kjør demo-appen med `npm start`.

### 4. Skriv tester

Se [TESTING-GUIDE.md](TESTING-GUIDE.md) for komplett testprosedyre.

```bash
# Unit-tester
npm test -- --project hviktor --watch=false

# E2E-tester
npm run test:e2e

# Alt
npm run test:all
```

### 5. Kvalitetskontroll

Prosjektet bruker pre-commit hooks (Husky + lint-staged) som kjører ESLint og Prettier automatisk. Du kan også kjøre manuelt:

```bash
npm run lint
npm run format
```

### 6. Opprett Pull Request

Push branchen din og opprett en PR mot `main`:

```bash
git push -u origin feature/<beskrivelse>
```

**Krav for merging:**

- Lint bestått
- Tester bestått
- Build OK (`npm run build:lib`)
- Minst 1 godkjenning fra [CODEOWNERS](../.github/CODEOWNERS)

Vi bruker **squash merge** for å holde historikken ryddig.

## Commit-konvensjoner

Vi følger [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <kort beskrivelse>

feat: add HviDialog component
fix: correct button variant default
chore: update dependencies
test: add unit tests for HviTable
refactor: simplify popover positioning
docs: update README with new examples
```

## Kodestandard

- **Formatting:** Prettier (kjøres automatisk via pre-commit hook)
- **Linting:** ESLint med angular-eslint
- **Style:** Se `.prettierrc.cjs` og `.editorconfig` for innstillinger
- Single quotes, semicolons, 100 char print width, trailing commas

## Tema og design tokens

Temaet «hvikt» er bygget med [Designsystemets Temabygger](https://theme.designsystemet.no/) og følger med npm-pakken.

| Sti                                         | Rolle                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| `designsystemet.config.json`                | Kilden til temaet. Farger, `borderRadius` og `fontFamily`.                 |
| `design-tokens/`                            | Genererte design tokens. Dette er mappen Tokens Studio i Figma synker mot. |
| `projects/hviktor/src/design-tokens-build/` | Generert CSS og typer. Byggeartefakt — gitignored og skal ikke redigeres.  |

### Endre temaet

1. Generer et nytt tema i Temabyggeren og lim config-en inn i `designsystemet.config.json`.
2. Kjør `npm run tokens` (kjører både `tokens:create` og `tokens:build`).
3. Commit endringene i `designsystemet.config.json` og `design-tokens/`.

`tokens:build` kjøres automatisk før `build:lib`, så CSS-en er alltid i sync med tokens.

Design tokens og generert CSS skal **aldri** redigeres direkte — Digdir regner dem som implementasjonsdetaljer, og endringene forsvinner ved neste `npm run tokens`. Alle tilpasninger gjøres i config-fila. Av samme grunn ligger begge mappene i `.prettierignore`.

CLI-en `@digdir/designsystemet` er pinnet til samme minor-versjon som `@digdir/designsystemet-css` og `-web`. Oppgraderes den ene, må alle tre følge med, og tokens må regenereres.

### Tokens Studio

Designerne synker mot `design-tokens/` via Tokens Studio. Sett «token storage location» til `design-tokens`. Endringer bør ikke pushes fra Tokens Studio — bruk Temabyggeren og config-fila, ellers overskrives de ved neste regenerering.

## Release

Se [RELEASE.md](RELEASE.md) for prosedyre for publisering til npm.

## Rapportere feil

Bruk GitHub Issues med riktig template:

- 🐛 [Bug](https://github.com/HelseVestIKT/hviktor/issues/new?template=bug.yml)
- ✨ [Ny funksjon](https://github.com/HelseVestIKT/hviktor/issues/new?template=feature.yml)
- ➕ [Ny komponent](https://github.com/HelseVestIKT/hviktor/issues/new?template=new-component.yml)

## Prosjektstruktur

```
hviktor/
├── designsystemet.config.json  # Temakonfigurasjon (Temabyggeren)
├── design-tokens/           # Genererte design tokens (Tokens Studio)
├── projects/hviktor/        # Biblioteket (publiseres til npm)
│   ├── src/                 # Komponentkildekode
│   └── schematics/          # ng-add schematic
├── src/                     # Demo-app (GitHub Pages)
├── e2e/                     # E2E-tester (Playwright)
├── scripts/                 # Hjelpescripts
└── TESTING-GUIDE.md         # Testprosedyre
```
