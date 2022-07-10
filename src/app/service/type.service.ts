import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Resistance } from '../model/resistance.class';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  public types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
  public resistanceTitles = ['Immune to', 'Strongly resists', 'Resists', 'Weak to', 'Very weak to'];
  public multipliers = [0, 25, 50, 200, 400];
  public offensiveTypes: any[][] = [];
  public defensiveTypes: any[][] = [];
  public numberOfType = 18;
  
  public isInit: Subject<boolean> = new Subject<boolean>();
  public loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  getTypeImgFromId(type) {
    return this.getTypeImgFromName(this.types[type - 1]);
  }

  getTypeImgFromName(type) {
    return '../../assets/symbols/type-' + type + '-32px.png';
  }

  initType() {
    if (!this.loaded) {
      for(let i = 0; i < 18; i++) {
        this.offensiveTypes.push([]);
        this.defensiveTypes.push([]);
      }
      this.http.get('assets/data/type_efficacy.csv', {responseType: 'text'}).subscribe(data => {
        data.split('\n').slice(1).forEach(element => {
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
    const types = this.getPokemonResistance(newTypes);
    for(let i = 0; i < this.multipliers.length; i++) {
      resistances.push(new Resistance(this.resistanceTitles[i], this.utilsService.reduce(types, this.multipliers[i])));
    }
    return resistances;
  }

  getPokemonResistance(types: number[]): number[] {
    let result: number[] = [];
    for(let i = 0; i < 18; i++) {
      result.push((this.defensiveTypes[types[0] - 1][i] * (types.length > 1 ? this.defensiveTypes[types[1] - 1][i] : 100)) / 100);
    }
    return result;
  }

  getTypeId(type: string): number {
    return this.types.indexOf(type);
  }
}
