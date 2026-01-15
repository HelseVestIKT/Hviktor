import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'input[hviInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    '[attr.type]': 'type'
  },
})
export class HviInput {
  @Input() type?: "number" | "hidden" | "color" | "checkbox" | "date" | "datetime-local" | "email" | "file" | "month" | "password" | "radio" | "search" | "tel" | "text" | "time" | "url" | "week" ;
}
