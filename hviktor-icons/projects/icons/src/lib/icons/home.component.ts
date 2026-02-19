import { Component } from '@angular/core';
import { Icons } from '../icons';


@Component({
  selector: 'hvi-icon-home',
  standalone: true,
  imports: [Icons],
  template: `
    <hvi-icons>
      <path d="M12 3l9 9h-3v9h-12v-9h-3z"></path>
    </hvi-icons>
  `
})

export class HomeComponent {}