import { Component, Input, OnInit } from '@angular/core';
import { Resistance } from '../model/resistance.class';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.less']
})
export class ResistanceComponent implements OnInit {

  @Input() resistance!: Resistance;

  constructor(
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }
}
