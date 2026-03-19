const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'src', 'lib', 'icons-data.json');
const outFile = path.join(__dirname, '..', 'dist', 'custom-elements.json');

if (!fs.existsSync(dataFile)) {
  console.error(`❌ Missing icon data file: ${dataFile}`);
  process.exit(1);
}

const raw = fs.readFileSync(dataFile, 'utf-8');
const iconData = JSON.parse(raw);

const declarations = iconData.map(icon => ({
  kind: 'class',
  name: icon.className,
  customElement: true,
  tagName: icon.selector,
  members: [
    {
      kind: 'field',
      name: 'size',
      type: {
        text: "'sm' | 'md' | 'lg'"
      },
      attribute: 'size'
    }
  ]
}));

const manifest = {
  schemaVersion: '1.0.0',
  readme: 'README.md',
  modules: [
    {
      kind: 'javascript-module',
      path: 'index.js',
      declarations
    }
  ]
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));

console.log(`✓ Generated ${outFile}`);
