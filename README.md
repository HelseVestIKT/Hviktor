# Hviktor Angular

## Formål

Hviktor Angular inneholder Angular komponenter og direktiver som bygger på designsystemet.no. Målet er å beholde stil og tilgjengelighet fra originalen, samtidig som vi tilbyr kjente Angular-API-er. Enkel bruk er prioritert sammen med dokumentasjon og intellisense-støtte i IDE-er.

## Struktur

- `hviktor-angular/projects/hviktor` – biblioteket der komponenter og direktiver utvikles. Blir bygget til `dist/hviktor` og skal publiseres til npm.
- `hviktor-angular/src` – demoapplikasjonen som viser biblioteket og bruker bygg fra `dist/hviktor`. Her kan en lett se komponenter i bruk og teste endringer lokalt.

## Utvikling av komponenter og direktiver

Først og fremst prøver vi å bruke direktiv på komponenter som allerede har et html-element, f.eks. `button`. I andre tilfeller lager vi komponenter.

Selve utviklingen gjøres ved å opprette en mappe med komponent/direktiv-navnet i `projects/hviktor/src/`.
I denne mappen opprettes i hovedsak to filer:

- `komponent-navn.component.ts` – TypeScript-filen som definerer komponenten/direktivet. Ev. `direktiv-navn.directive.ts` for direktiver.
- `index.ts` – Eksporterer komponenten/direktivet for bruk i biblioteket.

Alt dette kan også gjøres ved å kjøre følgende script fra `hviktor-angular`-mappen:

```bash
npm run scaffold -- <type> <name>
```

Hvor `<type>` er enten `component` eller `directive`, og `<name>` er navnet på komponenten/direktivet (kebab-case). For eksempel, for å lage en komponent kalt `alert`, kjør:

```bash
npm run scaffold -- component alert
```

Se eksempler i eksisterende komponenter/direktiver i `projects/hviktor/src/`.

Etter at komponenten/direktivet er utviklet, må den legges til som export i `projects/hviktor/src/public-api.ts` for å gjøre den tilgjengelig i biblioteket.

## Byggrutine

1. Utvikle eller oppdater komponenter/direktiv i `projects/hviktor`.
2. Kjør `npm run build:lib` fra `hviktor-angular` for å generere pakken i `dist/hviktor`.
3. Start eller bygg demoappen (`npm start` / `npm run build`) fra `hviktor-angular` for å verifisere endringene via den lokale pakke-referansen.

## Kodekvalitetsverktøy

For å få full nytte av Prettier kan du følge denne oppskriften:

1. Innstaller extension Prettier - Code formatter i VS Code.
2. Gå til Workspace Settings (Ctrl + ,) og søk etter "Format"
3. Huk av "Format On Save"
4. Under "Default Formatter", velg Prettier - Code formatter

Nå vil Prettier automatisk formatere koden din hver gang du lagrer en fil.

For å få få Husky til å virke, må du gjennom noen steg første gang:

1. `cd hviktor-angular` og kjør `npm install` for å installere alle avhengigheter, inkludert Husky.
2. `cd ..` og kjør `npm --prefix hviktor-angular ci` for å installere avhengigheter i root-prosjektet.
   1. hvis du nå får en EPERM unlink feil, må du ringe en venn
3. Verifiser at alt er riktig ved å kjøre `git config --get core.hooksPath`. Skal returnere noe ala `hviktor-angular/.husky/_`.

- **Husky** kjører pre-commit-hooks og blokkerer commits som ikke passerer lint og format. Installer avhengigheter én gang med `npm install`, så trigges hookene automatisk ved `git commit`. Den sjekker kun filene i projects/hviktor.
- **Prettier** formaterer alle prosjektfiler likt. Kjør manuelt med `npm run format` om du trenger å rydde opp før commit.
- **ESLint** fanger opp vanlige feil og stilbrudd. Lokalt kan du sjekke med `npm run lint`. Husk at Husky kjører samme sjekk når du committer.

Hver gang du gjør en commit formatteres koden automatisk, og hvis det er lint-feil vil commiten bli avvist med en feilmelding som forklarer hva som må fikses.
