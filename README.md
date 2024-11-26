# HVIKTor er Helse Vest IKT sitt komponentbibliotek

## GitHub Axctions
[Github actions beskrivelse](./.github/workflows/doc/worflows.md)

## Formattering og linting
### Angular ESLint
Fremgangsmåten [her](https://github.com/angular-eslint/angular-eslint) er brukt for å sette opp ESLint.

- Det er brukt såkalt [flat config format](https://github.com/angular-eslint/angular-eslint/blob/main/docs/CONFIGURING_FLAT_CONFIG.md) med en eslint.config.js fil i stedet for den "gamle" .eslintrc-filen.
- Det er installert [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) som et tillegg.
- Formattering med Prettier er ikke tatt inn i lint-configen. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) er derimot brukt for å skru av alle lint regler som kan lage konflikt med Prettier. Teamet bak Angular ESLint skriver litt om det [her](https://github.com/angular-eslint/angular-eslint/blob/main/docs/FORMATTING_RULES.md).
- Scriptene lint og lint-fix kan kjøres når som helst for å sjekke etter feil. lint-fix vil i tillegg fikse feil som kan fikses automatisk..

### Prettier
Prettier er satt opp med et sett regler definert i .prettierrc. I tillegg er [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) installert. 

Sistnevnte plugin er for å få Prettier til å formatere Tailwind CSS klasser slik at de som hører sammen står etter hverandre. Om en f.eks. setter opp følgende klasser i en html-fil:

```html
<div class="p-4 flex rounded gap-2 bg-red-50 text-center font-bold"></div>
```
vil Prettier formatere det til:
```html
<div class="flex gap-2 p-4 rounded bg-red-50 font-bold text-center"></div>
```
når filen lagres. Nice? Nice!

Formattering på alt i src kan gjøres ved å kjøre `npm run format`.