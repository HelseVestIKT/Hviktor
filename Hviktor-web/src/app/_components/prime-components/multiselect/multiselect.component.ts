import { Component } from '@angular/core';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  cities: City[];

  selectedCities: City[] = [];

  constructor() {
      this.cities = [
          {name: 'New York', code: 'NY'},
          {name: 'Roma', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];
  }
}
