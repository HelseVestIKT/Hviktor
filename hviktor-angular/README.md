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

## Generating code examples

Each demo page can display code examples that show users how to implement the components. Use the generate script to automatically create these examples:

```bash
npm run generate:examples -- <component-name>
```

Example:

```bash
npm run generate:examples -- avatar
```

This will:

1. Parse the demo file and extract each `<app-demo-section>`
2. Generate standalone example components in `<component>/code-examples/`
3. Automatically update the demo file with imports and `[code]` bindings

The generated files include:

- `<component>.<section-slug>.example.ts` - Standalone Angular component
- `<component>.<section-slug>.example.source.ts` - Source code as exportable string
- `index.ts` - Barrel exports
- `manifest.ts` - Metadata about all examples

### Workflow

1. Create or edit your demo file with `<app-demo-section>` blocks
2. Run `npm run generate:examples -- <component-name>`
3. The demo will now show "Vis kode" toggles for each section

### Regenerating examples

If you make changes to a demo file, simply run the script again. It will:

- Overwrite example files with updated content
- Skip adding duplicate imports/bindings in the demo file

### Generate all examples

To process all demo files at once:

```bash
npm run generate:examples
```

## Useful scripts

| Script                      | Description                               |
| --------------------------- | ----------------------------------------- |
| `npm start`                 | Starts the dev server                     |
| `npm run build`             | Builds the demo into `dist/`              |
| `npm run lint`              | Runs ESLint                               |
| `npm run test`              | Runs unit tests (headless Chrome)         |
| `npm run scaffold:demo`     | Creates a new demo component page         |
| `npm run generate:examples` | Generates code examples for demo sections |
