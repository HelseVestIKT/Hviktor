import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import '@digdir/designsystemet-web';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type MiddlewareState,
  type Placement,
} from '@floating-ui/dom';

/** Placement for tooltip arrow positioning */
type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/** Plugin for positioning the tooltip arrow pseudo-element */
const tooltipArrowPlugin = {
  name: 'TooltipArrowPlugin',
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

    const basePlacement = placement.split('-')[0] as TooltipPlacement;

    switch (basePlacement) {
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

    elements.floating.setAttribute('data-placement', basePlacement);
    elements.floating.style.setProperty('--dsc-tooltip-arrow-x', arrowX);
    elements.floating.style.setProperty('--dsc-tooltip-arrow-y', arrowY);
    return data;
  },
};

let tooltipIdCounter = 0;

/**
 * @summary
 * Tooltip viser kort informasjon når brukeren holder musepekeren over
 * eller fokuserer på et element. Den brukes til sekundær informasjon,
 * for eksempel til å forklare hva et symbol betyr.
 *
 * @example
 * ```html
 * <button hviButton hviTooltip="Kopier">📋</button>
 * <span hviTooltip="Organisasjonsnummer">Org.nr.</span>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/tooltip/code}
 */
@Directive({
  selector: '[hviTooltip]',
  standalone: true,
})
export class HviTooltip implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;
  private tooltipId = `hvi-tooltip-${++tooltipIdCounter}`;
  private cleanupAutoUpdate?: () => void;
  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;
  private isOpen = false;

  // Event listener cleanup functions
  private listeners: (() => void)[] = [];

  /** Tooltip content */
  @Input({ required: true }) hviTooltip = '';

  /** Placement of the tooltip relative to the trigger */
  @Input() tooltipPlacement: Placement = 'top';

  /** Enable auto placement when there's not enough space */
  @Input() tooltipAutoPlacement = true;

  /**
   * Override ARIA attribute type.
   * - 'describedby': tooltip describes the element (default for elements with text)
   * - 'labelledby': tooltip labels the element (default for icon-only buttons)
   */
  @Input() tooltipType?: 'describedby' | 'labelledby';

  /** Delay before showing tooltip (ms) */
  @Input() tooltipShowDelay = 150;

  /** Delay before hiding tooltip (ms) */
  @Input() tooltipHideDelay = 0;

  private get hostElement(): HTMLElement {
    return this.el.nativeElement;
  }

  ngOnInit() {
    this.createTooltipElement();
    this.setupTriggerAttributes();
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private createTooltipElement() {
    this.tooltipElement = this.renderer.createElement('span');

    if (!this.tooltipElement) return;

    this.renderer.setAttribute(this.tooltipElement, 'id', this.tooltipId);
    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipElement, 'popover', 'manual');
    this.renderer.addClass(this.tooltipElement, 'ds-tooltip');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    // Set initial content
    this.tooltipElement.textContent = this.hviTooltip;

    // Append to body to avoid overflow issues
    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  private setupTriggerAttributes() {
    const host = this.hostElement;

    // Set popovertarget attributes
    this.renderer.setAttribute(host, 'popovertarget', this.tooltipId);
    this.renderer.setAttribute(host, 'popovertargetaction', 'show');

    // Determine ARIA attribute type
    const ariaType = this.tooltipType ?? this.detectAriaType();

    if (ariaType === 'labelledby') {
      this.renderer.setAttribute(host, 'aria-labelledby', this.tooltipId);
    } else {
      this.renderer.setAttribute(host, 'aria-describedby', this.tooltipId);
    }
  }

  private detectAriaType(): 'describedby' | 'labelledby' {
    const host = this.hostElement;
    const hasText = host.textContent?.trim();
    const hasAriaLabel = host.hasAttribute('aria-label');

    // If element has no visible text and no aria-label, use labelledby
    if (!hasText && !hasAriaLabel) {
      return 'labelledby';
    }

    return 'describedby';
  }

  private setupEventListeners() {
    const host = this.hostElement;

    // Mouse events
    this.listeners.push(
      this.renderer.listen(host, 'mouseenter', () => this.scheduleShow()),
      this.renderer.listen(host, 'mouseleave', () => this.scheduleHide()),

      // Focus events
      this.renderer.listen(host, 'focusin', () => this.scheduleShow()),
      this.renderer.listen(host, 'focusout', () => this.scheduleHide()),

      // Keyboard events
      this.renderer.listen(host, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isOpen) {
          this.hide();
        }
      }),
    );

    // Global escape handler
    this.listeners.push(
      this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isOpen) {
          this.hide();
        }
      }),
    );
  }

  private scheduleShow() {
    this.clearTimeouts();

    if (this.tooltipShowDelay > 0) {
      this.showTimeout = setTimeout(() => this.show(), this.tooltipShowDelay);
    } else {
      this.show();
    }
  }

  private scheduleHide() {
    this.clearTimeouts();

    if (this.tooltipHideDelay > 0) {
      this.hideTimeout = setTimeout(() => this.hide(), this.tooltipHideDelay);
    } else {
      this.hide();
    }
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private show() {
    if (!this.tooltipElement || this.isOpen) return;

    // Update content in case it changed
    this.tooltipElement.textContent = this.hviTooltip;

    // Show the popover
    this.tooltipElement.showPopover?.();
    this.isOpen = true;

    // Position and show
    this.updatePosition();
    this.startAutoUpdate();

    // Fade in
    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    });
  }

  private hide() {
    if (!this.tooltipElement || !this.isOpen) return;

    // Fade out
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    // Hide after transition
    setTimeout(() => {
      this.tooltipElement?.hidePopover?.();
      this.isOpen = false;
      this.stopAutoUpdate();
    }, 150); // Match CSS transition duration
  }

  private updatePosition() {
    const trigger = this.hostElement;
    const tooltip = this.tooltipElement;

    if (!trigger || !tooltip) return;

    computePosition(trigger, tooltip, {
      placement: this.tooltipPlacement,
      strategy: 'fixed',
      middleware: [
        offset(8), // Arrow size + small gap
        ...(this.tooltipAutoPlacement ? [flip(), shift({ padding: 8 })] : []),
        tooltipArrowPlugin,
      ],
    }).then(({ x, y }) => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'translate', `${x}px ${y}px`);
      }
    });
  }

  private startAutoUpdate() {
    this.stopAutoUpdate();

    const trigger = this.hostElement;
    const tooltip = this.tooltipElement;

    if (!trigger || !tooltip) return;

    this.cleanupAutoUpdate = autoUpdate(trigger, tooltip, () => this.updatePosition());
  }

  private stopAutoUpdate() {
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  }

  private cleanup() {
    this.clearTimeouts();
    this.stopAutoUpdate();

    // Remove event listeners
    this.listeners.forEach((unlisten) => unlisten());
    this.listeners = [];

    // Remove tooltip element
    if (this.tooltipElement) {
      this.tooltipElement.hidePopover?.();
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}
