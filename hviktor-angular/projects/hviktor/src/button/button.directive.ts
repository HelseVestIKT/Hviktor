import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
    selector: 'button[hviButton], a[hviButton]',
    standalone: true,
})

export class HviButtonDirective {
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    @HostBinding('class.ds-button') hotClass = true;
}