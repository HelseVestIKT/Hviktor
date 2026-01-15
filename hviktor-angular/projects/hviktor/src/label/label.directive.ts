import { Directive, Input } from "@angular/core";

/**
 * Label fungerer som ei tydeleg og tilgjengeleg etikett som fortel brukaren kva eit tilhøyrande skjemaelement handlar om.
 * 
 * Eksempel på bruk:
 * ```html
 * <label hviLabel weight="semibold">Namn</label>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/label/overview
 */
@Directive({
    selector: 'label[hviLabel], legend[hviLabel]',
    standalone: true,
    host: {
        class: 'ds-label',
        '[attr.weight]': 'weight ?? null',
    },
})
export class HviLabel {
    /** Fonttykkelsen på labelen */
    @Input() weight?: 'regular' | 'medium' | 'semibold';
}