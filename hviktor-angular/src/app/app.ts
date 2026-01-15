import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviAlert, HviButton, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviBadge } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviBadge, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
