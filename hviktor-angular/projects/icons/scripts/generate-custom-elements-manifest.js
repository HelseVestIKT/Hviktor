#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'src', 'lib', 'webcomponents');
const outputDir = path.join(rootDir, 'dist');
const outputFile = path.join(outputDir, 'custom-elements.json');

function getWebComponentFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.webcomponent.ts'))
    .sort((a, b) => a.localeCompare(b));
}

function readClassName(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const classMatch = content.match(/export\s+class\s+(\w+)\s+extends\s+\w+/);
  return classMatch ? classMatch[1] : null;
}

function readTagName(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const tagMatch = content.match(/customElements\.define\('([^']+)'\s*,/);
  return tagMatch ? tagMatch[1] : null;
}

function buildManifest(files) {
  const modules = files
    .map((file) => {
      const sourceFilePath = path.join(sourceDir, file);
      const className = readClassName(sourceFilePath);
      const tagName = readTagName(sourceFilePath);
      const jsFile = file.replace('.ts', '.js');
      const modulePath = `dist/lib/webcomponents/${jsFile}`;

      if (!className || !tagName) {
        return null;
      }

      return {
        kind: 'javascript-module',
        path: modulePath,
        declarations: [
          {
            kind: 'class',
            name: className,
            customElement: true,
            tagName,
            superclass: {
              name: 'HviIconBase',
            },
            attributes: [
              {
                name: 'size',
                type: {
                  text: "'sm' | 'md' | 'lg'",
                },
              },
            ],
            events: [
              {
                name: 'hvi-size-change',
                type: {
                  text: 'CustomEvent<HviIconSizeChangeDetail>',
                },
              },
            ],
          },
        ],
        exports: [
          {
            kind: 'js',
            name: className,
            declaration: {
              name: className,
              module: modulePath,
            },
          },
        ],
      };
    })
    .filter(Boolean);

  return {
    schemaVersion: '1.0.0',
    readme: '',
    modules,
  };
}

function main() {
  const files = getWebComponentFiles(sourceDir);
  const manifest = buildManifest(files);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`✅ custom-elements manifest generated: ${outputFile}`);
  console.log(`ℹ️ Components discovered: ${manifest.modules.length}`);
}

main();
