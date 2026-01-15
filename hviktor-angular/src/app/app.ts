import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviAlert, HviButton, HviHeading, HviDetails, HviDetailsSummary, HviDetailsContent, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs } from '@helsevestikt/hviktor';
// your-main-app-file.js
import '@u-elements/u-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviHeading, HviDetails, HviDetailsSummary, HviDetailsContent, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
