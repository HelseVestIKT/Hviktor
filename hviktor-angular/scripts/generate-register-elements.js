#!/usr/bin/env node

/**
 * Generate register-elements.ts with all icon components
 * 
 * This script reads all icon component files and generates the
 * register-elements.ts file that registers them as Web Components.
 * 
 * Usage: node scripts/generate-register-elements.js
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../projects/icons/src/lib/icons');
const REGISTER_FILE = path.join(__dirname, '../projects/icons/src/lib/register-elements.ts');

/**
 * Get all icon component files
 */
function getIconFiles() {
  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌ Icons directory not found: ${ICONS_DIR}`);
    process.exit(1);
  }

  return fs.readdirSync(ICONS_DIR)
    .filter(file => file.startsWith('icon-') && file.endsWith('.component.ts'))
    .sort();
}

/**
 * Extract class name from component file
 */
function getClassName(fileName) {
  const content = fs.readFileSync(path.join(ICONS_DIR, fileName), 'utf-8');
  const match = content.match(/export class (Hvi\w+)/);
  if (!match) {
    console.warn(`⚠️  Could not find class name in ${fileName}`);
    return null;
  }
  return match[1];
}

/**
 * Generate the register-elements.ts content
 */
function generateRegisterFile(iconFiles) {
  const icons = [];

  for (const file of iconFiles) {
    const className = getClassName(file);
    if (!className) continue;

    const kebabName = file.replace('icon-', '').replace('.component.ts', '');
    const tag = `hvi-icon-${kebabName}`;
    const importPath = `./icons/${file.replace('.ts', '')}`;

    icons.push({ className, tag, importPath });
  }

  const imports = icons
    .map(({ className, importPath }) => `import { ${className} } from '${importPath}';`)
    .join('\n');

  const elements = icons
    .map(({ tag, className }) => `  { tag: '${tag}', component: ${className} },`)
    .join('\n');

  return `import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
${imports}

let registered = false;

/**
 * Register all Hviktor icons as custom Web Components.
 * 
 * This allows icons to be used in any framework (Angular, Blazor, React, Vue, etc.)
 * as standard HTML custom elements.
 * 
 * @example
 * // In Angular main.ts or app initialization
 * import { registerIconsAsCustomElements } from '@helsevestikt/hviktor-icons';
 * 
 * registerIconsAsCustomElements();
 * 
 * // Then use anywhere in templates
 * <hvi-icon-user size="md"></hvi-icon-user>
 */
export async function registerIconsAsCustomElements() {
  if (registered) return;

  const app = await createApplication();
  const injector = app.injector;

  const elements = [
${elements}
  ];

  for (const { tag, component } of elements) {
    if (!customElements.get(tag)) {
      const element = createCustomElement(component, { injector });
      customElements.define(tag, element);
    }
  }

  registered = true;
}
`;
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Generating register-elements.ts...\n');

  const iconFiles = getIconFiles();
  console.log(`Found ${iconFiles.length} icon components\n`);

  const content = generateRegisterFile(iconFiles);
  fs.writeFileSync(REGISTER_FILE, content, 'utf-8');

  console.log(`✅ Generated ${REGISTER_FILE}`);
  console.log(`📦 Registered ${iconFiles.length} icons as Web Components\n`);
  console.log('💡 Next steps:');
  console.log('   1. Build: npm run build:icons:bundle');
  console.log('   2. Test the registerIconsAsCustomElements() function');
  console.log('   3. Publish: npm run publish:icons:patch');
}

main();
