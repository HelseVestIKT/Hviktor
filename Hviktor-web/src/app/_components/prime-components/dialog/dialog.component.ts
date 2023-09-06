import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  refresh(){
    window.location.reload();
  }

}
