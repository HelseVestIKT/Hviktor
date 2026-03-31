# Brukseksempler

Eksempler på bruk av `@helsevestikt/hviktor-angular`-komponenter. For komplett oversikt med live-demo, se [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/).

## Button

```typescript
import { HviButton } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviButton],
  template: `
    <button hviButton>Standard</button>
    <button hviButton variant="primary" color="accent">Lagre</button>
    <button hviButton variant="secondary">Avbryt</button>
    <button hviButton variant="tertiary" size="sm">Liten lenkeknapp</button>
    <button hviButton variant="primary" color="danger">Slett</button>
    <button hviButton [loading]="isSaving">Lagrer...</button>
    <a hviButton href="/home">Lenkeknapp</a>
  `,
})
export class MyComponent {
  isSaving = false;
}
```

**Inputs:** `variant` (`primary` | `secondary` | `tertiary`), `size` (`sm` | `md` | `lg`), `color` (`accent` | `neutral` | `danger` | …), `loading`, `icon`, `fullWidth`

## Alert

```typescript
import { HviAlert } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviAlert],
  template: `
    <hvi-alert>Informasjonsmelding (default)</hvi-alert>
    <hvi-alert color="success">Handlingen var vellykket!</hvi-alert>
    <hvi-alert color="warning">Vær oppmerksom på dette.</hvi-alert>
    <hvi-alert color="danger">Noe gikk galt.</hvi-alert>
  `,
})
export class AlertExample {}
```

## Heading

```typescript
import { HviHeading } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviHeading],
  template: `
    <h1 hviHeading>Stor overskrift</h1>
    <h2 hviHeading size="md">Medium overskrift</h2>
    <h3 hviHeading size="sm">Liten overskrift</h3>
  `,
})
export class HeadingExample {}
```

**Inputs:** `size` (`2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`)

## Card

```typescript
import { HviCard } from '@helsevestikt/hviktor-angular';
import { HviHeading } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviCard, HviHeading],
  template: `
    <hvi-card>
      <h3 hviHeading size="sm">Korttittel</h3>
      <p>Innhold i kortet.</p>
    </hvi-card>

    <hvi-card variant="tinted" color="accent" maxWidth="320px">
      <h3 hviHeading size="sm">Farget kort</h3>
      <p>Med begrenset bredde.</p>
    </hvi-card>
  `,
})
export class CardExample {}
```

## Dialog

```typescript
import { HviDialog } from '@helsevestikt/hviktor-angular';
import { HviButton } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviDialog, HviButton],
  template: `
    <button hviButton (click)="showDialog = true">Åpne dialog</button>

    <dialog hviDialog [(open)]="showDialog">
      <h2>Bekreft handling</h2>
      <p>Er du sikker på at du vil fortsette?</p>
      <button hviButton variant="primary" (click)="showDialog = false">Ja</button>
      <button hviButton variant="secondary" (click)="showDialog = false">Avbryt</button>
    </dialog>
  `,
})
export class DialogExample {
  showDialog = false;
}
```

## Tabs

```typescript
import { HviTabs, HviTab, HviTabPanel } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviTabs, HviTab, HviTabPanel],
  template: `
    <hvi-tabs defaultValue="tab1">
      <hvi-tab value="tab1">Oversikt</hvi-tab>
      <hvi-tab value="tab2">Detaljer</hvi-tab>
      <hvi-tab value="tab3">Historikk</hvi-tab>

      <hvi-tab-panel value="tab1">Innhold for oversikt</hvi-tab-panel>
      <hvi-tab-panel value="tab2">Innhold for detaljer</hvi-tab-panel>
      <hvi-tab-panel value="tab3">Innhold for historikk</hvi-tab-panel>
    </hvi-tabs>
  `,
})
export class TabsExample {}
```

## TextField

```typescript
import { HviTextField } from '@helsevestikt/hviktor-angular';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [HviTextField, FormsModule],
  template: `
    <hvi-textfield label="Fornavn" description="Ditt juridiske fornavn" [(value)]="navn" required />

    <hvi-textfield
      label="E-post"
      type="email"
      placeholder="navn@example.com"
      [error]="emailError"
    />

    <hvi-textfield label="Beskrivelse" [multiline]="true" [rows]="4" [counterLimit]="200" />
  `,
})
export class TextFieldExample {
  navn = '';
  emailError = '';
}
```

## Table

```typescript
import { HviTable } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviTable],
  template: `
    <table hviTable [value]="data" [hover]="true" [zebra]="true" [border]="true">
      <thead>
        <tr>
          <th>Navn</th>
          <th>Rolle</th>
          <th>Avdeling</th>
        </tr>
      </thead>
      <tbody>
        @for (item of data; track item.navn) {
          <tr>
            <td>{{ item.navn }}</td>
            <td>{{ item.rolle }}</td>
            <td>{{ item.avdeling }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class TableExample {
  data = [
    { navn: 'Ola Nordmann', rolle: 'Utvikler', avdeling: 'IT' },
    { navn: 'Kari Hansen', rolle: 'Designer', avdeling: 'UX' },
  ];
}
```

**Inputs:** `zebra`, `border`, `hover`, `stickyHeader`, `paginator`, `rows`, `sortField`, `sortOrder`
