# Hviktor Angular Demo App

This demo app showcases the Hviktor Angular component library in a running shell so you can preview components before publishing to npm.

## Prerequisites

- Node.js 20.x
- npm 10+

## Run locally

```bash
npm install
npm start
```

The dev server listens on http://localhost:4200/ with hot reload enabled.

## What the demo shows

- Landing page linking to component groups (buttons, alerts, badges, forms, etc.)
- Interactive previews wired to sample data

## Adding a new demo component

Use the scaffold script to quickly create a new demo page:

```bash
npm run scaffold:demo -- <name> "<description>"
```

Example:

```bash
npm run scaffold:demo -- table "Tabeller for datavisning"
```

This will:

1. Create a new folder in `src/app/demo/pages/components/<name>/`
2. Generate a demo component with `DemoPageComponent` and `DemoSectionComponent`
3. Register the component in `demo-components.ts` (appears in sidebar)
4. Add a route in `app.routes.ts`

After running the script, open the generated file and add the Hviktor components you want to demonstrate.

## Useful scripts

| Script                  | Description                       |
| ----------------------- | --------------------------------- |
| `npm start`             | Starts the dev server             |
| `npm run build`         | Builds the demo into `dist/`      |
| `npm run lint`          | Runs ESLint                       |
| `npm run test`          | Runs unit tests (headless Chrome) |
| `npm run scaffold:demo` | Creates a new demo component page |
