#!/usr/bin/env node

/**
 * Generate example files from demo components.
 *
 * Usage:
 *   npm run generate:examples                    # Generate for all demo files
 *   npm run generate:examples -- dialog          # Generate for specific demo
 *   npm run generate:examples -- path/to/demo.ts # Generate for specific file
 */

const fs = require('fs');
const path = require('path');

const DEMO_DIR = path.resolve(__dirname, '../src/app/demo/pages/components');

// Generated examples will be placed in code-examples subfolder of each component
function getGeneratedDir(demoName) {
  return path.join(DEMO_DIR, demoName, 'code-examples');
}

// Patterns to identify demo wrappers to remove
const DEMO_WRAPPERS = [
  'DemoPageComponent',
  'DemoSectionComponent',
  'app-demo-page',
  'app-demo-section',
];

/**
 * Convert kebab-case to PascalCase
 */
function toPascal(str) {
  return str
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert string to slug (kebab-case, lowercase)
 */
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Parse demo file and extract sections
 */
function parseDemoFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract component name from file path
  const fileName = path.basename(filePath, '.ts');
  const demoName = fileName.replace(/-demo$/, '');

  // Extract imports
  const importMatches = content.match(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?$/gm) || [];
  const imports = importMatches.filter((imp) => {
    // Keep imports that aren't demo-specific
    return (
      !imp.includes('../../../shared') &&
      !imp.includes('../../shared') &&
      !imp.includes('/shared') &&
      !imp.includes('/code-examples/') &&
      !imp.includes('ExampleSource')
    );
  });

  // Extract class body (everything between class declaration and final closing brace)
  const classMatch = content.match(/export\s+class\s+\w+\s*\{([\s\S]*)\}\s*$/);
  let classBody = classMatch ? classMatch[1] : '';

  // Filter out lines that reference ExampleSource or ExampleCode (generated code references)
  const classLines = classBody.split('\n').filter((line) => {
    const trimmed = line.trim();
    return !trimmed.includes('ExampleSource') && !trimmed.includes('ExampleCode');
  });

  // Normalize class body indentation
  const nonEmptyClassLines = classLines.filter((line) => line.trim().length > 0);
  const minClassIndent =
    nonEmptyClassLines.length > 0
      ? nonEmptyClassLines.reduce((min, line) => {
          const indent = line.match(/^(\s*)/)[1].length;
          return Math.min(min, indent);
        }, Infinity)
      : 0;

  classBody = classLines
    .map((line) => {
      if (line.trim().length === 0) return '';
      return line.slice(minClassIndent);
    })
    .join('\n')
    .trim();

  // Extract template content
  const templateMatch = content.match(/template:\s*`([\s\S]*?)`\s*[,}]/);
  const fullTemplate = templateMatch ? templateMatch[1] : '';

  // Parse sections from template
  const sections = extractSections(fullTemplate);

  // Extract HVI imports from the original imports
  const hviImportMatch = content.match(
    /import\s+\{([^}]+)\}\s+from\s+['"]@helsevestikt\/hviktor['"]/,
  );
  const allHviImports = hviImportMatch
    ? hviImportMatch[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Extract Angular imports
  const angularImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]@angular\/core['"]/);
  const angularImports = angularImportMatch
    ? angularImportMatch[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return {
    demoName,
    imports,
    classBody,
    sections,
    allHviImports,
    angularImports,
  };
}

/**
 * Extract app-demo-section blocks from template
 */
function extractSections(template) {
  const sections = [];

  // Match app-demo-section tags with their content
  // Handle both self-closing attributes and nested content
  const sectionRegex = /<app-demo-section\s+([^>]*?)>([\s\S]*?)<\/app-demo-section>/g;

  let match;
  while ((match = sectionRegex.exec(template)) !== null) {
    const attributes = match[1];
    const rawContent = match[2];

    // Normalize indentation of content
    const contentLines = rawContent.split('\n');
    const nonEmptyLines = contentLines.filter((line) => line.trim().length > 0);
    const minIndent =
      nonEmptyLines.length > 0
        ? nonEmptyLines.reduce((min, line) => {
            const indent = line.match(/^(\s*)/)[1].length;
            return Math.min(min, indent);
          }, Infinity)
        : 0;

    const normalizedContent = contentLines
      .map((line) => {
        if (line.trim().length === 0) return '';
        return line.slice(minIndent);
      })
      .join('\n')
      .trim();

    // Extract title from attributes
    const titleMatch = attributes.match(/title\s*=\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    // Extract description from attributes
    const descMatch = attributes.match(/description\s*=\s*["']([^"']+)["']/);
    const description = descMatch ? descMatch[1] : '';

    sections.push({
      title,
      description,
      content: normalizedContent,
      slug: toSlug(title),
    });
  }

  return sections;
}

/**
 * Analyze template content to find required HVI components
 */
function findRequiredImports(content, allHviImports) {
  const required = new Set();

  for (const imp of allHviImports) {
    // Skip demo wrappers
    if (DEMO_WRAPPERS.includes(imp)) continue;

    // Check if the import is used in the content
    // Components: hvi-component-name or HviComponentName
    // Directives: hviDirectiveName or [hviDirectiveName]
    const kebabName = imp
      .replace(/^Hvi/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    const selectorPattern = new RegExp(
      `(hvi-${kebabName}|hvi${imp.replace(/^Hvi/, '')}|\\[hvi${imp.replace(/^Hvi/, '')}\\])`,
      'i',
    );

    if (selectorPattern.test(content) || content.includes(imp)) {
      required.add(imp);
    }
  }

  return Array.from(required);
}

/**
 * Find required Angular imports based on content
 */
function findRequiredAngularImports(content, classBody, allAngularImports) {
  const required = new Set();

  // Always need Component
  required.add('Component');

  // Check for signal usage
  if (classBody.includes('signal(') || content.includes('()')) {
    required.add('signal');
  }

  // Check for input usage
  if (classBody.includes('input(') || classBody.includes('input.required')) {
    required.add('input');
  }

  // Check for output usage
  if (classBody.includes('output(')) {
    required.add('output');
  }

  // Check for computed usage
  if (classBody.includes('computed(')) {
    required.add('computed');
  }

  // Check for effect usage
  if (classBody.includes('effect(')) {
    required.add('effect');
  }

  // Check for ViewChild usage
  if (classBody.includes('viewChild(') || classBody.includes('@ViewChild')) {
    required.add('viewChild');
  }

  return Array.from(required);
}

/**
 * Generate example component code
 */
function generateExampleComponent(demoName, section, classBody, allHviImports, angularImports) {
  const pascalDemoName = toPascal(demoName);
  const pascalSectionName = toPascal(section.slug);
  const className = `${pascalDemoName}${pascalSectionName}ExampleComponent`;
  const selector = `app-${demoName}-${section.slug}-example`;

  // Find required imports for this section
  const requiredHviImports = findRequiredImports(section.content, allHviImports);
  const requiredAngularImports = findRequiredAngularImports(
    section.content,
    classBody,
    angularImports,
  );

  // Build import statements
  const importLines = [];

  if (requiredAngularImports.length > 0) {
    importLines.push(`import { ${requiredAngularImports.join(', ')} } from '@angular/core';`);
  }

  if (requiredHviImports.length > 0) {
    importLines.push(`import { ${requiredHviImports.join(', ')} } from '@helsevestikt/hviktor';`);
  }

  // Build imports array for @Component
  const componentImports = requiredHviImports.length > 0 ? requiredHviImports.join(', ') : '';

  // Template is already normalized in extractSections
  const cleanTemplate = section.content;

  // Generate the component
  const code = `${importLines.join('\n')}

@Component({
  selector: '${selector}',
  standalone: true,${componentImports ? `\n  imports: [${componentImports}],` : ''}
  template: \`
    ${cleanTemplate.split('\n').join('\n    ')}
  \`,
})
export class ${className} {
  ${classBody.split('\n').join('\n  ')}
}
`;

  return {
    fileName: `${demoName}.${section.slug}.example.ts`,
    className,
    code: code.trim() + '\n',
    slug: section.slug,
    title: section.title,
  };
}

/**
 * Generate source string file for raw import
 */
function generateSourceFile(example) {
  const escapedCode = example.code
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  return `// Auto-generated - do not edit manually
export const ${example.className.replace('Component', 'Source')} = \`${escapedCode}\`;
`;
}

/**
 * Generate index file for a component's examples
 */
function generateIndexFile(demoName, examples) {
  const exports = examples.map((ex) => `export * from './${ex.fileName.replace('.ts', '')}';`);
  const sourceExports = examples.map(
    (ex) => `export * from './${ex.fileName.replace('.ts', '.source')}';`,
  );

  return `// Auto-generated - do not edit manually
${exports.join('\n')}
${sourceExports.join('\n')}
`;
}

/**
 * Generate manifest file with metadata for all examples
 */
function generateManifestFile(demoName, examples) {
  const manifest = examples.map((ex) => ({
    slug: ex.slug,
    title: ex.title,
    className: ex.className,
    sourceExport: ex.className.replace('Component', 'Source'),
  }));

  return `// Auto-generated - do not edit manually
export const ${toPascal(demoName)}ExamplesManifest = ${JSON.stringify(manifest, null, 2)} as const;

export type ${toPascal(demoName)}ExampleSlug = ${examples.map((e) => `'${e.slug}'`).join(' | ')};
`;
}

/**
 * Process a single demo file
 */
function processDemoFile(filePath) {
  console.log(`Processing: ${filePath}`);

  const parsed = parseDemoFile(filePath);

  if (parsed.sections.length === 0) {
    console.log(`  No sections found in ${filePath}`);
    return null;
  }

  const componentDir = getGeneratedDir(parsed.demoName);

  // Ensure directory exists
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const examples = [];

  for (const section of parsed.sections) {
    const example = generateExampleComponent(
      parsed.demoName,
      section,
      parsed.classBody,
      parsed.allHviImports,
      parsed.angularImports,
    );

    examples.push(example);

    // Write example file
    const examplePath = path.join(componentDir, example.fileName);
    fs.writeFileSync(examplePath, example.code, 'utf8');
    console.log(`  Generated: ${example.fileName}`);

    // Write source file
    const sourcePath = path.join(componentDir, example.fileName.replace('.ts', '.source.ts'));
    fs.writeFileSync(sourcePath, generateSourceFile(example), 'utf8');
    console.log(`  Generated: ${example.fileName.replace('.ts', '.source.ts')}`);
  }

  // Write index file
  const indexPath = path.join(componentDir, 'index.ts');
  fs.writeFileSync(indexPath, generateIndexFile(parsed.demoName, examples), 'utf8');
  console.log(`  Generated: index.ts`);

  // Write manifest file
  const manifestPath = path.join(componentDir, 'manifest.ts');
  fs.writeFileSync(manifestPath, generateManifestFile(parsed.demoName, examples), 'utf8');
  console.log(`  Generated: manifest.ts`);

  // Update the demo file to include the code examples
  updateDemoFile(filePath, parsed.demoName, examples);

  return {
    demoName: parsed.demoName,
    examples,
  };
}

/**
 * Update the demo file to include imports and code bindings
 */
function updateDemoFile(filePath, demoName, examples) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Generate import statements for all examples
  const newImports = examples.map((ex) => {
    const sourceExport = ex.className.replace('Component', 'Source');
    return `import { ${sourceExport} } from './code-examples/${ex.fileName.replace('.ts', '.source')}';`;
  });

  // Check if imports already exist
  const existingImports = newImports.filter((imp) => content.includes(imp));
  const importsToAdd = newImports.filter((imp) => !content.includes(imp));

  if (importsToAdd.length > 0) {
    // Find the last import statement and add new imports after it
    const lastImportMatch = content.match(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertPosition = lastImportIndex + lastImport.length;
      content =
        content.slice(0, insertPosition) +
        '\n' +
        importsToAdd.join('\n') +
        content.slice(insertPosition);
    }
  }

  // Update each app-demo-section to include [code] binding
  for (const example of examples) {
    const sourceExport = example.className.replace('Component', 'Source');
    const propertyName = toCamelCase(example.slug) + 'Code';

    // Find the section by title and add [code] binding if not present
    const sectionRegex = new RegExp(
      `(<app-demo-section[^>]*title=["']${escapeRegex(example.title)}["'])([^>]*>)`,
      'g',
    );

    content = content.replace(sectionRegex, (match, beforeTitle, afterTitle) => {
      // Check if [code] is already bound
      if (match.includes('[code]')) {
        return match;
      }
      return `${beforeTitle} [code]="${propertyName}"${afterTitle}`;
    });
  }

  // Add properties to the class
  const classMatch = content.match(/export\s+class\s+(\w+)\s*\{/);
  if (classMatch) {
    const className = classMatch[1];
    const classStartIndex = content.indexOf(classMatch[0]) + classMatch[0].length;

    // Generate property declarations
    const newProperties = examples
      .map((ex) => {
        const sourceExport = ex.className.replace('Component', 'Source');
        const propertyName = toCamelCase(ex.slug) + 'Code';
        return `readonly ${propertyName} = ${sourceExport};`;
      })
      .filter((prop) => !content.includes(prop));

    if (newProperties.length > 0) {
      // Find if there's existing content in the class
      const afterClass = content.slice(classStartIndex);
      const hasContent = afterClass.trim().startsWith('}') === false;

      const propertyBlock = newProperties.map((p) => `  ${p}`).join('\n');

      if (hasContent) {
        // Insert after the opening brace with a newline
        content =
          content.slice(0, classStartIndex) +
          '\n' +
          propertyBlock +
          '\n' +
          content.slice(classStartIndex);
      } else {
        // Empty class, just add properties
        content =
          content.slice(0, classStartIndex) +
          '\n' +
          propertyBlock +
          '\n' +
          content.slice(classStartIndex);
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated: ${path.basename(filePath)}`);
}

/**
 * Convert slug to camelCase
 */
function toCamelCase(str) {
  return str
    .split('-')
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find all demo files
 */
function findAllDemoFiles() {
  const demoFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('-demo.ts')) {
        demoFiles.push(fullPath);
      }
    }
  }

  walkDir(DEMO_DIR);
  return demoFiles;
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);

  let filesToProcess = [];

  if (args.length === 0) {
    // Process all demo files
    filesToProcess = findAllDemoFiles();
  } else {
    const target = args[0];

    // Check if it's a full path
    if (fs.existsSync(target)) {
      filesToProcess = [target];
    } else {
      // Assume it's a component name
      const demoPath = path.join(DEMO_DIR, target, `${target}-demo.ts`);
      if (fs.existsSync(demoPath)) {
        filesToProcess = [demoPath];
      } else {
        console.error(`Demo file not found: ${demoPath}`);
        process.exit(1);
      }
    }
  }

  if (filesToProcess.length === 0) {
    console.log('No demo files found to process.');
    return;
  }

  console.log(`Found ${filesToProcess.length} demo file(s) to process.\n`);

  const results = [];
  for (const file of filesToProcess) {
    const result = processDemoFile(file);
    if (result) {
      results.push(result);
    }
  }

  console.log(`\nGenerated examples for ${results.length} demo(s).`);
}

main();
