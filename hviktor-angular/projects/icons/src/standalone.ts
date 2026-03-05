/**
 * Standalone bundle for using Hviktor Icons as Web Components in non-Angular frameworks
 * (e.g., Blazor, React, Vue, vanilla JavaScript)
 *
 * Usage:
 * <script src="hviktor-icons.js"></script>
 * <script>
 *   HvictorIcons.register();
 * </script>
 *
 * Then use in your HTML:
 * <hvi-icon-user size="md"></hvi-icon-user>
 * <hvi-icon-home size="lg"></hvi-icon-home>
 */

import { registerIconsAsCustomElements } from './lib/register-elements';

// Create a global namespace for the library
const HvictorIcons = {
  register: registerIconsAsCustomElements,
  registerIconsAsCustomElements,
};

// Expose to global window object
if (typeof window !== 'undefined') {
  (window as any).HvictorIcons = HvictorIcons;
}

export { HvictorIcons, registerIconsAsCustomElements };
