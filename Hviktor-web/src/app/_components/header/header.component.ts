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
        command:  () => this.newRefresh()
      },
      {
        label: 'Ikoner',
        routerLink: 'icons',
      },
      {
        label: 'Variabler og klasser',
        routerLink: 'variables',
        command:  () => this.newRefresh()
      },
      {
        label: 'Komponenter',
        items: [
          {
            label: 'Accordion',
            routerLink: 'components/accordion',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Buttons',
            routerLink: 'components/buttons',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Checkbox',
            routerLink: 'components/checkbox',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Chip',
            routerLink: 'components/chip',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Dialog',
            routerLink: 'components/dialog',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Dropdown',
            routerLink: 'components/dropdown',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Menubar',
            routerLink: 'components/menubar',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Multiselect',
            routerLink: 'components/multiselect',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Radiobutton',
            routerLink: 'components/radiobutton',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },

          {
            label: 'Table',
            routerLink: 'components/table',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
          {
            label: 'Tabs',
            routerLink: 'components/tabs',
            icon: 'pi pi-question-circle',
            command:  () => this.newRefresh()
          },
        ]
      },
      // {
      //   label: 'Backend',
      // },
    ];
  }

  refresh(){
    window.location.reload();
  }

  newRefresh(){
    setTimeout(function(){
      location.reload();
  }, 10); // 3000 milliseconds = 3 seconds
  }

}
