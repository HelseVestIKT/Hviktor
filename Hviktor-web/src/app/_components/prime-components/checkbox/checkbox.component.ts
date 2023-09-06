import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      checkbox: new FormControl<string | null>(null)
    });
  }

  refresh(){
    window.location.reload();
  }
}
