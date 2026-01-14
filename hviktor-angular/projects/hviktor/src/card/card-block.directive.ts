import { Directive } from "@angular/core";

@Directive({
  selector: '[hviCardBlock]',
  standalone: true,
  host: { class: 'ds-card__block' },
})
export class HviCardBlock {}