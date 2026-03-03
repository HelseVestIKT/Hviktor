import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HviIconUser } from './icons/icon-user.component';
import { HviIconHome } from './icons/icon-home.component';

let registered = false;

export async function registerIconsAsCustomElements() {
  if (registered) return;

  const app = await createApplication();
  const injector = app.injector;

  const elements = [
    { tag: 'hvi-icon-user', component: HviIconUser },
    { tag: 'hvi-icon-home', component: HviIconHome }
  ];

  for (const { tag, component } of elements) {
    if (!customElements.get(tag)) {
      const element = createCustomElement(component, { injector });
      customElements.define(tag, element);
    }
  }

  registered = true;
}
