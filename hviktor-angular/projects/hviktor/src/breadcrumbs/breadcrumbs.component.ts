import { Component, Input } from "@angular/core";

export interface BreadcrumbItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

@Component({
    selector: 'nav[hviBreadcrumbs]',
    standalone: true,
    template: `
        <!-- Back link (optional) -->
        @if (backLink) {
            <a
            class="ds-link"
            [href]="backLink.href"
            [attr.aria-label]="backLink.ariaLabel ?? null"
            >
            {{ backLink.label }}
            </a>
        }

        <ol>
            @for (item of items; let last = $last; track item) {
            <li>
                <a
                class="ds-link"
                [href]="item.href"
                [attr.aria-label]="item.ariaLabel ?? null"
                [attr.aria-current]="last ? 'page' : null"
                >
                {{ item.label }}
                </a>
            </li>
            }
        </ol>
    `,
    host: {
        class: 'ds-breadcrumbs',
        role: 'navigation',
        '[attr.aria-label]': 'ariaLabel ?? null',
    },
})

export class HviBreadcrumbs {
 @Input() ariaLabel = 'Du er her:';

  @Input() backLink?: {
    label: string;
    href: string;
    ariaLabel?: string;
  };

  @Input() items: BreadcrumbItem[] = [];
}
