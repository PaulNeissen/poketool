import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { Resistance } from '../model/resistance.class';
import { Type } from '../model/type.class';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-side-bar-team',
  templateUrl: './side-bar-team.component.html',
  styleUrls: ['./side-bar-team.component.less']
})
export class SideBarTeamComponent implements OnInit {

  @Input() team: Pokemon[] | undefined;
  @Input() opened: boolean = false;
  @Output() close = new EventEmitter<any>();
  public resistances: Resistance[] = [];  // Immunity, very strong, strong, neutral, weak, very weak
  public multipliers = [0, 25, 50, 200, 400];
  public types: Type[] = [];
  public singleTypes: number[] = [];
  public multipleTypes: Type[] = [];
  public teamResistances: Resistance[][] = [];
  
  constructor(
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.team && changes.team.currentValue) {
      this.types = [];
      this.singleTypes = [];
      this.multipleTypes = [];
      this.teamResistances = [];
      if (this.team) {
        this.team.forEach(pokemon => {

          this.types.push(new Type(1, pokemon.types));

          this.singleTypes = [ ...new Set(this.singleTypes.concat(pokemon.types)) ];

          pokemon.types.forEach(type => {
            let tmpType = this.multipleTypes.find(e => e.types.includes(type));
            if (tmpType) {
              tmpType.number += 1;
            } else {
              this.multipleTypes.push(new Type(1, [type]));
            }
          });

          this.teamResistances.push(this.typeService.getResistances(pokemon.types));
          


        });
        /*console.log(this.types);
        console.log(this.singleTypes);
        console.log(this.multipleTypes);
        console.log(this.teamResistances);*/

        for(let i = 0; i < 18; i++) {
          for(let j = 0; j < 18; j++) {
  
          }
        }
      }
    }
  }

  getTypeSrc(type) {
    return this.typeService.getTypeImgFromId(type);
  }

  getTypeSrcFromName(type) {
    return this.typeService.getTypeImgFromName(type);
  }

  getPercent(offType, defType) {
    return this.typeService.offensiveTypes[this.typeService.getTypeId(offType)][this.typeService.getTypeId(defType)];
  }

  getMultiplier(percent) {
    return percent === 0 ? '0' : percent === 100 ? '' : percent === 25 ? '\u00BC' : percent === 50 ? '\u00BD' : percent / 100;
  }

  getResistances(pokemon) {
    return this.typeService.getPokemonResistance(pokemon.types);
  }

  getTypes() {
    return this.typeService.types;
  }

  getImgStyle(pokemon) {
    const height = (pokemon.id % 12) * 40;
    const width =  Math.floor(pokemon.id / 12) * 30;
    return "background:transparent url(assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px";
  }

}
