import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Resistance } from '../model/resistance.class';
import { ModeService } from './mode.service';
import { PokemonService } from './pokemon.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  //normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost
  //0           1           2         3         4         5       6     7
  //steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy
  //  8       9       10        11        12          13        14      15      16      17
  public types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
  public resistanceTitles = ['Immune to', 'Strongly resists', 'Resists', 'Weak to', 'Very weak to'];
  public multipliers = [1, 25, 50, 200, 400];
  public multipliersPogo = [1, 0.390625, 0.625, 1, 1.6, 2.56];
  public offensiveTypes: any[][] = [];
  public defensiveTypes: any[][] = [];
  public offensiveTypesPogo: any[][] = [
    //normal
    [1,1,1,  1,1,0.625,  1,0.390625,0.625,  1,1,1,  1,1,1,  1,1,1], 
    //fighting
    [1.6,1,0.625,  0.625,1,1.6,  0.625,0.390625,1.6,  1,1,1,  1,0.625,1.6,  1,1.6,0.625],
    //flying
    [1,1.6,1,  1,1,0.625,  1.6,1,0.625,  1,1,1.6,  0.625,1,1,  1,1,1], 
    //poison
    [1,1,1,  0.625,0.625,0.625,  1,0.625,0.390625,  1,1,1.6,  1,1,1,  1,1,1.6],
    //ground
    [1,1,0.390625,  1.6,1,1.6,  0.625,1,1.6,  1.6,1,0.625,  1.6,1,1,  1,1,1], 
    //rock
    [1,0.625,1.6,  1,0.625,1,  1.6,1,0.625,  1.6,1,1,  1,1,1.6,  1,1,1],
    //bug
    [1,0.625,0.625,  0.625,1,1,  1,0.625,0.625,  0.625,1,1.6,  1,1.6,1,  1,1.6,0.625], 
    //ghost
    [0.390625,1,1,  1,1,1,  1,1.6,1,  1,1,1,  1,1.6,1,  1,0.625,1],
    //steel
    [1,1,1,  1,1,1.6,  1,1,0.625,  0.625,0.625,1,  0.625,1,1.6,  1,1,1.6], 
    //fire
    [1,1,1,  1,1,0.625,  1.6,1,1.6,  0.625,0.625,1.6,  1,1,1.6,  0.625,1,1],
    //water
    [1,1,1,  1,1.6,1.6,  1,1,1,  1.6,0.625,0.625,  1,1,1,  0.625,1,1], 
    //grass
    [1,1,0.625,  0.625,1.6,1.6,  0.625,1,0.625,  0.625,1.6,0.625,  1,1,1,  0.625,1,1],
    //electric
    [1,1,1.6,  1,0.390625,1,  1,1,1,  1,1.6,0.625,  0.625,1,1,  0.625,1,1], 
    //psychic
    [1,1.6,1,  1.6,1,1,  1,1,0.625,  1,1,1,  1,0.625,1,  1,0.390625,1],
    //ice
    [1,1,1.6,  1,1.6,1,  1,1,0.625,  0.625,0.625,1.6,  1,1,0.625,  1.6,1,1], 
    //dragon
    [1,1,1,  1,1,1,  1,1,0.625,  1,1,1,  1,1,1,  1.6,1,0.390625],
    //dark
    [1,0.625,1,  1,1,1,  1,1.6,1,  1,1,1,  1,1.6,1,  1,0.625,0.625],
    //fairy
    [1,1.6,1,  0.625,1,1,  1,1,0.625,  0.625,1,1,  1,1,1,  1.6,1.6,1]
  ];
  
  public numberOfType = 18;
  
  public isInit: Subject<boolean> = new Subject<boolean>();
  public loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private pokemonService: PokemonService,
    private modeService: ModeService
  ) { }

  getTypeImgFromId(type) {
    return this.getTypeImgFromName(this.types[type]);
  }

  getTypeImgFromName(type) {
    return 'assets/symbols/type-' + type + '-32px.png';
  }

  initType() {
    if (!this.loaded) {
      for(let i = 0; i < 18; i++) {
        this.offensiveTypes.push([]);
        this.defensiveTypes.push([]);
      }
      this.http.get('assets/data/type_efficacy.csv', {responseType: 'text'}).subscribe(data => {
        data.split('\n').slice(1).forEach(element => { // damage_type_id,  target_type_id,  damage_factor
          const tmp = element.split(',');
          if (tmp.length > 1) {
            this.offensiveTypes[+tmp[0] - 1].push(Number(tmp[2]));
            this.defensiveTypes[+tmp[1] - 1].push(Number(tmp[2]));
          }
        })
        this.isInit.next(true);
        this.loaded = true;
      });
    }
  }

  getResistances(newTypes): Resistance[] {
    let resistances: Resistance[] = [];
    if (this.modeService.mode == 0) {
      for(let i = 0; i < this.types.length; i++) {
        let coef = 1;
        newTypes.forEach(type => {
          coef *= this.offensiveTypesPogo[i][type];
        })
        if (coef != 1) {
          let coefString = (Math.round(coef * 1000) / 10) + '%';
          let resistance = resistances.find(x => x.title == coefString);
          if (resistance) {
            resistance.resistances.push(i);
          } else {
            resistances.push(new Resistance(coefString, [i]));
          }
        }
      }
      resistances.sort((a, b) => (+a.title.slice(0, -1) < +b.title.slice(0, -1)) ? -1 : 1)
    } else {
      const types = this.getPokemonResistance(newTypes);
      for(let i = 0; i < this.multipliers.length; i++) {
        resistances.push(new Resistance(this.resistanceTitles[i], this.utilsService.reduce(types, this.multipliers[i])));
      }
    }
    return resistances;
  }

  getPokemonResistancePogo(types: number[]): number[] {
    let result: number[] = []
    for(let i = 0; i < this.types.length; i++) {
      let coef = 1;
      types.forEach(type => {
        coef *= this.offensiveTypesPogo[i][type];
      })
      result.push((Math.round(coef * 100) / 100));
    }
    return result;
  }

  getPokemonResistance(types: number[]): number[] {
    let result: number[] = [];
    for(let i = 0; i < 18; i++) {
      result.push(this.getResistanceCoef(types, i));
    }
    return result;
  }

  getResistanceCoef(types: number[], attackType: number) {
    return (this.defensiveTypes[types[0]][attackType] * (types.length > 1 ? this.defensiveTypes[types[1]][attackType] : 100)) / 100;
  }

  getTypeId(type: string): number {
    return this.types.indexOf(type);
  }

  getOffensiveCoverage(types: number[]) {
    let result: any[] = [[],[],[],[]];
    this.pokemonService.pokemons.forEach(pokemon => {
      let resistance = 0;
      types.forEach(type => {
        resistance = Math.max(this.getResistanceCoef(pokemon.types, type), resistance);
      });
      if (resistance == 0) {
        result[0].push(pokemon.id);
      } else if (resistance > 0 && resistance < 100) {
        result[1].push(pokemon.id);
      } else if (resistance == 100) {
        result[2].push(pokemon.id);
      } else if (resistance > 100) {
        result[3].push(pokemon.id);
      }
    });
    return result;
  }

  getMoveTypeName(move, weatherBallType) {
    let type = move == 311 ? weatherBallType : this.pokemonService.moves.find(x => x.id == move)?.type; // 199 = weather ball
    return type != undefined ? this.types[type] : '';
  }
}
