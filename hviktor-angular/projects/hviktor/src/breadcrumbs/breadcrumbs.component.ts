import { Component, Input } from "@angular/core";

export interface BreadcrumbItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

/**
 * Info
 *
 * Eksempel på bruk:
 * ```html
 * <nav hviBreadcrumbs
 *      ariaLabel="Du er her:"
 *      [backLink]="{
 *          label: 'Nivå 3',
 *          href: '#',
 *          ariaLabel: 'Tilbake til Nivå 3'
 *      }"
 *      [items]="[
 *           { label: 'Nivå 1', href: '#' },
 *           { label: 'Nivå 2', href: '#' },
 *           { label: 'Nivå 3', href: '#' },
 *           { label: 'Nivå 4', href: '#' }
 *       ]"
 * ></nav>
 * ```
 *
 * Dokumentasjon: https://designsystemet.no/no/components/docs/breadcrumbs/overview
 */

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
    /** Accessible label for the breadcrumb navigation */
    @Input() ariaLabel = 'Du er her:';

    /** Optional back link object */
    @Input() backLink?: {
        label: string;
        href: string;
        ariaLabel?: string;
  };

    /** Array of breadcrumb items */
    @Input() items: BreadcrumbItem[] = [];
}
