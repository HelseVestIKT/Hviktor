# Hviktor Angular

## Formål

Hviktor Angular inneholder Angular komponenter og direktiver som bygger på designsystemet.no. Målet er å beholde stil og tilgjengelighet fra originalen, samtidig som vi tilbyr kjente Angular-API-er. Enkel bruk er prioritert sammen med dokumentasjon og intellisense-støtte i IDE-er.

## Struktur

- `hviktor-angular/projects/hviktor` – biblioteket der komponenter og direktiver utvikles. Blir bygget til `dist/hviktor` og skal publiseres til npm.
- `hviktor-angular/src` – demoapplikasjonen som viser biblioteket og bruker bygg fra `dist/hviktor`. Her kan en lett se komponenter i bruk og teste endringer lokalt.

## Utvikling av komponenter og direktiver
Først og fremst prøver vi å bruke direktiv på komponenter som allerede har et html-element,. f.eks. `button`. I andre tilfeller lager vi komponenter. 

Selve utviklingen gjøres ved å opprette en mappe med komponent/direktiv-navnet i `projects/hviktor/src/`.
I denne mappen opprettes i hovedsak to filer: 
- `komponent-navn.component.ts` – TypeScript-filen som definerer komponenten/direktivet. Ev. `direktiv-navn.directive.ts` for direktiver.
- `index.ts` – Eksporterer komponenten/direktivet for bruk i biblioteket.

Se eksempler i eksisterende komponenter/direktiver i `projects/hviktor/src/`.

Etter at komponenten/direktivet er utviklet, må den legges til som export i `projects/hviktor/src/public-api.ts` for å gjøre den tilgjengelig i biblioteket.

## Byggrutine

1. Utvikle eller oppdater komponenter/direktiv i `projects/hviktor`.
2. Kjør `npm run build:lib` fra `hviktor-angular` for å generere pakken i `dist/hviktor`.
3. Start eller bygg demoappen (`npm start` / `npm run build`) fra `hviktor-angular` for å verifisere endringene via den lokale pakke-referansen.
