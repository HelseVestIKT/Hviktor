import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DEMO_COMPONENTS } from '../demo-components';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: 'demo-layout.html',
})
export class DemoLayoutComponent {
  components = DEMO_COMPONENTS;
}
