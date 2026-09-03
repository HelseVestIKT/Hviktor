import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withNavigationErrorHandler } from '@angular/router';

import { routes } from './app.routes';

/** Nettleserne formulerer feilende `import()` litt ulikt. */
const CHUNK_LOAD_ERROR =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|expected a JavaScript(?:-or-Wasm)? module script/i;

const RELOAD_ATTEMPT_KEY = 'hviktor:chunk-reload';

/**
 * Etter en ny deploy har alle lazy-chunkene fått nye hash-navn, og de gamle
 * filene finnes ikke lenger. En fane som har stått åpen en stund klarer derfor
 * ikke å laste ruter lenger — navigasjonen feiler stille og brukeren står fast
 * til hun refresher. Her gjør vi den refreshen automatisk (én gang) mot den
 * URL-en brukeren faktisk klikket på.
 */
function handleNavigationError(error: unknown, url: string): void {
  const message = error instanceof Error ? error.message : String(error);
  if (!CHUNK_LOAD_ERROR.test(message)) {
    console.error(`Navigasjon til ${url} feilet.`, error);
    return;
  }

  const lastAttempt = Number(sessionStorage.getItem(RELOAD_ATTEMPT_KEY) ?? 0);
  if (Date.now() - lastAttempt < 10_000) {
    console.error(`Kunne ikke laste kodefilene for ${url} etter ny lasting av siden.`, error);
    return;
  }

  sessionStorage.setItem(RELOAD_ATTEMPT_KEY, String(Date.now()));
  location.assign(url);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withNavigationErrorHandler(({ error, url }) => handleNavigationError(error, url)),
    ),
    provideHttpClient(),
  ],
};
