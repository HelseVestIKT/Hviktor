const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'src', 'lib', 'icons');
const dataFile = path.join(__dirname, '..', 'src', 'lib', 'icons-data.json');

console.log('Extracting icon data from Angular components...');

if (!fs.existsSync(iconsDir)) {
  console.warn(`Icon source directory not found at: ${iconsDir}`);
  console.warn('Skipping icon data extraction because src/lib/icons does not exist.');
  process.exit(0);
}

// Read all icon component files
const files = fs.readdirSync(iconsDir).filter(f => f.startsWith('icon-') && f.endsWith('.component.ts'));

const iconData = [];

files.forEach(file => {
  const filePath = path.join(iconsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract component selector and path
  const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);
  const pathMatch = content.match(/protected override readonly path\s*=\s*['"]([^'"]+)['"]/);
  const classMatch = content.match(/export class (\w+)/);
  
  if (!selectorMatch || !pathMatch || !classMatch) {
    console.warn(`⚠️  Skipping ${file}: Could not parse component`);
    return;
  }
  
  const selector = selectorMatch[1];
  const pathData = pathMatch[1];
  const className = classMatch[1];
  
  iconData.push({
    selector,
    className,
    path: pathData
  });
  
  console.log(`✓ Extracted ${selector}`);
});

// Save to JSON
fs.writeFileSync(dataFile, JSON.stringify(iconData, null, 2));

console.log(`\n✅ Extracted ${iconData.length} icons to icons-data.json`);
console.log('You can now delete the icons folder and use icons-data.json as your source of truth.');
