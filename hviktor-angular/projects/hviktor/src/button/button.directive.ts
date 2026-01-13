import { booleanAttribute, Directive, HostBinding, Input } from "@angular/core";

@Directive({
    selector: 'button[hviButton], a[hviButton]',
    standalone: true,
})

export class HviButtonDirective {
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger' = 'accent';

    @Input({ transform: booleanAttribute }) icon = false;
    @Input({ transform: booleanAttribute }) loading = false; 
    @Input({ transform: booleanAttribute }) fullWidth = false;

    @HostBinding('class.ds-button') hostClass = true;
    @HostBinding('attr.type') get attrType() {
    return this.type;
    }
    @HostBinding('attr.data-size') get dataSize() {
        return this.size;
    }
    @HostBinding('attr.data-variant') get dataVariant() {
        return this.variant;
    }

    @HostBinding('attr.data-color') get dataColor() {
        return this.color;
    }
    @HostBinding('attr.data-fullWidth') get dataFullWidth() {
        return this.fullWidth ? '' : null;
    }
    @HostBinding('attr.data-icon') get dataIcon() {
        return this.icon ? '' : null;
    }
    @HostBinding('attr.aria-busy') get dataLoading() {
        return this.loading ? 'true' : null;
    }
}