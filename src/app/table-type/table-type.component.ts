import { Component, OnInit } from '@angular/core';
import { ModeService } from '../service/mode.service';
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
    private typeService: TypeService,
    private modeService: ModeService
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
    if (this.modeService.mode == 1) {
      const percent = this.getPercent(offType, defType);
      return percent === 0 ? 'x 0' : percent === 100 ? '' : 'x ' + percent / 100;
    } else { // Pogo
      const multiplier = Math.round(this.typeService.offensiveTypesPogo[this.typeService.getTypeId(offType)][this.typeService.getTypeId(defType)] * 100) / 100
      return multiplier == 1 ? '' : multiplier < 1 ? 'x ' + multiplier.toString().substring(1) : 'x ' + multiplier;
    }
  }

  hoverHeader(type) {
    this.hover = type;
  }

  isHovered(type) {
    return this.hover && this.hover === type;
  }
}
