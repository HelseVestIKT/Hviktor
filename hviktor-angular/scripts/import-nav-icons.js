#!/usr/bin/env node

/**
 * Import NAV Aksel icons and generate Angular components
 * 
 * This script:
 * 1. Reads icon data from @navikt/aksel-icons package
 * 2. Generates an icon component file for each icon
 * 3. Updates the public-api.ts with all exports
 * 
 * Usage: node scripts/import-nav-icons.js
 */

const fs = require('fs');
const path = require('path');

// First, you need to install @navikt/aksel-icons
// npm install @navikt/aksel-icons --save-dev

const ICONS_DIR = path.join(__dirname, '../projects/icons/src/lib/icons');
const PUBLIC_API_PATH = path.join(__dirname, '../projects/icons/src/public-api.ts');

// Try to load the icon data from @navikt/aksel-icons
let iconMetadata;
try {
  // The package exports metadata about all icons
  const akselPath = require.resolve('@navikt/aksel-icons/metadata.json');
  iconMetadata = require(akselPath);
} catch (error) {
  console.error('❌ Could not find @navikt/aksel-icons package.');
  console.error('   Please install it first:');
  console.error('   npm install @navikt/aksel-icons --save-dev');
  process.exit(1);
}

/**
 * Convert PascalCase to kebab-case
 * Example: "ChevronDown" -> "chevron-down"
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Convert kebab-case to PascalCase
 * Example: "chevron-down" -> "ChevronDown"
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Extract SVG path data from NAV icon component
 */
function extractSvgPath(iconName) {
  try {
    // Import the icon from @navikt/aksel-icons
    const iconModule = require(`@navikt/aksel-icons`);
    const IconComponent = iconModule[iconName];
    
    if (!IconComponent) {
      console.warn(`⚠️  Could not find icon: ${iconName}`);
      return null;
    }

    // The icon components from NAV contain the SVG data
    // We need to render it to extract the path
    // For now, we'll read it from the source files
    const iconFilePath = require.resolve(`@navikt/aksel-icons/dist/esm/${iconName}.js`);
    const iconFileContent = fs.readFileSync(iconFilePath, 'utf-8');
    
    // Extract path d attribute using regex
    const pathMatch = iconFileContent.match(/d="([^"]+)"/);
    if (pathMatch) {
      return pathMatch[1];
    }
    
    return null;
  } catch (error) {
    console.error(`❌ Error extracting path for ${iconName}:`, error.message);
    return null;
  }
}

/**
 * Generate icon component file content
 */
function generateComponentFile(iconName, svgPath) {
  const kebabName = toKebabCase(iconName.replace(/Icon$/, ''));
  const className = `HviIcon${iconName.replace(/Icon$/, '')}`;
  
  return `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-${kebabName}',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} extends HviIconBase {
  protected override readonly path =
    '${svgPath}';
}
`;
}

/**
 * Main function to import all icons
 */
async function importIcons() {
  console.log('🚀 Importing NAV Aksel icons...\n');

  // Ensure icons directory exists
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  const iconModule = require('@navikt/aksel-icons');
  const iconNames = Object.keys(iconModule).filter(name => name.endsWith('Icon'));
  
  console.log(`Found ${iconNames.length} icons to import\n`);

  const generatedComponents = [];
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const iconName of iconNames) {
    const kebabName = toKebabCase(iconName.replace(/Icon$/, ''));
    const fileName = `icon-${kebabName}.component.ts`;
    const filePath = path.join(ICONS_DIR, fileName);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${kebabName} (already exists)`);
      skipCount++;
      continue;
    }

    // Extract SVG path
    const svgPath = extractSvgPath(iconName);
    
    if (!svgPath) {
      console.error(`❌ Failed to extract path for ${iconName}`);
      errorCount++;
      continue;
    }

    // Generate component file
    const componentContent = generateComponentFile(iconName, svgPath);
    fs.writeFileSync(filePath, componentContent, 'utf-8');
    
    generatedComponents.push({
      fileName: fileName.replace('.ts', ''),
      className: `HviIcon${iconName.replace(/Icon$/, '')}`,
    });

    console.log(`✅ Generated ${fileName}`);
    successCount++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Created: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);

  if (generatedComponents.length > 0) {
    console.log(`\n📝 Updating public-api.ts...`);
    updatePublicApi(generatedComponents);
    console.log(`✅ Updated public-api.ts with ${generatedComponents.length} new exports`);
  }

  console.log('\n🎉 Done!');
}

/**
 * Update public-api.ts with new icon exports
 */
function updatePublicApi(newComponents) {
  let publicApiContent = fs.readFileSync(PUBLIC_API_PATH, 'utf-8');

  // Add exports for new components
  const newExports = newComponents
    .map(({ fileName, className }) => `export { ${className} } from './lib/icons/${fileName}';`)
    .join('\n');

  // Append new exports
  publicApiContent += '\n' + newExports + '\n';

  fs.writeFileSync(PUBLIC_API_PATH, publicApiContent, 'utf-8');
}

// Run the script
importIcons().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
