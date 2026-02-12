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
].sort((a, b) => a.name.localeCompare(b.name, 'nb'));
