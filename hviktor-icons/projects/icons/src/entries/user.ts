import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { UserComponent } from '../lib/icons/user.component';

(async () => {
  const app = await createApplication();
  const element = createCustomElement(UserComponent, {
    injector: app.injector
  });

  if (!customElements.get('hvi-icon-user')) {
    customElements.define('hvi-icon-user', element);
  }
})();
