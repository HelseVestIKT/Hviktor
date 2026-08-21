/**
 * Minimal CSS.escape implementation following the CSSOM "serialize an identifier" algorithm.
 */
function cssEscape(value: string): string {
  const str = String(value);
  const { length } = str;
  const firstCodeUnit = str.charCodeAt(0);
  let result = '';

  for (let index = 0; index < length; index++) {
    const codeUnit = str.charCodeAt(index);

    if (codeUnit === 0x0000) {
      result += '\uFFFD';
      continue;
    }

    if (
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit === 0x007f ||
      (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002d)
    ) {
      result += `\\${codeUnit.toString(16)} `;
      continue;
    }

    if (index === 0 && length === 1 && codeUnit === 0x002d) {
      result += `\\${str.charAt(index)}`;
      continue;
    }

    if (
      codeUnit >= 0x0080 ||
      codeUnit === 0x002d ||
      codeUnit === 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      result += str.charAt(index);
      continue;
    }

    result += `\\${str.charAt(index)}`;
  }

  return result;
}

/**
 * Polyfill for CSS.supports() and CSS.escape() which are not available in jsdom.
 * Required because @digdir/designsystemet-web and @oddbird/popover-polyfill call
 * both on import.
 */
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', {
    value: { supports: () => false, escape: cssEscape },
    writable: true,
    configurable: true,
  });
} else {
  if (typeof globalThis.CSS.escape !== 'function') {
    Object.defineProperty(globalThis.CSS, 'escape', {
      value: cssEscape,
      writable: true,
      configurable: true,
    });
  }
  if (typeof globalThis.CSS.supports !== 'function') {
    Object.defineProperty(globalThis.CSS, 'supports', {
      value: () => false,
      writable: true,
      configurable: true,
    });
  }
}

/**
 * Stub native popover API so @oddbird/popover-polyfill skips activation in jsdom.
 * Without this, the polyfill sets up MutationObservers and adoptedStyleSheets
 * that crash the Vitest worker process during teardown in CI.
 */
if (typeof HTMLElement !== 'undefined' && !('popover' in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, 'popover', {
    value: null,
    writable: true,
    configurable: true,
  });
}

/**
 * Polyfill for document.adoptedStyleSheets which is not available in jsdom.
 * Required because @oddbird/popover-polyfill iterates over adoptedStyleSheets on import.
 */
if (typeof document !== 'undefined' && !document.adoptedStyleSheets) {
  Object.defineProperty(document, 'adoptedStyleSheets', { value: [], writable: true });
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
