# Hviktor Icons

A collection of **947 icons** from [NAV Aksel](https://aksel.nav.no/komponenter/ikoner) that can be used in both **Angular** and **Blazor** (or any other framework) projects. The icons are built as Angular components but can also be used as Web Components for cross-framework compatibility.

## Installation

```bash
npm install @helsevestikt/hviktor-icons
```

## Features

- ✅ **947 icons** from NAV Aksel design system
- ✅ **Angular components** with full TypeScript support
- ✅ **Web Components** for use in any framework (Blazor, React, Vue, etc.)
- ✅ **Three sizes**: `sm` (16px), `md` (24px), `lg` (32px)
- ✅ **Customizable** via CSS `color` property
- ✅ **Tree-shakeable** - only import what you need

## Usage

### Option 1: Angular Components (Angular Projects Only)

Import individual icon components directly in your Angular application:

```typescript
import { Component } from '@angular/core';
import { HviIconPerson, HviIconHouse, HviIconCheckmark } from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-example',
  imports: [HviIconPerson, HviIconHouse, HviIconCheckmark],
  template: `
    <hvi-icon-person size="sm" />
    <hvi-icon-house size="md" />
    <hvi-icon-checkmark size="lg" />
  `,
})
export class ExampleComponent {}
```

**Available sizes:** `'sm'` (16px), `'md'` (24px), `'lg'` (32px)

### Option 2: Web Components (Angular, Blazor, React, Vue, etc.)

#### Angular with Web Components

Register the icons as custom elements in your application:

```typescript
// In main.ts or app initialization
import { registerIconsAsCustomElements } from '@helsevestikt/hviktor-icons';

registerIconsAsCustomElements();

// Then use in any component template
@Component({
  template: `
    <hvi-icon-person size="md"></hvi-icon-person>
    <hvi-icon-house size="lg"></hvi-icon-house>
  `
})
```

#### Blazor / ASP.NET Core

See the complete [Blazor Integration Guide](https://github.com/helsevestikt/hviktor-angular/blob/main/projects/icons/BLAZOR_GUIDE.md) for detailed instructions.

**Quick Start:**

**1. Install the package:**

```bash
npm install @helsevestikt/hviktor-icons
```

**2. Copy the bundle to wwwroot:**

```powershell
Copy-Item "node_modules/@helsevestikt/hviktor-icons/bundles/hviktor-icons.js" -Destination "wwwroot/js/" -Force
```

**3. Add to your layout file (`_Host.cshtml`, `_Layout.cshtml`, or `index.html`):**

```html
<script src="~/js/hviktor-icons.js"></script>
<script>
  if (window.HvictorIcons) {
    HvictorIcons.register();
  }
</script>
```

**4. Use in Razor components:**

```razor
@page "/dashboard"

<div class="header">
  <hvi-icon-house size="lg"></hvi-icon-house>
  <h1>Dashboard</h1>
</div>

<hvi-icon-checkmark-circle size="md"></hvi-icon-checkmark-circle>
<hvi-icon-exclamationmark-triangle size="md"></hvi-icon-exclamationmark-triangle>

<style>
  hvi-icon-house {
    color: #0078d4;
  }

  hvi-icon-checkmark-circle {
    color: #107c10;
  }

  hvi-icon-exclamationmark-triangle {
    color: #d83b01;
  }
</style>
```

#### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="path/to/hviktor-icons.js"></script>
  </head>
  <body>
    <hvi-icon-person size="md"></hvi-icon-person>
    <hvi-icon-house size="lg"></hvi-icon-house>

    <script>
      HvictorIcons.register();
    </script>
  </body>
</html>
```

## Available Icons

All **947 icons** from [NAV Aksel](https://aksel.nav.no/komponenter/ikoner) are available. Icon names follow the pattern `hvi-icon-{name}`.

### Icon Categories

- **Accessibility** (12 icons): braille, wheelchair, hearing-loop, etc.
- **Arrows** (52 icons): arrow-up, arrow-down, chevron-right, caret-left, etc.
- **Development** (20 icons): code, terminal, database, cloud, etc.
- **Files and application** (48 icons): file-pdf, folder, download, upload, etc.
- **Home** (46 icons): house, bed, calculator, book, etc.
- **Interface** (92 icons): chat, search, settings, trash, pencil, etc.
- **Law and security** (21 icons): shield, lock, gavel, passport, etc.
- **Media** (25 icons): play, pause, video, microphone, speaker, etc.
- **Money** (12 icons): wallet, card, receipt, piggybank, etc.
- **Nature and animals** (25 icons): sun, moon, flower, mountain, etc.
- **People** (38 icons): person, person-group, handshake, eye, etc.
- **Statistics and math** (28 icons): bar-chart, pie-chart, line-graph, etc.
- **Status** (36 icons): checkmark, x-mark, information, warning, etc.
- **Transportation** (21 icons): car, bus, train, airplane, bicycle, etc.
- **Wellness** (24 icons): first-aid, hospital, pill, stethoscope, etc.
- **Workplace** (24 icons): briefcase, buildings, door, meeting, etc.

### Example Icon Names

```html
<hvi-icon-checkmark size="md"></hvi-icon-checkmark>
<hvi-icon-x-mark size="md"></hvi-icon-x-mark>
<hvi-icon-information size="md"></hvi-icon-information>
<hvi-icon-exclamationmark-triangle size="md"></hvi-icon-exclamationmark-triangle>
<hvi-icon-chevron-down size="sm"></hvi-icon-chevron-down>
<hvi-icon-chevron-up size="sm"></hvi-icon-chevron-up>
<hvi-icon-person size="lg"></hvi-icon-person>
<hvi-icon-file-pdf size="md"></hvi-icon-file-pdf>
<hvi-icon-trash size="sm"></hvi-icon-trash>
```

Browse all icons at: https://aksel.nav.no/komponenter/ikoner

## Building

### Build the Angular Library

To build the library for npm distribution:
This section is for contributors developing the icon library itself.

### Project Structure

```
projects/icons/
├── src/
│   ├── lib/
│   │   ├── icons/           # 947 icon components
│   │   ├── base-icon.component.ts
│   │   └── register-elements.ts  # Auto-generated
│   └── public-api.ts        # Auto-generated exports
├── BLAZOR_GUIDE.md
├── IMPORT_NAV_ICONS.md
└── README.md
```

### Adding New Icons

To import additional icons from NAV Aksel:

```bash
# Download and extract icons
Invoke-WebRequest -Uri "https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip" -OutFile "aksel-icons.zip"
Expand-Archive -Path aksel-icons.zip -DestinationPath temp/aksel-icons

# Flatten to single directory
mkdir temp/all-icons
Get-ChildItem -Path "temp/aksel-icons" -Recurse -Filter "*.svg" | Copy-Item -Destination "temp/all-icons"

# Import all icons
npm run import:nav-icons temp/all-icons

# Generate register-elements.ts
npm run generate:register

# Build and test
npm run build:icons:bundle
```

See [IMPORT_NAV_ICONS.md](./IMPORT_NAV_ICONS.md) for detailed instructions.
This creates the library in `dist/icons/` with all necessary files for npm.

### Build the Web Components Bundle

To create the standalone Web Components bundle for Blazor and other frameworks:

```bash
npm run build:icons:bundle
```

use `currentColor` for the fill, so they inherit the text color. You can style them using CSS:

```css
/* Change color */
.success-icon {
  color: #107c10; /* Green */
}

.error-icon {
  color: #d83b01; /* Red */
}

.info-icon {
  color: #0078d4; /* Blue */
}

/* Icons automatically adjust to font-size if not using size attribute */
.large-icon {
  font-size: 48px;
}
```

## Icon Sizes

Three predefined sizes are available via the `size` attribute:

- `size="sm"` - 16px (small)
- `size="md"` - 24px (medium, default)
- `size="lg"` - 32px (large)

````html
<hvi-icon-checkmark size="sm"></hvi-icon-checkmark>
<hvi-icon-checkmark size="md"></hvi-icon-checkmark>
<hvi-icon-checkmark size="lg"></hvi-icon-checkmark>
```bash npm run publish:icons
````

This will:

1. Bump the patch version
2. Build the Angular library
3. Build the Web Components bundle
4. Publish to npm

## Development

### Adding New Icons

1. Create a new component in `projects/icons/src/lib/icons/`
2. Export it from `public-api.ts`
3. Register it in `register-elements.ts`

### Running Tests

```bash
ng test icons
```

## Styling

Icons inherit the current text color via `currentColor`. You can style them using CSS:

```css
.my-icon {
  color: blue;
  font-size: 24px; /* For custom sizes */
}
```

## Browser Support

- Modern browsers with Web Components support (Chrome, Firefox, Safari, Edge)
- Polyfills may be needed for older browsers

## License

See the LICENSE file in the repository.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
