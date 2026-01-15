import { Directive, Input } from '@angular/core';

/**
 * Input er et skjemaelement for å samle inn brukerdata. 
 * Det tilbyr grunnleggende funksjonalitet og er ideell når du trenger full kontroll over komponentens oppsett og validering, 
 * noe som gjør den ideell for bygging av spesialtilpassede elementer.
 *
 * Eksempel på bruk:
 * ```html
 * <input hviInput type="text" placeholder="Skriv noe her..." />
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/input/overview
 */
@Directive({
  selector: 'input[hviInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    '[attr.type]': 'type'
  },
})
export class HviInput {
  /** Støttede input-typer */
  @Input() type?: "number" | "hidden" | "color" | "checkbox" | "date" | "datetime-local" | "email" | "file" | "month" | "password" | "radio" | "search" | "tel" | "text" | "time" | "url" | "week" ;
}
