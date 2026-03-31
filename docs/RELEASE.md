# Publisering til npm

Denne guiden beskriver hvordan du publiserer en ny versjon av `@helsevestikt/hviktor-angular`.

## Forutsetninger

- Du er på `main`-branch
- Alle endringer er committet og pushet
- Tester og lint bestått (`npm run test:all && npm run lint`)
- Du har push-tilgang til repoet

## Publiser med release-scriptet (anbefalt)

Release-scriptet synkroniserer `package.json`-versjonen med git tag automatisk:

```bash
npm run release patch   # 0.0.23 → 0.0.24 (bugfikser)
npm run release minor   # 0.0.23 → 0.1.0  (nye komponenter/features)
npm run release major   # 0.0.23 → 1.0.0  (breaking changes)
npm run release 1.0.0   # Eksplisitt versjonsnummer
```

Scriptet gjør følgende:

1. Verifiserer at du er på `main` med rent working directory
2. Puller siste endringer
3. Oppdaterer versjon i `projects/hviktor/package.json`
4. Committer endringen (`chore: release v<versjon>`)
5. Oppretter git tag (`v<versjon>`)
6. Pusher commit og tag til origin

CI-workflowen (`publish-npm.yml`) kjøres automatisk:

1. Verifiserer at tagen er på main-branch
2. Bygger biblioteket
3. Bygger schematics
4. Publiserer til npm (krever godkjenning i `npm-publish` environment)

## Etter publisering

1. **Godkjenn i GitHub** — Gå til Actions → "Publish to npm" → Godkjenn `npm-publish` environment
2. **Verifiser på npm** — Sjekk https://www.npmjs.com/package/@helsevestikt/hviktor-angular
3. **Oppdater CHANGELOG** — Legg til endringene under riktig versjonsnummer i [CHANGELOG.md](CHANGELOG.md)

## Manuelt (hvis release-scriptet ikke brukes)

Hvis du av en eller annen grunn ikke kan bruke release-scriptet:

```bash
# 1. Oppdater versjon i package.json
cd projects/hviktor
npm version <patch|minor|major> --no-git-tag-version

# 2. Commit
git add projects/hviktor/package.json
git commit -m "chore: release v<versjon>"

# 3. Tag
git tag v<versjon>

# 4. Push
git push origin main
git push origin v<versjon>
```

> ⚠️ **Viktig:** Husk å oppdatere BÅDE `package.json` og git tag. Hvis de er usynkroniserte, bruk release-scriptet som håndterer begge automatisk.

## Semver-retningslinjer

| Type      | Når                           | Eksempel          |
| --------- | ----------------------------- | ----------------- |
| **patch** | Bugfikser, dokumentasjon      | `0.0.23 → 0.0.24` |
| **minor** | Nye komponenter, nye features | `0.0.23 → 0.1.0`  |
| **major** | Breaking changes i API        | `0.0.23 → 1.0.0`  |

### Hva er en breaking change?

- Fjerne en komponent eller direktiv
- Endre selector (f.eks. `hvi-alert` → `hviktor-alert`)
- Fjerne eller endre type på en `@Input`
- Endre default-verdi som påvirker eksisterende bruk
- Heve minimum Angular-versjon

### Hva er IKKE en breaking change?

- Legge til nye komponenter
- Legge til nye `@Input` med default-verdi
- Fikse bugs
- Forbedre ytelse
- Oppdatere interne avhengigheter
