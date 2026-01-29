#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TYPES = ['component', 'directive'];

const [, , rawType, rawName] = process.argv;

if (!rawType || !rawName) {
  console.error('Usage: npm run scaffold -- <component|directive> <name>');
  process.exit(1);
}

const type = rawType.toLowerCase();
if (!TYPES.includes(type)) {
  console.error(`Unknown type "${rawType}". Expected one of: ${TYPES.join(', ')}`);
  process.exit(1);
}

const nameSegments = rawName
  .split(/[\\/]/)
  .map((segment) => segment.trim())
  .filter(Boolean);

if (nameSegments.length === 0) {
  console.error('Name must contain at least one segment');
  process.exit(1);
}

const baseName = nameSegments[nameSegments.length - 1];
const baseDir = path.resolve(__dirname, '../projects/hviktor/src');
const targetDir = path.join(baseDir, ...nameSegments);

if (fs.existsSync(targetDir)) {
  console.error(`Target directory already exists: ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const toPascal = (value) =>
  value
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const pascalName = toPascal(baseName);
const className = `Hvi${pascalName}`;
const typeSuffix = type === 'component' ? 'component' : 'directive';
const fileStem = `${baseName}.${typeSuffix}`;
const mainFilePath = path.join(targetDir, `${fileStem}.ts`);
const indexFilePath = path.join(targetDir, 'index.ts');

const selector = type === 'component' ? `hvi-${baseName}` : `[hvi${pascalName}]`;

const docComment = `/**
 * @summary
 * ${pascalName} ${type} description.
 *
 * @example
 * \`\`\`html
 * <${selector}></${selector}>
 * \`\`\`
 *
 * Documentation: https://designsystemet.no/en/components/docs/input/code
 */
`;
const mainFileTemplate =
  type === 'component'
    ? `import { Component } from '@angular/core';

${docComment}
@Component({
  selector: '${selector}',
  standalone: true,
  template: '<ng-content />',
  host: {},
})
export class ${className} {}
`
    : `import { Directive } from '@angular/core';

${docComment}
@Directive({
  selector: '${selector}',
  standalone: true,
  host: {},
})
export class ${className} {}
`;

fs.writeFileSync(mainFilePath, mainFileTemplate, { encoding: 'utf8' });
fs.writeFileSync(indexFilePath, `export * from './${fileStem}';
`, { encoding: 'utf8' });

const publicApiPath = path.join(baseDir, 'public-api.ts');
const exportPath = `./${nameSegments.join('/')}`;
const exportLine = `export * from '${exportPath}';`;

let publicApiContent = fs.readFileSync(publicApiPath, 'utf8');
if (!publicApiContent.includes(exportLine)) {
  if (!publicApiContent.endsWith('\n')) {
    publicApiContent += '\n';
  }
  publicApiContent += `${exportLine}\n`;
  fs.writeFileSync(publicApiPath, publicApiContent, { encoding: 'utf8' });
}

console.log(`Created ${type} at ${path.relative(baseDir, targetDir)}`);
