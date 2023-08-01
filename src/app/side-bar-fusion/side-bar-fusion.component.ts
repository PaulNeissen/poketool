import { R3TargetBinder } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { Resistance } from '../model/resistance.class';
import { FusionService } from '../service/fusion.service';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-side-bar-fusion',
  templateUrl: './side-bar-fusion.component.html',
  styleUrls: ['./side-bar-fusion.component.less']
})
export class SideBarFusionComponent implements OnInit {

  @Input() team: Pokemon[] | undefined;
  @Input() opened: boolean = false;
  @Output() close = new EventEmitter<any>();
  public pokemons: Pokemon[];
  public resistances: Resistance[][] = [[],[]];  // Immunity, very strong, strong, neutral, weak, very weak
  public index: number = 0;
  
  constructor(
    public typeService: TypeService,
    public fusionService: FusionService
  ) { }

  ngOnInit(): void {
    this.refreshFusion();
  }

  closeDrawer() {
    this.close.emit();
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }

  getBarColor(value) {
    if (value < 50) {
      return 'rgb(180,0,0)';
    } else if (value < 80) {
      return 'rgb(230,120,0)';
    } else if (value < 100) {
      return 'rgb(255,200,0)';
    } else if (value < 130) {
      return 'rgb(200,230,0)';
    } else  {
      return 'rgb(100,215,0)';
    } 
  }

  refreshFusion() {
    if (this.team.length >= 2) {
      this.pokemons = [];
      this.resistances = [];
      this.pokemons.push(this.fusionService.fuse(this.team[this.index], this.team[1 - this.index]));
      this.pokemons.push(this.fusionService.fuse(this.team[1 - this.index], this.team[this.index]));
      this.resistances.push(this.typeService.getResistances(this.pokemons[0].types));
      this.resistances.push(this.typeService.getResistances(this.pokemons[1].types));
      console.log('RESISTANCES', this.resistances);
      // TODO: immune to not working
    }
  }

  swapFusion() {
    this.index = 1 - this.index;
  }
}
