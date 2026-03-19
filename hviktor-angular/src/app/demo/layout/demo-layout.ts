import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HviButton, HviLogo } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS } from '../demo-components';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HviButton, HviLogo],
  templateUrl: 'demo-layout.html',
  host: {
    '[attr.data-color-scheme]': 'themeService.colorScheme()',
  },
})
export class DemoLayoutComponent {
  themeService = inject(ThemeService);
  components = DEMO_COMPONENTS;
}
