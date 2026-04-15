#!/usr/bin/env node

/**
 * Generate a JSON data file for an MCP server from the hviktor library + demo examples.
 *
 * Usage:
 *   npm run generate:mcp-docs
 *   npm run generate:mcp-docs -- --out docs/mcp/custom.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LIB_SRC_DIR = path.join(ROOT, 'projects', 'hviktor', 'src');
const DEMO_COMPONENTS_DIR = path.join(ROOT, 'src', 'app', 'demo', 'pages', 'components');
const DEFAULT_OUTPUT = path.join(ROOT, 'docs', 'mcp', 'hviktor-angular.mcp-docs.json');

function parseArgs(argv) {
  const args = { out: DEFAULT_OUTPUT };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out' && argv[i + 1]) {
      args.out = path.resolve(ROOT, argv[i + 1]);
      i += 1;
    }
  }

  return args;
}

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function normalizeWhitespace(text) {
  return text.replace(/\r\n/g, '\n').trim();
}

function extractSummary(source) {
  const match = source.match(/@summary\s*([\s\S]*?)(?:\n\s*\*\s*@\w+|\*\/)/);
  if (!match) return '';

  return normalizeWhitespace(
    match[1]
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, ''))
      .join('\n'),
  );
}

function extractSeeUrl(source) {
  const match = source.match(/@see\s*\{?@?link\s+([^}\s]+)\}?/);
  return match ? match[1].trim() : '';
}

function extractDecoratorType(source) {
  if (/@Directive\s*\(/.test(source)) return 'directive';
  if (/@Component\s*\(/.test(source)) return 'component';
  return '';
}

function extractSelector(source) {
  const match = source.match(/selector\s*:\s*['\"]([^'\"]+)['\"]/);
  return match ? match[1] : '';
}

function extractExportedClass(source) {
  const match = source.match(/export\s+class\s+(\w+)/);
  return match ? match[1] : '';
}

function extractHostBindings(source) {
  const hostMatch = source.match(/host\s*:\s*\{([\s\S]*?)\}\s*,/);
  if (!hostMatch) return [];

  const hostBody = hostMatch[1];
  const keys = [];
  const keyRegex = /(?:^|\n)\s*(?:['\"]([^'\"]+)['\"]|([A-Za-z_$][\w$]*))\s*:/g;
  let match;

  while ((match = keyRegex.exec(hostBody)) !== null) {
    keys.push(match[1] || match[2]);
  }

  return keys;
}

function cleanType(typeText) {
  if (!typeText) return '';
  return typeText.replace(/\s+/g, ' ').trim();
}

function inferInputType(inputOptions, explicitType, defaultValue) {
  if (explicitType) return cleanType(explicitType);

  if (inputOptions && /booleanAttribute/.test(inputOptions)) return 'boolean';
  if (inputOptions && /numberAttribute/.test(inputOptions)) return 'number';

  if (/^(true|false)$/.test((defaultValue || '').trim())) return 'boolean';
  if (/^['\"].*['\"]$/.test((defaultValue || '').trim())) return 'string';
  if (/^\d+(\.\d+)?$/.test((defaultValue || '').trim())) return 'number';

  return 'unknown';
}

function extractInputs(source) {
  const inputs = [];
  const inputRegex =
    /@Input(?:\(([^)]*)\))?\s*(?:readonly\s+)?(\w+)\s*([!?])?\s*(?::\s*([^=;\n]+))?\s*(?:=\s*([^;\n]+))?\s*;/g;
  let match;

  while ((match = inputRegex.exec(source)) !== null) {
    const [, inputOptions = '', name, requiredMarker = '', explicitType = '', defaultValue = ''] =
      match;

    inputs.push({
      name,
      type: inferInputType(inputOptions, explicitType, defaultValue),
      required: requiredMarker === '!',
      default: defaultValue ? defaultValue.trim() : '',
      transform: /booleanAttribute/.test(inputOptions)
        ? 'booleanAttribute'
        : /numberAttribute/.test(inputOptions)
          ? 'numberAttribute'
          : '',
    });
  }

  return inputs;
}

function extractOutputs(source) {
  const outputs = [];
  const outputRegex = /@Output(?:\(([^)]*)\))?\s*(?:readonly\s+)?(\w+)\s*(?::\s*([^=;\n]+))?/g;
  let match;

  while ((match = outputRegex.exec(source)) !== null) {
    const [, outputName = '', name, explicitType = ''] = match;
    outputs.push({
      name,
      alias: outputName ? outputName.trim().replace(/^['\"]|['\"]$/g, '') : '',
      type: cleanType(explicitType),
    });
  }

  return outputs;
}

function toPosixPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function toIdFromPath(filePath) {
  const relative = path.relative(LIB_SRC_DIR, filePath).split(path.sep);
  return relative[0] || '';
}

function collectLibraryEntries() {
  const files = walkFiles(LIB_SRC_DIR).filter((file) => {
    if (!file.endsWith('.ts')) return false;
    if (file.endsWith('.spec.ts')) return false;
    if (file.endsWith('test-setup.ts')) return false;
    if (file.endsWith('public-api.ts')) return false;
    if (file.includes(`${path.sep}testing${path.sep}`)) return false;
    return file.endsWith('.component.ts') || file.endsWith('.directive.ts');
  });

  const entries = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const kind = extractDecoratorType(source);
    const symbol = extractExportedClass(source);

    if (!kind || !symbol) continue;

    entries.push({
      id: toIdFromPath(file),
      kind,
      symbol,
      selector: extractSelector(source),
      summary: extractSummary(source),
      see: extractSeeUrl(source),
      sourceFile: toPosixPath(file),
      sourceOfTruth: 'npm',
      inputs: extractInputs(source),
      outputs: extractOutputs(source),
      hostBindings: extractHostBindings(source),
      examples: [],
    });
  }

  entries.sort((a, b) => {
    const byId = a.id.localeCompare(b.id);
    if (byId !== 0) return byId;
    return a.symbol.localeCompare(b.symbol);
  });

  return entries;
}

function extractInlineTemplate(source) {
  const match = source.match(/template\s*:\s*`([\s\S]*?)`\s*,/);
  return match ? normalizeWhitespace(match[1]) : '';
}

function collectDemoExamples() {
  if (!fs.existsSync(DEMO_COMPONENTS_DIR)) return [];

  const files = walkFiles(DEMO_COMPONENTS_DIR).filter((file) => file.endsWith('.example.ts'));
  const examples = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const relative = path.relative(DEMO_COMPONENTS_DIR, file).split(path.sep);
    const componentId = relative[0] || '';
    const fileName = path.basename(file, '.example.ts');

    examples.push({
      id: fileName,
      title: fileName.replace(/\./g, ' '),
      componentId,
      source: 'demo',
      sourceFile: toPosixPath(file),
      template: extractInlineTemplate(source),
    });
  }

  examples.sort((a, b) => {
    const byComponent = a.componentId.localeCompare(b.componentId);
    if (byComponent !== 0) return byComponent;
    return a.id.localeCompare(b.id);
  });

  return examples;
}

function attachExamples(libraryEntries, examples) {
  const byId = new Map();

  for (const entry of libraryEntries) {
    if (!byId.has(entry.id)) byId.set(entry.id, []);
    byId.get(entry.id).push(entry);
  }

  for (const example of examples) {
    const targets = byId.get(example.componentId) || [];

    for (const target of targets) {
      target.examples.push({
        id: example.id,
        title: example.title,
        source: example.source,
        sourceFile: example.sourceFile,
        template: example.template,
      });
    }
  }
}

function readPackageInfo() {
  const packageJsonPath = path.join(ROOT, 'projects', 'hviktor', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return {
    name: pkg.name,
    version: pkg.version,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const packageInfo = readPackageInfo();
  const libraryEntries = collectLibraryEntries();
  const examples = collectDemoExamples();

  attachExamples(libraryEntries, examples);

  const output = {
    generatedAt: new Date().toISOString(),
    package: packageInfo,
    sources: {
      npm: 'projects/hviktor/src',
      demo: 'src/app/demo/pages/components',
    },
    stats: {
      componentAndDirectiveCount: libraryEntries.length,
      demoExampleCount: examples.length,
    },
    entries: libraryEntries,
  };

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log(`Generated MCP docs: ${toPosixPath(args.out)}`);
  console.log(`- Entries: ${output.stats.componentAndDirectiveCount}`);
  console.log(`- Demo examples: ${output.stats.demoExampleCount}`);
  console.log(`- Package: ${packageInfo.name}@${packageInfo.version}`);
}

main();
