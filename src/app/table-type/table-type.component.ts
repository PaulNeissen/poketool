import { Component, OnInit } from '@angular/core';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-table-type',
  templateUrl: './table-type.component.html',
  styleUrls: ['./table-type.component.less']
})
export class TableTypeComponent implements OnInit {

  loaded: boolean = false;
  hover: string = '';

  constructor(
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.loaded = this.typeService.loaded;
    this.typeService.isInit.subscribe(value => this.loaded = value);
    this.typeService.initType();
  }

  getTypes() {
    return this.typeService.types;
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromName(type);
  }

  getPercent(offType, defType) {
    return this.typeService.offensiveTypes[this.typeService.getTypeId(offType)][this.typeService.getTypeId(defType)];
  }

  getMultiplier(offType, defType) {
    const percent = this.getPercent(offType, defType);
    return percent === 0 ? 'x 0' : percent === 100 ? '' : 'x ' + percent / 100;
  }

  hoverHeader(type) {
    this.hover = type;
  }

  isHovered(type) {
    return this.hover && this.hover === type;
  }
}
