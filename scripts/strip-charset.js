// Designsystemet-CLI legger @charset først i generert tema-CSS. Siden fila blir @import-ert
// havner regelen midt i den samlede stilarken, og esbuild advarer med [invalid-@charset].
const fs = require('node:fs');
const path = require('node:path');

const buildDir = path.join(__dirname, '..', 'projects', 'hviktor', 'src', 'design-tokens-build');

const cssFiles = fs.readdirSync(buildDir).filter((file) => file.endsWith('.css'));

for (const file of cssFiles) {
  const filePath = path.join(buildDir, file);
  const css = fs.readFileSync(filePath, 'utf8');
  const stripped = css.replace(/^@charset\s+"[^"]*";\s*/, '');

  if (stripped !== css) {
    fs.writeFileSync(filePath, stripped);
    console.log(`Fjernet @charset fra ${file}`);
  }
}
