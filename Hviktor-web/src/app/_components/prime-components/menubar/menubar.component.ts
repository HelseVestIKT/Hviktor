import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Farger',
        routerLink: '',
      },
      {
        label: 'Typografi',
        routerLink: '',
      },
      {
        label: 'Ikoner',
        routerLink: '',
      },
      {
        label: 'Variabler og klasser',
        routerLink: '',
      },
      {
        label: 'Komponenter',
        items: [
          {
            label: 'Accordion',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Buttons',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Checkbox',
            routerLink: '',
            icon: 'pi pi-question-circle',
          },
          {
            label: 'Dialog',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
        ]
      },
      {
        label: 'Backend',
      },
    ];
  }

  refresh(){
    window.location.reload();
  }
}
