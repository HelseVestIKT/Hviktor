import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviButton } from '@helsevestikt/hviktor';
import { HviAlert } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
