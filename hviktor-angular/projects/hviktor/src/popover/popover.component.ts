import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type MiddlewareState,
  type Placement,
} from '@floating-ui/dom';

const arrowPseudoElement = {
  name: 'ArrowPseudoElement',
  fn(data: MiddlewareState) {
    const { elements, rects, placement } = data;

    let arrowX = `${Math.round(rects.reference.width / 2 + rects.reference.x - data.x)}px`;
    let arrowY = `${Math.round(rects.reference.height / 2 + rects.reference.y - data.y)}px`;

    if (rects.reference.width > rects.floating.width) {
      arrowX = `${Math.round(rects.floating.width / 2)}px`;
    }

    if (rects.reference.height > rects.floating.height) {
      arrowY = `${Math.round(rects.floating.height / 2)}px`;
    }

    switch (placement.split('-')[0]) {
      case 'top':
        arrowY = '100%';
        break;
      case 'right':
        arrowX = '0';
        break;
      case 'bottom':
        arrowY = '0';
        break;
      case 'left':
        arrowX = '100%';
        break;
    }

    elements.floating.setAttribute('data-placement', placement.split('-')[0]);
    elements.floating.style.setProperty('--ds-popover-arrow-x', arrowX);
    elements.floating.style.setProperty('--ds-popover-arrow-y', arrowY);
    return data;
  },
};

/**
 * @summary
 * Popover vises over andre elementer i grensesnittet og er koblet til et spesifikt element.
 * Den brukes til å vise tilleggsinformasjon, interaktive elementer eller korte forklaringer uten å navigere bort fra siden.
 *
 * @example
 * ```html
 * <button hviButton popovertarget="popover1">Open popover</button>
 * <hvi-popover id="popover1"> Popover content </hvi-popover>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/popover/code}
 */
@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover',
    '[attr.popover]': 'type',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
  },
})
export class HviPopover implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private cleanupAutoUpdate?: () => void;
  private boundHandleClick?: (event: MouseEvent) => void;
  private boundHandleKeydown?: (event: KeyboardEvent) => void;

  /** Popover type - 'manual' krever manuell lukking, 'auto' lukkes ved klikk utenfor */
  @Input() type: 'auto' | 'manual' | 'hint' = 'manual';

  /** Visuell variant */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Farge-tema */
  @Input() color: 'neutral' | 'danger' | 'info' | 'success' | 'warning' = 'neutral';

  /** Plassering av popover relativt til trigger */
  @Input() placement: Placement = 'top';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Event når popover åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når popover lukkes */
  @Output() closed = new EventEmitter<void>();

  private get popoverElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private get triggerElement(): HTMLElement | null {
    const id = this.popoverElement.id;
    return id ? document.querySelector(`[popovertarget="${id}"]`) : null;
  }

  ngOnInit() {
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
    this.removeEventListeners();
  }

  private setupEventListeners() {
    const popover = this.popoverElement;

    // Click utenfor lukker popover
    this.boundHandleClick = (event: MouseEvent) => {
      const el = event.target as Element | null;
      const isTrigger = el?.closest?.(`[popovertarget="${popover.id}"]`);
      const isOutside = !isTrigger && !popover.contains(el as Node);

      if (isTrigger) {
        event.preventDefault();
        popover.togglePopover?.();
      }
      if (isOutside && popover.matches(':popover-open')) {
        popover.togglePopover?.();
      }
    };

    // Escape lukker popover
    this.boundHandleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !popover.matches(':popover-open')) return;
      event.preventDefault();
      popover.togglePopover?.();
    };

    addEventListener('click', this.boundHandleClick);
    addEventListener('keydown', this.boundHandleKeydown);

    // Toggle events
    popover.addEventListener('beforetoggle', this.handleBeforeToggle);
    popover.addEventListener('toggle', this.handleToggle);
  }

  private removeEventListeners() {
    if (this.boundHandleClick) {
      removeEventListener('click', this.boundHandleClick);
    }
    if (this.boundHandleKeydown) {
      removeEventListener('keydown', this.boundHandleKeydown);
    }
    this.popoverElement.removeEventListener('beforetoggle', this.handleBeforeToggle);
    this.popoverElement.removeEventListener('toggle', this.handleToggle);
  }

  private handleBeforeToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'open') {
      this.updatePosition();
    }
  };

  private handleToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'open') {
      this.startAutoUpdate();
      this.opened.emit();
    } else {
      this.stopAutoUpdate();
      this.closed.emit();
    }
  };

  private updatePosition() {
    const trigger = this.triggerElement;
    const popover = this.popoverElement;

    if (!trigger || !popover) return;

    computePosition(trigger, popover, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [
        offset((data) => {
          const styles = getComputedStyle(data.elements.floating, '::before');
          return parseFloat(styles.height) || 12;
        }),
        ...(this.autoPlacement ? [flip({ fallbackAxisSideDirection: 'start' }), shift()] : []),
        arrowPseudoElement,
      ],
    }).then(({ x, y }) => {
      popover.style.translate = `${x}px ${y}px`;
    });
  }

  private startAutoUpdate() {
    this.stopAutoUpdate();

    const trigger = this.triggerElement;
    const popover = this.popoverElement;

    if (!trigger || !popover) return;

    this.cleanupAutoUpdate = autoUpdate(trigger, popover, () => this.updatePosition());
  }

  private stopAutoUpdate() {
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  }
}
