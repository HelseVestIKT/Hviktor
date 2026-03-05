#!/usr/bin/env node

/**
 * Import NAV Aksel icons from SVG files
 * 
 * This script:
 * 1. Reads SVG files from a directory
 * 2. Extracts the path data from each SVG
 * 3. Generates an icon component file for each icon
 * 4. Updates the public-api.ts with all exports
 * 
 * Usage:
 * 1. Download icons from: https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip
 * 2. Extract to a folder (e.g., temp/nav-icons/)
 * 3. Run: node scripts/import-nav-icons-from-svg.js temp/nav-icons/svg
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../projects/icons/src/lib/icons');
const PUBLIC_API_PATH = path.join(__dirname, '../projects/icons/src/public-api.ts');

const [, , svgSourceDir] = process.argv;

if (!svgSourceDir) {
  console.error('❌ Please provide the path to SVG files directory');
  console.error('   Usage: node scripts/import-nav-icons-from-svg.js <svg-directory>');
  console.error('');
  console.error('   Example:');
  console.error('   1. Download: https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip');
  console.error('   2. Extract the zip file');
  console.error('   3. Run: node scripts/import-nav-icons-from-svg.js ./aksel-icons/svg');
  process.exit(1);
}

if (!fs.existsSync(svgSourceDir)) {
  console.error(`❌ Directory not found: ${svgSourceDir}`);
  process.exit(1);
}

/**
 * Convert filename to component name
 * Example: "chevron-down.svg" -> "ChevronDown"
 */
function fileNameToComponentName(fileName) {
  return fileName
    .replace('.svg', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Extract path data from SVG file
 */
function extractPathFromSvg(svgContent) {
  // Match path d attribute
  const pathMatches = [...svgContent.matchAll(/<path[^>]+d="([^"]+)"/g)];
  
  if (pathMatches.length === 0) {
    return null;
  }
  
  // If multiple paths, combine them
  if (pathMatches.length > 1) {
    return pathMatches.map(match => match[1]).join(' ');
  }
  
  return pathMatches[0][1];
}

/**
 * Generate icon component file content
 */
function generateComponentFile(componentName, kebabName, svgPath) {
  const className = `HviIcon${componentName}`;
  
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
  console.log('🚀 Importing NAV Aksel icons from SVG files...\n');
  console.log(`📁 Source directory: ${svgSourceDir}\n`);

  // Ensure icons directory exists
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // Read all SVG files
  const svgFiles = fs.readdirSync(svgSourceDir).filter(file => file.endsWith('.svg'));
  
  if (svgFiles.length === 0) {
    console.error('❌ No SVG files found in directory');
    process.exit(1);
  }

  console.log(`Found ${svgFiles.length} SVG files\n`);

  const generatedComponents = [];
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgSourceDir, svgFile);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    
    const kebabName = svgFile.replace('.svg', '');
    const componentName = fileNameToComponentName(svgFile);
    const fileName = `icon-${kebabName}.component.ts`;
    const filePath = path.join(ICONS_DIR, fileName);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${kebabName} (already exists)`);
      skipCount++;
      generatedComponents.push({
        fileName: fileName.replace('.ts', ''),
        className: `HviIcon${componentName}`,
      });
      continue;
    }

    // Extract SVG path
    const pathData = extractPathFromSvg(svgContent);
    
    if (!pathData) {
      console.error(`❌ Failed to extract path from ${svgFile}`);
      errorCount++;
      continue;
    }

    // Generate component file
    const componentContent = generateComponentFile(componentName, kebabName, pathData);
    fs.writeFileSync(filePath, componentContent, 'utf-8');
    
    generatedComponents.push({
      fileName: fileName.replace('.ts', ''),
      className: `HviIcon${componentName}`,
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
    console.log(`✅ Updated public-api.ts with ${generatedComponents.length} exports`);
  }

  console.log('\n🎉 Done!');
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Run: npm run build:icons:bundle`);
  console.log(`   2. Test the icons in your application`);
  console.log(`   3. Publish: npm run publish:icons:patch`);
}

/**
 * Update public-api.ts with new icon exports
 */
function updatePublicApi(allComponents) {
  // Read current public-api.ts
  let publicApiContent = '';
  if (fs.existsSync(PUBLIC_API_PATH)) {
    publicApiContent = fs.readFileSync(PUBLIC_API_PATH, 'utf-8');
  }

  // Get existing icon exports
  const existingExports = new Set();
  const exportMatches = publicApiContent.matchAll(/export { (\w+) } from '\.\/lib\/icons\//g);
  for (const match of exportMatches) {
    existingExports.add(match[1]);
  }

  // Filter out components that are already exported
  const newComponents = allComponents.filter(
    ({ className }) => !existingExports.has(className)
  );

  if (newComponents.length === 0) {
    console.log('   ℹ️  No new exports needed');
    return;
  }

  // Generate new exports
  const newExports = newComponents
    .map(({ fileName, className }) => `export { ${className} } from './lib/icons/${fileName}';`)
    .join('\n');

  // Append or create public-api.ts
  if (publicApiContent) {
    publicApiContent += '\n' + newExports + '\n';
  } else {
    publicApiContent = `// Base icon component\nexport { HviIconBase } from './lib/base-icon.component';\n\n// Icons\n${newExports}\n`;
  }

  fs.writeFileSync(PUBLIC_API_PATH, publicApiContent, 'utf-8');
}

// Run the script
importIcons().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
