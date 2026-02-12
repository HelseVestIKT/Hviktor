#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [, , rawName, rawDescription] = process.argv;

if (!rawName) {
  console.error('Usage: npm run scaffold:demo -- <name> [description]');
  console.error('Example: npm run scaffold:demo -- table "Tabeller for datavisning"');
  process.exit(1);
}

const kebabName = rawName
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

const pascalName = kebabName
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');

const description = rawDescription || `${pascalName} komponent`;

const baseDir = path.resolve(__dirname, '../src/app');
const demoDir = path.join(baseDir, 'demo/pages/components', kebabName);
const demoComponentsPath = path.join(baseDir, 'demo/demo-components.ts');
const routesPath = path.join(baseDir, 'app.routes.ts');

// Sjekk om mappen allerede finnes
if (fs.existsSync(demoDir)) {
  console.error(`Demo-komponent "${kebabName}" finnes allerede: ${demoDir}`);
  process.exit(1);
}

// Opprett demo-komponent-mappen
fs.mkdirSync(demoDir, { recursive: true });

// Lag demo-komponenten
const demoTemplate = `import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-${kebabName}-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: \`
    <app-demo-page
      title="${pascalName}"
      description="${description}"
    >
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for ${pascalName}</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  \`,
})
export class ${pascalName}DemoComponent {}
`;

fs.writeFileSync(path.join(demoDir, `${kebabName}-demo.ts`), demoTemplate, { encoding: 'utf8' });
console.log(`✓ Opprettet: ${demoDir}/${kebabName}-demo.ts`);

// Oppdater demo-components.ts
let demoComponentsContent = fs.readFileSync(demoComponentsPath, 'utf8');

// Finn arrayen og legg til ny komponent
const newEntry = `  { id: '${kebabName}', name: '${pascalName}', description: '${description}' },`;

// Finn siste element før ].sort()
const arrayEndMatch = demoComponentsContent.match(/\].sort\(/);
if (arrayEndMatch) {
  const insertPos = demoComponentsContent.lastIndexOf('},', arrayEndMatch.index) + 2;
  demoComponentsContent =
    demoComponentsContent.slice(0, insertPos) +
    '\n' +
    newEntry +
    demoComponentsContent.slice(insertPos);

  fs.writeFileSync(demoComponentsPath, demoComponentsContent, { encoding: 'utf8' });
  console.log(`✓ La til i: demo-components.ts`);
}

// Oppdater app.routes.ts
let routesContent = fs.readFileSync(routesPath, 'utf8');

// Finn siste route før ],
const newRoute = `      {
        path: 'komponenter/${kebabName}',
        loadComponent: () =>
          import('./demo/pages/components/${kebabName}/${kebabName}-demo').then(
            (m) => m.${pascalName}DemoComponent,
          ),
      },`;

// Finn posisjonen for å sette inn ny route (før siste ])
const routeArrayEnd = routesContent.lastIndexOf('    ],');
if (routeArrayEnd !== -1) {
  // Finn siste } før ],
  const lastRouteEnd = routesContent.lastIndexOf('      },', routeArrayEnd);
  if (lastRouteEnd !== -1) {
    const insertPos = lastRouteEnd + 8; // Etter '},'
    routesContent =
      routesContent.slice(0, insertPos) + '\n' + newRoute + routesContent.slice(insertPos);

    fs.writeFileSync(routesPath, routesContent, { encoding: 'utf8' });
    console.log(`✓ La til route i: app.routes.ts`);
  }
}

console.log(`\n✅ Demo-komponent "${pascalName}" er opprettet!`);
console.log(`\nNeste steg:`);
console.log(`1. Åpne: src/app/demo/pages/components/${kebabName}/${kebabName}-demo.ts`);
console.log(`2. Importer Hviktor-komponentene du vil demonstrere`);
console.log(`3. Legg til demo-innhold i template`);
console.log(`4. Kjør: npm start`);
