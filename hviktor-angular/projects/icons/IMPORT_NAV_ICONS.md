# Importing NAV Aksel Icons

This guide explains how to import all 947 icons from NAV Aksel into your Hviktor icon library.

## Quick Start

### Step 1: Download NAV Icons

Download the icon pack from NAV:

```bash
# Download the zip file
curl -o aksel-icons.zip https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip

# Or use PowerShell
Invoke-WebRequest -Uri "https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip" -OutFile "aksel-icons.zip"
```

### Step 2: Extract the ZIP

Extract the downloaded file to a temporary directory:

```bash
# Create temp directory
mkdir temp

# Extract (PowerShell)
Expand-Archive -Path aksel-icons.zip -DestinationPath temp/aksel-icons
```

### Step 3: Run the Import Script

```bash
npm run import:nav-icons temp/aksel-icons/svg
```

This will:

- ✅ Read all SVG files from the directory
- ✅ Extract the path data from each SVG
- ✅ Generate an Angular component for each icon
- ✅ Update `public-api.ts` with all exports
- ⏭️ Skip icons that already exist

### Step 4: Build and Test

```bash
# Build the icons library with Blazor bundle
npm run build:icons:bundle

# Test in your app
npm start
```

### Step 5: Publish (Optional)

```bash
npm run publish:icons:patch
```

## Icon Structure

Each generated icon component follows this structure:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-chevron-down',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChevronDown extends HviIconBase {
  protected override readonly path =
    'M4.22 8.47a.75.75 0 0 1 1.06 0L12 15.19l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L4.22 9.53a.75.75 0 0 1 0-1.06Z';
}
```

## Usage

### In Angular

```typescript
import { HviIconChevronDown } from '@helsevestikt/hviktor-icons';

@Component({
  imports: [HviIconChevronDown],
  template: '<hvi-icon-chevron-down size="lg" />',
})
export class MyComponent {}
```

### In Blazor

```html
<hvi-icon-chevron-down size="md"></hvi-icon-chevron-down>
```

## Troubleshooting

### No SVG files found

Make sure you've extracted the zip file correctly and the path contains `.svg` files:

```bash
ls temp/aksel-icons/svg/*.svg
```

### Failed to extract path

Some SVG files might have complex structures. The script will skip these and show an error. You can manually create components for these icons.

### Duplicate icons

The script automatically skips icons that already exist. If you want to regenerate an icon, delete the existing file first:

```bash
rm projects/icons/src/lib/icons/icon-chevron-down.component.ts
```

## Icon Categories

NAV Aksel icons include:

- **Accessibility** (12 icons)
- **Arrows** (52 icons)
- **Development** (20 icons)
- **Files and application** (48 icons)
- **Home** (46 icons)
- **Interface** (92 icons)
- **Law and security** (21 icons)
- **Media** (25 icons)
- **Money** (12 icons)
- **Nature and animals** (25 icons)
- **People** (38 icons)
- **Statistics and math** (28 icons)
- **Status** (36 icons)
- **Transportation** (21 icons)
- **Wellness** (24 icons)
- **Workplace** (24 icons)

Total: **947 icons**
