import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ColorScheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  colorScheme = signal<ColorScheme>(this.getInitialScheme());

  constructor() {
    effect(() => {
      const scheme = this.colorScheme();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('color-scheme', scheme);
        this.document.documentElement.setAttribute('data-color-scheme', scheme);
        this.document.body.setAttribute('data-color-scheme', scheme);
      }
    });
  }

  private getInitialScheme(): ColorScheme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('color-scheme') as ColorScheme;
      if (stored && ['light', 'dark'].includes(stored)) {
        return stored;
      }
    }
    return 'light';
  }

  toggleColorScheme(): void {
    this.colorScheme.set(this.colorScheme() === 'light' ? 'dark' : 'light');
  }

  getNextSchemeLabel(): string {
    return this.colorScheme() === 'light' ? 'Mørk' : 'Lys';
  }

  getNextSchemeIcon(): string {
    return this.colorScheme() === 'light' ? '🌙' : '☀️';
  }
}
