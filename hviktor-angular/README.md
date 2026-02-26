# Hviktor Angular Demo App

Demoappen syner Hviktor Angular-komponentbiblioteket i ein køyrande applikasjon, slik at du kan førehandsvise komponentar før publisering til npm.

Sjå [root README](../README.md) for fullstendig dokumentasjon om utvikling, script, kodekvalitet og Git-arbeidsflyt.

## Køyre lokalt

```bash
npm install
npm run build:lib
npm start
```

Dev-serveren lyttar på http://localhost:4200/ med hot reload.

> **Merk:** Biblioteket må byggjast først (`npm run build:lib`) for at demoappen skal vise siste endringar.

## Kva demoen viser

- Landingsside med lenkjer til komponentgrupper (knappar, varsel, badges, skjema, osv.)
- Interaktive førehandsvisingar med eksempeldata
- "Vis kode"-knappar som viser implementasjonseksempel

## Struktur

```
src/
  app/
    demo/
      layout/          – Sidebar og hovudlayout
      pages/           – Éin mappe per komponent-demo
      shared/          – DemoPageComponent, DemoSectionComponent
      services/        – ThemeService (mørk/lys modus)
      demo-components.ts – Registry for sidebar-navigasjon
    app.routes.ts      – Lazy-lasta ruter for kvar demo
```
