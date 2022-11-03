import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getImgSrc() {
    let today = new Date();
    let month = today.toLocaleString('en-GB', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    let year = today.getFullYear();
    return 'https://gamepress.gg/pokemongo/sites/pokemongo/files/2022-10/' + month + '-' + year + '.jpg';
  }
}
