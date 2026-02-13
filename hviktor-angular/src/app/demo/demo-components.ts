/**
 * Konfigurasjon for demo-komponenter.
 * Legg til nye komponenter her for å vise dem i demoen.
 */
export interface DemoComponent {
  id: string;
  name: string;
  description: string;
}

export const DEMO_COMPONENTS: DemoComponent[] = [
  { id: 'alert', name: 'Alert', description: 'Varselmeldinger for å informere brukeren' },
  { id: 'avatar', name: 'Avatar', description: 'Profilbilde eller initialer' },
  { id: 'badge', name: 'Badge', description: 'Små indikatorer og tellere' },
  { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Navigasjonssti' },
  { id: 'button', name: 'Button', description: 'Knapper for handlinger' },
  { id: 'card', name: 'Card', description: 'Kort for gruppering av innhold' },
  { id: 'chip', name: 'Chip', description: 'Kompakte elementer for valg og filtrering' },
  { id: 'details', name: 'Details', description: 'Utvidbart innhold' },
  { id: 'dialog', name: 'Dialog', description: 'Modale dialogbokser' },
  { id: 'divider', name: 'Divider', description: 'Skillelinjer mellom innhold' },
  { id: 'forms', name: 'Forms', description: 'Skjemakomponenter og validering' },
  { id: 'heading', name: 'Heading', description: 'Overskrifter' },
  { id: 'icon', name: 'Icon', description: 'Ikoner' },
  { id: 'label', name: 'Label', description: 'Etiketter' },
  { id: 'link', name: 'Link', description: 'Lenker' },
  { id: 'list', name: 'List', description: 'Lister' },
  { id: 'paragraph', name: 'Paragraph', description: 'Avsnitt' },
  { id: 'popover', name: 'Popover', description: 'Popup-innhold' },
  { id: 'tag', name: 'Tag', description: 'Merkelapper for kategorisering' },
  { id: 'select', name: 'Select', description: 'lar brukeren velge ett alternativ fra en liste.' },
  { id: 'skeleton', name: 'Skeleton', description: 'Viser at innhold er i ferd med å lastes' },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox gir brukerne mulighet til å velge ett eller flere alternativer.',
  },
  {
    id: 'error-summary',
    name: 'ErrorSummary',
    description: 'ErrorSummary er en oppsummering av feil i skjema',
  },
  { id: 'field', name: 'Field', description: 'Field komponent' },
  { id: 'fieldset', name: 'Fieldset', description: 'Fieldset komponent' },
  { id: 'input', name: 'Input', description: 'Input komponent' },
  { id: 'radio', name: 'Radio', description: 'Radio komponent' },
  { id: 'search', name: 'Search', description: 'Search komponent' },
  { id: 'switch', name: 'Switch', description: 'Switch komponent' },
  { id: 'textarea', name: 'Textarea', description: 'Textarea komponent' },
  { id: 'toggle-group', name: 'ToggleGroup', description: 'ToggleGroup komponent' },
  { id: 'tooltip', name: 'Tooltip', description: 'Tooltip komponent' },
].sort((a, b) => a.name.localeCompare(b.name, 'nb'));
