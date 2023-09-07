import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Farger',
        routerLink: 'colours',
      },
      {
        label: 'Typografi',
        routerLink: 'typography',
      },
      {
        label: 'Ikoner',
        routerLink: 'icons',
      },
      {
        label: 'Variabler og klasser',
        routerLink: 'variables',
      },
      {
        label: 'Komponenter',
        items: [
          {
            label: 'Accordion',
            routerLink: 'components/accordion',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Buttons',
            routerLink: 'components/buttons',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Checkbox',
            routerLink: 'components/checkbox',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Dialog',
            routerLink: 'components/dialog',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Dropdown',
            routerLink: 'components/dropdown',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Menubar',
            routerLink: 'components/menubar',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Multiselect',
            routerLink: 'components/multiselect',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Radiobutton',
            routerLink: 'components/radiobutton',
            icon: 'pi pi-check-circle',
          },

          {
            label: 'Table',
            routerLink: 'components/table',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Tabs',
            routerLink: 'components/tabs',
            icon: 'pi pi-check-circle',
          },
        ]
      },
      // {
      //   label: 'Backend',
      // },
    ];
  }

}
