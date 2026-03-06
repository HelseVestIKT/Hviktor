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
}

/** Bygger full URL til designsystemet.no for en gitt slug. */
export function designSystemUrl(slug: string): string {
  return `https://designsystemet.no/no/components/docs/${slug}/overview`;
}

export const DEMO_COMPONENTS: DemoComponent[] = [
  {
    id: 'alert',
    name: 'Alert',
    description: 'Varselmeldinger for å informere brukeren',
    ds: true,
  },
  { id: 'avatar', name: 'Avatar', description: 'Profilbilde eller initialer', ds: true },
  { id: 'badge', name: 'Badge', description: 'Små indikatorer og tellere', ds: true },
  { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Navigasjonssti', ds: true },
  { id: 'button', name: 'Button', description: 'Knapper for handlinger', ds: true },
  { id: 'card', name: 'Card', description: 'Kort for gruppering av innhold', ds: true },
  {
    id: 'chip',
    name: 'Chip',
    description: 'Kompakte elementer for valg og filtrering',
    ds: true,
  },
  { id: 'details', name: 'Details', description: 'Utvidbart innhold', ds: true },
  { id: 'dialog', name: 'Dialog', description: 'Modale dialogbokser', ds: true },
  { id: 'divider', name: 'Divider', description: 'Skillelinjer mellom innhold', ds: true },
  { id: 'forms', name: 'Forms', description: 'Skjemakomponenter og validering', hvi: true },
  { id: 'heading', name: 'Heading', description: 'Overskrifter', ds: true },
  { id: 'icon', name: 'Icon', description: 'Ikoner', hvi: true },
  { id: 'label', name: 'Label', description: 'Etiketter', ds: true },
  { id: 'link', name: 'Link', description: 'Lenker', ds: true },
  { id: 'list', name: 'List', description: 'Lister', ds: true },
  { id: 'paragraph', name: 'Paragraph', description: 'Avsnitt', ds: true },
  { id: 'popover', name: 'Popover', description: 'Popup-innhold', ds: true },
  { id: 'tag', name: 'Tag', description: 'Merkelapper for kategorisering', ds: true },
  {
    id: 'select',
    name: 'Select',
    description: 'lar brukeren velge ett alternativ fra en liste.',
    ds: true,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'Viser at innhold er i ferd med å lastes',
    ds: true,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox gir brukerne mulighet til å velge ett eller flere alternativer.',
    ds: true,
  },
  {
    id: 'error-summary',
    name: 'ErrorSummary',
    description: 'ErrorSummary er en oppsummering av feil i skjema',
    ds: true,
  },
  { id: 'field', name: 'Field', description: 'Field komponent', ds: true },
  { id: 'fieldset', name: 'Fieldset', description: 'Fieldset komponent', ds: true },
  { id: 'input', name: 'Input', description: 'Input komponent', ds: true },
  { id: 'radio', name: 'Radio', description: 'Radio komponent', ds: true },
  { id: 'search', name: 'Search', description: 'Search komponent', ds: true },
  { id: 'switch', name: 'Switch', description: 'Switch komponent', ds: true },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Navigasjon mellom relaterte innholdsseksjoner',
    ds: true,
  },
  { id: 'textarea', name: 'Textarea', description: 'Textarea komponent', ds: true },
  {
    id: 'toggle-group',
    name: 'ToggleGroup',
    description: 'ToggleGroup komponent',
    ds: true,
  },
  { id: 'tooltip', name: 'Tooltip', description: 'Tooltip komponent', ds: true },
  { id: 'skip-link', name: 'SkipLink', description: 'SkipLink komponent', ds: true },
  { id: 'spinner', name: 'Spinner', description: 'Spinner komponent', ds: true },
  { id: 'dropdown', name: 'Dropdown', description: 'Dropdown', ds: true },
  { id: 'table', name: 'Table', description: 'Table komponent', ds: true },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Pagination komponent',
    ds: true,
  },
  { id: 'avatar-stack', name: 'AvatarStack', description: 'AvatarStack', ds: true },
  { id: 'logo', name: 'Logo', description: 'Logo komponent', hvi: true },
  { id: 'textfield', name: 'Textfield', description: 'Textfield komponent', ds: true },
].sort((a, b) => a.name.localeCompare(b.name, 'nb'));
