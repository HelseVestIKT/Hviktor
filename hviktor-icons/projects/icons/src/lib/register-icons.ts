import { createCustomElement } from '@angular/elements';
import { inject, EnvironmentInjector } from '@angular/core';
import { HomeComponent } from './icons/home.component';
import { UserComponent } from './icons/user.component';

export function registerIcons() {
  const injector = inject(EnvironmentInjector);

  const homeElement = createCustomElement(HomeComponent, { injector });
  customElements.define('hvi-icon-home', homeElement);
  
  const userElement = createCustomElement(UserComponent, { injector });
  customElements.define('hvi-icon-user', userElement);
}
