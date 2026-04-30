/**
 * Polyfill for CSS.supports() which is not available in jsdom.
 * Required because @digdir/designsystemet-web calls CSS.supports() on import.
 */
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', { value: { supports: () => false } });
}

if (typeof globalThis.requestAnimationFrame === 'undefined') {
  Object.defineProperty(globalThis, 'requestAnimationFrame', {
    value: (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0),
  });
}

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'undefined') {
  Object.defineProperty(window, 'requestAnimationFrame', {
    value: globalThis.requestAnimationFrame,
  });
}

if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  Object.defineProperty(globalThis, 'cancelAnimationFrame', {
    value: (id: number) => clearTimeout(id),
  });
}

if (typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'undefined') {
  Object.defineProperty(window, 'cancelAnimationFrame', {
    value: globalThis.cancelAnimationFrame,
  });
}
