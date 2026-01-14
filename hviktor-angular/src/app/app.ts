import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviButton, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel } from '@helsevestikt/hviktor';
import { HviAlert } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
