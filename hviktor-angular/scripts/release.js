#!/usr/bin/env node

/**
 * Release-script for @helsevestikt/hviktor-angular
 *
 * Synkroniserer versjon i package.json med git tag, slik at begge alltid er oppdatert.
 *
 * Bruk:
 *   npm run release patch    # 0.0.23 → 0.0.24
 *   npm run release minor    # 0.0.23 → 0.1.0
 *   npm run release major    # 0.0.23 → 1.0.0
 *   npm run release 1.2.3    # Eksplisitt versjon
 *
 * Scriptet gjør følgende:
 *   1. Sjekker at du er på main-branch
 *   2. Sjekker at working directory er rent
 *   3. Beregner ny versjon (patch/minor/major eller eksplisitt)
 *   4. Oppdaterer version i projects/hviktor/package.json
 *   5. Committer endringen
 *   6. Oppretter git tag (v<versjon>)
 *   7. Pusher commit og tag til origin
 *
 * CI-workflowen (publish-npm.yml) plukker opp tagen og publiserer til npm.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'projects', 'hviktor', 'package.json');
const CHANGELOG_PATH = path.resolve(__dirname, '..', 'projects', 'hviktor', 'CHANGELOG.md');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8', cwd: path.resolve(__dirname, '..', '..') }).trim();
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

function bumpVersion(current, type) {
  const [major, minor, patch] = current.split('.').map(Number);
  switch (type) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'major':
      return `${major + 1}.0.0`;
    default:
      fail(`Ugyldig bump-type: ${type}`);
  }
}

function isValidSemver(version) {
  return /^\d+\.\d+\.\d+$/.test(version);
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer); }));
}

function updateChangelog(version) {
  const today = new Date().toISOString().slice(0, 10);
  const template = `## [${version}] – ${today}\n\n### Added\n\n- \n\n### Changed\n\n- \n\n### Fixed\n\n- \n`;

  let content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  const marker = content.match(/^## \[/m);
  if (marker) {
    const pos = marker.index;
    content = content.slice(0, pos) + template + content.slice(pos);
  } else {
    content += '\n' + template;
  }
  fs.writeFileSync(CHANGELOG_PATH, content);
}

function openEditorSync() {
  const editor = process.env.VISUAL || process.env.EDITOR || '';
  try {
    if (!editor || editor.includes('code')) {
      // Bruk VS Code – prøv 'code' fra PATH først, deretter vanlige Windows-stier
      const codePaths = [
        'code',
        path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'code'),
        path.join(process.env['ProgramFiles'] || '', 'Microsoft VS Code', 'code'),
      ];
      let launched = false;
      for (const codePath of codePaths) {
        try {
          execSync(`"${codePath}" --wait "${CHANGELOG_PATH}"`, { stdio: 'inherit' });
          launched = true;
          break;
        } catch {
          continue;
        }
      }
      if (!launched) {
        console.log('⚠️  Kunne ikke åpne VS Code. Rediger CHANGELOG manuelt og trykk Enter.');
        require('readline').createInterface({ input: process.stdin }).once('line', () => {});
      }
    } else {
      execSync(`${editor} "${CHANGELOG_PATH}"`, { stdio: 'inherit' });
    }
  } catch {
    // Editor lukket uten endringer — OK
  }
}

function cleanChangelog() {
  let content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  // Fjern tomme seksjoner (### Header\n\n- \n)
  content = content.replace(/### \w+\n\n- \n\n?/g, '');
  // Fjern doble blank linjer
  content = content.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(CHANGELOG_PATH, content);
}

// --- Sjekker ---

(async () => {

const arg = process.argv[2];
if (!arg) {
  console.log(`
Bruk: npm run release <patch|minor|major|x.y.z>

Eksempler:
  npm run release patch    # Bump patch-versjon
  npm run release minor    # Bump minor-versjon
  npm run release major    # Bump major-versjon
  npm run release 1.0.0    # Sett eksplisitt versjon
`);
  process.exit(0);
}

// 1. Sjekk branch
const branch = run('git rev-parse --abbrev-ref HEAD');
if (branch !== 'main') {
  fail(`Du må være på main-branch for å release. Nåværende branch: ${branch}`);
}

// 2. Sjekk at working directory er rent
const status = run('git status --porcelain');
if (status) {
  fail('Working directory er ikke rent. Commit eller stash endringene dine først.');
}

// 3. Pull siste endringer
console.log('📥 Henter siste endringer fra origin...');
run('git pull --rebase origin main');

// 4. Les nåværende versjon
const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
const currentVersion = pkg.version;

// 5. Beregn ny versjon
let newVersion;
if (['patch', 'minor', 'major'].includes(arg)) {
  newVersion = bumpVersion(currentVersion, arg);
} else if (isValidSemver(arg)) {
  newVersion = arg;
} else {
  fail(
    `Ugyldig argument: "${arg}". Bruk patch, minor, major, eller et semver-nummer (f.eks. 1.0.0)`,
  );
}

console.log(`\n📦 Versjon: ${currentVersion} → ${newVersion}\n`);

// 6. Oppdater package.json
pkg.version = newVersion;
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✅ Oppdatert ${path.relative(process.cwd(), PACKAGE_JSON_PATH)}`);

// 7. Oppdater CHANGELOG
console.log('\n📝 Oppdaterer CHANGELOG...');
updateChangelog(newVersion);

const answer = await ask('\nVil du redigere CHANGELOG.md nå? (Y/n) ');
if (!answer || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
  console.log('Åpner CHANGELOG i editor – lagre og lukk filen når du er ferdig...');
  openEditorSync();
}

cleanChangelog();
console.log(`✅ CHANGELOG oppdatert`);

// 8. Commit
run(`git add "${PACKAGE_JSON_PATH}" "${CHANGELOG_PATH}"`);
run(`git commit -m "chore: release v${newVersion}"`);
console.log(`✅ Committet: chore: release v${newVersion}`);

// 9. Tag
run(`git tag v${newVersion}`);
console.log(`✅ Tag opprettet: v${newVersion}`);

// 10. Push
console.log('\n🚀 Pusher til origin...');
run('git push origin main');
run(`git push origin v${newVersion}`);

console.log(`
✅ Release v${newVersion} fullført!

Neste steg:
  1. Gå til GitHub Actions og verifiser at publish-workflowen kjører
  2. Godkjenn "npm-publish" environment i GitHub
  3. Verifiser pakken på https://www.npmjs.com/package/@helsevestikt/hviktor-angular
`);

})().catch((err) => {
  console.error(`\n❌ ${err.message}\n`);
  process.exit(1);
});
