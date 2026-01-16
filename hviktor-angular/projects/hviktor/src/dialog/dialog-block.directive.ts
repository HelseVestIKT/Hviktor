import { Directive } from "@angular/core";

@Directive({
  selector: '[hviDialogBlock]',
  standalone: true,
    host: {
    class: 'ds-dialog__block',
  },
})
export class HviDialogBlock {}