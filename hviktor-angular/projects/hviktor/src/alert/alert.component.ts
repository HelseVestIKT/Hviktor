import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: 'hvi-alert',
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
  },
  standalone: true,
})
export class HviAlertComponent {
    @Input() color: 'info' | 'success' | 'warning' | 'danger' = 'info';

    @HostBinding('attr.data-color') get dataColor() {
        return this.color;
    }
}