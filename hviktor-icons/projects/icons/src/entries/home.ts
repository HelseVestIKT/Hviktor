import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HomeComponent } from '../lib/icons/home.component';

(async () => {
  const app = await createApplication();
  const element = createCustomElement(HomeComponent, {
    injector: app.injector
  });

  if (!customElements.get('hvi-icon-home')) {
    customElements.define('hvi-icon-home', element);
  }
})();
