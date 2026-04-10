/**
 * Konfigurasjon for demo-komponenter.
 * Legg til nye komponenter her for å vise dem i demoen.
 *
 * `ds` angir URL-slug på designsystemet.no.
 * Når den er satt, vises et ikon som lenker til designsystemets dokumentasjon.
 */
export interface DemoComponent {
  id: string;
  name: string;
  description: string;
  /** URL-slug for komponenten på designsystemet.no. Utelates for egne komponenter. */
  ds?: boolean;
  /** Markerer at komponenten er en Hviktor-egen komponent. */
  hvi?: boolean;
  /** Markerer at komponenten har beståtte enhetstester og e2e tester. */
  codeTested?: boolean;
  /** Markerer at komponenten har beståtte A11y-tester. */
  a11yTested?: boolean;
}

/** Bygger full URL til designsystemet.no for en gitt slug. */
export function designSystemUrl(slug: string): string {
  return `https://designsystemet.no/no/components/docs/${slug}/overview`;
}

export const DEMO_COMPONENTS: DemoComponent[] = [
  {
    id: 'alert',
    name: 'Alert',
    description:
      'Alert gir brukeren informasjon som det er ekstra viktig at de ser og forstår. Komponenten er designet for å fange brukernes oppmerksomhet. Teksten i varselet skal være kort og tydelig.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'Avatar viser et bilde, initialer eller ikon for en person, enhet eller profil.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'badge',
    name: 'Badge',
    description:
      'Badge er ein ikkje-interaktiv komponent som viser status med eller utan tal. Bruk Tag dersom du skal ha tekst i staden for tal.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    description:
      'Breadcrumbs hjelper brukarane med å forstå kvar dei er i ei struktur, og gjer det mogleg å navigere tilbake til høgare nivå.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'button',
    name: 'Button',
    description: 'Button lèt brukarane utføre handlingar.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'card',
    name: 'Card',
    description:
      'Card fremhever informasjon eller oppgaver som hører sammen. Komponenten finnes i to varianter og kan inneholde tekst, bilde, tekstfelt, knapper og lenker.',
    ds: true,
    codeTested: true,
  },
  {
    id: 'chip',
    name: 'Chip',
    description:
      'Chip er små, interaktive komponenter som lar brukerne styre hvordan de vil se innhold. For eksempel kan de brukes til å filtrere kategorier i et søkeresultat og vise hvilke filter som er aktive.',
    ds: true,
  },
  {
    id: 'details',
    name: 'Details',
    description:
      'Details er en sammenleggbar komponent som lar brukeren vise eller skjule innhold.',
    ds: true,
  },
  {
    id: 'dialog',
    name: 'Dialog',
    description:
      'Det er to typer dialoger, en modal og en ikke-modal. En modal dialog tvinger brukerne til å ta stilling til noe før de kan fortsette å bruke siden. En Ikke-modal dialog lar brukerne fortsette å bruke siden, selv om dialogen er åpen.',
    ds: true,
  },
  {
    id: 'divider',
    name: 'Divider',
    description:
      'Divider brukes for å skape et visuelt skille mellom innhold. Det er en enkel horisontal linje som strekker seg over tilgjengelig bredde.',
    ds: true,
  },
  {
    id: 'form',
    name: 'Form',
    description:
      'Form er en direktiv for `<form>` som håndterer innsending i reaktive Angular-skjema. Komponenten setter `submitted` ved første innsending, emitter `hviSubmitted`, markerer alle felter som touched når `[formGroup]` er brukt, og kan flytte fokus til en feiloppsummering ved ugyldig skjema. Dette gir tydeligere valideringsflyt, bedre tilgjengelighet og en mer konsistent skjemaopplevelse.',
    hvi: true,
  },
  {
    id: 'heading',
    name: 'Heading',
    description: 'Heading brukes til å strukturere innhold og skape hierarki på siden.',
    ds: true,
  },
  {
    id: 'label',
    name: 'Label',
    description:
      'Label fungerer som ei tydeleg og tilgjengeleg etikett som fortel brukaren kva eit tilhøyrande skjemaelement handlar om.',
    ds: true,
  },
  {
    id: 'link',
    name: 'Link',
    description:
      'Link er klikkbar tekst eller grafikk som tar brukeren videre til andre sider eller dokumenter.',
    ds: true,
  },
  {
    id: 'list',
    name: 'List',
    description:
      'List brukes for å presentere innhold på en oversiktlig og strukturert måte, for eksempel for å oppsummere hovedpunkter eller vise brukeren hvilke trinn som må følges i en bestemt rekkefølge.',
    ds: true,
  },
  {
    id: 'paragraph',
    name: 'Paragraph',
    description:
      'Paragraph brukes til løpende tekst og benyttes typisk i artikler, komponenter, hjelpetekster og lignende.',
    ds: true,
  },
  {
    id: 'popover',
    name: 'Popover',
    description:
      'Popover vises over andre elementer i grensesnittet og er koblet til et spesifikt element. Den brukes til å vise tilleggsinformasjon, interaktive elementer eller korte forklaringer uten å navigere bort fra siden.',
    ds: true,
  },
  {
    id: 'tag',
    name: 'Tag',
    description:
      'Tag er en merkelapp som kan brukes til å kategorisere elementer eller kommunisere fremdrift, status eller prosess. Tags kan gi brukeren et raskere overblikk over innholdet.',
    ds: true,
  },
  {
    id: 'select',
    name: 'Select',
    description: 'Select lar brukeren velge ett alternativ fra en liste.',
    ds: true,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description:
      'Skeleton brukes for å vise at innhold på en side er i ferd med å lastes inn. Den gir brukeren et visuelt hint om hvordan innholdet til slutt vil se ut.',
    ds: true,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description:
      'Checkbox gir brukerne mulighet til å velge ett eller flere alternativer. Den kan også brukes i tilfeller der brukeren skal bekrefte noe.',
    ds: true,
  },
  {
    id: 'error-summary',
    name: 'ErrorSummary',
    description:
      'ErrorSummary er en oppsummering av feil. Den gir brukeren oversikt over feil eller mangler som må rettes på en side eller trinn, for å komme videre.',
    ds: true,
  },
  {
    id: 'field',
    name: 'Field',
    description:
      'Field er et hjelpemiddel for å automatisk koble et felt sammen med HviLabel, HviFieldDescription, HviValidationMessage og HviFieldCounter.',
    ds: true,
  },
  {
    id: 'fieldset',
    name: 'Fieldset',
    description:
      'Fieldset brukes til å gruppere og navngi felt som naturlig hører sammen, for eksempel datofelt eller adressefelt. Komponenten hjelper med å organisere informasjon, gjøre skjemaer mer oversiktlige og forbedre tilgjengeligheten for skjermlesere.',
    ds: true,
  },
  {
    id: 'input',
    name: 'Input',
    description:
      'Input er et skjemaelement for å samle inn brukerdata. Det tilbyr grunnleggende funksjonalitet og er ideell når du trenger full kontroll over komponentens oppsett og validering, noe som gjør den ideell for bygging av spesialtilpassede elementer.',
    ds: true,
  },
  {
    id: 'radio',
    name: 'Radio',
    description:
      'Radio er et alternativ brukeren kan velge. Bruk flere Radio for å vise en liste med alternativer. Brukerne kan bytte mellom alternativene, men kan kun velge ett.',
    ds: true,
  },
  {
    id: 'search',
    name: 'Search',
    description:
      'Search lar brukere raskt finne relevant innhold på et nettsted eller i en applikasjon. Komponenten består av et søkefelt, med eller uten en søkeknapp.',
    ds: true,
  },
  {
    id: 'switch',
    name: 'Switch',
    description:
      'Switch gir brukerne et valg mellom to alternativer. Bryteren kan enten slås av eller på og skal alltid være innstilt med et standardvalg.',
    ds: true,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description:
      'Tabs lar brukerne navigere mellom relaterte deler av innholdet, der én del vises om gangen. Dette er en effektiv måte å organisere og presentere relatert innhold på samme side.',
    ds: true,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    description:
      'Textarea brukes når brukeren skal kunne skrive inn tekst som går over flere linjer.',
    ds: true,
  },
  {
    id: 'toggle-group',
    name: 'ToggleGroup',
    description:
      'ToggleGroup samler relaterte alternativ. Komponenten består av ei gruppe knappar som heng saman, der berre éin knapp er mogleg å velje om gongen.',
    ds: true,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description:
      'Tooltip viser kort informasjon når brukeren holder musepekeren over eller fokuserer på et element. Den brukes til sekundær informasjon, for eksempel til å forklare hva et symbol betyr.',
    ds: true,
  },
  {
    id: 'skip-link',
    name: 'SkipLink',
    description:
      'SkipLink hjelper folk som bruker tastaturnavigasjon til å navigere, slik at dei enkelt kan gå til det viktigaste innhaldet på ei side.',
    ds: true,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description:
      'Spinner brukes for å indikere at innhold eller en handling er i ferd med å laste, og at brukeren må vente før de kan fortsette.',
    ds: true,
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description:
      'Dropdown er en generisk nedtrekksliste. Den legger grunnmuren for å bygge menyer og lister.',
    ds: true,
  },
  {
    id: 'table',
    name: 'Table',
    description:
      'Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte. Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon.',
    ds: true,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description:
      'Pagination er en liste med knapper som brukes for å navigere mellom ulike sider med innhold, for eksempel søkeresultater eller tabeller.',
    ds: true,
  },
  {
    id: 'avatar-stack',
    name: 'AvatarStack',
    description: 'AvatarStack stabler en samling Avatar elementer',
    ds: true,
    codeTested: true,
  },
  {
    id: 'logo',
    name: 'Logo',
    description: 'Logo kan vise logoene til alle foretakene i Helse Vest.',
    hvi: true,
  },
  {
    id: 'textfield',
    name: 'Textfield',
    description: 'Textfield gir brukere muligheten til å skrive fritekst eller tall.',
    ds: true,
  },
  {
    id: 'suggestion',
    name: 'Suggestion',
    description: 'Søkbar select med mulighet for å velge flere alternativer',
  },
  {
    id: 'required-tag',
    name: 'RequiredTag',
    description:
      'RequiredTag kan brukes sammen med labels i et skjema for å indikere om et felt er påkrevd, valgfritt eller om alle felt må fylles ut.',
    hvi: true,
  },
].sort((a, b) => a.name.localeCompare(b.name, 'nb'));
