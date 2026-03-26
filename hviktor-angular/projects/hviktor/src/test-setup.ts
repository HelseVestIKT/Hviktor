/**
 * Polyfill for CSS.supports() which is not available in jsdom.
 * Required because @digdir/designsystemet-web calls CSS.supports() on import.
 */
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', { value: { supports: () => false } });
}
