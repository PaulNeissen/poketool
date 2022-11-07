import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../model/pokemon.class';
import { Resistance } from '../model/resistance.class';
import { Type } from '../model/type.class';
import { ModeService } from '../service/mode.service';
import { PokemonService } from '../service/pokemon.service';
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
  public offensiveCoverage: any[] = [];
  public offensiveLabel: string[] = ['No effect', 'Not very effective', 'Normal effectiveness', 'Super effective'];
  public hideDetails: boolean[] = [false, false, false, false];
  public pokemonOptionIndex: number = 0;
  public maxOptionsDef: number = 100;
  public maxOptionsOff: number = 200;
  public maxOptionsChoice: number[] = [20, 50, 100, 200, 500];
  public bestOptionsDef: any[] = [];
  public nbOptionShow: number = 1;
  
  constructor(
    private typeService: TypeService,
    private pokemonService: PokemonService,
    private modeService: ModeService
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
        
        // Defensive Coverage
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

          this.teamResistances.push(this.typeService.getResistances(pokemon.types)); // TODO : not used
        });

        // Defensive option
        this.simulate();

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
    if (this.modeService.mode == 0) {
      return percent == 1 ? '' : percent < 1 ? percent.toString().slice(1) : percent;
    } else {
      return percent === 0 ? '0' : percent === 100 ? '' : percent === 25 ? '\u00BC' : percent === 50 ? '\u00BD' : percent / 100;
    }
  }

  getResistances(pokemon) {
    if (this.modeService.mode == 0) {
      return this.typeService.getPokemonResistancePogo(pokemon.types);
    } else {
      return this.typeService.getPokemonResistance(pokemon.types);
    }
  }

  getTypes() {
    return this.typeService.types;
  }

  getImgStyle(pokemon) {
    return this.getImgStyleFromId(pokemon.id);
  }

  getImgStyleFromId(pokemonId) {
    const coord = this.pokemonService.getImgCoord(pokemonId);
    const x = pokemonId < 10000 ? Math.floor(pokemonId / 12) : coord!.y;
    const y = pokemonId < 10000 ? pokemonId % 12 : coord!.x;
    const width =  x * 30;
    const height = y * 40;
    return "background:transparent url(assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px";
  }

  getNameFromId(pokemonId) {
    let pokemon = this.pokemonService.pokemons.find(pokemon => pokemon.id == pokemonId);
    return pokemon?.name + " | " + pokemon?.nameFr;
  }

  openDetails(index) {
    this.hideDetails[index] = !this.hideDetails[index];
  }

  isPogo() {
    return ;
  }

  getCellClasses(resistance) {
    let result: string[] = [];
    if (this.modeService.mode == 0) {
      result.push('cell-pogo');
    }
    if (resistance == 0) {
      result.push('grey-cell');
    }
    if (resistance == 25 || resistance == 0.39 || resistance == 0.24) {
      result.push('very-green-cell');
    }
    if (resistance == 50 || resistance == 0.63) {
      result.push('green-cell');
    }
    if (resistance == 200 || resistance == 1.6) {
      result.push('red-cell');
    }
    if (resistance == 400 || resistance == 2.56) {
      result.push('very-red-cell');
    }
    return result;
  }

  simulate() {
    if (this.team.length == 2) {
      this.simulateDefOption();
    }
    this.simulateOffOption();
  }

  simulateDefOption() {
    this.bestOptionsDef = [];
    for(let i = 0; i < this.maxOptionsDef; i++) {
      let pokemon = this.pokemonService.pokemons[i];
      let tmpResistances = [this.getResistances(this.team[0]), this.getResistances(this.team[1]), this.getResistances(pokemon)];
      let resistancesArray = [];
      let resistanceScore = 0;
      for(let y = 0; y < 18; y++) {
        let coef = 1;
        tmpResistances.forEach(resistance => {
          coef *= resistance[y];
        });
        resistancesArray.push(coef);
        resistanceScore += Math.pow(coef, 3); // TODO : trouver une bonne formule
      }
      pokemon.defOption = resistanceScore;
      this.bestOptionsDef.push(pokemon);
    }
    this.bestOptionsDef = this.bestOptionsDef.sort((a,b) => a.defOption >= b.defOption ? 1 : -1);
  }

  changeDefOption() {
    this.pokemonOptionIndex += 1;
    this.simulate();
  }

  showAllOptions() {
    this.nbOptionShow = this.nbOptionShow == 1 ? 5 : 1;
  }

  getOptionsDef() {
    if (this.team.length == 2) {
      return this.bestOptionsDef.slice(this.pokemonOptionIndex, this.pokemonOptionIndex + this.nbOptionShow);
    }
    return [];
  }

  simulateOffOption() {
    // Offensive Coverage
    let moveTypes: number[] = [];
    this.team.forEach(pokemon => {
      pokemon.moveset.forEach(moveId => {
        let move = this.pokemonService.moves.find(x => x.id == moveId && x.power);
        if (move) {
          moveTypes.push(move.type);
        }
      });
    });
    this.getOptionsDef().forEach(pokemon => {
      pokemon.recommendedMoves.forEach(moveId => {
        let move = this.pokemonService.moves.find(x => x.id == moveId && x.power);
        if (move) {
          moveTypes.push(move.type);
        }
      });
    });

    console.log("MOVE TYPES", moveTypes);
    this.offensiveCoverage = this.typeService.getOffensiveCoverage(moveTypes, this.maxOptionsOff);
    console.log("OFF COVERAGE", this.offensiveCoverage);
  }
}
