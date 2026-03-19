# Skjema i Hviktor

Komplett guide til å bygge tilgjengelige, valideringsvennlige skjemaer med Hviktor Angular-komponentene.

> Hviktor wrapper [Digdir Designsystemet](https://designsystemet.no/) sine CSS-klasser i Angular-direktiver og -komponenter slik at du får riktig markup, tilgjengelighet og styling uten å måtte huske class-navn eller `data-`-attributter.

---

## Innhold

- [Skjema i Hviktor](#skjema-i-hviktor)
  - [Innhold](#innhold)
  - [Hurtigstart](#hurtigstart)
  - [Arkitektur – to nivåer](#arkitektur--to-nivåer)
    - [Nivå 1 – Sammensatte komponenter (anbefalt)](#nivå-1--sammensatte-komponenter-anbefalt)
    - [Nivå 2 – Lavnivå byggesteiner](#nivå-2--lavnivå-byggesteiner)
  - [Import-kits](#import-kits)
  - [Komponentoversikt](#komponentoversikt)
    - [HviForm](#hviform)
      - [requiredMode-logikk](#requiredmode-logikk)
    - [HviField](#hvifield)
    - [HviFieldset](#hvifieldset)
    - [HviInput](#hviinput)
    - [HviLabel](#hvilabel)
    - [HviSelect](#hviselect)
    - [HviTextfield](#hvitextfield)
    - [HviSearch](#hvisearch)
    - [HviRequiredTag](#hvirequiredtag)
    - [HviFieldDescription / HviFieldValidation](#hvifielddescription--hvifieldvalidation)
    - [HviFieldCounter](#hvifieldcounter)
    - [HviFieldAffix / HviFieldAffixes](#hvifieldaffix--hvifieldaffixes)
    - [HviControlInvalid](#hvicontrolinvalid)
    - [HviValidationMessage](#hvivalidationmessage)
    - [HviErrorSummary](#hvierrorsummary)
      - [Auto-modus (anbefalt)](#auto-modus-anbefalt)
      - [Manuell modus](#manuell-modus)
  - [Validering](#validering)
    - [Manuell validering](#manuell-validering)
    - [Validator bundles](#validator-bundles)
      - [Tilgjengelige bundle-funksjoner](#tilgjengelige-bundle-funksjoner)
      - [Hjelpefunksjoner](#hjelpefunksjoner)
  - [Påkrevde og valgfrie felt](#påkrevde-og-valgfrie-felt)
    - [Tre scenarier](#tre-scenarier)
    - [Automatisk med HviTextfield](#automatisk-med-hvitextfield)
      - [Manuell overstyring](#manuell-overstyring)
    - [Manuelt med lavnivå-komposisjon](#manuelt-med-lavnivå-komposisjon)
  - [Spacing](#spacing)
  - [Fullstendig eksempel – kontaktskjema](#fullstendig-eksempel--kontaktskjema)

---

## Hurtigstart

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HviForms, HviTextfield } from '@helsevestikt/hviktor';

@Component({
  standalone: true,
  imports: [HviForms, HviTextfield],
  template: `
    <form hviForm #f="hviForm" [formGroup]="form">
      @if (f.requiredMode() === 'all-required') {
        <hvi-required-tag mode="all-required" />
      }
      <hvi-textfield label="Fornavn" formControlName="firstName" required />
      <hvi-textfield label="E-post" formControlName="email" type="email" required />
      <button hviButton type="submit" variant="primary">Send</button>
    </form>
  `,
})
export class MyFormComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
```

`HviTextfield` bygger ferdig `<hvi-field>` + `<label>` + `<input>` + required-tags for deg. For fullstendig kontroll, bruk lavnivå-byggesteinene direkte (se [to nivåer](#arkitektur--to-nivåer)).

---

## Arkitektur – to nivåer

Hviktor tilbyr to komposisjonsnivåer for skjema:

### Nivå 1 – Sammensatte komponenter (anbefalt)

| Komponent         | Hva den gjør                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `<hvi-textfield>` | Komplett felt: label, input/textarea, description, prefix/suffix, error, counter, required-tag |

Bruk dette nivået når du trenger standard tekstfelt. Det gir minst kode og automatisk tilgjengelighet.

### Nivå 2 – Lavnivå byggesteiner

| Komponent/direktiv                          | CSS-klasse              | Formål                                                         |
| ------------------------------------------- | ----------------------- | -------------------------------------------------------------- |
| `<hvi-field>`                               | `ds-field`              | Wrapper som assosierer label, input, description og validation |
| `<label hviLabel>`                          | `ds-label`              | Tilgjengelig label                                             |
| `<input hviInput>`                          | `ds-input`              | Tekstfelt, checkbox, radio, dato osv.                          |
| `<select hviSelect>`                        | `ds-select`             | Nedtrekksmeny                                                  |
| `<fieldset hviFieldset>`                    | `ds-fieldset`           | Grupperer relaterte felt med legend                            |
| `<span hviFieldDescription>`                | –                       | Hjelpetekst under label                                        |
| `<span hviFieldValidation>`                 | `ds-validation-message` | Feilmelding                                                    |
| `<hvi-field-counter>`                       | –                       | Tegnteller                                                     |
| `<hvi-field-affixes>` + `<hvi-field-affix>` | `ds-field-affixes`      | Prefix/suffix-dekorasjon                                       |

Bruk dette nivået for radio-grupper, checkbox-grupper, select, og andre felt som `HviTextfield` ikke dekker.

```html
<!-- Eksempel: radio-gruppe med lavnivå-komposisjon -->
<fieldset hviFieldset>
  <legend hviLabel weight="medium">Foretrukket kontaktmåte</legend>

  <hvi-field>
    <input
      hviInput
      type="radio"
      id="email"
      name="contact"
      value="email"
      formControlName="contact"
    />
    <label hviLabel for="email">E-post</label>
  </hvi-field>

  <hvi-field>
    <input
      hviInput
      type="radio"
      id="phone"
      name="contact"
      value="phone"
      formControlName="contact"
    />
    <label hviLabel for="phone">Telefon</label>
  </hvi-field>
</fieldset>
```

---

## Import-kits

For å slippe å importere mange enkelt-komponenter finnes det ferdiglagde import-arrays:

| Kit                | Innhold                                                                                                                                              | Bruk når                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `HviFieldKit`      | `HviField`, `HviFieldValidation`, `HviFieldDescription`, `HviFieldOptional`, `HviFieldAffix`, `HviFieldAffixes`, `HviFieldCounter`, `HviRequiredTag` | Du bygger egne felt med lavnivå-komposisjon |
| `HviValidationKit` | `ReactiveFormsModule`, `HviForm`, `HviControlInvalid`, `HviValidationMessage`                                                                        | Du bruker reactive forms med validering     |
| `HviForms`         | `HviValidationKit` + `HviFieldKit` + `HviInput` + `HviFieldset` + `HviErrorSummary`                                                                  | Du vil ha alt som trengs for DS-skjema      |

```ts
import { HviForms, HviTextfield, HviSelect, HviButton } from '@helsevestikt/hviktor';

@Component({
  imports: [HviForms, HviTextfield, HviSelect, HviButton],
  // ...
})
```

> **Tips:** `HviForms` inkluderer `ReactiveFormsModule`, så du trenger ikke importere den separat.

---

## Komponentoversikt

### HviForm

**Selektor:** `form[hviForm]`  
**ExportAs:** `hviForm`

Legges på `<form>`-elementet for å få:

- **Submit-håndtering** – `markAllAsTouched()` ved submit, `(hviSubmitted)` output
- **Required-analyse** – analyserer `FormGroup` og eksponerer `requiredMode()` signal
- **Focus on invalid** – koble til `HviErrorSummary` for automatisk fokus ved feil

```html
<form
  hviForm
  #f="hviForm"
  [formGroup]="myForm"
  [focusOnInvalid]="summary"
  (hviSubmitted)="onSubmit()"
>
  <!-- skjemainnhold -->
  <hvi-error-summary #summary [form]="myForm" [messages]="messages" showWhen="submitted" />
</form>
```

| Input              | Type                     | Default | Beskrivelse                                                              |
| ------------------ | ------------------------ | ------- | ------------------------------------------------------------------------ |
| `focusOnInvalid`   | `{ focus?: () => void }` | –       | Element som skal fokuseres ved ugyldig submit (typisk `HviErrorSummary`) |
| `showRequiredTags` | `boolean`                | `true`  | Skru av/på automatisk required-tag i child-komponenter                   |

| Output         | Type                 | Beskrivelse        |
| -------------- | -------------------- | ------------------ |
| `hviSubmitted` | `EventEmitter<void>` | Emitter ved submit |

| Property         | Type                                          | Beskrivelse                            |
| ---------------- | --------------------------------------------- | -------------------------------------- |
| `requiredMode()` | `Signal<'all-required' \| 'mixed' \| 'none'>` | Analysert required-modus for FormGroup |
| `submitted`      | `boolean`                                     | `true` etter første submit-forsøk      |

#### requiredMode-logikk

`HviForm` analyserer FormGroup-en automatisk ved init:

| Resultat         | Betingelse                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| `'all-required'` | Alle controls har `Validators.required` eller `Validators.requiredTrue` |
| `'mixed'`        | Noen controls er required, noen ikke                                    |
| `'none'`         | Ingen controls har required-validering                                  |

> **Merk:** Controls uten noen validators (f.eks. en ren `new FormControl('')`) telles som "ikke required", slik at et skjema med 2 required og 1 uten validators gir `'mixed'`.

---

### HviField

**Selektor:** `<hvi-field>`

Wrapper-komponent som assosierer label, input, description og validation automatisk via `fieldObserver`. Setter CSS-klassen `ds-field`.

```html
<hvi-field>
  <label hviLabel for="name" weight="medium">Navn</label>
  <span hviFieldDescription>Fullt navn</span>
  <input hviInput id="name" formControlName="name" />
  <span hviFieldValidation>Navn er påkrevd</span>
</hvi-field>
```

For checkbox/radio-inputs bruker `ds-field` grid-layout automatisk:

```html
<hvi-field>
  <input hviInput type="checkbox" id="consent" formControlName="consent" />
  <label hviLabel for="consent">Jeg godtar vilkårene</label>
</hvi-field>
```

| Input      | Type               | Beskrivelse                                                       |
| ---------- | ------------------ | ----------------------------------------------------------------- |
| `position` | `'start' \| 'end'` | Posisjon for toggle-inputs (radio, checkbox). Default er `start`. |

---

### HviFieldset

**Selektor:** `fieldset[hviFieldset]`

Grupperer relaterte felt. Setter `ds-fieldset` med automatisk spacing mellom barn (`--dsc-fieldset-gap`).

```html
<fieldset hviFieldset>
  <legend hviLabel weight="medium">Kontaktinformasjon</legend>
  <hvi-field>...</hvi-field>
  <hvi-field>...</hvi-field>
</fieldset>
```

---

### HviInput

**Selektor:** `input[hviInput]`, `textarea[hviInput]`

Direktiv for input- og textarea-elementer. Setter `ds-input` og håndterer readonly-tilstand for toggle-inputs.

```html
<input hviInput type="text" id="name" />
<input hviInput type="checkbox" id="agree" />
<input hviInput type="radio" id="option1" name="options" />
<textarea hviInput id="message" rows="5"></textarea>
```

| Input      | Type                      | Default | Beskrivelse                                          |
| ---------- | ------------------------- | ------- | ---------------------------------------------------- |
| `type`     | Standard HTML input types | –       | Inputtype                                            |
| `size`     | `number`                  | –       | Size-attributt (tegnbredde)                          |
| `role`     | `string`                  | –       | ARIA role, f.eks. `'switch'` for checkbox som switch |
| `disabled` | `boolean`                 | `false` | Deaktiver input                                      |
| `readOnly` | `boolean`                 | `false` | Skrivebeskyttet input                                |

**Switch-mønster:**

```html
<hvi-field>
  <input hviInput type="checkbox" role="switch" id="notifications" />
  <label hviLabel for="notifications">Aktiver varsler</label>
</hvi-field>
```

---

### HviLabel

**Selektor:** `label[hviLabel]`, `legend[hviLabel]`

Setter `ds-label` med valgfri font-weight.

```html
<label hviLabel for="name" weight="medium">Navn</label>
<legend hviLabel weight="semibold">Personalia</legend>
```

| Input    | Type     | Verdier                               |
| -------- | -------- | ------------------------------------- |
| `weight` | `string` | `'regular'`, `'medium'`, `'semibold'` |

---

### HviSelect

**Selektor:** `select[hviSelect]`

Nedtrekksmeny med `ds-select ds-input`. Støtter disabled og readonly.

```html
<hvi-field>
  <label hviLabel for="country" weight="medium">Land</label>
  <select hviSelect id="country" formControlName="country">
    <option value="" disabled>Velg land</option>
    <option value="no">Norge</option>
    <option value="se">Sverige</option>
  </select>
</hvi-field>
```

| Input      | Type               | Beskrivelse                             |
| ---------- | ------------------ | --------------------------------------- |
| `width`    | `'full' \| 'auto'` | `'auto'` tilpasser bredde til innholdet |
| `disabled` | `boolean`          | Deaktiver select                        |
| `readOnly` | `boolean`          | Skrivebeskyttet select                  |

---

### HviTextfield

**Selektor:** `<hvi-textfield>`

Sammensatt komponent som bygger et komplett felt med label, input/textarea, description, prefix/suffix, counter, error og required-tag. Implementerer `ControlValueAccessor` for bruk med reactive forms.

```html
<!-- Enkel bruk -->
<hvi-textfield label="Fornavn" formControlName="firstName" required />

<!-- Textarea -->
<hvi-textfield label="Melding" [multiline]="true" [rows]="5" formControlName="message" />

<!-- Med prefix og suffix -->
<hvi-textfield label="Pris" prefix="NOK" suffix="pr. mnd" formControlName="price" />

<!-- Med tegnteller -->
<hvi-textfield label="Bio" [multiline]="true" [counterLimit]="200" formControlName="bio" />

<!-- Med description og error -->
<hvi-textfield
  label="E-post"
  description="Vi sender bekreftelse hit"
  [error]="emailError"
  formControlName="email"
/>
```

| Input          | Type              | Default       | Beskrivelse                                                                          |
| -------------- | ----------------- | ------------- | ------------------------------------------------------------------------------------ |
| `label`        | `string`          | **Påkrevd**   | Label-tekst                                                                          |
| `description`  | `string`          | –             | Hjelpetekst under label                                                              |
| `type`         | `string`          | `'text'`      | HTML input type                                                                      |
| `multiline`    | `boolean`         | `false`       | Bruk textarea istedenfor input                                                       |
| `rows`         | `number`          | –             | Antall rader (textarea)                                                              |
| `prefix`       | `string`          | –             | Tekst foran input                                                                    |
| `suffix`       | `string`          | –             | Tekst etter input                                                                    |
| `error`        | `string`          | –             | Feilmelding under feltet                                                             |
| `counterLimit` | `number`          | –             | Maks tegn (viser teller)                                                             |
| `placeholder`  | `string`          | –             | Placeholder-tekst                                                                    |
| `required`     | `boolean`         | `false`       | Markerer feltet som påkrevd                                                          |
| `disabled`     | `boolean`         | `false`       | Deaktiver feltet                                                                     |
| `readOnly`     | `boolean`         | `false`       | Skrivebeskyttet                                                                      |
| `requiredMode` | `RequiredTagMode` | –             | Manuell overstyring av required-tag (se [Påkrevde felt](#påkrevde-og-valgfrie-felt)) |
| `autocomplete` | `string`          | –             | HTML autocomplete-attributt                                                          |
| `name`         | `string`          | –             | Name-attributt                                                                       |
| `id`           | `string`          | Auto-generert | Id-attributt                                                                         |
| `maxLength`    | `number`          | –             | Maks antall tegn                                                                     |
| `size`         | `number`          | –             | Input-bredde i tegnantall                                                            |

---

### HviSearch

**Selektor:** `<hvi-search>`

Søkefelt-wrapper med `ds-search`. Kombiner med `hviInput`, `hviSearchClear` og `hviButton`.

```html
<hvi-search>
  <input hviInput type="search" placeholder="" aria-label="Søk" />
  <button hviSearchClear type="reset" aria-label="Tøm"></button>
  <button hviButton variant="primary" type="submit">Søk</button>
</hvi-search>
```

Med label i `<hvi-field>`:

```html
<hvi-field>
  <label hviLabel>Søk etter pasient</label>
  <hvi-search>
    <input hviInput type="search" placeholder="" name="patient-search" />
    <button hviSearchClear type="reset" aria-label="Tøm"></button>
  </hvi-search>
</hvi-field>
```

> **Viktig:** Legg til tomt `placeholder=""` på input når du bruker clear-knapp, ellers vises clear-knappen alltid.

---

### HviRequiredTag

**Selektor:** `<hvi-required-tag>`

Visuell tag som indikerer om et felt er påkrevd eller valgfritt. Bruker `display: contents` for å fungere inline i labels.

```html
<hvi-required-tag />
<!-- "Må fylles ut" (warning) -->
<hvi-required-tag mode="optional" />
<!-- "Valgfritt" (info) -->
<hvi-required-tag mode="all-required" />
<!-- "Alle felt må fylles ut" (warning) -->
```

| Mode                   | Tekst                  | Farge   |
| ---------------------- | ---------------------- | ------- |
| `'required'` (default) | Må fylles ut           | Warning |
| `'optional'`           | Valgfritt              | Info    |
| `'all-required'`       | Alle felt må fylles ut | Warning |

Se [Påkrevde og valgfrie felt](#påkrevde-og-valgfrie-felt) for automatisk bruk med `HviForm`.

---

### HviFieldDescription / HviFieldValidation

Direktiver for hjelpetekst og feilmeldinger inne i `<hvi-field>`:

```html
<hvi-field>
  <label hviLabel for="email" weight="medium">E-post</label>
  <span hviFieldDescription>Vi sender bekreftelse hit</span>
  <input hviInput id="email" formControlName="email" hviControlInvalid />
  <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
</hvi-field>
```

`hviFieldDescription` plasseres rett under label, `hviFieldValidation` etter input.

---

### HviFieldCounter

**Selektor:** `<hvi-field-counter>`

Tegnteller som automatisk finner og tracker input/textarea i samme `<hvi-field>`.

```html
<hvi-field>
  <label hviLabel for="bio" weight="medium">Biografi</label>
  <textarea hviInput id="bio" rows="3" maxlength="200"></textarea>
  <hvi-field-counter [limit]="200" />
</hvi-field>
```

| Input   | Type     | Default                   | Beskrivelse                             |
| ------- | -------- | ------------------------- | --------------------------------------- |
| `limit` | `number` | **Påkrevd**               | Maks tegn                               |
| `count` | `number` | Auto                      | Manuell tegncount (ellers auto-tracked) |
| `over`  | `string` | `'%d tegn for mye'`       | Meldingsmal ved overskridelse           |
| `under` | `string` | `'%d tegn igjen'`         | Meldingsmal for gjenstående tegn        |
| `hint`  | `string` | `'Maks %d tegn tillatt.'` | Skjermleser-hint                        |

---

### HviFieldAffix / HviFieldAffixes

Prefix- og suffix-dekorasjoner rundt input-feltet:

```html
<hvi-field>
  <label hviLabel for="price" weight="medium">Pris</label>
  <hvi-field-affixes>
    <hvi-field-affix>NOK</hvi-field-affix>
    <input hviInput id="price" type="number" />
    <hvi-field-affix>pr. mnd</hvi-field-affix>
  </hvi-field-affixes>
</hvi-field>
```

---

### HviControlInvalid

**Selektor:** `[hviControlInvalid]`

Setter `aria-invalid="true"` automatisk når:

- Kontrollen er invalid **og** touched, eller
- Skjemaet er submitted (via `HviForm`)

```html
<input hviInput formControlName="email" hviControlInvalid />
```

Ingen inputs — direktivet leser tilstand fra `NgControl` og `HviForm` automatisk.

---

### HviValidationMessage

**Selektor:** `[hviValidationMessage]`

Viser riktig feilmelding basert på kontrollens aktive feil og en meldings-map.

```html
<p hviFieldValidation hviValidationMessage="email" [messages]="emailMessages"></p>
```

```ts
emailMessages: HviValidationMessages = {
  required: 'E-post er påkrevd',
  email: 'Ugyldig e-postadresse',
};
```

| Input                  | Type                    | Beskrivelse                                                                                            |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `hviValidationMessage` | `string`                | Control-navn i FormGroup (matcher `formControlName`)                                                   |
| `messages`             | `HviValidationMessages` | Map fra error-key → melding                                                                            |
| `errorPriority`        | `string[]`              | Prioritert rekkefølge. Default: `required`, `minlength`, `maxlength`, `email`, `pattern`, `min`, `max` |

Meldingen vises når kontrollen er invalid **og** touched/submitted. Kun den høyest prioriterte feilen vises.

---

### HviErrorSummary

**Selektor:** `<hvi-error-summary>`

Oppsummering av alle valideringsfeil i skjemaet. Vises typisk etter submit. Støtter to moduser:

#### Auto-modus (anbefalt)

```html
<form hviForm [formGroup]="form" [focusOnInvalid]="summary" (hviSubmitted)="onSubmit()">
  <!-- felt ... -->
  <button hviButton type="submit" variant="primary">Send</button>
  <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="submitted" />
</form>
```

```ts
messages: HviErrorSummaryMessages = {
  firstName: { required: 'Fornavn er påkrevd', minlength: 'Minst 2 tegn' },
  email: { required: 'E-post er påkrevd', email: 'Ugyldig adresse' },
};
```

Klikk på en feil i listen fokuserer og scroller til feltet. `href` bygges fra control-navn (`#firstName`), så feltets `id` bør matche `formControlName`.

#### Manuell modus

```html
<hvi-error-summary
  [errors]="[
    { message: 'Fornavn er påkrevd', href: '#firstName' },
    { message: 'Ugyldig telefonnummer', href: '#phone' },
  ]"
/>
```

| Input          | Type                                    | Default                                            | Beskrivelse                                          |
| -------------- | --------------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| `form`         | `FormGroup`                             | –                                                  | Auto-modus: FormGroup å utlede feil fra              |
| `messages`     | `Record<string, HviValidationMessages>` | –                                                  | Auto-modus: meldinger per control                    |
| `errors`       | `HviErrorSummaryItem[]`                 | –                                                  | Manuell modus: ferdigbygde feil-items                |
| `showWhen`     | `'submitted' \| 'touched' \| 'always'`  | `'submitted'`                                      | Når skal feilene vises                               |
| `heading`      | `string`                                | `'For å gå videre må du rette opp følgende feil:'` | Overskrift                                           |
| `headingLevel` | `1-6`                                   | `2`                                                | Heading-nivå                                         |
| `idMap`        | `Record<string, string>`                | –                                                  | Map control-navn → element-id (for spesialtilfeller) |

---

## Validering

### Manuell validering

Standard Angular reactive forms-mønster:

```ts
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});

messages: HviValidationMessages = {
  required: 'E-post er påkrevd',
  email: 'Ugyldig e-postadresse',
};
```

```html
<hvi-field>
  <label hviLabel for="email" weight="medium">E-post</label>
  <input hviInput id="email" formControlName="email" hviControlInvalid />
  <p hviFieldValidation hviValidationMessage="email" [messages]="messages"></p>
</hvi-field>
```

### Validator bundles

For å holde validators og meldinger samlet tilbyr Hviktor **validator bundles**:

```ts
import { hviRequired, hviMinLength, hviEmail, hviValidators } from '@helsevestikt/hviktor';

const emailConfig = hviValidators([
  hviRequired('E-post er påkrevd'),
  hviEmail('Ugyldig e-postadresse'),
]);

const nameConfig = hviValidators([
  hviRequired('Fornavn er påkrevd'),
  hviMinLength(2, 'Minst 2 tegn'),
]);

form = new FormGroup({
  email: new FormControl('', emailConfig.validators),
  firstName: new FormControl('', nameConfig.validators),
});

// I template: [messages]="emailConfig.messages"
```

#### Tilgjengelige bundle-funksjoner

| Funksjon                  | Wrapper for                | Eksempel                              |
| ------------------------- | -------------------------- | ------------------------------------- |
| `hviRequired(msg)`        | `Validators.required`      | `hviRequired('Påkrevd')`              |
| `hviRequiredTrue(msg)`    | `Validators.requiredTrue`  | `hviRequiredTrue('Må godtas')`        |
| `hviMinLength(n, msg)`    | `Validators.minLength(n)`  | `hviMinLength(2, 'Minst 2 tegn')`     |
| `hviMaxLength(n, msg)`    | `Validators.maxLength(n)`  | `hviMaxLength(100, 'Maks 100 tegn')`  |
| `hviEmail(msg)`           | `Validators.email`         | `hviEmail('Ugyldig e-post')`          |
| `hviPattern(p, msg)`      | `Validators.pattern(p)`    | `hviPattern(/^\d+$/, 'Kun tall')`     |
| `hviMin(n, msg)`          | `Validators.min(n)`        | `hviMin(0, 'Minst 0')`                |
| `hviMax(n, msg)`          | `Validators.max(n)`        | `hviMax(100, 'Maks 100')`             |
| `hviCustom(key, fn, msg)` | Egendefinert `ValidatorFn` | `hviCustom('phone', myFn, 'Ugyldig')` |

#### Hjelpefunksjoner

| Funksjon                        | Returnerer                                                       |
| ------------------------------- | ---------------------------------------------------------------- |
| `hviValidators(bundles)`        | `{ validators: ValidatorFn[], messages: HviValidationMessages }` |
| `hviExtractValidators(bundles)` | `ValidatorFn[]`                                                  |
| `hviExtractMessages(bundles)`   | `HviValidationMessages`                                          |

---

## Påkrevde og valgfrie felt

Designsystemet anbefaler å kommunisere tydelig hvilke felt som er påkrevde og hvilke som er valgfrie. Hviktor har innebygd støtte for dette via `HviRequiredTag`.

### Tre scenarier

| Scenario              | requiredMode     | Anbefalt visning                                   |
| --------------------- | ---------------- | -------------------------------------------------- |
| Alle felt er påkrevde | `'all-required'` | Én tag øverst i skjemaet: "Alle felt må fylles ut" |
| Blanding              | `'mixed'`        | Per felt: "Må fylles ut" / "Valgfritt"             |
| Ingen required        | `'none'`         | Ingen tags                                         |

### Automatisk med HviTextfield

Når `<hvi-textfield>` er inne i en `<form hviForm>`, injiseres `HviForm` automatisk og required-tags vises uten ekstra kode:

```html
<form hviForm #f="hviForm" [formGroup]="form">
  <!-- Vis "Alle felt må fylles ut" øverst når alt er required -->
  @if (f.requiredMode() === 'all-required') {
  <hvi-required-tag mode="all-required" />
  }

  <!-- HviTextfield viser automatisk per-felt tags ved mixed mode -->
  <hvi-textfield label="Fornavn" formControlName="firstName" required />
  <hvi-textfield label="Telefon" formControlName="phone" />
</form>
```

I `mixed`-modus viser `HviTextfield` automatisk:

- **"Må fylles ut"** på felt med `required`
- **"Valgfritt"** på felt uten `required`

I `all-required`-modus vises ingen per-felt tags (du viser "Alle felt må fylles ut" øverst selv).

#### Manuell overstyring

Sett `requiredMode` direkte for å overstyre automatikken:

```html
<hvi-textfield label="Navn" requiredMode="required" />
<hvi-textfield label="Kommentar" requiredMode="optional" />
```

### Manuelt med lavnivå-komposisjon

Når du bruker `<hvi-field>` direkte (f.eks. for select, radio), legg `<hvi-required-tag>` manuelt i labelen:

```html
<hvi-field>
  <label hviLabel for="subject" weight="medium"> Emne <hvi-required-tag mode="required" /> </label>
  <select hviSelect id="subject" formControlName="subject">
    <option value="" disabled>Velg emne</option>
    <option value="general">Generell</option>
  </select>
</hvi-field>

<hvi-field>
  <label hviLabel for="phone" weight="medium"> Telefon <hvi-required-tag mode="optional" /> </label>
  <input hviInput id="phone" type="tel" formControlName="phone" />
</hvi-field>
```

---

## Spacing

`form[hviForm]` gir automatisk vertikal spacing mellom direkte barn:

```css
form[hviForm] > * + * {
  margin-block-start: var(--ds-size-4);
}
```

`fieldset[hviFieldset]` har sin egen spacing via Designsystemets `--dsc-fieldset-gap`.

Du trenger normalt **ikke** legge til manuell margin mellom felt, fieldsets, eller knapper inne i et `hviForm`-skjema.

---

## Fullstendig eksempel – kontaktskjema

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviForms,
  HviParagraph,
  HviRequiredTag,
  HviSelect,
  HviTextfield,
  HviValidationMessages,
} from '@helsevestikt/hviktor';

@Component({
  standalone: true,
  imports: [HviForms, HviButton, HviParagraph, HviSelect, HviRequiredTag, HviTextfield],
  template: `
    <form
      hviForm
      #f="hviForm"
      [formGroup]="form"
      [focusOnInvalid]="summary"
      (hviSubmitted)="onSubmit()"
    >
      @if (f.requiredMode() === 'all-required') {
        <hvi-required-tag mode="all-required" />
      }

      <!-- Bruk HviTextfield for tekstfelt – automatisk required-tag -->
      <hvi-textfield
        label="Fornavn"
        formControlName="firstName"
        required
        autocomplete="given-name"
      />
      <hvi-textfield
        label="Etternavn"
        formControlName="lastName"
        required
        autocomplete="family-name"
      />
      <hvi-textfield
        label="E-post"
        formControlName="email"
        type="email"
        required
        autocomplete="email"
        description="Vi bruker e-posten til å svare deg"
      />
      <hvi-textfield label="Telefon" formControlName="phone" type="tel" autocomplete="tel" />

      <!-- Bruk lavnivå-komposisjon for select -->
      <hvi-field>
        <label hviLabel for="subject" weight="medium">
          Emne <hvi-required-tag mode="required" />
        </label>
        <select hviSelect id="subject" formControlName="subject" hviControlInvalid>
          <option value="" disabled>Velg emne</option>
          <option value="general">Generell henvendelse</option>
          <option value="support">Teknisk support</option>
          <option value="feedback">Tilbakemelding</option>
        </select>
        <p hviFieldValidation hviValidationMessage="subject" [messages]="messages['subject']"></p>
      </hvi-field>

      <!-- Textarea med tegnteller -->
      <hvi-textfield
        label="Melding"
        [multiline]="true"
        [rows]="5"
        [counterLimit]="500"
        formControlName="message"
        required
      />

      <!-- Samtykke med lavnivå-komposisjon -->
      <fieldset hviFieldset>
        <legend hviLabel weight="medium">Samtykke</legend>
        <hvi-field>
          <input
            hviInput
            type="checkbox"
            id="consent"
            formControlName="consent"
            hviControlInvalid
          />
          <label hviLabel for="consent">
            Jeg godtar <a href="#" class="ds-link">personvernerklæringen</a>
          </label>
          <p hviFieldValidation hviValidationMessage="consent" [messages]="messages['consent']"></p>
        </hvi-field>
      </fieldset>

      <button hviButton type="submit" variant="primary">Send inn</button>

      <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="submitted" />
    </form>
  `,
})
export class ContactFormComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\+47)?\s?\d{3}\s?\d{2}\s?\d{3}$/)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  messages: Record<string, HviValidationMessages> = {
    firstName: { required: 'Fornavn er påkrevd', minlength: 'Minst 2 tegn' },
    lastName: { required: 'Etternavn er påkrevd', minlength: 'Minst 2 tegn' },
    email: { required: 'E-post er påkrevd', email: 'Ugyldig e-postadresse' },
    phone: { pattern: 'Ugyldig norsk telefonnummer' },
    subject: { required: 'Velg et emne' },
    message: {
      required: 'Skriv en melding',
      minlength: 'Minst 10 tegn',
      maxlength: 'Maks 500 tegn',
    },
    consent: { requiredTrue: 'Du må godta personvernerklæringen' },
  };

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```
