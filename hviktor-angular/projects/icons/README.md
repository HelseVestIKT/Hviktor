# Hviktor Icons

A collection of icons that can be used in both **Angular** and **Blazor** (or any other framework) projects. The icons are built as Angular components but can also be used as Web Components for cross-framework compatibility.

## Installation

```bash
npm install @helsevestikt/hviktor-icons
```

## Usage

### Option 1: Angular Components (Angular Projects Only)

Import individual icon components directly in your Angular application:

```typescript
import { Component } from '@angular/core';
import { HviIconUser, HviIconHome } from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-example',
  imports: [HviIconUser, HviIconHome],
  template: `
    <hvi-icon-user [size]="'md'" />
    <hvi-icon-home [size]="'lg'" />
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
    <hvi-icon-user size="md"></hvi-icon-user>
    <hvi-icon-home size="lg"></hvi-icon-home>
  `
})
```

#### Blazor / ASP.NET Core

**1. Install the package via npm (in your Blazor project root):**

```bash
npm install @helsevestikt/hviktor-icons
```

**2. Copy the bundle to your wwwroot:**

After building the icons library with `npm run build:icons:bundle`, copy the bundle:

```powershell
# From the icons dist folder
Copy-Item "node_modules/@helsevestikt/hviktor-icons/bundles/hviktor-icons.js" -Destination "wwwroot/js/"
```

Or add to your `.csproj` to automate this:

```xml
<ItemGroup>
  <Content Include="node_modules/@helsevestikt/hviktor-icons/bundles/**" CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

**3. Reference in your Blazor layout (`_Host.cshtml`, `_Layout.cshtml`, or `index.html`):**

```html
<script src="~/js/hviktor-icons.js"></script>
<script>
  // Register the custom elements
  HvictorIcons.register();
</script>
```

**4. Use in Razor components:**

```razor
@page "/example"

<div>
  <hvi-icon-user size="md"></hvi-icon-user>
  <hvi-icon-home size="lg"></hvi-icon-home>
</div>

<style>
  /* Style the icons using CSS */
  hvi-icon-user {
    color: #0078d4;
  }

  hvi-icon-home {
    color: #00aa00;
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
    <hvi-icon-user size="md"></hvi-icon-user>
    <hvi-icon-home size="lg"></hvi-icon-home>

    <script>
      // Register the custom elements
      HvictorIcons.register();
    </script>
  </body>
</html>
```

## Available Icons

- `hvi-icon-user`
- `hvi-icon-home`

## Building

### Build the Angular Library

To build the library for npm distribution:

```bash
ng build icons
```

This creates the library in `dist/icons/` with all necessary files for npm.

### Build the Web Components Bundle

To create the standalone Web Components bundle for Blazor and other frameworks:

```bash
npm run build:icons:bundle
```

This creates `dist/icons/bundles/hviktor-icons.js` which can be used directly in any framework.

## Publishing

To publish the library to npm:

```bash
npm run publish:icons
```

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
